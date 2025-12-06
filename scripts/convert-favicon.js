const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertFavicon() {
  try {
    const svgPath = path.join(__dirname, '../public/favicon.svg');
    const pngPath = path.join(__dirname, '../public/favicon.png');
    
    // Convertir SVG en PNG 32x32
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(pngPath);
    
    console.log('✅ Favicon converti avec succès : public/favicon.png');
  } catch (error) {
    console.error('❌ Erreur lors de la conversion:', error);
    process.exit(1);
  }
}

convertFavicon();

