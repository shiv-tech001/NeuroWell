const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const filesToProcess = [];

// Find all .tsx files in the pages directory
function findFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findFiles(fullPath);
    } else if (file.endsWith('.tsx') && !file.endsWith('.test.tsx')) {
      filesToProcess.push(fullPath);
    }
  });
}

findFiles(pagesDir);

filesToProcess.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Remove Navbar and Footer imports
    const importRegex = /import\s+(?:\{[^}]*\}\s*,\s*)?(?:Navbar|Footer)\s*(?:,\s*\{[^}]*\})?\s*from\s*['"]@\/components\/layout['"];?\n?/g;
    const newContent = content.replace(importRegex, (match) => {
      modified = true;
      return '';
    });
    
    // Remove Navbar and Footer component usages
    const componentRegex = /<Navbar\s*\/>\s*|\s*<Footer\s*\/>\s*/g;
    const finalContent = newContent.replace(componentRegex, (match) => {
      modified = true;
      return '';
    });
    
    if (modified) {
      fs.writeFileSync(filePath, finalContent, 'utf8');
      console.log(`✅ Processed ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log('\n✅ All files processed. Duplicate Navbar and Footer components have been removed.');
