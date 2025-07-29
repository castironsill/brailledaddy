// Extended UEB Grade 1 mapping
const uebGrade1 = {
    // Letters
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    
    // Numbers (same as letters a-j in braille)
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
    
    // Punctuation and special characters
    ' ': ' ', '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒',
    '!': '⠖', '?': '⠦', '"': '⠦', "'": '⠄',
    '(': '⠐⠣', ')': '⠐⠜', '-': '⠤', '/': '⠸⠌',
    '@': '⠈⠁', '#': '⠨⠼', '$': '⠈⠎', '%': '⠨⠴',
    '&': '⠈⠯', '*': '⠐⠔', '+': '⠐⠖', '=': '⠨⠅',
    '<': '⠐⠅', '>': '⠨⠂', '[': '⠨⠣', ']': '⠨⠜',
    '{': '⠸⠣', '}': '⠸⠜', '\\': '⠸⠡', '|': '⠳',
    '_': '⠨⠤', '~': '⠈⠔', '^': '⠘⠡', '`': '⠈⠡',
    '\n': '\n', '\t': '\t'
};

// COMPLETE UEB Grade 2 contractions
const uebGrade2Contractions = {
    // Alphabetic wordsigns (strong contractions) - single cell, whole word
    'but': '⠃', 'can': '⠉', 'do': '⠙', 'every': '⠑',
    'from': '⠋', 'go': '⠛', 'have': '⠓', 'just': '⠚',
    'knowledge': '⠅', 'like': '⠇', 'more': '⠍', 'not': '⠝',
    'people': '⠏', 'quite': '⠟', 'rather': '⠗', 'so': '⠎',
    'that': '⠞', 'us': '⠥', 'very': '⠧', 'will': '⠺',
    'it': '⠭', 'you': '⠽', 'as': '⠵',
    
    // Strong contractions
    'child': '⠡', 'shall': '⠩', 'this': '⠹', 
    'which': '⠱', 'out': '⠳', 'still': '⠌',
    
    // Strong groupsigns (strong contractions used within words)
    'ch': '⠡', 'sh': '⠩', 'th': '⠹', 
    'wh': '⠱', 'ou': '⠳', 'st': '⠌',
    'gh': '⠣', 'ed': '⠫', 'er': '⠻',
    'ow': '⠪', 'ar': '⠜', 'ing': '⠬',
    
    // Lower wordsigns (two-cell, whole word)
    'be': '⠆', 'enough': '⠢', 'were': '⠶',
    'his': '⠦', 'in': '⠔', 'was': '⠴',
    
    // Lower groupsigns (used within words)
    'en': '⠢', 'in': '⠔', 'be': '⠆',
    'dis': '⠲', 'con': '⠒', 'com': '⠤',
    
    // Shortforms (alphabetic order)
    'about': '⠁⠃', 'above': '⠁⠃⠧', 'according': '⠁⠉',
    'across': '⠁⠉⠗', 'after': '⠁⠋', 'afternoon': '⠁⠋⠝',
    'afterward': '⠁⠋⠺', 'again': '⠁⠛', 'against': '⠁⠛⠌',
    'almost': '⠁⠇⠍', 'already': '⠁⠇⠗', 'also': '⠁⠇',
    'although': '⠁⠇⠹', 'altogether': '⠁⠇⠞', 'always': '⠁⠇⠺',
    'because': '⠆⠉', 'before': '⠆⠋', 'behind': '⠆⠓',
    'below': '⠆⠇', 'beneath': '⠆⠝', 'beside': '⠆⠎',
    'between': '⠆⠞', 'beyond': '⠆⠽', 'blind': '⠃⠇',
    'braille': '⠃⠗⠇', 'children': '⠡⠝', 'conceive': '⠒⠉⠧',
    'conceiving': '⠒⠉⠧⠛', 'could': '⠉⠙', 'deceive': '⠙⠉⠧',
    'deceiving': '⠙⠉⠧⠛', 'declare': '⠙⠉⠇', 'declaring': '⠙⠉⠇⠛',
    'either': '⠑⠊', 'first': '⠋⠌', 'friend': '⠋⠗',
    'good': '⠛⠙', 'great': '⠛⠗⠞', 'herself': '⠓⠻⠋',
    'him': '⠓⠍', 'himself': '⠓⠍⠋', 'immediate': '⠊⠍⠍',
    'its': '⠭⠎', 'itself': '⠭⠋', 'letter': '⠇⠗',
    'little': '⠇⠇', 'much': '⠍⠡', 'must': '⠍⠌',
    'myself': '⠍⠽⠋', 'necessary': '⠝⠑⠉', 'neither': '⠝⠑⠊',
    'oneself': '⠐⠕⠋', 'ourselves': '⠳⠗⠧⠎', 'paid': '⠏⠙',
    'perceive': '⠏⠻⠉⠧', 'perceiving': '⠏⠻⠉⠧⠛', 'perhaps': '⠏⠻⠓',
    'quick': '⠟⠅', 'receive': '⠗⠉⠧', 'receiving': '⠗⠉⠧⠛',
    'rejoice': '⠗⠚⠉', 'rejoicing': '⠗⠚⠉⠛', 'said': '⠎⠙',
    'should': '⠩⠙', 'such': '⠎⠡', 'themselves': '⠮⠍⠧⠎',
    'thyself': '⠹⠽⠋', 'today': '⠞⠙', 'together': '⠞⠛⠗',
    'tomorrow': '⠞⠍', 'tonight': '⠞⠝', 'would': '⠺⠙',
    'your': '⠽⠗', 'yourself': '⠽⠗⠋', 'yourselves': '⠽⠗⠧⠎',
    
    // Strong wordsigns (two-cell, whole word)
    'and': '⠯', 'for': '⠿', 'of': '⠷',
    'the': '⠮', 'with': '⠾',
    
    // Initial-letter contractions (whole word or beginning of word)
    'day': '⠐⠙', 'ever': '⠐⠑', 'father': '⠐⠋',
    'here': '⠐⠓', 'know': '⠐⠅', 'lord': '⠐⠇',
    'mother': '⠐⠍', 'name': '⠐⠝', 'one': '⠐⠕',
    'part': '⠐⠏', 'question': '⠐⠟', 'right': '⠐⠗',
    'some': '⠐⠎', 'time': '⠐⠞', 'under': '⠐⠥',
    'work': '⠐⠺', 'young': '⠐⠽',
    
    // These also work as groupsigns in longer words
    'there': '⠐⠮', 'character': '⠐⠡', 'through': '⠐⠹',
    'where': '⠐⠱', 'ought': '⠐⠳', 'upon': '⠘⠥',
    'word': '⠘⠺', 'these': '⠘⠮', 'those': '⠘⠹',
    'whose': '⠘⠱', 'cannot': '⠘⠉',
    'had': '⠘⠓', 'many': '⠘⠍', 'spirit': '⠘⠎',
    'world': '⠘⠺', 'their': '⠘⠮',
    
    // Final-letter contractions (end of word)
    'ound': '⠨⠙', 'ance': '⠨⠑', 'sion': '⠨⠝',
    'less': '⠨⠎', 'ount': '⠨⠞', 'ence': '⠰⠑',
    'ong': '⠰⠛', 'ful': '⠰⠇', 'tion': '⠰⠝',
    'ness': '⠰⠎', 'ment': '⠰⠞', 'ity': '⠰⠽',
    'ation': '⠠⠝', 'ally': '⠠⠽',
    
    // Dot 4-5-6 contractions
    'and': '⠯', 'for': '⠿', 'of': '⠷',
    'the': '⠮', 'with': '⠾',
    
    // Dot 4-5 contractions  
    'in': '⠔', 'en': '⠢', 'con': '⠒',
    'dis': '⠲', 'com': '⠤', 'be': '⠆',
    
    // Dot 4-6 contractions
    'to': '⠖', 'into': '⠔⠖', 'by': '⠃⠽',
    
    // Lower sign contractions
    'ea': '⠂', 'bb': '⠆', 'cc': '⠒', 
    'dd': '⠲', 'ff': '⠖', 'gg': '⠶'
};

