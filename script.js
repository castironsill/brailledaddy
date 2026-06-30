// Translation is performed by liblouis (see vendor/liblouis/braille-engine.js),
// the same engine used by BrailleBlaster and most professional braille software.
// This guarantees authoritative Unified English Braille for Grade 1 and Grade 2,
// including the contraction, capitalization, and number rules that a hand-rolled
// table cannot reliably get right.

// Dot numbers (1-8) for a Unicode braille cell, derived directly from its code
// point. The Unicode braille block (U+2800-U+28FF) encodes each raised dot as a
// bit: dot 1 = bit 0 ... dot 6 = bit 5 (dots 7-8 = bits 6-7, unused in UEB).
// This is exact for every possible cell — no lookup table to fall out of date.
function brailleDots(char) {
    const code = char ? char.codePointAt(0) : 0;
    if (code < 0x2800 || code > 0x28FF) return []; // space, newline, etc.
    const bits = code - 0x2800;
    const dots = [];
    for (let d = 0; d < 8; d++) {
        if (bits & (1 << d)) dots.push(d + 1);
    }
    return dots;
}

// Braille ASCII (BRF) mapping, taken verbatim from liblouis' en-us-brf.dis
// display table — the standard used by braille embossers. Each pair is
// [ASCII character, dot numbers]. We build the Unicode-braille <-> BRF maps
// from this single source of truth so export and import always agree.
const BRF_DISPLAY = [
    ['A', '1'], ['B', '12'], ['C', '14'], ['D', '145'], ['E', '15'],
    ['F', '124'], ['G', '1245'], ['H', '125'], ['I', '24'], ['J', '245'],
    ['K', '13'], ['L', '123'], ['M', '134'], ['N', '1345'], ['O', '135'],
    ['P', '1234'], ['Q', '12345'], ['R', '1235'], ['S', '234'], ['T', '2345'],
    ['U', '136'], ['V', '1236'], ['W', '2456'], ['X', '1346'], ['Y', '13456'],
    ['Z', '1356'], ['0', '356'], ['1', '2'], ['2', '23'], ['3', '25'],
    ['4', '256'], ['5', '26'], ['6', '235'], ['7', '2356'], ['8', '236'],
    ['9', '35'], ["'", '3'], ['@', '4'], ['"', '5'], [',', '6'],
    ['*', '16'], ['/', '34'], ['-', '36'], ['^', '45'], ['.', '46'],
    [';', '56'], ['<', '126'], ['%', '146'], [':', '156'], ['[', '246'],
    ['>', '345'], ['+', '346'], ['_', '456'], ['$', '1246'], ['\\', '1256'],
    ['?', '1456'], ['!', '2346'], ['#', '3456'], ['&', '12346'], ['(', '12356'],
    [']', '12456'], [')', '23456'], ['=', '123456']
];

function dotsToBrailleChar(dotStr) {
    let bits = 0;
    for (const c of dotStr) bits |= 1 << (parseInt(c, 10) - 1);
    return String.fromCodePoint(0x2800 + bits);
}

const unicodeToBRF = { ' ': ' ', '⠀': ' ', '\n': '\n' };
const brfToUnicode = { ' ': '⠀', '\n': '\n', '\r': '' };
for (const [ascii, dotStr] of BRF_DISPLAY) {
    const cell = dotsToBrailleChar(dotStr);
    unicodeToBRF[cell] = ascii;
    brfToUnicode[ascii] = cell;
    // BRF files may use either case for the letter cells; accept both on import.
    if (ascii !== ascii.toLowerCase()) brfToUnicode[ascii.toLowerCase()] = cell;
}

let currentView = 'unicode';
// Input mode handling
let inputMode = 'single';

