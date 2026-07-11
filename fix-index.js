const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const hiddenElements = `
    <!-- Hidden elements to preserve JS compatibility -->
    <div id="hidden-ui" style="display:none;">
        <select id="phaseSelector"></select>
        <div id="phaseDescription"></div>
        <div id="searchResultsList"></div>
        <div id="resultsList"></div>
        <select id="sortDropdown"></select>
        <button id="cardViewBtn"></button>
        <div id="studentInfo"></div>
        <div id="resultsCount"></div>
        <div id="searchResultsArea"></div>
        <button id="btnPhase1"></button>
        <button id="btnPhase2"></button>
        <button id="btnPhase3"></button>
    </div>
`;

// Insert hidden elements before </body>
content = content.replace('</body>', hiddenElements + '\n</body>');

// Fix pagination inside paginationContainer
const paginationHTML = `
    <button id="prevPage" class="btn-primary px-4 py-2 rounded-lg disabled:opacity-50 text-sm">Previous</button>
    <div id="pageNumbers" class="flex gap-2"></div>
    <button id="nextPage" class="btn-primary px-4 py-2 rounded-lg disabled:opacity-50 text-sm">Next</button>
    <span id="paginationInfo" class="text-gray-400 text-sm ml-4"></span>
`;
content = content.replace('<div id="paginationContainer" class="flex justify-center gap-2 mt-8 pb-8"></div>', 
    '<div id="paginationContainer" class="flex justify-center items-center gap-2 mt-8 pb-8">' + paginationHTML + '</div>');

fs.writeFileSync(indexPath, content);
console.log('Fixed index.html IDs');
