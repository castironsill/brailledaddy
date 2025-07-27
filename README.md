# UEB Translator Pro

A professional web-based Unified English Braille (UEB) translator with ADA-compliant export capabilities for creating accessible signage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🎯 Features

### Translation
- **Grade 1 (Uncontracted)** and **Grade 2 (Contracted)** UEB translation
- Real-time translation as you type
- Support for numbers, punctuation, and special characters
- Proper capitalization handling with braille indicators

### Visualization
- **Unicode Display** - See braille characters in standard Unicode format
- **Dot Pattern Display** - Visual representation of raised dots with:
  - High-resolution rendering for crisp display
  - Glowing cyan dots on dark background
  - Proper 6-dot cell layout following standard braille numbering
  - Fullscreen mode for both input and output panels

### Import/Export
- **Import** - Supports .txt and .brf files with drag-and-drop
- **Export Options**:
  - Text file with original and translated content
  - BRF (Braille Ready Format) for embossers
  - ADA-compliant SVG for signage production
  - Copy to clipboard functionality

### ADA Compliance Features
- Customizable export settings with ADA §703.3.1 specifications:
  - Dot diameter: 1.5-1.6mm
  - Dot spacing: 2.3-2.5mm
  - Cell spacing: 6.1-7.6mm
  - Line spacing: 10.0-10.2mm
- Built-in tooltips explaining each ADA requirement
- Warnings about capitalization rules and physical requirements

## 🚀 Live Demo

[Try UEB Translator Pro](https://your-github-username.github.io/brailledaddy/)

## 💻 Usage

1. Enter text in the input field
2. Select Grade 1 or Grade 2 translation
3. View results in Unicode or Dot Pattern display
4. Export in your preferred format

### For ADA Signage
1. Click "Export as SVG"
2. Adjust settings if needed (defaults are ADA-compliant)
3. Note the physical requirements for your embosser/printer
4. Follow capitalization rules to maintain compliance

## 🛠️ Technical Details

- Pure JavaScript - No frameworks required
- Canvas-based dot pattern rendering with device pixel ratio support
- Comprehensive UEB Grade 2 contractions database
- Responsive design for all screen sizes

## 📋 ADA Compliance Notes

This tool generates SVG files compliant with ADA §703.3.1 specifications. Remember:
- Dots must be raised 0.6-0.9mm (controlled by your printer)
- Dots must be domed/rounded, not flat
- Only capitalize first words, proper nouns, and initials

## 🏭 Printer Compatibility

Optimized for braille embossers including:
- ViewPlus embossers
- Index Braille embossers
- Enabling Technologies embossers
- Any SVG-compatible braille production system

## 📄 License

MIT License - feel free to use this tool for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- Safari may require clicking twice on file import button
- Some Grade 2 contractions may need refinement

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for the accessibility community