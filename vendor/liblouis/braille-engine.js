// braille-engine.js — BrailleDaddy's translation engine.
//
// Wraps the vendored liblouis build (the same engine used by BrailleBlaster and
// most professional braille software) so the app produces authoritative Unified
// English Braille. Loads fully synchronously and offline: the asm.js build and
// the UEB tables are vendored, and the tables are inlined as base64 (tables.js),
// so no network request is made and the app works even from a file:// URL.
//
// Load order in index.html (all before this file):
//   vendor/liblouis/build-no-tables-utf16.js   -> global `liblouisBuild` (the C-API)
//   vendor/liblouis/easy-api.js                -> global `liblouis` (Easy-API instance)
//   vendor/liblouis/tables.js                  -> global `LIBLOUIS_TABLES` (base64 map)
//   vendor/liblouis/braille-engine.js          -> this file: global `BrailleEngine`

(function (global) {
  "use strict";

  // unicode.dis makes liblouis emit characters in the Unicode braille block
  // (U+2800–U+28FF); the en-ueb-g{1,2}.ctb tables are the official UEB tables.
  var TABLE_DIR = "/tables/";
  var DISPLAY = TABLE_DIR + "unicode.dis";
  var TABLES = {
    "1": DISPLAY + "," + TABLE_DIR + "en-ueb-g1.ctb",
    "2": DISPLAY + "," + TABLE_DIR + "en-ueb-g2.ctb"
  };

  var engine = {
    ready: false,
    error: null,
    version: null,

    /**
     * Translate plain text to Unicode braille.
     * @param {string} text  Source text (may contain newlines).
     * @param {string|number} grade  1 (uncontracted) or 2 (contracted).
     * @returns {string} Unicode braille, with line breaks preserved.
     */
    translate: function (text, grade) {
      if (!engine.ready) {
        throw new Error("Braille engine is not ready: " + (engine.error || "still loading"));
      }
      if (text == null || text === "") return "";
      var table = TABLES[String(grade)] || TABLES["2"];

      // Translate line-by-line so multi-line signs keep their structure
      // (the SVG/dot-pattern renderers split output on "\n").
      return String(text).split("\n").map(function (line) {
        if (line === "") return "";
        var out = global.liblouis.translateString(table, line);
        // liblouis returns null on failure; fall back to the source line so the
        // UI degrades gracefully rather than blanking out.
        return out == null ? line : out;
      }).join("\n");
    },

    /**
     * Back-translate Unicode braille to plain text (used when importing BRF).
     * Grade 2 back-translation is inherently approximate, but liblouis is far
     * more accurate than a character-by-character guess.
     * @param {string} braille  Unicode braille (may contain newlines).
     * @param {string|number} grade  1 or 2.
     * @returns {string} Recovered plain text.
     */
    backTranslate: function (braille, grade) {
      if (!engine.ready) {
        throw new Error("Braille engine is not ready: " + (engine.error || "still loading"));
      }
      if (braille == null || braille === "") return "";
      var table = TABLES[String(grade)] || TABLES["2"];
      return String(braille).split("\n").map(function (line) {
        if (line === "") return "";
        var out = global.liblouis.backTranslateString(table, line);
        return out == null ? line : out;
      }).join("\n");
    }
  };

  function init() {
    try {
      if (typeof global.liblouis === "undefined") {
        throw new Error("liblouis build/easy-api not loaded before braille-engine.js");
      }
      if (typeof global.LIBLOUIS_TABLES === "undefined") {
        throw new Error("LIBLOUIS_TABLES (tables.js) not loaded before braille-engine.js");
      }

      var FS = global.liblouis.getFilesystem();
      try { FS.mkdir("/tables"); } catch (e) { /* already exists */ }

      var tables = global.LIBLOUIS_TABLES;
      for (var name in tables) {
        if (!Object.prototype.hasOwnProperty.call(tables, name)) continue;
        var bin = global.atob(tables[name]);
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        // {encoding:'binary'} writes the raw UTF-8 bytes (the default 'utf8'
        // path would re-encode and mangle the multibyte braille characters).
        FS.writeFile("/tables/" + name, bytes, { encoding: "binary" });
      }

      engine.version = global.liblouis.version();
      engine.ready = true;
    } catch (err) {
      engine.error = err && err.message ? err.message : String(err);
      if (global.console) global.console.error("BrailleEngine init failed:", err);
    }
  }

  init();
  global.BrailleEngine = engine;
})(typeof window !== "undefined" ? window : this);
