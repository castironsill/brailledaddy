# CLAUDE.md — BrailleDaddy project guide

Handover/context doc for Claude (and humans). Read this first.

## What this is

BrailleDaddy is a **static, client-side web app** that translates English text to
**Unified English Braille (UEB)** — Grade 1 (uncontracted) and Grade 2
(contracted) — for making **ADA §703.3.1-compliant tactile signage**. It also
renders a dot-pattern view and exports SVG (true-millimetre scale for
engraving/embossing), BRF (for embossers), and plain text, plus TXT/BRF import.

- **No build step, no framework, no server.** Plain HTML/CSS/JS.
- **Runs fully offline** — translation happens in the browser via a bundled
  engine; no network calls, the user's text never leaves their device.
- **Deployed** via GitHub Pages from the `main` branch to **brailledaddy.com**
  (custom domain set by `CNAME`). Repo: `github.com/castironsill/brailledaddy`.
- Current version: **v1.2.0** (live).

## How to run / develop

- Open `index.html` directly (double-click) — the translator works on `file://`
  because the engine and tables are inlined. Favicons/manifest won't resolve on
  `file://`; for those, serve over HTTP: `python -m http.server` then visit
  <http://localhost:8000>. (VS Code Live Server is also configured, port 5501.)
- There is **nothing to compile**. Edit a file, reload the page.
- Deploy = push to `main`. GitHub Pages redeploys automatically. `.nojekyll`
  disables Jekyll so every file (incl. `vendor/`) is served verbatim.

## File map

| Path | What it is |
|------|------------|
| `index.html` | The whole UI: controls, input/output panels, export/import sections, the ADA SVG-settings dialog, and a large tabbed help modal (with its CSS + JS inline near the bottom). |
| `script.js` | App logic: `translateText()` (calls the engine), the `BRF_DISPLAY` table + Unicode↔BRF maps, `brailleDots()` (codepoint→dot numbers), dot-pattern canvas rendering, SVG/BRF/text export, TXT/BRF import, fullscreen, clipboard. **No translation tables live here anymore.** |
| `styles.css` | All page styling, including the accessibility block at the end (focus-visible, `.engine-status`, `.sr-only`, reduced-motion). |
| `vendor/liblouis/` | The translation engine (see below). |
| `tools/gen-tables.js` | Regenerates `vendor/liblouis/tables.js` from the table source files. Run `node tools/gen-tables.js` after editing tables. |
| `README.md` | Public-facing project readme. |
| `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | GitHub Pages / SEO / PWA config. |
| `favicon*.png/.ico`, `apple-touch-icon.png`, `preview.png` | Icons + social preview image. |
| `LICENSE` | MIT (the app). liblouis has its own LICENSE under `vendor/liblouis/`. |

## The translation engine (the important part)

Translation is done by **liblouis** — the open-source engine behind BrailleBlaster
and most professional braille software — compiled to JavaScript. This replaced an
earlier hand-rolled contraction table that produced **incorrect** Grade 2 UEB; that
inaccuracy is what had taken the site offline before v1.2.0.

Loaded in this order in `index.html` (all before `script.js`):

1. `vendor/liblouis/build-no-tables-utf16.js` — liblouis C-API as **asm.js**
   (no `.wasm`, so init is **synchronous**). From `liblouis-build@3.2.0-rc`. Exposes
   global `liblouisBuild`. ~1.7 MB. **Do not edit** (regenerate from npm if needed).
2. `vendor/liblouis/easy-api.js` — the Easy-API wrapper (`liblouis@0.4.0`). Exposes
   global `liblouis`. **Locally patched** — see `vendor/liblouis/PATCHES.md`.
3. `vendor/liblouis/tables.js` — the UEB tables inlined as base64 (auto-generated;
   don't hand-edit). ~312 KB.
4. `vendor/liblouis/braille-engine.js` — our wrapper. On load it writes the tables
   into liblouis's in-memory FS and exposes **`window.BrailleEngine`**:
   - `BrailleEngine.ready` (bool), `.error`, `.version`
   - `BrailleEngine.translate(text, grade)` → Unicode braille (grade `1`|`2`,
     line-by-line so multi-line signs keep their structure)
   - `BrailleEngine.backTranslate(braille, grade)` → plain text (used by BRF import)

Tables used: `en-ueb-g1.ctb` / `en-ueb-g2.ctb` (the official UEB tables) plus their
include-closure and `unicode.dis` (makes liblouis output the Unicode braille block
U+2800–U+28FF). The readable source `.ctb`/`.cti`/`.uti`/`.dis` files live in
`vendor/liblouis/tables/` and are the source of truth for `tables.js`.

### Key engine gotchas
- **Buffer patch (critical):** upstream `easy-api.translateString` passed lengths in
  *bytes* but liblouis counts *widechars*, and sized the output buffer equal to the
  input. Braille output is often longer than the input (caps/number signs), which
  overran the allocation and corrupted the emscripten heap (intermittent `abort()`
  on a later `_free`). The patch passes correct widechar counts and a generous output
  buffer. If you ever re-vendor liblouis, **re-apply this patch** (see PATCHES.md).
- asm.js init is synchronous, so `BrailleEngine` is usable as soon as the scripts
  finish parsing — no readiness promise needed. `translateText()` still guards on
  `BrailleEngine.ready` and shows status in `#engineStatus`.

