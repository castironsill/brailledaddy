// Regression tests for BrailleDaddy's translation engine (vendored liblouis,
// UEB Grade 1 & 2). Run with:  node --test
//
// These lock in the known-good translations the app relies on, including the
// UEB rules that were corrected in the help guide (e.g. "to" is written out,
// not contracted). Zero dependencies — uses Node's built-in test runner and the
// headless engine loader in helpers/.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadEngine } = require('./helpers/load-engine');

const engine = loadEngine();

test('engine initialises and reports ready', () => {
  assert.equal(engine.ready, true);
  assert.equal(engine.error, null);
  assert.match(String(engine.version), /^\d+\.\d+\.\d+/);
});

// --- Grade 1 (uncontracted) ------------------------------------------------
const GRADE1 = [
  ['can you go', '⠉⠁⠝ ⠽⠕⠥ ⠛⠕'],
  ['Hello 123', '⠠⠓⠑⠇⠇⠕ ⠼⠁⠃⠉'],
];

// --- Grade 2 (contracted) --------------------------------------------------
const GRADE2 = [
  ['can you go', '⠉ ⠽ ⠛'],
  ['the cat', '⠮ ⠉⠁⠞'],
  ['to the store', '⠞⠕ ⠮ ⠌⠕⠗⠑'],
  // UEB removed the to/into/by wordsigns — these are written out (help guide fix)
  ['to', '⠞⠕'],
  ['into', '⠔⠞⠕'],
  ['by', '⠃⠽'],
  // capital-word indicator doubled for all-caps
  ['ABCDE', '⠠⠠⠁⠃⠉⠙⠑'],
  // "I" carries a capital indicator
  ['I can help', '⠠⠊ ⠉ ⠓⠑⠇⠏'],
  // groupsigns within words
  ['outside', '⠳⠞⠎⠊⠙⠑'],
  ['playing', '⠏⠇⠁⠽⠬'],
  // sign examples used in the help guide
  ['Restroom', '⠠⠗⠑⠌⠗⠕⠕⠍'],
  ['Exit', '⠠⠑⠭⠊⠞'],
  ['Room 204', '⠠⠗⠕⠕⠍ ⠼⠃⠚⠙'],
  ['Stairway', '⠠⠌⠁⠊⠗⠺⠁⠽'],
];

for (const [text, expected] of GRADE1) {
  test(`G1: ${JSON.stringify(text)}`, () => {
    assert.equal(engine.translate(text, 1), expected);
  });
}

for (const [text, expected] of GRADE2) {
  test(`G2: ${JSON.stringify(text)}`, () => {
    assert.equal(engine.translate(text, 2), expected);
  });
}

// --- Multi-line signs keep their structure ---------------------------------
test('multi-line input preserves line breaks', () => {
  const out = engine.translate('Room 204\nRestroom', 2);
  assert.equal(out, '⠠⠗⠕⠕⠍ ⠼⠃⠚⠙\n⠠⠗⠑⠌⠗⠕⠕⠍');
  assert.equal(out.split('\n').length, 2);
});

// --- Empty / edge input ----------------------------------------------------
test('empty string translates to empty string', () => {
  assert.equal(engine.translate('', 2), '');
});

// --- Back-translation (BRF import path) ------------------------------------
test('Grade 1 back-translation round-trips exactly', () => {
  const braille = engine.translate('exit stairway', 1);
  assert.equal(engine.backTranslate(braille, 1), 'exit stairway');
});

test('Grade 2 back-translation recovers a simple phrase', () => {
  // Grade 2 back-translation is approximate in general, but the contracted
  // wordsigns for this phrase recover cleanly.
  const braille = engine.translate('can you go', 2); // ⠉ ⠽ ⠛
  assert.equal(engine.backTranslate(braille, 2), 'can you go');
});
