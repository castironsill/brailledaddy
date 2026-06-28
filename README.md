# BrailleDaddy

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2.0-green.svg)
![UEB](https://img.shields.io/badge/UEB-Grade%201%20%26%202-brightgreen.svg)
![Engine](https://img.shields.io/badge/engine-liblouis-blueviolet.svg)
![ADA Compliant](https://img.shields.io/badge/ADA-Compliant-blue.svg)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA-success.svg)

🔗 **Live:** <https://brailledaddy.com>

---

## What is BrailleDaddy?

BrailleDaddy is a professional, web-based Unified English Braille (UEB) translator designed for creating ADA-compliant tactile signage. It supports both Grade 1 (uncontracted) and Grade 2 (contracted) braille with true-scale millimeter output—ready for direct engraving, embossing, or CNC routing.

As of **v1.2.0**, translation is powered by **[liblouis](https://github.com/liblouis/liblouis)** — the open-source braille engine used by BrailleBlaster and most professional transcription software — compiled to run entirely in your browser. There is no server and no network call: the engine and the official UEB tables are bundled with the page, so your text never leaves your device.

**No installations. No accounts. Just accurate, standards-based braille.**

---

## Features

### 🔤 Translation Engine
- **Grade 1 & Grade 2 UEB** translation with real-time preview
- **Multi-line sign mode** with automatic ADA-compliant spacing (10.0–10.2mm)
- Intelligent handling of contractions, numbers, punctuation, and capitalization
- Special rules for permanent signage vs. documents

### 🪧 ADA Sign Mode
- One toggle that applies the rules for braille on permanent tactile signs
  (**ADA §703.3.1 / CBC 11B-703.3**): forces contracted **Grade 2** and **omits
  capital indicators** — the uppercase/Title-Case styling on a sign's printed face
  is *not* carried into the braille
- **Keep-capitals exceptions list:** add proper nouns, names, initials, or acronyms
  (e.g. `Smith`, `ATM`) and only those keep their capital indicator; matching is
  case-insensitive and the list entry sets the exact casing
- See [the capitalization rules](#-ada-compliance) below for the full rationale

### 👁️ Visualization
- **Unicode View:** Standard braille characters (⠀–⣿)
- **Dot Pattern View:** polished, proportional 6-dot cell rendering that re-wraps
  on resize and stays crisp on High-DPI / Retina displays

### 📥 Import & Export

**Import:**
- Plain text (.txt)
- Braille Ready Format (.brf)
- Drag-and-drop support

**Export:**
- **SVG** with true millimeter scaling (no DPI conversions)
- **BRF** for embossers
- **Plain text** or **Unicode braille**
- **Copy to clipboard**

### ✅ ADA Compliance

Built-in compliance with **ADA §703.3.1** for permanent room identification:

| Requirement | Specification |
|-------------|---------------|
| **Dot diameter** | 1.5–1.6mm |
| **Dot spacing (within cell)** | 2.3–2.5mm |
| **Cell spacing (horizontal)** | 6.1–7.6mm |
| **Line spacing (vertical)** | 10.0–10.2mm |
| **Dot height** | 0.6–0.9mm raised |
| **Grade requirement** | Grade 2 mandatory for permanent signs |

**Special capitalization rules for signs (handled by ADA Sign Mode):**

Per ADA §703.3.1 / California Building Code 11B-703.3, a capital indicator
"shall only be used before the first word of sentences, proper nouns and names,
individual letters of the alphabet, initials, and acronyms." Capitalization on
braille signage is **optional**, and the ALL-CAPS or Title-Case styling on the
printed face of a sign must **not** be reproduced as capital indicators in the
braille.

- **Tactile (raised) text:** ALL CAPS — required by §703.2.2
- **Braille:** capital indicators omitted by default; turn on **ADA Sign Mode**
  and the translator does this for you (and forces Grade 2)
- **Exception:** use the keep-capitals list to retain caps on proper nouns,
  names, initials, and acronyms

---

## What changed in v1.2.0

The earlier releases used a hand-written contraction table that produced
incorrect Grade 2 UEB in a number of cases (contractions applied across letter
boundaries, contractions UEB had retired such as *to*/*into*/*by*, missing
number/letter signs, and incomplete capitalization rules). v1.2.0 replaces that
table wholesale with **liblouis** and the official `en-ueb-g1`/`en-ueb-g2`
tables, so the output now matches professional transcription tools. The BRF
import/export was also rebuilt on the standard Braille ASCII table, and the
in-page accessibility was improved (visible keyboard focus, ARIA labelling,
reduced-motion support).

### Since v1.2.0

- **ADA Sign Mode** with a per-term keep-capitals exceptions list (see above)
- **Dot-pattern view redesigned** — proportional geometry, High-DPI rendering,
  reflows correctly on resize
- **Accessibility hardened to WCAG 2.1 AA** — accessible dialogs with focus
  management/trap/Escape, skip link, labelled controls, decorative icons hidden;
  **0 violations** under axe-core across the app's main states. Published
  [accessibility statement](https://brailledaddy.com/accessibility.html)
- **SEO pass** — richer metadata, `WebApplication` + `FAQPage` structured data,
  descriptive footer, branded 404 page

---

## Run Locally
```bash
# Clone the repository
git clone https://github.com/castironsill/brailledaddy.git
cd brailledaddy

# Open in browser — double-click index.html, or:
open index.html
```

The translator works fully offline straight from `index.html` (no build step,
no server). If you want the favicons/manifest to resolve too, serve the folder
over HTTP instead, e.g. `python -m http.server` and open <http://localhost:8000>.

**Requirements:** Any modern browser (Chrome, Firefox, Safari, Edge)

---

## Technical Details

- **Vanilla JavaScript** UI — no framework, no build step
- **Translation by [liblouis](https://github.com/liblouis/liblouis)** (LGPLv3), compiled to JavaScript and vendored under [`vendor/liblouis/`](vendor/liblouis/) along with the official UEB tables (inlined so the app runs offline, with no network request)
- **Canvas rendering** for the dot-pattern view (High-DPI aware, resize-reflowing)
- **Responsive design** using CSS Grid
- **Accessible — targets WCAG 2.1 Level AA**: semantic landmarks, skip link,
  full keyboard operability with visible focus, accessible dialogs (focus
  move-in/trap/Escape/restore), ARIA labelling, live regions, and
  `prefers-reduced-motion` support. Verified at **0 axe-core violations**; see the
  [accessibility statement](accessibility.html)

> To update the bundled tables after editing `vendor/liblouis/tables/`, run `node tools/gen-tables.js`. Local modifications to the vendored engine are documented in [`vendor/liblouis/PATCHES.md`](vendor/liblouis/PATCHES.md).

### Tested Embossers
- ViewPlus (Tiger, Elite, Premier)
- Index Braille (Basic-D, Everest)
- Enabling Technologies (Romeo, Juliet)
- Any system accepting SVG or BRF input

---

## ADA Sign Requirements Summary

**For permanent room identification signs:**

✅ **MUST use Grade 2 braille**  
✅ Tactile text in ALL CAPS  
✅ Braille positioned 3/8" (9.5mm) below tactile text baseline  
✅ Mounted 48"–60" from floor to baseline  
✅ Located on latch side of door  
✅ 3" minimum clearance from door frame  
✅ Non-glare, matte finish  
✅ Dots must be domed/rounded (not flat)

❌ **Do NOT** use all capitals in braille for emphasis  
❌ **Do NOT** mirror the sign's printed ALL-CAPS / Title-Case in the braille — omit
capital indicators except for proper nouns, names, individual letters, initials,
and acronyms (ADA Sign Mode does this automatically)

---

## Contributing

We welcome contributions! Priority areas:

- Additional braille codes (Nemeth, Music Braille)
- Multi-language support
- Batch export features
- Additional validation tools

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Known Issues

- Safari may require double-click for file input
- Grade 2 BRF *import* is back-translated by liblouis and, like all contracted back-translation, can be approximate for ambiguous words
- Batch export in development

**Report bugs:** [GitHub Issues](https://github.com/castironsill/brailledaddy/issues)  
**Discuss features:** [GitHub Discussions](https://github.com/castironsill/brailledaddy/discussions)

---

## License

BrailleDaddy is released under the MIT License – see [LICENSE](LICENSE).

The bundled translation engine and braille tables are part of
[liblouis](https://github.com/liblouis/liblouis) and are licensed under the
LGPLv3 / GPLv3 – see [`vendor/liblouis/LICENSE`](vendor/liblouis/LICENSE). They
are used unmodified except for the documented buffer-handling fix in
[`vendor/liblouis/PATCHES.md`](vendor/liblouis/PATCHES.md).

---

## Acknowledgments

- **[liblouis](https://github.com/liblouis/liblouis)** and its contributors for the open-source braille translation engine and UEB tables
- **International Council on English Braille (ICEB)** for UEB specifications
- **ADA Standards for Accessible Design (2010)**
- The blind and visually impaired community for invaluable feedback
- **Perkins School for the Blind** for reference materials

---

**BrailleDaddy is committed to accuracy, accessibility, and compliance in tactile signage design.**