// ADA tactile-signage mode. When on, translation follows the rules for braille
// on permanent signs (ADA §703.3.1 / California Building Code 11B-703.3):
//   * Contracted Grade 2 braille is required, so the grade is forced to 2.
//   * Capital indicators are used only for narrow cases (first word of a
//     sentence, proper nouns/names, individual letters, initials, acronyms) and
//     are never carried over from the ALL-CAPS / Title-Case styling typically
//     used on a sign's printed face. Those exceptions can't be detected
//     reliably from arbitrary input, and capitalization is *optional* on
//     signage, so this mode omits capital indicators entirely by lowercasing
//     the source text before translation. That keeps signs compliant by default.
let adaSignMode = false;

// Terms the user has flagged as proper nouns / names / initials / acronyms —
// the narrow cases where ADA §703.3.1 still permits a capital indicator. Each
// entry is stored with the exact casing the user wants on the sign; matching
// against the source text is case-insensitive, and a match is rewritten to the
// stored casing before translation so its capital indicator survives the
// otherwise-lowercased output. Everything not on this list is lowercased.
let adaKeepCaps = [];

function toggleAdaSignMode(checkbox) {
    adaSignMode = checkbox.checked;
    const gradeSelect = document.getElementById('grade');
    const note = document.getElementById('adaSignNote');
    const panel = document.getElementById('adaKeepCapsPanel');

    if (adaSignMode) {
        // §703.3.1 mandates contracted (Grade 2) braille for permanent signs.
        gradeSelect.value = '2';
        gradeSelect.disabled = true;
        gradeSelect.setAttribute('aria-disabled', 'true');
        if (note) note.style.display = 'block';
        if (panel) panel.style.display = 'block';
        renderAdaKeepCaps();
    } else {
        gradeSelect.disabled = false;
        gradeSelect.removeAttribute('aria-disabled');
        if (note) note.style.display = 'none';
        if (panel) panel.style.display = 'none';
    }

    translateText();
}

// Apply ADA capitalization policy: lowercase everything except whole-word
// occurrences of the kept-capitals terms, which are rewritten to their stored
// casing. Handles single-word and multi-word terms; matching is case-insensitive.
function adaApplyCasing(text) {
    if (!adaKeepCaps.length) return text.toLowerCase();

    const canonical = new Map();   // lowercased term -> exact casing to emit
    // Longer terms first so e.g. "Main Office" wins over "Main".
    const terms = adaKeepCaps.slice().sort((a, b) => b.length - a.length);
    const alternatives = terms.map(function (t) {
        canonical.set(t.toLowerCase(), t);
        return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');   // escape regex metachars
    });

    const re = new RegExp('\\b(' + alternatives.join('|') + ')\\b', 'gi');
    let result = '';
    let last = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
        result += text.slice(last, m.index).toLowerCase();
        const exact = canonical.get(m[0].toLowerCase());
        result += exact != null ? exact : m[0];
        last = m.index + m[0].length;
        if (m.index === re.lastIndex) re.lastIndex++;   // guard against zero-width loops
    }
    result += text.slice(last).toLowerCase();
    return result;
}

function addAdaKeepCap() {
    const input = document.getElementById('adaKeepCapsInput');
    if (!input) return;
    // Allow bulk entry separated by commas.
    input.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean)
        .forEach(function (term) {
            const exists = adaKeepCaps.some(function (t) {
                return t.toLowerCase() === term.toLowerCase();
            });
            if (!exists) adaKeepCaps.push(term);
        });
    input.value = '';
    renderAdaKeepCaps();
    translateText();
}

function removeAdaKeepCap(term) {
    adaKeepCaps = adaKeepCaps.filter(function (t) { return t !== term; });
    renderAdaKeepCaps();
    translateText();
}

