const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'college-details.html');
if (!fs.existsSync(filePath)) process.exit(1);

let content = fs.readFileSync(filePath, 'utf8');

// Find the second script tag (first one is tailwind)
let scriptIndex = content.indexOf('<script>', content.indexOf('</script>') + 9);
if (scriptIndex === -1) {
    scriptIndex = content.lastIndexOf('<script>');
}

if (scriptIndex === -1) {
    console.error('Could not find script block');
    process.exit(1);
}

const scriptPart = content.substring(scriptIndex);

const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College Details - TS EAMCET 2026</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: { dashboard: { bg: '#030712', card: '#111827', border: '#1f2937', accent: '#10b981' } },
                    animation: { 'aurora': 'aurora 15s linear infinite alternate' },
                    keyframes: { aurora: { '0%': { transform: 'translateY(0) scale(1)' }, '100%': { transform: 'translateY(-20px) scale(1.05)' } } }
                }
            }
        }
    </script>
    <style>
        body { background-color: #030712; color: #f9fafb; font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; }
        .aurora-bg { position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; background: #030712; }
        .aurora-bg::before, .aurora-bg::after { content: ''; position: absolute; width: 60vw; height: 60vh; border-radius: 50%; filter: blur(100px); opacity: 0.15; animation: aurora 15s infinite alternate; }
        .aurora-bg::before { background: #10b981; top: -20%; left: -10%; }
        .aurora-bg::after { background: #3b82f6; bottom: -20%; right: -10%; animation-delay: -5s; }
        .glass-panel { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; color: #9ca3af; transition: all 0.2s; }
        .nav-link:hover { background: rgba(255, 255, 255, 0.05); color: white; }
        .nav-link.active { background: rgba(16, 185, 129, 0.1); color: #10b981; border-left: 3px solid #10b981; }
        .spinner { border: 2px solid rgba(255,255,255,0.1); border-left: 2px solid #10b981; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .info-card { background: rgba(31,41,55,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; transition: all 0.2s; }
        .stat-value { font-size: 1.25rem; font-weight: 600; color: white; margin-top: 4px; }
        .stat-label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
        .btn-primary { background: #10b981; color: white; transition: all 0.2s; }
        .btn-primary:hover { background: #059669; }
        
        select { background: rgba(31,41,55,0.5); border: 1px solid #374151; color: white; padding: 8px 12px; border-radius: 8px; }
        select:focus { outline: none; border-color: #10b981; }
        
        /* Table Styles */
        .cutoff-table-wrapper { border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); background: rgba(17,24,39,0.5); }
        .cutoff-table { width: 100%; border-collapse: collapse; }
        .cutoff-table th { background: rgba(31,41,55,0.8); color: #9ca3af; padding: 12px 16px; text-align: left; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cutoff-table td { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.9rem; }
        .cutoff-table tr:hover td { background: rgba(255,255,255,0.02); }
    </style>
</head>
<body>
    <div class="aurora-bg"></div>
    <div class="flex h-screen overflow-hidden">
        
        <!-- Sidebar -->
        <aside class="w-64 glass-panel flex flex-col justify-between hidden md:flex border-r border-gray-800 relative z-20">
            <div>
                <div class="p-6 border-b border-gray-800">
                    <div class="flex items-center gap-3">
                        <img src="logo.png" alt="Logo" class="w-10 h-10">
                        <div>
                            <h1 class="font-bold text-gray-100 tracking-tight">TS EAMCET</h1>
                            <p class="text-xs text-gray-500 font-mono">DATA PLATFORM</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Navigation</p>
                    <a href="index.html" class="nav-link">Search Results</a>
                    <a href="closing-ranks.html" class="nav-link">Phase 1 Cutoffs</a>
                    <a href="previous-year-cutoffs.html" class="nav-link">History</a>
                    <a href="college-info.html" class="nav-link active">Colleges</a>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-800">
                <a href="college-info.html" class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Colleges
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            <header class="glass-panel px-6 py-4 border-b border-gray-800 flex justify-between items-center z-30">
                <h2 class="text-xl font-medium">College Profile</h2>
                <a href="college-info.html" class="md:hidden text-sm text-emerald-400">Back</a>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-8">
                <div class="max-w-5xl mx-auto space-y-6">
                    
                    <div id="loadingIndicator" class="text-center py-20 flex flex-col items-center">
                        <div class="spinner w-10 h-10 border-t-2 mb-4"></div>
                        <span class="text-sm text-gray-400">Loading College Details...</span>
                    </div>

                    <div id="errorMessage" class="hidden text-center py-20 bg-red-900/20 border border-red-500/30 rounded-2xl">
                        <p class="text-red-400 text-lg">Failed to load college details.</p>
                        <a href="college-info.html" class="text-sm text-gray-400 hover:text-white underline mt-4 inline-block">Return to Directory</a>
                    </div>
                    
                    <div id="collegeContent" class="hidden space-y-8">
                        
                        <!-- Header Card -->
                        <div class="glass-panel p-8 rounded-3xl border border-gray-800 shadow-xl relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                            </div>
                            
                            <div id="collegeHeader" class="relative z-10">
                                <!-- Populated via JS -->
                            </div>
                        </div>

                        <!-- Info Grid -->
                        <div id="collegeInfo" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Populated via JS -->
                        </div>

                        <!-- Gallery (Hidden initially) -->
                        <div id="collegeGallery" class="hidden info-card">
                            <h3 class="text-lg font-medium mb-4 text-white">Campus Gallery</h3>
                            <div id="imageGallery" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                        </div>

                        <!-- Cutoffs Section -->
                        <div id="cutoffs" class="info-card">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 class="text-lg font-medium text-white mb-1">Previous Cutoffs</h3>
                                    <p class="text-sm text-gray-400">View closing ranks for different categories</p>
                                </div>
                                <div class="flex gap-3 w-full md:w-auto">
                                    <select id="casteFilter" class="flex-1 md:w-40"><option value="">All Categories</option></select>
                                    <select id="genderFilter" class="flex-1 md:w-32"><option value="">All Genders</option></select>
                                </div>
                            </div>

                            <div class="border-b border-gray-800 flex gap-2 mb-6">
                                <button id="phase1Tab" class="px-6 py-2 text-sm text-emerald-400 border-b-2 border-emerald-400 bg-emerald-900/20 rounded-t-lg" onclick="switchPhase('phase1')">Phase 1</button>
                                <button id="phase2Tab" class="px-6 py-2 text-sm text-gray-400 hover:text-white rounded-t-lg" onclick="switchPhase('phase2')">Phase 2</button>
                                <button id="phase3Tab" class="px-6 py-2 text-sm text-gray-400 hover:text-white rounded-t-lg" onclick="switchPhase('phase3')">Phase 3</button>
                            </div>

                            <div id="cutoffLoading" class="hidden text-center py-8">
                                <div class="spinner w-8 h-8 border-t-2 mx-auto mb-4"></div>
                                <span class="text-sm text-gray-400">Loading cutoffs...</span>
                            </div>

                            <div id="cutoffNoData" class="hidden text-center py-8 text-gray-400">
                                No cutoff data available for this selection.
                            </div>

                            <div id="cutoffDataContainer" class="hidden">
                                <div class="cutoff-table-wrapper overflow-x-auto">
                                    <table class="cutoff-table">
                                        <thead>
                                            <tr>
                                                <th>Branch</th>
                                                <th>OC BOYS</th>
                                                <th>OC GIRLS</th>
                                                <th>BC_A BOYS</th>
                                                <th>BC_A GIRLS</th>
                                                <th>BC_B BOYS</th>
                                                <th>BC_B GIRLS</th>
                                                <th>BC_C BOYS</th>
                                                <th>BC_C GIRLS</th>
                                                <th>BC_D BOYS</th>
                                                <th>BC_D GIRLS</th>
                                                <th>BC_E BOYS</th>
                                                <th>BC_E GIRLS</th>
                                                <th>SC BOYS</th>
                                                <th>SC GIRLS</th>
                                                <th>ST BOYS</th>
                                                <th>ST GIRLS</th>
                                            </tr>
                                        </thead>
                                        <tbody id="cutoffTable"></tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </main>
    </div>
`;

fs.writeFileSync(filePath, newHtml + scriptPart);
console.log('Successfully updated layout for college-details.html');
