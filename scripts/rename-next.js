const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../out');
const oldPath = path.join(outDir, '_next');
const newPath = path.join(outDir, 'assets');

// 1. Rename _next to assets
if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log('Renamed _next to assets');
} else {
  console.log('_next directory not found, skipping rename');
}

// 2. Helper to replace in files recursively
function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

walk(outDir, (filePath) => {
  if (/\.(html|js|css|json|txt)$/.test(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace /_next/ with /assets/
    // and _next/ with assets/
    let hasChanged = false;

    if (content.includes('/_next/')) {
      content = content.split('/_next/').join('/assets/');
      hasChanged = true;
    }
    if (content.includes('_next/')) {
      content = content.split('_next/').join('assets/');
      hasChanged = true;
    }

    if (hasChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated references in: ${filePath}`);
    }
  }
});

console.log('Finished updating references');