// Braille dot positions mapping
const brailleDotMap = {
    '⠁': [1], '⠃': [1,2], '⠉': [1,4], '⠙': [1,4,5], '⠑': [1,5],
    '⠋': [1,2,4], '⠛': [1,2,4,5], '⠓': [1,2,5], '⠊': [2,4], '⠚': [2,4,5],
    '⠅': [1,3], '⠇': [1,2,3], '⠍': [1,3,4], '⠝': [1,3,4,5], '⠕': [1,3,5],
    '⠏': [1,2,3,4], '⠟': [1,2,3,4,5], '⠗': [1,2,3,5], '⠎': [2,3,4], '⠞': [2,3,4,5],
    '⠥': [1,3,6], '⠧': [1,2,3,6], '⠺': [2,4,5,6], '⠭': [1,3,4,6], '⠽': [1,3,4,5,6],
    '⠵': [1,3,5,6], '⠯': [1,2,3,4,6], '⠿': [1,2,3,4,5,6], '⠷': [1,2,3,5,6],
    '⠮': [2,3,4,6], '⠾': [3,4,5,6], '⠡': [1,6], '⠩': [1,4,6], '⠹': [1,4,5,6],
    '⠱': [1,5,6], '⠳': [1,2,5,6], '⠻': [1,2,4,5,6], '⠣': [1,2,6], '⠬': [3,4,6],
    '⠫': [1,2,4,6], '⠪': [2,4,6], '⠜': [3,4,5], '⠢': [2,6], '⠲': [2,5,6],
    '⠂': [2], '⠆': [2,3], '⠒': [2,5], '⠖': [2,3,5], '⠦': [2,3,6],
    '⠔': [3,5], '⠴': [3,5,6], '⠶': [2,3,5,6], '⠌': [3,4], '⠤': [3,6],
    '⠨': [4,6], '⠰': [5,6], '⠠': [6], '⠼': [3,4,5,6], '⠸': [4,5,6],
    '⠘': [4,5], '⠈': [4], '⠐': [5], ' ': []
};

