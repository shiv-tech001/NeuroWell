const fs = require('fs');
const path = require('path');

// List of files to process
const filesToProcess = [
  'src/pages/student/StudentDashboard.tsx',
  'src/pages/student/ResourcesPage.tsx',
  'src/pages/student/Profile.tsx',
  'src/pages/student/CommunityPage.tsx',
  'src/pages/student/BookAppointmentPage.tsx',
  'src/pages/services/services.tsx',
  'src/pages/services/Chatboat.tsx',
  'src/pages/services/Excercise.tsx',
  'src/pages/auth/RegisterPage.tsx'
];

filesToProcess.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove Navbar and Footer imports
    content = content.replace(/import\s+\{?\s*Navbar\s*\}?\s*,?\s*\{?\s*Footer\s*\}?\s*\}?\s*from\s*['"]@\/components\/layout['"];?\n?/g, '');
    content = content.replace(/import\s+Navbar\s+from\s+['"]@\/components\/layout\/Navbar['"];?\n?/g, '');
    content = content.replace(/import\s+Footer\s+from\s+['"]@\/components\/layout\/Footer['"];?\n?/g, '');
    
    // Remove Navbar and Footer component usages
    content = content.replace(/<Navbar\s*\/>\n?/g, '');
    content = content.replace(/<Footer\s*\/>\n?/g, '');
    
    // Clean up any double newlines that might be left behind
    content = content.replace(/\n{3,}/g, '\n\n');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Processed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log('\n✅ All files processed. Duplicate Navbar and Footer components have been removed.');
