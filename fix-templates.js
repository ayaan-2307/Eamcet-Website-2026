const fs = require('fs');
const path = require('path');

function replaceTemplates(fileName, title, activeName) {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/\\\$\\{title\\}/g, title);
    content = content.replace(/\\$\\{title\\}/g, title);
    
    // Replace the active links
    content = content.replace(/\\$\\{activeNav === 'index\\.html' \\? 'active' : ''\\}/g, '');
    content = content.replace(/\\$\\{activeNav === 'closing-ranks\\.html' \\? 'active' : ''\\}/g, activeName === 'closing-ranks.html' ? 'active' : '');
    content = content.replace(/\\$\\{activeNav === 'previous-year-cutoffs\\.html' \\? 'active' : ''\\}/g, activeName === 'previous-year-cutoffs.html' ? 'active' : '');
    
    // Also remove any remaining literal ${...}
    content = content.replace(/\\\$\\{activeNav === [^}]+\\}/g, '');
    content = content.replace(/\\$\\{activeNav === [^}]+\\}/g, '');
    
    // Quick fix for pagination pageInput missing id in closing-ranks
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed templates in ' + fileName);
}

replaceTemplates('closing-ranks.html', 'TS EAMCET 2026 Phase 1 Cutoffs', 'closing-ranks.html');
replaceTemplates('previous-year-cutoffs.html', 'TS EAMCET Previous Year Cutoffs', 'previous-year-cutoffs.html');
