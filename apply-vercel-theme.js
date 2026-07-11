const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add Geist Font
const fontLink = `
    <!-- Geist Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap" rel="stylesheet">
`;
if (!content.includes('Geist+Mono')) {
    content = content.replace('</title>', '</title>' + fontLink);
}

// 2. Update Tailwind config
if (!content.includes("fontFamily: {")) {
    content = content.replace(
        "extend: {",
        "extend: {\\n                    fontFamily: {\\n                        sans: ['Geist', 'sans-serif'],\\n                        mono: ['Geist Mono', 'monospace'],\\n                    },"
    );
}

// 3. Update style block
const newStyle = `
        /* Vercel Theme */
        body {
            font-family: 'Geist', sans-serif;
            background-color: #000000;
            color: #ededed;
        }

        .modern-bg {
            background-color: #000000;
            position: relative;
            min-height: 100vh;
        }

        .modern-bg::before {
            display: none;
        }

        /* Card styles with Vercel theme */
        .card {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            box-shadow: none;
        }

        .card-dark {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            border-bottom: 1px solid #333333;
        }

        /* Gradient text to white for Vercel */
        .gradient-text, .gradient-text-accent {
            background: linear-gradient(180deg, #fff, #a1a1aa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #333333;
            border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555555;
        }

        /* Modern button styles */
        .btn-primary {
            background: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 6px;
            color: #000000;
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }

        .btn-primary:hover {
            background: #e5e5e5;
            border-color: #e5e5e5;
        }

        /* Search input modern style */
        .search-input {
            background: #000000;
            border: 1px solid #333333;
            transition: all 0.2s ease;
            color: white;
            border-radius: 6px;
        }

        .search-input:focus {
            background: #0a0a0a;
            border-color: #888888;
            outline: none;
            box-shadow: 0 0 0 1px #888888;
        }

        /* Fix select dropdown colors */
        .search-input option {
            background: #000000 !important;
            color: white !important;
            border: none;
        }

        .search-input select {
            color: white !important;
        }

        /* Ensure select elements have proper styling */
        select.search-input {
            color: white !important;
            background-color: #000000 !important;
        }

        select.search-input option {
            background-color: #000000 !important;
            color: white !important;
        }

        /* Suggestion item animations */
        .suggestion-item {
            transition: all 0.2s ease;
            border-radius: 6px;
            background: transparent;
            border: 1px solid transparent;
            margin: 2px 4px;
        }

        .suggestion-item:hover {
            background: #111111;
            border-color: #333333;
        }

        .suggestion-item.selected {
            background: #222222;
            border-color: #444444;
        }

        /* Stats cards */
        .stat-card {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 12px 16px;
        }

        /* Loading spinner */
        .spinner {
            border: 2px solid #333333;
            border-left: 2px solid #ffffff;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /* Performance optimizations */
        .will-change-transform {
            will-change: transform;
        }

        .gpu-accelerated {
            transform: translateZ(0);
        }

        /* Student details popup */
        .popup-overlay {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(4px);
        }

        .popup-content {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 1);
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }

        .info-card {
            background: #0a0a0a;
            border: 1px solid #333333;
            border-radius: 6px;
            padding: 16px;
            margin: 8px 0;
        }

        .info-label {
            color: #a1a1aa;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .info-value {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 500;
        }

        /* Enhanced suggestion dropdown */
        .suggestions-container {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 1);
        }

        .view-details-btn {
            background: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 6px;
            padding: 6px 12px;
            color: #000000;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .view-details-btn:hover {
            background: #e5e5e5;
            border-color: #e5e5e5;
        }

        /* Student result cards */
        .student-card {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 20px;
            transition: all 0.2s ease;
        }

        .student-card:hover {
            border-color: #888888;
        }

        /* Phase selection dropdown */
        #phaseSelector {
            background: #000000;
            border: 1px solid #333333;
            color: #ffffff;
            font-weight: 500;
            border-radius: 6px;
        }

        #phaseSelector:hover {
            border-color: #555555;
        }

        #phaseSelector:focus {
            border-color: #888888;
            outline: none;
            box-shadow: 0 0 0 1px #888888;
        }

        #phaseSelector option {
            background: #000000;
            color: #ffffff;
            padding: 12px;
        }

        /* College name styling */
        .college-name-primary {
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            line-height: 1.4;
            margin-bottom: 4px;
        }

        .college-code-secondary {
            font-size: 0.75rem;
            font-weight: 400;
            color: #a1a1aa;
            font-family: 'Geist Mono', monospace;
        }

        /* Enhanced student card styling */
        .student-list-item {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 16px;
            transition: all 0.2s ease;
        }

        .student-list-item:hover {
            border-color: #888888;
        }

        /* Branch styling */
        .branch-name {
            color: #a1a1aa;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.4;
        }

        /* Responsive improvements */
        @media (max-width: 1024px) {
            .college-name-primary {
                font-size: 0.875rem;
            }

            .branch-name {
                font-size: 0.9rem;
            }
        }

        /* Phase selector improvements */
        .phase-instruction-box {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
        }

        /* Compact list view */
        .student-list-item {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 8px;
            transition: all 0.2s ease;
            max-width: 100%;
        }

        .student-list-item:hover {
            border-color: #888888;
        }

        /* View toggle buttons */
        .view-toggle {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 4px;
            display: flex;
            gap: 4px;
        }

        .view-toggle-btn {
            padding: 8px 16px;
            border-radius: 6px;
            background: transparent;
            color: #a1a1aa;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .view-toggle-btn.active {
            background: #333333;
            color: white;
        }

        .view-toggle-btn:hover:not(.active) {
            color: white;
        }

        /* Pagination styles */
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 24px;
            flex-wrap: wrap;
        }

        .pagination-btn {
            padding: 8px 12px;
            border: 1px solid #333333;
            background: #000000;
            color: #a1a1aa;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
            min-width: 40px;
            text-align: center;
        }

        .pagination-btn:hover:not(.disabled) {
            border-color: #888888;
            color: white;
        }

        .pagination-btn.active {
            background: #ffffff;
            color: #000000;
            border-color: #ffffff;
        }

        .pagination-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .pagination-info {
            color: #a1a1aa;
            font-size: 0.875rem;
            margin: 0 16px;
        }

        .rank-badge {
            background: #ffffff;
            color: #000000;
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 1rem;
            border: 1px solid #ffffff;
        }

        .hall-ticket {
            background: #111111;
            border: 1px solid #333333;
            padding: 4px 8px;
            border-radius: 6px;
            font-family: 'Geist Mono', monospace;
            font-size: 0.85rem;
            color: #a1a1aa;
        }

        /* Ensure body can scroll */
        body {
            overflow-x: hidden;
            overflow-y: auto;
        }

        /* Navigation buttons (mostly unused now, but keeping for safety) */
        .nav-btn,
        .nav-btn-active,
        .nav-btn-cutoff {
            display: none;
        }

        /* Feature cards */
        .feature-card {
            background: #000000;
            border: 1px solid #333333;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .feature-card:hover {
            border-color: #888888;
        }
`;

const styleStartIndex = content.indexOf('<style>');
const styleEndIndex = content.indexOf('</style>') + '</style>'.length;

if (styleStartIndex !== -1 && styleEndIndex !== -1) {
    const beforeStyle = content.substring(0, styleStartIndex + '<style>'.length);
    const afterStyle = content.substring(styleEndIndex - '</style>'.length);
    
    content = beforeStyle + '\\n' + newStyle + '\\n    ' + afterStyle;
}

fs.writeFileSync(targetFile, content);
console.log('Successfully applied Vercel theme to index.html!');
