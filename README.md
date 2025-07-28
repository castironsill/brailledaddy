# BrailleDaddy

A professional web-based Unified English Braille (UEB) translator with true-scale ADA-compliant export for creating accessible signage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)
![UEB](https://img.shields.io/badge/UEB-Grade%201%20%26%202-brightgreen.svg)
![ADA Compliant](https://img.shields.io/badge/ADA-Compliant-blue.svg)

## 🎯 Features

### Translation Engine
- **Grade 1 (Uncontracted)** and **Grade 2 (Contracted)** UEB translation
- Real-time translation with intelligent debouncing
- Multi-line sign support with proper ADA spacing
- Comprehensive contraction database (189+ Grade 2 contractions)
- Proper handling of numbers, punctuation, and special characters
- Correct capitalization with braille indicators

### Visualization Modes
- **Unicode Display** - Standard braille Unicode characters (U+2800-U+28FF)
- **Dot Pattern Display** - Visual dot representation featuring:
  - High-DPI support for crisp rendering
  - Interactive cyan dots with glow effects
  - Accurate 6-dot cell layout
  - Fullscreen mode for detailed viewing

### Import/Export Capabilities
- **Import Options**:
  - Plain text files (.txt)
  - Braille Ready Format (.brf) with back-translation
  - Drag-and-drop support
  
- **Export Options**:
  - **True-scale SVG** - Millimeter-perfect output (no DPI conversion needed!)
  - **BRF** - For direct embosser compatibility
  - **Text** - Original and translated content
  - **Clipboard** - Quick copy functionality

### ADA Compliance ⚖️
- **True millimeter SVG export** - What you export is what you get!
- Automatic ADA §703.3.1 compliant spacing:
  - Dot diameter: 1.5-1.6mm (customizable)
  - Dot spacing: 2.3-2.5mm within cells
  - Cell spacing: 6.1-7.6mm horizontal
  - Line spacing: 10.0-10.2mm vertical
- Built-in help system with ADA requirements
- Production notes embedded in SVG files
- **Grade 2 REQUIRED** for permanent signs (enforced in help)

## 🚀 Live Demo

[Try BrailleDaddy](https://castironsill.github.io/brailledaddy/)

## 💻 Quick Start

### Basic Translation
1. Type or paste your text
2. Translation happens automatically
3. Switch between Grade 1/2 as needed
4. View in Unicode or Dot Pattern mode

### Creating ADA Signs
1. Click "Multi-line Sign" for room signs
2. Enter text (e.g., "Room 204" on line 1, "Conference Room" on line 2)
3. Click "Export as SVG"
4. Use default ADA settings
5. Send directly to embosser - no scaling needed!

### SVG Export is True Scale 🎯
Our SVG files use actual millimeters, not pixels. When you open in Inkscape or send to an embosser, dots are exactly 1.5mm diameter. No math, no scaling, just print!

## 🛠️ Technical Implementation

- **Zero dependencies** - Pure vanilla JavaScript
- **Performant** - Canvas rendering with requestAnimationFrame
- **Accessible** - Keyboard navigation and screen reader friendly
- **Responsive** - Mobile to desktop support
- **Modern** - ES6+, CSS Grid, Custom Properties

## 📋 What's New in v1.1.0

- ✨ Multi-line sign builder with mode toggle
- 📐 True millimeter SVG export (no DPI math!)
- 📚 Comprehensive help system with 7 tabs
- 🔍 Help search functionality
- 📊 ADA quick reference with copy buttons
- 🎯 Grade 2 requirement enforcement for ADA signs
- 🔗 GitHub link in header

## 🏭 Embosser Compatibility

Tested with:
- ViewPlus (all models)
- Index Braille (Basic-D, Everest, Fanfold)
- Enabling Technologies (Romeo, Juliet)
- Any system accepting SVG or BRF input

## 📏 ADA Sign Requirements

BrailleDaddy enforces these ADA standards:
- **Grade 2 braille is MANDATORY** for permanent signs
- Proper capitalization (not all caps!)
- 48"-60" mounting height
- 3" minimum from door frame
- Non-glare finish required

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Additional language support
- Nemeth (math) braille
- Music braille notation
- Additional export formats
- Batch processing improvements

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Safari: File input may require double-click
- Some obscure Grade 2 contractions need verification
- Batch export feature in development

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/castironsill/brailledaddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/castironsill/brailledaddy/discussions)
- **Email**: [your-email@example.com]

## 🙏 Acknowledgments

- Unified English Braille (UEB) specification by ICEB
- ADA Standards for Accessible Design
- The blind and visually impaired community for valuable feedback
- [Perkins School for the Blind](https://www.perkins.org/) for braille resources

---

<div align="center">
Made with ❤️ for the accessibility community

**Free • Open Source • ADA Compliant**

[Website](https://castironsill.github.io/brailledaddy/) • [Report Bug](https://github.com/castironsill/brailledaddy/issues) • [Request Feature](https://github.com/castironsill/brailledaddy/issues)
</div>