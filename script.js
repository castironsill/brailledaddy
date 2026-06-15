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
    const grade = document.getElementById('grade').value;

    let brailleText = '';
    try {
        brailleText = BrailleEngine.translate(input, grade);
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



function drawDotPattern() {
    const canvas = document.getElementById('dotsCanvas');
    const ctx = canvas.getContext('2d');
    const brailleText = document.getElementById('brailleOutput').textContent;
    
    if (!brailleText) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    // Settings
    const cellWidth = 40;
    const cellHeight = 50;
    const dotRadius = 3;
    const padding = 20;
    const lineSpacing = 25;
    
    // Correct dot position mapping for standard braille numbering
    const dotPositions = {
        1: {col: 0, row: 0},  // Top left
        2: {col: 0, row: 1},  // Middle left
        3: {col: 0, row: 2},  // Bottom left
        4: {col: 1, row: 0},  // Top right
        5: {col: 1, row: 1},  // Middle right
        6: {col: 1, row: 2},  // Bottom right
        7: {col: 0, row: 3},  // Extension dot left (8-dot braille)
        8: {col: 1, row: 3}   // Extension dot right (8-dot braille)
    };
    
    // Calculate dimensions
    const charsPerLine = Math.floor((canvas.parentElement.offsetWidth - 2 * padding) / cellWidth);
    const lines = [];
    let currentLine = '';
    
    // Split text into lines
    for (let i = 0; i < brailleText.length; i++) {
        if (brailleText[i] === '\n' || currentLine.length >= charsPerLine) {
            lines.push(currentLine);
            currentLine = brailleText[i] === '\n' ? '' : brailleText[i];
        } else {
            currentLine += brailleText[i];
        }
    }
    if (currentLine) lines.push(currentLine);
    
    // Set canvas size
    const targetWidth = canvas.parentElement.offsetWidth;
    const targetHeight = lines.length * (cellHeight + lineSpacing) + 2 * padding;

    // Get device pixel ratio for high DPI displays
    const dpr = window.devicePixelRatio || 1;

    // Set both the canvas internal size AND the CSS size
    canvas.width = targetWidth * dpr;
    canvas.height = targetHeight * dpr;
    canvas.style.width = targetWidth + 'px';
    canvas.style.height = targetHeight + 'px';

    // Scale the drawing context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary');
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    
    // Draw each line
    lines.forEach((line, lineIndex) => {
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const dots = brailleDots(char);
            const x = padding + i * cellWidth;
            const y = padding + lineIndex * (cellHeight + lineSpacing);
            
            // Draw cell background (subtle)
            ctx.strokeStyle = '#333';
            ctx.strokeRect(x, y, cellWidth - 5, cellHeight);
            
            // Draw all 6 dot positions (faint)
            for (let dotNum = 1; dotNum <= 6; dotNum++) {
                const pos = dotPositions[dotNum];
                const dotX = x + 12 + pos.col * 16;
                const dotY = y + 10 + pos.row * 14;
                
                ctx.fillStyle = '#333';
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw active dots
            dots.forEach(dotNum => {
                const pos = dotPositions[dotNum];
                if (!pos) return;
                
                const dotX = x + 12 + pos.col * 16;
                const dotY = y + 10 + pos.row * 14;
                
                // Glow effect
                const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotRadius * 1.5);
                gradient.addColorStop(0, '#00d4ff');
                gradient.addColorStop(0.5, '#00a8cc');
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(dotX, dotY, dotRadius * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Main dot
                ctx.fillStyle = '#00d4ff';
                ctx.beginPath();
                ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    });
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
    
    // Show the dialog
    document.getElementById('adaSettingsDialog').style.display = 'flex';
}

// Close ADA dialog
function closeADADialog() {
    document.getElementById('adaSettingsDialog').style.display = 'none';
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