// Render the kept-capitals terms as removable chips. Built with DOM nodes (not
// innerHTML) so user-entered terms can't inject markup.
function renderAdaKeepCaps() {
    const list = document.getElementById('adaKeepCapsList');
    if (!list) return;
    list.textContent = '';

    if (!adaKeepCaps.length) {
        const empty = document.createElement('span');
        empty.className = 'ada-keepcaps-empty';
        empty.textContent = 'No exceptions yet — every capital indicator is omitted.';
        list.appendChild(empty);
        return;
    }

    adaKeepCaps.forEach(function (term) {
        const chip = document.createElement('span');
        chip.className = 'ada-chip';

        const label = document.createElement('span');
        label.textContent = term;
        chip.appendChild(label);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ada-chip-remove';
        btn.setAttribute('aria-label', 'Remove ' + term);
        btn.textContent = '×';
        btn.onclick = function () { removeAdaKeepCap(term); };
        chip.appendChild(btn);

        list.appendChild(chip);
    });
}

function setInputMode(mode, clickedBtn) {
    inputMode = mode;
    const textarea = document.getElementById('inputText');
    const helpText = document.getElementById('multiLineHelp');

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
        clickedBtn.setAttribute('aria-pressed', 'true');
    }

    if (mode === 'multi') {
        textarea.rows = 4;
        helpText.style.display = 'block';
        textarea.placeholder = "Line 1: Room number\nLine 2: Room name\nLine 3: Additional info...";
    } else {
        textarea.rows = 1;
        helpText.style.display = 'none';
        textarea.placeholder = "Enter text to translate to braille...";
    }
}

function translateText() {
    const input = document.getElementById('inputText').value;
    const output = document.getElementById('brailleOutput');
    let grade = document.getElementById('grade').value;

    // In ADA Sign Mode, force Grade 2 and strip capital indicators by
    // lowercasing the source before translation (see adaSignMode comment above).
    // The textarea is left untouched — only the braille is affected.
    let sourceForBraille = input;
    if (adaSignMode) {
        grade = '2';
        sourceForBraille = adaApplyCasing(input);
    }

    let brailleText = '';
    try {
        brailleText = BrailleEngine.translate(sourceForBraille, grade);
    } catch (err) {
        // Engine still loading or failed to initialise.
        output.textContent = '';
        document.getElementById('outputCount').textContent = '0 characters';
        setEngineStatus(BrailleEngine.error
            ? 'Translation engine failed to load: ' + BrailleEngine.error
            : 'Loading translation engine…');
        return;
    }

    setEngineStatus('');
    output.textContent = brailleText;

    // Update character counts (count braille cells, ignoring line breaks)
    document.getElementById('inputCount').textContent = input.length + ' characters';
    const cellCount = [...brailleText].filter(c => c !== '\n').length;
    document.getElementById('outputCount').textContent = cellCount + ' characters';

    // Update dots display if active
    if (currentView === 'dots') {
        drawDotPattern();
    }
}

// Surface engine load/error state in the output panel without blocking the UI.
function setEngineStatus(message) {
    const el = document.getElementById('engineStatus');
    if (!el) return;
    el.textContent = message || '';
    el.style.display = message ? 'block' : 'none';
}

function clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('brailleOutput').textContent = '';
    document.getElementById('inputCount').textContent = '0 characters';
    document.getElementById('outputCount').textContent = '0 characters';
    
    // Clear canvas if in dots view
    if (currentView === 'dots') {
        const canvas = document.getElementById('dotsCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function toggleView(view, clickedBtn) {
    currentView = view;
    const unicodeBtn = document.querySelector('.view-btn:nth-child(1)');
    const dotsBtn = document.querySelector('.view-btn:nth-child(2)');
    const brailleOutput = document.getElementById('brailleOutput');
    const dotsCanvas = document.getElementById('dotsCanvas');

    const showDots = view !== 'unicode';
    dotsBtn.classList.toggle('active', showDots);
    unicodeBtn.classList.toggle('active', !showDots);
    dotsBtn.setAttribute('aria-pressed', String(showDots));
    unicodeBtn.setAttribute('aria-pressed', String(!showDots));
    brailleOutput.style.display = showDots ? 'none' : 'block';
    dotsCanvas.style.display = showDots ? 'block' : 'none';

    if (showDots) drawDotPattern();
}



// Render the braille output as a polished dot-pattern grid. All geometry is
// derived from a single dot "pitch" so cells stay proportional and centred at
// any size, and the canvas is resized to its container (HiDPI-aware) on every
// draw so it stays crisp instead of being stretched from a stale bitmap.
function drawDotPattern() {
    const canvas = document.getElementById('dotsCanvas');
    const ctx = canvas.getContext('2d');
    const brailleText = document.getElementById('brailleOutput').textContent;

    const cssVar = (name, fallback) =>
        (getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback);
    const accent = cssVar('--accent', '#00d4ff');
    const bg = cssVar('--bg-tertiary', '#252525');

    // Geometry — one pitch drives everything (keeps the 2x3 grid proportional).
    const PITCH = 16;             // centre-to-centre spacing of dots within a cell
    const DOT_R = PITCH * 0.30;   // dot radius
    const CELL_W = PITCH;         // two columns span one pitch
    const CELL_H = PITCH * 2;     // three rows span two pitches
    const GAP_X = PITCH * 1.5;    // gap between cells
    const GAP_Y = PITCH * 1.7;    // gap between lines
    const ADV_X = CELL_W + GAP_X; // horizontal advance per cell
    const ADV_Y = CELL_H + GAP_Y; // vertical advance per line
    const PAD = 24;               // canvas padding

    const dotOffset = {           // dot number -> [col, row] in the cell
        1: [0, 0], 2: [0, 1], 3: [0, 2],
        4: [1, 0], 5: [1, 1], 6: [1, 2],
        7: [0, 3], 8: [1, 3]
    };

    // In fullscreen the canvas is forced to 100vw by CSS (!important), so size
    // the bitmap to the viewport; otherwise track the panel width.
    const inFullscreen = canvas.classList.contains('fullscreen');

    // Measure the available width from the canvas's own laid-out box — CSS gives
    // it width:100% of the panel's content area. Clear any stale inline width
    // first so the read reflects the container, not the previous draw. Sizing
    // from parentElement.offsetWidth (which includes the panel's padding) made
    // the canvas overflow its grid column; with 1fr tracks the column then grew
    // on every keystroke (canvas creeping wider, input shrinking).
    if (!inFullscreen) canvas.style.removeProperty('width');
    const width = inFullscreen
        ? Math.max(320, window.innerWidth - 64)
        : (canvas.clientWidth || canvas.parentElement.clientWidth || 600);

    const dpr = window.devicePixelRatio || 1;

    const sizeCanvas = (w, h) => {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        if (inFullscreen) {
            // Let the !important CSS govern the display size; just match the bitmap.
            canvas.style.removeProperty('width');
            canvas.style.removeProperty('height');
        } else {
            // Width stays governed by CSS (width:100%); only pin the height.
            canvas.style.height = h + 'px';
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset + apply HiDPI scale
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
    };

    if (!brailleText) {
        sizeCanvas(width, inFullscreen ? Math.max(300, window.innerHeight - 64) : 300);
        return;
    }

    // Wrap into visual lines, honouring explicit newlines.
    const colsPerLine = Math.max(1, Math.floor((width - 2 * PAD) / ADV_X));
    const lines = [];
    brailleText.split('\n').forEach(para => {
        if (para === '') { lines.push(''); return; }
        for (let i = 0; i < para.length; i += colsPerLine) {
            lines.push(para.slice(i, i + colsPerLine));
        }
    });

    const contentH = PAD * 2 + lines.length * ADV_Y - GAP_Y;
    const height = inFullscreen ? Math.max(contentH, window.innerHeight - 64) : Math.max(300, contentH);
    sizeCanvas(width, height);

    const isCell = ch => {
        const c = ch.codePointAt(0);
        return c >= 0x2800 && c <= 0x28FF;
    };

    lines.forEach((line, li) => {
        for (let ci = 0; ci < line.length; ci++) {
            const ch = line[ci];
            if (!isCell(ch)) continue; // spaces etc. render as a blank gap

            const ox = PAD + ci * ADV_X;
            const oy = PAD + li * ADV_Y;

            // Subtle cell plate for structure.
            const pad = DOT_R + 3;
            roundRect(ctx, ox - pad, oy - pad, CELL_W + 2 * pad, CELL_H + 2 * pad, 6);
            ctx.fillStyle = 'rgba(27, 35, 48, 0.03)';
            ctx.fill();

            const active = new Set(brailleDots(ch));
            for (let d = 1; d <= 6; d++) {
                const [col, row] = dotOffset[d];
                const x = ox + col * PITCH;
                const y = oy + row * PITCH;

                if (active.has(d)) {
                    // Soft glow.
                    const grad = ctx.createRadialGradient(x, y, 0, x, y, DOT_R * 2.6);
                    grad.addColorStop(0, hexToRgba(accent, 0.16));
                    grad.addColorStop(1, hexToRgba(accent, 0));
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_R * 2.6, 0, Math.PI * 2);
                    ctx.fill();

                    // Solid dot.
                    ctx.fillStyle = accent;
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
                    ctx.fill();

                    // Highlight for a raised, tactile look.
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                    ctx.beginPath();
                    ctx.arc(x - DOT_R * 0.3, y - DOT_R * 0.3, DOT_R * 0.32, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Faint placeholder so empty positions read as part of the cell.
                    ctx.fillStyle = 'rgba(27, 35, 48, 0.18)';
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_R * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    });
}

// Trace a rounded rectangle path (no fill/stroke — caller decides).
function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// Convert "#rgb"/"#rrggbb" to an rgba() string at the given alpha.
function hexToRgba(hex, alpha) {
    hex = (hex || '').replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const n = parseInt(hex, 16);
    if (hex.length !== 6 || isNaN(n)) return 'rgba(29, 90, 146, ' + alpha + ')';
    return 'rgba(' + ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255) + ', ' + alpha + ')';
}

// --- Accessible dialog helpers --------------------------------------------
// Shared by the export-settings dialog and the help modal so both: move focus
// into the dialog on open, trap Tab within it, close on Escape, and restore
// focus to the triggering control on close (WCAG 2.4.3 Focus Order, 4.1.2).
const _dialogState = { opener: null, keyHandler: null };

function _focusableIn(container) {
    return Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]),' +
        ' textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.getClientRects().length > 0); // visible only
}

function openDialog(dialogId, onClose) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;
    _dialogState.opener = document.activeElement;
    dialog.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const focusables = _focusableIn(dialog);
    (focusables[0] || dialog).focus();

    _dialogState.keyHandler = function (e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeDialog(dialogId, onClose);
            return;
        }
        if (e.key !== 'Tab') return;
        const items = _focusableIn(dialog);
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    };
    document.addEventListener('keydown', _dialogState.keyHandler, true);
}

