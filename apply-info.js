const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'college-info.html');
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
    <title>College Info - TS EAMCET 2026</title>
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
        .search-input { background: rgba(31, 41, 55, 0.5); border: 1px solid #374151; color: white; transition: all 0.2s; }
        .search-input:focus { background: rgba(31, 41, 55, 0.8); border-color: #10b981; outline: none; }
        .search-input option { background: #111827; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; color: #9ca3af; transition: all 0.2s; }
        .nav-link:hover { background: rgba(255, 255, 255, 0.05); color: white; }
        .nav-link.active { background: rgba(16, 185, 129, 0.1); color: #10b981; border-left: 3px solid #10b981; }
        .spinner { border: 2px solid rgba(255,255,255,0.1); border-left: 2px solid #10b981; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .btn-primary { background: #10b981; color: white; transition: all 0.2s; }
        .btn-primary:hover:not(:disabled) { background: #059669; }
        
        .college-card { background: rgba(31,41,55,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; transition: all 0.2s; }
        .college-card:hover { transform: translateY(-4px); border-color: rgba(16,185,129,0.3); box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .college-list-item { background: rgba(31,41,55,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; transition: all 0.2s; }
        .college-list-item:hover { transform: translateX(4px); border-color: rgba(16,185,129,0.3); }
        
        .floating-suggestion { position: fixed; bottom: 20px; right: 20px; background: rgba(16,185,129,0.9); color: white; padding: 12px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(16,185,129,0.3); z-index: 50; transition: all 0.5s; opacity: 0; transform: translateY(20px); pointer-events: none; }
        .floating-suggestion.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .stat-card { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: #9ca3af; }
    </style>
</head>
<body>
    <div id="mobileWarningOverlay" style="display:none;"></div>
    <div id="desktopInstructionsOverlay" style="display:none;"></div>
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
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Database Stats</p>
                <div class="space-y-3">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-400">Total Colleges</span>
                        <span id="totalColleges" class="font-mono text-emerald-400"><div class="spinner inline-block"></div></span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-400">Total Courses</span>
                        <span id="totalCourses" class="font-mono text-emerald-400"><div class="spinner inline-block"></div></span>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            <header class="glass-panel px-6 py-4 border-b border-gray-800 flex justify-between items-center z-30">
                <h2 class="text-xl font-medium">College Directory</h2>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
                <div class="max-w-7xl mx-auto space-y-6">
                    
                    <!-- Search Header -->
                    <div class="glass-panel p-6 rounded-2xl border border-gray-800 shadow-xl">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-lg font-medium mb-1">College Explorer</h3>
                                <p class="text-sm text-gray-400">Search for colleges and view detailed profiles</p>
                            </div>
                        </div>
                        
                        <div class="relative mb-6">
                            <input type="text" id="searchInput" class="search-input w-full px-4 py-3 rounded-lg text-sm" placeholder="Search by college name or code... (e.g. CBIT, VNR, OUCE)">
                            <button id="searchButton" class="absolute inset-y-1 right-1 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors">Search</button>
                        </div>

                        <!-- Filters Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select id="districtFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Districts</option></select>
                            <select id="typeFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Types (Govt/Pvt)</option></select>
                            <select id="naacFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All NAAC Ratings</option></select>
                            <select id="sortFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full">
                                <option value="name">Sort by Name</option>
                                <option value="code">Sort by Code</option>
                            </select>
                        </div>
                    </div>

                    <div id="collegeResultsArea" class="mb-20">
                        <div id="loadingIndicator" class="text-center py-16 flex flex-col items-center">
                            <div class="spinner w-10 h-10 border-t-2 mb-4"></div>
                            <span class="text-sm text-gray-400">Loading College Data...</span>
                        </div>
                        
                        <div id="collegeResultsList" class="hidden">
                            <div class="flex justify-between items-center mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                                <p id="resultsCount" class="text-emerald-400 font-medium text-sm">Found 0 colleges</p>
                                <div class="flex items-center gap-4">
                                    <select id="itemsPerPageSelect" class="search-input py-1 px-2 rounded-md text-sm">
                                        <option value="12">12 per page</option>
                                        <option value="24">24 per page</option>
                                        <option value="48">48 per page</option>
                                        <option value="100">100 per page</option>
                                    </select>
                                    <div class="flex bg-gray-800 p-1 rounded-lg">
                                        <button id="gridViewBtn" class="p-1 rounded bg-gray-700 text-white"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
                                        <button id="listViewBtn" class="p-1 rounded text-gray-400 hover:text-white"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                                    </div>
                                </div>
                            </div>

                            <div id="collegesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

                            <div id="paginationContainer" class="w-full hidden mt-8">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="flex items-center gap-2">
                                        <button id="prevPage" class="btn-primary px-4 py-2 rounded-lg disabled:opacity-50 text-sm">Previous</button>
                                        <div id="pageNumbers" class="flex gap-2"></div>
                                        <button id="nextPage" class="btn-primary px-4 py-2 rounded-lg disabled:opacity-50 text-sm">Next</button>
                                    </div>
                                    <span id="paginationInfo" class="text-gray-400 text-sm"></span>
                                </div>
                            </div>
                        </div>

                        <div id="noResults" class="hidden text-center py-16 text-gray-400">
                            <div class="text-4xl mb-4">🔍</div>
                            <p>No colleges found matching your search criteria.</p>
                        </div>
                    </div>

                </div>
            </div>
            
            <div id="floatingSuggestion" class="floating-suggestion">
                <span id="suggestionText">💡 Tip: Click on college locations to open Google Maps!</span>
            </div>
        </main>
    </div>
`;

fs.writeFileSync(filePath, newHtml + scriptPart);
console.log('Successfully updated layout for college-info.html');
