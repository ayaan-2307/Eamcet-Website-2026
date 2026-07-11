const fs = require('fs');
const path = require('path');

const fileNames = ['closing-ranks.html', 'previous-year-cutoffs.html'];

for (const fileName of fileNames) {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the second script tag (first one is tailwind)
    let scriptIndex = content.indexOf('<script>', content.indexOf('</script>') + 9);
    if (scriptIndex === -1) {
        scriptIndex = content.lastIndexOf('<script>');
    }
    
    if (scriptIndex === -1) {
        console.error('Could not find script block in ' + fileName);
        continue;
    }

    const scriptPart = content.substring(scriptIndex);
    
    // Determine title
    let title = "TS EAMCET 2026 Phase 1 Cutoffs";
    let activeNav = "closing-ranks.html";
    if (fileName === 'previous-year-cutoffs.html') {
        title = "TS EAMCET Previous Year Cutoffs";
        activeNav = "previous-year-cutoffs.html";
    }

    const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${title}</title>
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
        table th { background: rgba(31,41,55,0.8); color: #9ca3af; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: left; }
        table td { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #e5e7eb; font-size: 0.875rem; }
        table tr:hover td { background: rgba(255,255,255,0.02); }
        .btn-primary { background: #10b981; color: white; transition: all 0.2s; }
        .btn-primary:hover:not(:disabled) { background: #059669; }
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
                    <a href="index.html" class="nav-link \${activeNav === 'index.html' ? 'active' : ''}">
                        Search Results
                    </a>
                    <a href="closing-ranks.html" class="nav-link \${activeNav === 'closing-ranks.html' ? 'active' : ''}">
                        Phase 1 Cutoffs
                    </a>
                    <a href="previous-year-cutoffs.html" class="nav-link \${activeNav === 'previous-year-cutoffs.html' ? 'active' : ''}">
                        History
                    </a>
                    <a href="college-info.html" class="nav-link">
                        Colleges
                    </a>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            <header class="glass-panel px-6 py-4 border-b border-gray-800 flex justify-between items-center z-30">
                <h2 class="text-xl font-medium">\${title}</h2>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-8">
                <div class="max-w-7xl mx-auto space-y-6">
                    
                    <!-- Search Header -->
                    <div class="glass-panel p-6 rounded-2xl border border-gray-800 shadow-xl">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-lg font-medium mb-1">Data Table</h3>
                                <p class="text-sm text-gray-400">Filter and explore the closing ranks</p>
                            </div>
                            <div class="text-emerald-400 text-sm font-mono flex items-center gap-2">
                                <span id="loadingSpinner" class="spinner"></span>
                                <span id="recordCount">Loading...</span>
                            </div>
                        </div>
                        
                        <div class="relative mb-6">
                            <input type="text" id="searchInput" class="search-input w-full px-4 py-2 rounded-lg text-sm" placeholder="Type to search colleges, branches...">
                        </div>

                        <!-- Filters Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select id="collegeFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Colleges</option></select>
                            <select id="branchFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Branches</option></select>
                            <select id="categoryFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Categories</option></select>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="glass-panel rounded-2xl border border-gray-800 shadow-xl overflow-hidden" id="mainTableContainer">
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Inst Code</th>
                                        <th>Inst Name</th>
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
                                <tbody id="resultsTable"></tbody>
                            </table>
                        </div>
                        
                        <div id="noResults" class="hidden text-center py-12 text-gray-400">
                            No records found matching your filters.
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div id="paginationControls" class="flex justify-center items-center gap-4 py-4 hidden">
                        <button id="prevPage" class="btn-primary px-4 py-2 rounded-lg text-sm disabled:opacity-50">Previous</button>
                        <span id="pageInfo" class="text-sm text-gray-400"></span>
                        <div class="flex items-center gap-2">
                            <input type="number" id="pageInput" class="search-input w-16 px-2 py-1 rounded text-sm text-center" min="1">
                            <button id="goToPage" class="btn-primary px-3 py-1 rounded-lg text-sm">Go</button>
                        </div>
                        <button id="nextPage" class="btn-primary px-4 py-2 rounded-lg text-sm disabled:opacity-50">Next</button>
                    </div>

                </div>
            </div>
        </main>
    </div>
`;

    fs.writeFileSync(filePath, newHtml + scriptPart);
    console.log('Successfully updated layout for: ' + fileName);
}
