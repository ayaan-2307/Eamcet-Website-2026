const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const scriptIndex = content.indexOf('<script>\n        // Global variables');
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
    <title>TS EAMCET 2026 Phase 1 Cutoffs - Student Results Finder</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="alternate icon" href="favicon.svg">
    <link rel="mask-icon" href="favicon.svg" color="#10b981">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        dashboard: {
                            bg: '#030712',
                            card: '#111827',
                            border: '#1f2937',
                            accent: '#10b981',
                            hover: '#1f2937'
                        }
                    },
                    animation: {
                        'aurora': 'aurora 15s linear infinite alternate',
                    },
                    keyframes: {
                        aurora: {
                            '0%': { transform: 'translateY(0) scale(1)' },
                            '100%': { transform: 'translateY(-20px) scale(1.05)' }
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #030712;
            color: #f9fafb;
            font-family: 'Inter', system-ui, sans-serif;
            overflow: hidden;
            height: 100vh;
        }

        .aurora-bg {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden; z-index: -1; background: #030712;
        }
        .aurora-bg::before, .aurora-bg::after {
            content: ''; position: absolute;
            width: 60vw; height: 60vh; border-radius: 50%;
            filter: blur(100px); opacity: 0.15;
            animation: aurora 15s infinite alternate;
        }
        .aurora-bg::before { background: #10b981; top: -20%; left: -10%; }
        .aurora-bg::after { background: #3b82f6; bottom: -20%; right: -10%; animation-delay: -5s; }

        .glass-panel {
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #4b5563; }

        .search-input {
            background: rgba(31, 41, 55, 0.5);
            border: 1px solid #374151; color: white; transition: all 0.2s;
        }
        .search-input:focus {
            background: rgba(31, 41, 55, 0.8);
            border-color: #10b981; outline: none;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        .search-input option { background: #111827; }

        .student-card, .student-list-item {
            background: rgba(31, 41, 55, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px; padding: 16px; transition: all 0.2s;
        }
        .student-card:hover, .student-list-item:hover {
            background: rgba(31, 41, 55, 0.6);
            border-color: rgba(16, 185, 129, 0.3);
            transform: translateY(-2px);
        }

        .nav-link {
            display: flex; align-items: center; gap: 12px;
            padding: 12px 16px; border-radius: 8px; color: #9ca3af; transition: all 0.2s;
        }
        .nav-link:hover { background: rgba(255, 255, 255, 0.05); color: white; }
        .nav-link.active {
            background: rgba(16, 185, 129, 0.1); color: #10b981; border-left: 3px solid #10b981;
        }

        .spinner {
            border: 2px solid rgba(255, 255, 255, 0.1); border-left: 2px solid #10b981;
            border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .rank-badge {
            background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 4px 10px; border-radius: 999px; font-weight: 600;
        }
        .college-name-primary { font-size: 1.1rem; font-weight: bold; color: white; }
        .college-code-secondary { font-size: 0.85rem; color: #9ca3af; font-family: monospace; }
        .branch-name { color: #3b82f6; font-weight: 600; }
        
        /* Pagination */
        .pagination-btn {
            padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(31,41,55,0.5);
            color: #9ca3af; border-radius: 6px; cursor: pointer; transition: all 0.2s;
        }
        .pagination-btn:hover:not(.disabled) { background: rgba(31,41,55,0.8); color: white; }
        .pagination-btn.active { background: #10b981; color: white; border-color: #10b981; }
        .pagination-info { color: #9ca3af; font-size: 0.875rem; align-self: center; }
        .btn-primary { background: #10b981; color: white; padding: 6px 16px; border-radius: 6px; font-weight: 500; }
        
        .info-card { background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
        .info-label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; }
        .info-value { font-size: 1rem; color: white; font-weight: 500; }
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
                            <p class="text-xs text-gray-500 font-mono">DATA PLATFORM 2026</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 space-y-2">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Navigation</p>
                    <a href="index.html" class="nav-link active">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        Search Results
                    </a>
                    <a href="closing-ranks.html" class="nav-link">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        Phase 1 Cutoffs
                    </a>
                    <a href="previous-year-cutoffs.html" class="nav-link">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        History
                    </a>
                    <a href="college-info.html" class="nav-link">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        Colleges
                    </a>
                </div>
            </div>
            
            <div class="p-6 border-t border-gray-800">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Database Stats</p>
                <div class="space-y-3">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-400">Total Records</span>
                        <span id="totalRecords" class="font-mono text-emerald-400"><div class="spinner inline-block"></div></span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-400">Colleges</span>
                        <span id="totalColleges" class="font-mono text-emerald-400"><div class="spinner inline-block"></div></span>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            <!-- Topbar -->
            <header class="glass-panel px-6 py-4 border-b border-gray-800 flex justify-between items-center z-30">
                <h2 class="text-xl font-medium">Student Results Explorer</h2>
                <div class="flex items-center gap-3">
                    <button id="compactViewBtn" class="text-gray-400 hover:text-white px-3 py-1.5 rounded bg-gray-800/50 text-sm border border-gray-700">Compact View</button>
                    <button id="exportBtn" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-sm transition-colors shadow-lg shadow-emerald-900/50">Export CSV</button>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 md:p-8">
                <div class="max-w-5xl mx-auto space-y-6">
                    
                    <!-- Search Header -->
                    <div class="glass-panel p-6 rounded-2xl border border-gray-800 shadow-xl">
                        <div class="mb-4">
                            <h3 class="text-lg font-medium mb-1">Global Search</h3>
                            <p class="text-sm text-gray-400">Search by name, hall ticket, rank, or college code</p>
                        </div>
                        
                        <div class="relative mb-6 flex gap-2">
                            <div class="relative flex-1">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="text" id="searchInput" class="search-input w-full pl-10 pr-4 py-3 rounded-lg text-sm" placeholder="e.g. 'ram', '4', '8768', 'cbit'">
                            </div>
                            <button id="searchButton" class="px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-900/30">
                                Search
                            </button>
                        </div>
                        <div id="searchStatus" class="hidden text-sm text-emerald-400 mb-4 flex items-center gap-2">
                            <div class="spinner w-4 h-4 inline-block"></div>
                            <span id="searchStatusText">Searching...</span>
                        </div>

                        <!-- Filters Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select id="collegeFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Colleges</option></select>
                            <select id="branchFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Branches</option></select>
                            <select id="categoryFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Categories</option></select>
                            <select id="genderFilter" class="search-input py-2 px-3 rounded-lg text-sm w-full"><option value="">All Genders</option></select>
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2 items-center">
                            <span class="text-xs text-gray-500">Quick tests:</span>
                            <button onclick="quickSearch('krishna')" class="px-2 py-1 bg-gray-800/50 hover:bg-gray-700 rounded text-xs border border-gray-700 transition-colors text-gray-300">krishna</button>
                            <button onclick="quickSearch('2521')" class="px-2 py-1 bg-gray-800/50 hover:bg-gray-700 rounded text-xs border border-gray-700 transition-colors text-gray-300">2521</button>
                            <button onclick="quickSearch('cbit')" class="px-2 py-1 bg-gray-800/50 hover:bg-gray-700 rounded text-xs border border-gray-700 transition-colors text-gray-300">cbit</button>
                        </div>
                    </div>

                    <!-- Results Loading -->
                    <div id="loadingSpinner" class="flex flex-col justify-center items-center py-20 text-emerald-500">
                        <div class="spinner w-10 h-10 border-t-2 mb-4"></div>
                        <span class="text-sm font-medium text-gray-400">Initializing Database...</span>
                    </div>

                    <!-- Results Area -->
                    <div id="resultsContainer" class="space-y-4"></div>

                    <!-- Pagination -->
                    <div id="paginationContainer" class="flex justify-center gap-2 mt-8 pb-8"></div>

                </div>
            </div>
        </main>
    </div>

    <!-- Student Details Modal -->
    <div id="studentPopup" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="glass-panel w-full max-w-lg rounded-2xl border border-gray-700 shadow-2xl flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-gray-800 flex justify-between items-start">
                <div>
                    <h3 id="popupStudentName" class="text-xl font-bold text-white mb-1">Student Name</h3>
                    <p class="text-gray-400 text-sm">Detailed Allotment Profile</p>
                </div>
                <button id="closePopup" class="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-6 overflow-y-auto custom-scrollbar">
                <div id="popupDetails" class="space-y-4"></div>
                <div class="mt-6 border-t border-gray-800 pt-6">
                    <h4 class="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">Other Phase Allotments</h4>
                    <div id="popupPreferences" class="space-y-3"></div>
                </div>
            </div>
        </div>
    </div>

`;

fs.writeFileSync(indexPath, newHtml + scriptPart);
console.log('Successfully updated index.html layout');
