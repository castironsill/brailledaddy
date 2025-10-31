# BrailleDaddy

**Notice:**  
BrailleDaddy is currently offline while we implement corrections and upgrades to ADA-compliant braille spacing, capitalization rules, and SVG export formatting.  
The application will return once all revisions have been validated against ADA §703.3.1 standards.  
Repository source remains available for local use and contribution.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)
![UEB](https://img.shields.io/badge/UEB-Grade%201%20%26%202-brightgreen.svg)
![ADA Compliant](https://img.shields.io/badge/ADA-Compliant-blue.svg)

---

## Overview

BrailleDaddy is a professional web-based Unified English Braille (UEB) translation tool with precise, ADA-compliant export capabilities for creating accessible signage. It supports both Grade 1 (uncontracted) and Grade 2 (contracted) braille and provides true-scale millimeter output suitable for direct engraving or embossing.

---

## Key Features

### Translation Engine
- Grade 1 (Uncontracted) and Grade 2 (Contracted) UEB translation  
- Real-time translation with intelligent character handling  
- Multi-line sign mode with ADA-compliant spacing  
- Comprehensive contraction and shortform database  
- Correct handling of numbers, punctuation, and capitalization indicators  

### Visualization
- **Unicode View** – displays standard braille Unicode characters (U+2800–U+28FF)  
- **Dot Pattern View** – renders a visual 6-dot layout using accurate millimeter spacing  
- High-DPI and fullscreen support for detailed verification  

### Import and Export
**Import formats:**  
- Plain text (.txt)  
- Braille Ready Format (.brf) with optional back-translation  
- Drag-and-drop import  

**Export formats:**  
- **SVG:** true millimeter scaling, no DPI conversion  
- **BRF:** compatible with embossers  
- **Text:** translated or plain text output  
- **Clipboard:** quick copy support  

### ADA Compliance
- Fully compliant with ADA §703.3.1 for tactile braille signs  
- Default export settings use:
  - Dot diameter: 1.5–1.6 mm  
  - Dot spacing: 2.3–2.5 mm within a cell  
  - Cell spacing: 6.1–7.6 mm horizontally  
  - Line spacing: 10.0–10.2 mm vertically  
- Includes built-in reference for ADA physical requirements  
- Enforces use of Grade 2 braille for permanent signs  

---

## Current Status

The live demo (GitHub Pages deployment) is temporarily disabled while the following improvements are completed:

- Verification of spacing tolerances against ADA §703.3.1  
- Revised capitalization logic for tactile signage  
- Updated export dialog with real-time validation  
- Improved SVG metadata for true-scale assurance  
- UI cleanup and accessibility refinements  

A new release (v1.2.0) will be published once these corrections are complete.

---

## Local Use

You can still run BrailleDaddy locally:

```bash
git clone https://github.com/castironsill/brailledaddy.git
cd brailledaddy
Open index.html in a modern browser to use the tool offline.
Once the project is republished, it will return to:
https://castironsill.github.io/brailledaddy
Technical Details

Written in vanilla JavaScript (no dependencies)

Canvas-based rendering with requestAnimationFrame

Responsive design using CSS Grid and custom properties

Compatible across major browsers

Keyboard and screen reader accessible

Embosser Compatibility

Confirmed to function correctly with:

ViewPlus embossers

Index Braille (Basic-D, Everest, Fanfold)

Enabling Technologies (Romeo, Juliet)

Any system accepting SVG or BRF input

ADA Sign Requirements

BrailleDaddy aligns with current ADA Standards for Accessible Design:

Grade 2 braille required for permanent signage

Dots raised 0.6–0.9 mm, domed or rounded

Minimum 3/8" separation between tactile text and braille

Mounting height: 48"–60" to the baseline of the lowest tactile character

Minimum 3" clearance from door frame

Non-glare finish required

Contributing

Contributions are welcome. Focus areas include:

Additional braille systems (Nemeth, Music, etc.)

Multi-language support

Batch export capabilities

Additional export and verification tools

Before contributing, review the Contributing Guidelines
.

License

This project is licensed under the MIT License. See the LICENSE
 file for details.

Known Issues

Safari may require a second click for file input

Some Grade 2 contractions still pending verification

Batch export feature remains in development

Support

Report issues: GitHub Issues

Discuss development: GitHub Discussions

Acknowledgments

Unified English Braille (UEB) specification, International Council on English Braille (ICEB)

ADA Standards for Accessible Design (2010)

The blind and visually impaired community for ongoing feedback

Perkins School for the Blind for reference materials

BrailleDaddy is developed to support accessibility, accuracy, and compliance in tactile signage design.
Source code remains public while the live tool undergoes refinement.