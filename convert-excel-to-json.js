const XLSX = require('xlsx');
const fs = require('fs');

// Function to convert Excel file to JSON
function convertExcelToJson(inputFile, outputFile, sheetName = null) {
    try {
        console.log(`📂 Converting ${inputFile} to ${outputFile}...`);
        
        // Read the Excel file
        const workbook = XLSX.readFile(inputFile);
        
        // Get the first sheet name if not specified
        const targetSheet = sheetName || workbook.SheetNames[0];
        console.log(`📋 Using sheet: ${targetSheet}`);
        
        // Get the worksheet
        const worksheet = workbook.Sheets[targetSheet];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log(`📊 Converted ${jsonData.length} records`);
        
        // Save to JSON file
        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
        console.log(`✅ Saved to ${outputFile}`);
        
        return jsonData;
    } catch (error) {
        console.error(`❌ Error converting ${inputFile}:`, error);
        return null;
    }
}

// Function to normalize field names for consistency
function normalizeFieldNames(data, fileType) {
    return data.map(record => {
        const normalized = {};
        
        // Normalize common field names based on file type
        Object.keys(record).forEach(key => {
            const lowerKey = key.toLowerCase().trim();
            
            // College Code variations
            if (lowerKey.includes('college') && lowerKey.includes('code')) {
                normalized.College_Code = record[key];
            }
            // College Name variations
            else if (lowerKey.includes('college') && lowerKey.includes('name')) {
                normalized.College_Name = record[key];
            }
            // Branch Code variations
            else if (lowerKey.includes('branch') && lowerKey.includes('code')) {
                normalized.Branch_Code = record[key];
            }
            // Branch Name variations
            else if (lowerKey.includes('branch') && lowerKey.includes('name')) {
                normalized.Branch_Name = record[key];
            }
            // Cutoff Rank variations
            else if (lowerKey.includes('cutoff') || lowerKey.includes('rank')) {
                normalized.Cutoff_Rank = record[key];
            }
            // Caste/Category variations
            else if (lowerKey.includes('caste') || lowerKey.includes('category')) {
                normalized.Caste = record[key];
            }
            // Gender variations
            else if (lowerKey.includes('gender') || lowerKey.includes('sex')) {
                normalized.Gender = record[key];
            }
            // Keep original field as well
            else {
                normalized[key] = record[key];
            }
        });
        
        return normalized;
    });
}

// Main conversion function
async function convertAllFiles() {
    console.log('🚀 Starting Excel to JSON conversion...\n');
    
    const conversions = [
        {
            input: './03_TGEAPCET_2024_FinalPhase_LastRanks.xlsx',
            output: './data/2024-phase3-final-cutoffs.json',
            description: '2024 Phase 3 Final Cutoffs'
        },
        {
            input: './all_closing_ranks.xlsx',
            output: './data/2026-phase1-all-closing-ranks.json',
            description: '2026 Phase 1 All Closing Ranks'
        },
        {
            input: './TGEAPCET_2026_Phase2_Official_Cutoffs.xlsx',
            output: './data/2026-phase2-official-cutoffs.json',
            description: '2026 Phase 2 Official Cutoffs'
        }
    ];
    
    const results = {};
    
    for (const conversion of conversions) {
        console.log(`\n📋 Processing: ${conversion.description}`);
        
        if (!fs.existsSync(conversion.input)) {
            console.log(`⚠️ File not found: ${conversion.input}`);
            continue;
        }
        
        const data = convertExcelToJson(conversion.input, conversion.output);
        
        if (data) {
            // Normalize field names
            const normalizedData = normalizeFieldNames(data, conversion.description);
            
            // Save normalized version
            const normalizedOutput = conversion.output.replace('.json', '-normalized.json');
            fs.writeFileSync(normalizedOutput, JSON.stringify(normalizedData, null, 2));
            console.log(`✅ Saved normalized version to ${normalizedOutput}`);
            
            results[conversion.description] = {
                originalRecords: data.length,
                normalizedRecords: normalizedData.length,
                outputFile: conversion.output,
                normalizedFile: normalizedOutput
            };
            
            // Show sample of first few records
            console.log('📋 Sample records:');
            normalizedData.slice(0, 3).forEach((record, index) => {
                console.log(`  ${index + 1}. College: ${record.College_Name || record.college_name || 'N/A'}`);
                console.log(`     Branch: ${record.Branch_Name || record.branch_name || 'N/A'}`);
                console.log(`     Cutoff: ${record.Cutoff_Rank || record.cutoff_rank || 'N/A'}`);
            });
        }
    }
    
    console.log('\n📊 Conversion Summary:');
    Object.entries(results).forEach(([name, info]) => {
        console.log(`✅ ${name}: ${info.originalRecords} records`);
        console.log(`   📁 Original: ${info.outputFile}`);
        console.log(`   📁 Normalized: ${info.normalizedFile}`);
    });
    
    console.log('\n🎉 All conversions completed!');
}

// Run the conversion
if (require.main === module) {
    convertAllFiles().catch(console.error);
}

module.exports = { convertExcelToJson, normalizeFieldNames };
