const fs = require('fs');
const path = require('path');

function removePhase2And3(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (!file.endsWith('.html')) continue;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove navigation links to Phase 2 and Phase 3
        const navRegex = /<a href="phase[23]-cutoffs(-official)?\.html"[\s\S]*?<\/a>/g;
        content = content.replace(navRegex, '');
        
        // Remove Phase 2 and Phase 3 buttons in the "Select Allotment Phase" section
        // or just remove the whole section if it's in index.html
        if (file === 'index.html') {
            const selectPhaseRegex = /<div class="card p-6 mb-6 max-w-4xl mx-auto">[\s\S]*?<!-- Search and Filters Section -->/g;
            content = content.replace(selectPhaseRegex, '<!-- Search and Filters Section -->');
        }
        
        // Remove Phase 2 predictions in college-details.html
        if (file === 'college-details.html') {
            const p2PredTitle = /<span class="font-semibold text-orange-300">?? 2026 Phase 2 \(Predicted\)<\/span> - AI-predicted cutoffs for upcoming phase<br>/g;
            content = content.replace(p2PredTitle, '');
        }

        fs.writeFileSync(filePath, content);
        console.log('Updated: ' + filePath);
    }
}
removePhase2And3(__dirname);
