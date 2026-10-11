const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const noJekyllPath = path.join(distPath, '.nojekyll');

// 1. Create .nojekyll file to stop GitHub Pages from ignoring _expo directory
fs.writeFileSync(noJekyllPath, '', 'utf8');
console.log('Successfully created .nojekyll file for GitHub Pages!');

// 2. Fix index.html relative asset links
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/src="\/_expo\//g, 'src="./_expo/');
  content = content.replace(/href="\/_expo\//g, 'href="./_expo/');
  content = content.replace(/href="\/favicon.ico"/g, 'href="./favicon.ico"');
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated dist/index.html relative paths!');
} else {
  console.error('dist/index.html not found!');
}