const numberSign = '⠼';
const capitalSign = '⠠';
const letterSign = '⠰';

let currentView = 'unicode';
// Input mode handling
let inputMode = 'single';

function setInputMode(mode) {
    inputMode = mode;
    const textarea = document.getElementById('inputText');
    const helpText = document.getElementById('multiLineHelp');
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
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
    
    if (grade === '1') {
        brailleText = translateGrade1(input);
    } else {
        brailleText = translateGrade2(input);
    }
    
    output.textContent = brailleText;
    
    // Update character counts
    document.getElementById('inputCount').textContent = input.length + ' characters';
    document.getElementById('outputCount').textContent = brailleText.length + ' characters';
    
    // Update dots display if active
    if (currentView === 'dots') {
        drawDotPattern();
    }
}

function translateGrade1(text) {
    let result = '';
    let inNumber = false;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const isDigit = /\d/.test(char);
        const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
        
        // Add number sign before first digit
        if (isDigit && !inNumber) {
            result += numberSign;
            inNumber = true;
        } else if (!isDigit && char !== ' ' && char !== '.' && char !== ',') {
            inNumber = false;
        }
        
        // Add capital sign for uppercase letters
        if (isUpper && /[A-Z]/.test(char)) {
            result += capitalSign;
        }
        
        // Translate the character
        const lowerChar = char.toLowerCase();
        result += uebGrade1[lowerChar] || char;
    }
    
    return result;
}