### BRF (Braille Ready Format)
`script.js` builds `unicodeToBRF` / `brfToUnicode` from `BRF_DISPLAY`, which is the
standard **Braille ASCII** table taken verbatim from liblouis' `en-us-brf.dis`. Export
maps Unicode braille cells → ASCII; import maps ASCII → Unicode braille and recovers
editable text via `BrailleEngine.backTranslate`. (Grade-2 back-translation is
inherently approximate for some words — that's expected.)

## Conventions / gotchas for editing

- Inline `onclick` handlers pass `this`/`event` explicitly (e.g.
  `setInputMode('multi', this)`, `showHelpTab('ada', this)`) — **don't** reintroduce
  reliance on the global `event` object.
- The dot-pattern canvas and SVG export derive dots from the cell's codepoint via
  `brailleDots(char)` — no lookup table to keep in sync.
- Output character counts exclude `\n` (they count braille cells).
- Accessibility matters here (the audience includes blind/low-vision users): keep
  visible keyboard focus, ARIA labels/roles, `aria-pressed` on toggles, and
  reduced-motion support intact when changing the UI.
- ADA spacing defaults in the SVG dialog encode §703.3.1 specs — don't change the
  numbers without a compliance reason.
- **ADA Sign Mode** (checkbox next to the grade selector, `adaSignMode` in
  `script.js`): for braille on permanent tactile signs, §703.3.1 / CBC 11B-703.3
  requires contracted Grade 2 and restricts capital indicators to a few cases
  (sentence start, proper nouns/names, single letters, initials, acronyms) —
  never the ALL-CAPS/Title-Case styling on a sign's printed face. Since those
  exceptions can't be detected from arbitrary input and capitalization is
  *optional* on signage, the mode omits capitals **by default** and forces
  grade 2 (the grade select is disabled while on). The textarea is untouched —
  only the braille is affected — and all exports inherit it because they read
  the `#brailleOutput` panel that `translateText()` produces.
  - **Keep-capitals exceptions** (`adaKeepCaps` + `adaApplyCasing()` in
    `script.js`, `#adaKeepCapsPanel` in the UI, shown only in ADA mode): a chip
    list of terms the user marks as proper nouns/names/initials/acronyms. Instead
    of blanket `.toLowerCase()`, `adaApplyCasing()` lowercases everything *except*
    whole-word (case-insensitive, `\b`-bounded) matches of those terms, which it
    rewrites to the list's stored casing so their capital indicator survives.
    Supports multi-word terms (matched longest-first) and comma-separated bulk
    add. The list lives in memory only (not persisted across reloads).

## Verifying changes (how this was tested)

There's no test suite in-repo. Engine/UI changes were verified with **headless
Chrome (Puppeteer)** in a scratch dir: load the page over HTTP, assert
`BrailleEngine.ready`, check known translations (e.g. `the cat`→`⠮ ⠉⠁⠞`,
`to the store`→`⠞⠕ ⠮ ⠌⠕⠗⠑`, `ABCDE`→`⠠⠠⠁⠃⠉⠙⠑`), exercise toggles/help/exports,
and assert **no console/page errors**. Reproduce by `npm i puppeteer` in a temp
folder, serve the repo, and script `page.evaluate`. Don't add node_modules to this repo.

## State / history

- **v1.2.0 (2026-06-15):** replaced the hand-rolled engine with liblouis; fixed BRF
  map (capital sign was wrong) and import (now back-translates); removed a duplicate
  help-modal script that crashed on load and the unused `braille-preview.js`; added
  the accessibility pass; removed the "offline" banner. Commit `ea05b68`, plus
  `.nojekyll` in `512366f`. Both live.
- Licensing note: the app is MIT, but it now bundles liblouis (LGPLv3/GPLv3). Keep
  `vendor/liblouis/LICENSE` and the attribution in `README.md`.

## Possible next steps (not started)

- Batch export; additional codes (Nemeth math, Music Braille — liblouis has tables);
  multi-language; lazy-loading the 1.7 MB engine to speed first paint; a small
  automated test harness committed to the repo.
