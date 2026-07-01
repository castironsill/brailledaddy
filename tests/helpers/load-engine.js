// Loads the vendored liblouis bundle (asm.js build + Easy-API + inlined UEB
// tables + our wrapper) in a Node `vm` sandbox and returns `window.BrailleEngine`,
// so the exact production engine can be unit-tested headlessly with zero
// dependencies (no browser, no npm install).
//
// The pieces have conflicting environment needs, handled by loading in stages in
// one shared sandbox: the emscripten build wants a Node-like global (so it is run
// first, before `window` exists), while tables.js / braille-engine.js want a
// browser `window` (added to the sandbox before they run).

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const VENDOR = path.join(__dirname, '..', '..', 'vendor', 'liblouis');

function loadEngine() {
  const sandbox = {};
  sandbox.globalThis = sandbox;
  sandbox.console = console;
  sandbox.require = require;
  sandbox.process = process;
  sandbox.Buffer = Buffer;
  sandbox.__dirname = VENDOR;
  sandbox.atob = (b64) => Buffer.from(b64, 'base64').toString('binary');
  sandbox.TextDecoder = TextDecoder;
  sandbox.TextEncoder = TextEncoder;
  sandbox.setTimeout = setTimeout;
  sandbox.Uint8Array = Uint8Array;
  vm.createContext(sandbox);

  const run = (file) => vm.runInContext(
    fs.readFileSync(path.join(VENDOR, file), 'utf8'),
    sandbox,
    { filename: file }
  );

  // 1. emscripten build — Node-like env (no window yet)
  run('build-no-tables-utf16.js');
  // 2. present a browser-ish global for the remaining scripts
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  run('easy-api.js');
  run('tables.js');
  run('braille-engine.js');

  const engine = sandbox.BrailleEngine;
  if (!engine || !engine.ready) {
    throw new Error(
      'BrailleEngine failed to initialise: ' + (engine && engine.error)
    );
  }
  return engine;
}

module.exports = { loadEngine };