function closeDialog(dialogId, onClose) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;
    dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (_dialogState.keyHandler) {
        document.removeEventListener('keydown', _dialogState.keyHandler, true);
        _dialogState.keyHandler = null;
    }
    if (typeof onClose === 'function') onClose();
    if (_dialogState.opener && typeof _dialogState.opener.focus === 'function') {
        _dialogState.opener.focus();
    }
    _dialogState.opener = null;
}

// Add fullscreen/popup functionality
function toggleFullscreen(elementId) {
    const element = document.getElementById(elementId);
    const isInput = elementId === 'inputText';
    
    if (element.classList.contains('fullscreen')) {
        // Exit fullscreen
        element.classList.remove('fullscreen');
        document.body.style.overflow = 'auto';
        
        // Remove close button
        const closeBtn = element.parentElement.querySelector('.fullscreen-close');
        if (closeBtn) closeBtn.remove();

        // The dots canvas drops its inline sizing while fullscreen (so the
        // !important fullscreen CSS can govern). Redraw once the panel has
        // reflowed so the canvas re-fits its container instead of keeping the
        // oversized fullscreen bitmap (which otherwise renders shrunken).
        if (elementId === 'dotsCanvas') {
            setTimeout(() => drawDotPattern(), 100);
        }
    } else {
        // Enter fullscreen
        element.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => toggleFullscreen(elementId);
        element.parentElement.appendChild(closeBtn);
        
        // Focus the element
        if (isInput) element.focus();
        
        // If it's the dots canvas, redraw it
        if (elementId === 'dotsCanvas') {
            setTimeout(() => drawDotPattern(), 100);
        }
    }
}

