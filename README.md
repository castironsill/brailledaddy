# BrailleDaddy

> **🚧 Temporarily Offline**  
> BrailleDaddy is currently undergoing critical updates to ensure full ADA §703.3.1 compliance. We're implementing corrections to braille spacing, capitalization rules for permanent signage, and SVG export accuracy. The tool will be back online once all changes are validated. In the meantime, you can still run it locally from this repository.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)
![UEB](https://img.shields.io/badge/UEB-Grade%201%20%26%202-brightgreen.svg)
![ADA Compliant](https://img.shields.io/badge/ADA-Compliant-blue.svg)

---

## What is BrailleDaddy?

BrailleDaddy is a professional, web-based Unified English Braille (UEB) translator designed for creating ADA-compliant tactile signage. It supports both Grade 1 (uncontracted) and Grade 2 (contracted) braille with true-scale millimeter output—ready for direct engraving, embossing, or CNC routing.

**No installations. No dependencies. Just accurate, compliant braille.**

---

## Features

### 🔤 Translation Engine
- **Grade 1 & Grade 2 UEB** translation with real-time preview
- **Multi-line sign mode** with automatic ADA-compliant spacing (10.0–10.2mm)
- Intelligent handling of contractions, numbers, punctuation, and capitalization
- Special rules for permanent signage vs. documents

### 👁️ Visualization
- **Unicode View:** Standard braille characters (⠀–⣿)
- **Dot Pattern View:** Visual 6-dot cell layout with precise spacing
- Fullscreen mode for detailed verification
- High-DPI support

### 📥 Import & Export

**Import:**
- Plain text (.txt)
- Braille Ready Format (.brf)
- Drag-and-drop support

**Export:**
- **SVG** with true millimeter scaling (no DPI conversions)
- **BRF** for embossers
- **Plain text** or **Unicode braille**
- **Copy to clipboard**

### ✅ ADA Compliance

Built-in compliance with **ADA §703.3.1** for permanent room identification:

| Requirement | Specification |
|-------------|---------------|
| **Dot diameter** | 1.5–1.6mm |
| **Dot spacing (within cell)** | 2.3–2.5mm |
| **Cell spacing (horizontal)** | 6.1–7.6mm |
| **Line spacing (vertical)** | 10.0–10.2mm |
| **Dot height** | 0.6–0.9mm raised |
| **Grade requirement** | Grade 2 mandatory for permanent signs |

**Special capitalization rules for signs:**
- Tactile text: ALL CAPS (required)
- Braille: NO capital indicators for first word (implied as title)
- Exception: DO capitalize proper nouns, initials, acronyms

---

## Why Offline?

We discovered inconsistencies in how the tool handles:
1. **Capitalization** for permanent signage vs. documents
2. **Spacing validation** edge cases
3. **SVG export metadata** for true-scale verification

Rather than leave incorrect information online, we've taken the tool down until **v1.2.0** is ready with validated corrections.

---

## Run Locally
```bash
# Clone the repository
git clone https://github.com/castironsill/brailledaddy.git
cd brailledaddy

# Open in browser
open index.html
# or just double-click index.html
```

**Requirements:** Any modern browser (Chrome, Firefox, Safari, Edge)

---

## Technical Details

- **Zero dependencies** – vanilla JavaScript
- **Canvas rendering** with `requestAnimationFrame`
- **Responsive design** using CSS Grid
- **Screen reader accessible**
- **Keyboard navigation** support

### Tested Embossers
- ViewPlus (Tiger, Elite, Premier)
- Index Braille (Basic-D, Everest)
- Enabling Technologies (Romeo, Juliet)
- Any system accepting SVG or BRF input

---

## ADA Sign Requirements Summary

**For permanent room identification signs:**

✅ **MUST use Grade 2 braille**  
✅ Tactile text in ALL CAPS  
✅ Braille positioned 3/8" (9.5mm) below tactile text baseline  
✅ Mounted 48"–60" from floor to baseline  
✅ Located on latch side of door  
✅ 3" minimum clearance from door frame  
✅ Non-glare, matte finish  
✅ Dots must be domed/rounded (not flat)

❌ **Do NOT** use all capitals in braille for emphasis  
❌ **Do NOT** add capital indicators to first word in sign braille

---

## Contributing

We welcome contributions! Priority areas:

- Additional braille codes (Nemeth, Music Braille)
- Multi-language support
- Batch export features
- Additional validation tools

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Known Issues

- Safari may require double-click for file input
- Some Grade 2 contractions pending verification
- Batch export in development

**Report bugs:** [GitHub Issues](https://github.com/castironsill/brailledaddy/issues)  
**Discuss features:** [GitHub Discussions](https://github.com/castironsill/brailledaddy/discussions)

---

## License

MIT License – see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- **International Council on English Braille (ICEB)** for UEB specifications
- **ADA Standards for Accessible Design (2010)**
- The blind and visually impaired community for invaluable feedback
- **Perkins School for the Blind** for reference materials

---

**BrailleDaddy is committed to accuracy, accessibility, and compliance in tactile signage design.**

*Version 1.2.0 coming soon with verified ADA compliance.*