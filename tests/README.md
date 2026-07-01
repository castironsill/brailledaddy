# Tests

Dependency-free regression tests for the translation engine. They load the
vendored liblouis bundle headlessly (no browser, no `npm install`) and assert
known-good UEB Grade 1 & 2 translations, multi-line handling, and BRF
back-translation.

## Run

From the repo root, with Node 18+ (uses the built-in test runner):

```
node --test
```

## What's covered

- `engine.test.js` — engine init + a table of known translations, including the
  UEB rules corrected in the help guide (e.g. `to` → `⠞⠕`, not contracted),
  capital indicators, groupsigns, multi-line signs, and back-translation.
- `helpers/load-engine.js` — runs `vendor/liblouis/*` in a Node `vm` sandbox and
  returns `BrailleEngine`; reuse it for new engine tests.

## Not covered here

UI / accessibility (axe-core) checks still run separately with a headless browser
in a scratch dir (see the "Verifying changes" section in `CLAUDE.md`) — those need
a DOM and are intentionally kept out of this zero-dependency suite. Adding a
browser-driven smoke test here would be a good next step.