// Add expand buttons to panels
document.addEventListener('DOMContentLoaded', function() {
    // Add expand button to input panel
    const inputPanel = document.querySelector('#inputText').parentElement;
    const inputExpandBtn = document.createElement('button');
    inputExpandBtn.className = 'expand-btn';
    inputExpandBtn.innerHTML = '⛶';
    inputExpandBtn.title = 'Expand';
    inputExpandBtn.setAttribute('aria-label', 'Expand input to fullscreen');
    inputExpandBtn.onclick = () => toggleFullscreen('inputText');
    inputPanel.querySelector('.panel-header').appendChild(inputExpandBtn);
    
    // Add expand button to output panel
    const outputPanel = document.querySelector('#brailleOutput').parentElement;
    const outputExpandBtn = document.createElement('button');
    outputExpandBtn.className = 'expand-btn';
    outputExpandBtn.innerHTML = '⛶';
    outputExpandBtn.title = 'Expand';
    outputExpandBtn.setAttribute('aria-label', 'Expand braille output to fullscreen');
    outputExpandBtn.onclick = () => {
        if (currentView === 'unicode') {
            toggleFullscreen('brailleOutput');
        } else {
            toggleFullscreen('dotsCanvas');
        }
    };
    outputPanel.querySelector('.panel-header').appendChild(outputExpandBtn);
});


// Add expand buttons to panels

