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
    const cellHeight = 60;
    const dotRadius = 4;
    const padding = 20;
    const lineSpacing = 20;
    
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
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = lines.length * (cellHeight + lineSpacing) + 2 * padding;
    
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
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
            for (let dotPos = 1; dotPos <= 6; dotPos++) {
                const col = (dotPos - 1) % 2;
                const row = Math.floor((dotPos - 1) / 2);
                const dotX = x + 10 + col * 15;
                const dotY = y + 10 + row * 15;
                
                ctx.fillStyle = '#333';
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw active dots
            dots.forEach(dotPos => {
                const col = (dotPos - 1) % 2;
                const row = Math.floor((dotPos - 1) / 2);
                const dotX = x + 10 + col * 15;
                const dotY = y + 10 + row * 15;
                
                // Glow effect
                const gradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotRadius * 2);
                gradient.addColorStop(0, '#00d4ff');
                gradient.addColorStop(0.5, '#00a8cc');
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(dotX, dotY, dotRadius * 2, 0, Math.PI * 2);
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

// SVG Export for ADA signage
function exportAsSVG() {
    const output = document.getElementById('brailleOutput').textContent;
    const input = document.getElementById('inputText').value;
    
    if (!output) {
        alert('Nothing to export! Please translate some text first.');
        return;
    }
    
    // ADA compliant dimensions (in mm, converted to pixels at 96 DPI)
    const dotDiameter = 1.5; // mm
    const dotHeight = 0.8; // mm (for visual representation)
    const dotSpacing = 2.5; // mm between dot centers
    const cellWidth = 6.2; // mm
    const cellHeight = 10; // mm
    const mmToPx = 3.78; // conversion factor
    
    const lines = output.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    const svgWidth = Math.ceil((maxLineLength * cellWidth + 20) * mmToPx);
    const svgHeight = Math.ceil((lines.length * cellHeight + 20) * mmToPx);
    
    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <!-- ADA Compliant Braille for: ${input} -->
  <rect width="${svgWidth}" height="${svgHeight}" fill="white"/>
  <g id="braille-dots" fill="black">`;
    
    lines.forEach((line, lineIndex) => {
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            const dots = brailleDotMap[char] || [];
            
            dots.forEach(dotPos => {
                const col = (dotPos - 1) % 2;
                const row = Math.floor((dotPos - 1) / 2);
                
                const cx = (10 + charIndex * cellWidth + col * dotSpacing) * mmToPx;
                const cy = (10 + lineIndex * cellHeight + row * dotSpacing) * mmToPx;
                const r = (dotDiameter / 2) * mmToPx;
                
                svg += `\n    <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r.toFixed(2)}"/>`;
            });
        }
    });
    
    svg += `\n  </g>\n</svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'braille_ada_signage.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// File Import Handler
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
            
            let unicodeText = '';
            for (let char of content) {
                unicodeText += brfToUnicode[char] || char;
            }
            
            document.getElementById('brailleOutput').textContent = unicodeText;
            document.getElementById('outputCount').textContent = unicodeText.length + ' characters';
            
            // Clear input area and show import message
            document.getElementById('inputText').value = 'Imported from BRF file';
            document.getElementById('inputCount').textContent = 'Imported from BRF file'.length + ' characters';
        } else {
            // Regular text file
            document.getElementById('inputText').value = content;
            updateCharCount();
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