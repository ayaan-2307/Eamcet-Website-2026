const XLSX = require('xlsx');
const fs = require('fs');

// Simple conversion without field mapping
function simpleConvert(inputFile, outputFile) {
    try {
        console.log(`📂 Converting ${inputFile}...`);
        
        const workbook = XLSX.readFile(inputFile);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log(`📊 Found ${jsonData.length} records`);
        console.log('📋 Sample record keys:', Object.keys(jsonData[0] || {}));
        
        // Save raw data
        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
        console.log(`✅ Saved to ${outputFile}`);
        
        return jsonData;
    } catch (error) {
        console.error(`❌ Error:`, error);
        return null;
    }
}

// Convert all files
console.log('🚀 Simple Excel Conversion...\n');

// 1. 2024 Phase 3
const phase3Data = simpleConvert(
    './03_TGEAPCET_2024_FinalPhase_LastRanks.xlsx',
    './data/2024-phase3-raw.json'
);

// 2. 2026 Phase 1
const phase1Data = simpleConvert(
    './all_closing_ranks.xlsx',
    './data/2026-phase1-raw.json'
);

// 3. 2026 Phase 2
const phase2Data = simpleConvert(
    './TGEAPCET_2026_Phase2_Official_Cutoffs.xlsx',
    './data/2026-phase2-raw.json'
);

console.log('\n✅ Raw conversion completed!');