// Export functions
function exportAsText() {
    const input = document.getElementById('inputText').value;
    const output = document.getElementById('brailleOutput').textContent;
    
    if (!output) {
        alert('Nothing to export! Please translate some text first.');
        return;
    }
    
    const content = `Original Text:\n${input}\n\nBraille Translation:\n${output}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'braille_translation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyBrailleOutput(clickedBtn) {
    const output = document.getElementById('brailleOutput').textContent;

    if (!output || output.trim() === '') {
        alert('Nothing to copy! Please translate some text first.');
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        const button = clickedBtn;
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = 'var(--accent)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// Auto-update character count as user types
document.getElementById('inputText').addEventListener('input', function() {
    document.getElementById('inputCount').textContent = this.value.length + ' characters';
});

// Auto-translate as user types (with debouncing)
let translateTimeout;
document.getElementById('inputText').addEventListener('input', function() {
    clearTimeout(translateTimeout);
    translateTimeout = setTimeout(() => {
        if (this.value.trim()) {
            translateText();
        }
    }, 500);
});

// Make sure DOM is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add change listener to grade selector
    document.getElementById('grade').addEventListener('change', function() {
        const inputText = document.getElementById('inputText').value;
        if (inputText.trim()) {
            translateText();
        }
    });
    
    // Initialize with empty counts
    document.getElementById('inputCount').textContent = '0 characters';
    document.getElementById('outputCount').textContent = '0 characters';

    // Hide purely decorative icons (braille glyphs, search/info symbols) from
    // assistive tech — their buttons/labels already carry the real text.
    document.querySelectorAll('.tab-icon, .search-icon, .info-icon')
        .forEach(el => el.setAttribute('aria-hidden', 'true'));

    // Reflow the dot-pattern canvas on resize so it re-wraps and stays crisp
    // instead of being stretched from a stale bitmap. Debounced to avoid
    // redrawing on every resize event.
    let resizeTimer;
    window.addEventListener('resize', function () {
        if (currentView !== 'dots') return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawDotPattern, 120);
    });
});
// BRF Export — Braille Ready Format (ASCII braille for embossers).
function exportAsBRF() {
    const output = document.getElementById('brailleOutput').textContent;

    if (!output) {
        alert('Nothing to export! Please translate some text first.');
        return;
    }

    // Map each Unicode braille cell to its Braille ASCII character using the
    // shared, standards-based table (see BRF_DISPLAY near the top of this file).
    let brfContent = '';
    for (let char of output) {
        brfContent += unicodeToBRF[char] !== undefined ? unicodeToBRF[char] : char;
    }

    const blob = new Blob([brfContent], { type: 'application/x-brf' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'braille_translation.brf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show ADA settings dialog
function exportAsSVG() {
    const output = document.getElementById('brailleOutput').textContent;
    if (!output) {
        alert('Nothing to export! Please translate some text first.');
        return;
    }
    
    // Show the dialog (with focus management + trap + Escape-to-close).
    openDialog('adaSettingsDialog');
}

// Close ADA dialog
function closeADADialog() {
    closeDialog('adaSettingsDialog');
}

// Reset to ADA defaults
function resetADADefaults() {
    document.getElementById('dotDiameter').value = '1.5';
    document.getElementById('dotSpacing').value = '2.4';
    document.getElementById('cellSpacing').value = '6.2';
    document.getElementById('lineSpacing').value = '10.1';
    document.getElementById('pageMargin').value = '10';
}

// Export with custom settings
function exportWithSettings() {
    const output = document.getElementById('brailleOutput').textContent;
    const input = document.getElementById('inputText').value;
    
    // Get settings from dialog - all in millimeters
    const settings = {
        dotDiameter: parseFloat(document.getElementById('dotDiameter').value),
        dotSpacing: parseFloat(document.getElementById('dotSpacing').value),
        cellSpacing: parseFloat(document.getElementById('cellSpacing').value),
        lineSpacing: parseFloat(document.getElementById('lineSpacing').value),
        pageMargin: parseFloat(document.getElementById('pageMargin').value)
    };
    
    const lines = output.split('\n').filter(line => line.trim()); // Remove empty lines
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    // Calculate SVG dimensions in millimeters
    const svgWidth = maxLineLength * settings.cellSpacing + 2 * settings.pageMargin;
    const svgHeight = lines.length * settings.lineSpacing + 2 * settings.pageMargin;
    
    // Correct dot position mapping
    const dotPositions = {
        1: {col: 0, row: 0},
        2: {col: 0, row: 1},
        3: {col: 0, row: 2},
        4: {col: 1, row: 0},
        5: {col: 1, row: 1},
        6: {col: 1, row: 2}
    };
    
    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     width="${svgWidth.toFixed(2)}mm" 
     height="${svgHeight.toFixed(2)}mm" 
     viewBox="0 0 ${svgWidth.toFixed(2)} ${svgHeight.toFixed(2)}">
  <!-- ADA Compliant Braille - TRUE SCALE OUTPUT
       Original Text: ${input}
       ===== CRITICAL: ADA COMPLIANCE INFORMATION =====
       This SVG uses MILLIMETER units for true-scale output.
       When importing/printing, ensure your software preserves these units.
       
       Current Settings (ADA §703.3.1 compliant):
       - Dot Diameter: ${settings.dotDiameter}mm (ADA: 1.5-1.6mm)
       - Dot Spacing: ${settings.dotSpacing}mm (ADA: 2.3-2.5mm)  
       - Cell Spacing: ${settings.cellSpacing}mm (ADA: 6.1-7.6mm)
       - Line Spacing: ${settings.lineSpacing}mm (ADA: 10.0-10.2mm)
       - Page Margin: ${settings.pageMargin}mm
       
       IMPORTANT FOR PRODUCTION:
       1. Do NOT scale or resize this SVG
       2. Ensure dots are raised 0.6-0.9mm (0.025-0.037")
       3. Dots must be domed/rounded, not flat
       4. Print at 100% scale / actual size
       ================================================
  -->
  <defs>
    <style>
      .braille-dot { fill: black; }
      .background { fill: white; }
    </style>
  </defs>
  
  <rect class="background" width="${svgWidth.toFixed(2)}" height="${svgHeight.toFixed(2)}"/>
  <g id="braille-dots">`;
    
    lines.forEach((line, lineIndex) => {
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            const dots = brailleDots(char);
            
            // Skip spaces - they don't have dots
            if (char === ' ') continue;
            
            dots.forEach(dotNum => {
                const pos = dotPositions[dotNum];
                if (!pos) return;
                
                // Calculate position in millimeters
                const cellX = settings.pageMargin + charIndex * settings.cellSpacing;
                const cellY = settings.pageMargin + lineIndex * settings.lineSpacing;
                
                const cx = cellX + pos.col * settings.dotSpacing;
                const cy = cellY + pos.row * settings.dotSpacing;
                const r = settings.dotDiameter / 2;
                
                svg += `\n    <circle class="braille-dot" cx="${cx.toFixed(3)}" cy="${cy.toFixed(3)}" r="${r.toFixed(3)}"/>`;
            });
        }
    });
    
    svg += `\n  </g>\n  
  <!-- Production Notes:
       Total dots: ${svg.match(/circle/g)?.length || 0}
       Grid: ${maxLineLength} cells × ${lines.length} lines
       Physical size: ${svgWidth.toFixed(1)}mm × ${svgHeight.toFixed(1)}mm
       Grade 2 UEB Braille (contracted)
  -->
</svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    
    // Create filename with dimensions for clarity
    const filename = `braille_ada_${svgWidth.toFixed(0)}x${svgHeight.toFixed(0)}mm.svg`;
    a.download = filename;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Close dialog
    closeADADialog();
}


// Fixed File Import Handler
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    const fileName = file.name.toLowerCase();
    
    reader.onerror = function(e) {
        alert('Error reading file. Please try again.');
        console.error('File read error:', e);
    };
    
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            
            if (fileName.endsWith('.brf')) {
                // Convert BRF (Braille ASCII) to Unicode braille for display,
                // using the shared standards-based map.
                let unicodeText = '';
                for (let char of content) {
                    unicodeText += brfToUnicode[char] !== undefined ? brfToUnicode[char] : char;
                }

                // Recover editable source text via liblouis back-translation
                // (far more accurate than a character-by-character guess). Use
                // the currently selected grade; BRF for signage is usually Grade 2.
                const grade = document.getElementById('grade').value;
                let plainText = unicodeText;
                try {
                    plainText = BrailleEngine.backTranslate(unicodeText, grade);
                } catch (err) {
                    console.warn('Back-translation unavailable, showing braille only:', err);
                }

                document.getElementById('inputText').value = plainText;
                document.getElementById('inputCount').textContent = plainText.length + ' characters';

                document.getElementById('brailleOutput').textContent = unicodeText;
                const cellCount = [...unicodeText].filter(c => c !== '\n').length;
                document.getElementById('outputCount').textContent = cellCount + ' characters';

                if (currentView === 'dots') {
                    drawDotPattern();
                }
            } else {
                // Regular text file
                document.getElementById('inputText').value = content;
                document.getElementById('inputCount').textContent = content.length + ' characters';
                translateText();
            }
        } catch (error) {
            alert('Error processing file: ' + error.message);
            console.error('File processing error:', error);
        }
    };
    
    reader.readAsText(file);
}

// Drag and Drop
const dragDropArea = document.getElementById('dragDropArea');

dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropArea.classList.add('drag-over');
});

dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.classList.remove('drag-over');
});

dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.txt') || file.name.endsWith('.brf'))) {
        handleFileImport({ target: { files: [file] } });
    } else {
        alert('Please drop a .txt or .brf file');
    }
});