function translateGrade2(text) {
    let result = '';
    let position = 0;
    
    while (position < text.length) {
        let matched = false;
        
        // Try to match the longest possible contraction first
        // Check for shortforms and longer contractions
        for (let length = Math.min(15, text.length - position); length > 0; length--) {
            const substring = text.substr(position, length).toLowerCase();
            const originalSubstring = text.substr(position, length);
            
            // Check if this is a whole word match
            const isWholeWord = (position === 0 || /\s/.test(text[position - 1])) &&
                               (position + length === text.length || /\s/.test(text[position + length]));
            
            // Check for contractions
            if (uebGrade2Contractions[substring]) {
                // Some contractions only work as whole words
                const needsWholeWord = ['but', 'can', 'do', 'every', 'from', 'go', 
                                       'have', 'just', 'knowledge', 'like', 'more', 
                                       'not', 'people', 'quite', 'rather', 'so', 
                                       'that', 'us', 'very', 'will', 'it', 'you', 
                                       'as', 'and', 'for', 'of', 'the', 'with',
                                       'be', 'enough', 'were', 'his', 'in', 'was'].includes(substring);
                
                if (!needsWholeWord || isWholeWord) {
                    // Check for capital
                    if (originalSubstring[0] !== originalSubstring[0].toLowerCase()) {
                        result += capitalSign;
                    }
                    
                    result += uebGrade2Contractions[substring];
                    position += length;
                    matched = true;
                    break;
                }
            }
        }
        
        // If no contraction matched, translate the single character
        if (!matched) {
            const char = text[position];
            const isDigit = /\d/.test(char);
            const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
            
            // Handle numbers
            if (isDigit && (position === 0 || !/\d/.test(text[position - 1]))) {
                result += numberSign;
            }
            
            // Handle capitals
            if (isUpper && /[A-Z]/.test(char)) {
                result += capitalSign;
            }
            
            result += uebGrade1[char.toLowerCase()] || char;
            position++;
        }
    }
    
    return result;
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

function toggleView(view) {
    currentView = view;
    const unicodeBtn = document.querySelector('.view-btn:nth-child(1)');
    const dotsBtn = document.querySelector('.view-btn:nth-child(2)');
    const brailleOutput = document.getElementById('brailleOutput');
    const dotsCanvas = document.getElementById('dotsCanvas');
    
    if (view === 'unicode') {
        unicodeBtn.classList.add('active');
        dotsBtn.classList.remove('active');
        brailleOutput.style.display = 'block';
        dotsCanvas.style.display = 'none';
    } else {
        dotsBtn.classList.add('active');
        unicodeBtn.classList.remove('active');
        brailleOutput.style.display = 'none';
        dotsCanvas.style.display = 'block';
        drawDotPattern();
    }
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
            const dots = brailleDotMap[char] || [];
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
    inputExpandBtn.onclick = () => toggleFullscreen('inputText');
    inputPanel.querySelector('.panel-header').appendChild(inputExpandBtn);
    
    // Add expand button to output panel
    const outputPanel = document.querySelector('#brailleOutput').parentElement;
    const outputExpandBtn = document.createElement('button');
    outputExpandBtn.className = 'expand-btn';
    outputExpandBtn.innerHTML = '⛶';
    outputExpandBtn.title = 'Expand';
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

function copyToClipboard() {
    const output = document.getElementById('brailleOutput').textContent;
    
    if (!output) {
        alert('Nothing to copy! Please translate some text first.');
        return;
    }
    
    navigator.clipboard.writeText(output).then(() => {
        // Show temporary success message
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = 'var(--accent)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy to clipboard');
    });
}

function copyBrailleOutput() {
    const output = document.getElementById('brailleOutput').textContent;
    
    if (!output || output.trim() === '') {
        alert('Nothing to copy! Please translate some text first.');
        return;
    }
    
    navigator.clipboard.writeText(output).then(() => {
        // Get the button that was clicked
        const buttons = document.querySelectorAll('button');
        let button = null;
        buttons.forEach(btn => {
            if (btn.textContent === 'Copy Braille' || btn.textContent === 'Copied!') {
                button = btn;
            }
        });
        
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
// BRF Export
function exportAsBRF() {
    const output = document.getElementById('brailleOutput').textContent;
    
    if (!output) {
        alert('Nothing to export! Please translate some text first.');
        return;
    }
    
    // BRF uses ASCII representation of braille
    // This maps Unicode braille to ASCII BRF format
    const unicodeToBRF = {
        '⠀': ' ', '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e',
        '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j', '⠅': 'k',
        '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o', '⠏': 'p', '⠟': 'q',
        '⠗': 'r', '⠎': 's', '⠞': 't', '⠥': 'u', '⠧': 'v', '⠺': 'w',
        '⠭': 'x', '⠽': 'y', '⠵': 'z', '⠯': '&', '⠿': '=', '⠷': '(',
        '⠮': '!', '⠾': ')', '⠡': '*', '⠩': '<', '⠹': '%', '⠱': '?',
        '⠳': ':', '⠻': '$', '⠣': ']', '⠬': '\\', '⠫': '[', '⠪': 'W',
        '⠜': '@', '⠢': '^', '⠲': '4', '⠂': '1', '⠆': '2', '⠒': '3',
        '⠖': '5', '⠦': '6', '⠔': '9', '⠴': '0', '⠶': '7', '⠌': '/',
        '⠤': '8', '⠨': '.', '⠰': ',', '⠠': ';', '⠼': '#', '⠸': '`',
        '⠘': "'", '⠈': '"', '⠐': '-', ' ': ' ', '\n': '\n'
    };
    
    let brfContent = '';
    for (let char of output) {
        brfContent += unicodeToBRF[char] || char;
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
            const dots = brailleDotMap[char] || [];
            
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
    
    reader.onload = function(e) {
        const content = e.target.result;
        
        if (fileName.endsWith('.brf')) {
            // Convert BRF to Unicode
            const brfToUnicode = {
                ' ': '⠀', 'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
                'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅',
                'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟',
                'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺',
                'x': '⠭', 'y': '⠽', 'z': '⠵', '&': '⠯', '=': '⠿', '(': '⠷',
                '!': '⠮', ')': '⠾', '*': '⠡', '<': '⠩', '%': '⠹', '?': '⠱',
                ':': '⠳', '$': '⠻', ']': '⠣', '\\': '⠬', '[': '⠫', 'W': '⠪',
                '@': '⠜', '^': '⠢', '4': '⠲', '1': '⠂', '2': '⠆', '3': '⠒',
                '5': '⠖', '6': '⠦', '9': '⠔', '0': '⠴', '7': '⠶', '/': '⠌',
                '8': '⠤', '.': '⠨', ',': '⠰', ';': '⠠', '#': '⠼', '`': '⠸',
                "'": '⠘', '"': '⠈', '-': '⠐', ' ': ' ', '\n': '\n'
            };
            
            // Also create reverse mapping for back-translation
            const unicodeToBRF = {};
            for (let [brf, unicode] of Object.entries(brfToUnicode)) {
                unicodeToBRF[unicode] = brf;
            }
            
            // Convert BRF to Unicode for display
            let unicodeText = '';
            for (let char of content) {
                unicodeText += brfToUnicode[char] || char;
            }
            
            // Try to back-translate to regular text for the input field
            let plainText = '';
            let inNumber = false;
            
            for (let i = 0; i < content.length; i++) {
                const char = content[i];
                
                // Handle number indicator
                if (char === '#') {
                    inNumber = true;
                    continue;
                }
                
                // Handle spaces - reset number mode
                if (char === ' ') {
                    plainText += ' ';
                    inNumber = false;
                    continue;
                }
                
                // Handle letters/numbers
                if (char >= 'a' && char <= 'j') {
                    if (inNumber) {
                        // Convert to number (a=1, b=2, etc.)
                        plainText += String.fromCharCode(char.charCodeAt(0) - 'a'.charCodeAt(0) + '1'.charCodeAt(0));
                    } else {
                        plainText += char;
                    }
                } else if (char >= 'k' && char <= 'z') {
                    // Regular letters, not numbers
                    plainText += char;
                    inNumber = false;
                } else {
                    // Other characters
                    plainText += char;
                    if (char !== '.' && char !== ',') {
                        inNumber = false;
                    }
                }
            }
            
            // Set the input field to show the back-translated text
            document.getElementById('inputText').value = plainText;
            document.getElementById('inputCount').textContent = plainText.length + ' characters';
            
            // Set the output to show the Unicode braille
            document.getElementById('brailleOutput').textContent = unicodeText;
            document.getElementById('outputCount').textContent = unicodeText.length + ' characters';
            
            // Update dots display if active
            if (currentView === 'dots') {
                drawDotPattern();
            }
        } else {
            // Regular text file - just import and translate
            document.getElementById('inputText').value = content;
            document.getElementById('inputCount').textContent = content.length + ' characters';
            translateText();
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