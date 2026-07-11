const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // CSS blocks replacement
    content = content.replace(/#0A1128/gi, '#0f172a');
    content = content.replace(/#080810/gi, '#020617');
    content = content.replace(/rgba\(0, 201, 167,/gi, 'rgba(249, 115, 22,');
    content = content.replace(/rgba\(136, 77, 255,/gi, 'rgba(239, 68, 68,');
    content = content.replace(/rgba\(10, 17, 40,/gi, 'rgba(15, 23, 42,');
    content = content.replace(/#303040/gi, '#334155');
    content = content.replace(/rgba\(8, 8, 16,/gi, 'rgba(2, 6, 23,');
    content = content.replace(/#00C9A7 0%, #884DFF 100%/gi, '#f97316 0%, #ef4444 100%');
    content = content.replace(/#884DFF 0%, #00C9A7 100%/gi, '#ef4444 0%, #f97316 100%');
    content = content.replace(/#667eea 0%, #764ba2 100%/gi, '#f97316 0%, #e11d48 100%');
    content = content.replace(/rgba\(102, 126, 234,/gi, 'rgba(249, 115, 22,');
    content = content.replace(/#1a1a2e/gi, '#0f172a');
    content = content.replace(/#00D4FF 0%, #00FFC7 100%/gi, '#fbbf24 0%, #f59e0b 100%'); // For Phase text gradient

    // Tailwind classes replacement
    content = content.replace(/text-blue-/g, 'text-orange-');
    content = content.replace(/text-purple-/g, 'text-red-');
    content = content.replace(/from-blue-/g, 'from-orange-');
    content = content.replace(/to-purple-/g, 'to-red-');
    content = content.replace(/bg-blue-/g, 'bg-orange-');
    content = content.replace(/bg-purple-/g, 'bg-red-');
    content = content.replace(/border-blue-/g, 'border-orange-');
    content = content.replace(/border-purple-/g, 'border-red-');
    content = content.replace(/ring-blue-/g, 'ring-orange-');
    content = content.replace(/ring-purple-/g, 'ring-red-');
    content = content.replace(/shadow-blue-/g, 'shadow-orange-');

    fs.writeFileSync(filePath, content);
    console.log('Updated theme in: ' + file);
}
