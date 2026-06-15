# Local patches to vendored liblouis

This directory vendors a prebuilt [liblouis](https://github.com/liblouis/liblouis)
JavaScript build so BrailleDaddy can do authoritative UEB translation entirely
in the browser, with no build step and no network calls.

Sources (installed from npm, then copied here):

- `build-no-tables-utf16.js` — `liblouis-build@3.2.0-rc` (asm.js, liblouis C-API 3.2.0). Unmodified.
- `easy-api.js` — `liblouis@0.4.0` Easy-API wrapper. **Patched** (see below).
- `tables/` — the UEB Grade 1 / Grade 2 tables and their include-closure,
  plus `unicode.dis` (renders output in the Unicode braille block, U+2800).
  Unmodified. Inlined into `tables.js` as base64 by `tools/gen-tables.js`.

liblouis and its tables are licensed LGPLv3+ — see `LICENSE`.

## Patch: `easy-api.js` → `IMPL.lou.translateString`

Upstream passed the input length and output-buffer capacity to liblouis in
**bytes**, but liblouis counts **widechars**, and it sized the output buffer
equal to the input. Braille output is frequently longer than the input
(capital indicators, number signs, contraction edge cases), so expanding
translations overran the allocation and corrupted the emscripten heap —
producing an intermittent `abort()` inside `_free` on a later call.

The patched version passes the correct widechar counts for both input and
output and allocates a generous output buffer (`inlen * 8 + 256` widechars).
It also frees its scratch allocations on the failure path. Behaviour is
otherwise identical.
