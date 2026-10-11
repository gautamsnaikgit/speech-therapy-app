const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  // Replace absolute leading slashes for asset paths with relative dots
  content = content.replace(/src="\/_expo\//g, 'src="./_expo/');
  content = content.replace(/href="\/_expo\//g, 'href="./_expo/');
  content = content.replace(/href="\/favicon.ico"/g, 'href="./favicon.ico"');
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated dist/index.html for GitHub Pages relative paths!');
} else {
  console.error('dist/index.html not found!');
}
