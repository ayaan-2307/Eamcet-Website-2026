const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'data' || file.includes('2026 phase') || file.includes('2026 phase')) continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            replaceInDir(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('2026')) {
                content = content.replace(/2026/g, '2026');
                fs.writeFileSync(filePath, content);
                console.log('Updated: ' + filePath);
            }
        }
    }
}
replaceInDir(__dirname);
