"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu toggle state

  // Fetch the local node js files through our Next.js API route
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/files");
        const data = await response.json();
        setFiles(data);
        if (data.length > 0) {
          setActiveFile(data[0]); // Default open the first file
        }
      } catch (error) {
        console.error("Error loading files:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  // Helper to add advanced syntax highlighting for JavaScript files
  const renderContent = (file) => {
    if (!file || !file.content) return null;
    
    if (file.name.endsWith(".js")) {
      const lines = file.content.split("\n");
      
      return lines.map((line, index) => {
        // 1. Comments (Entire line formatting)
        if (line.trim().startsWith("//")) {
          return (
            <div key={index} className="code-comment">
              {line || " "}
            </div>
          );
        }

        // 2. Syntax parsing for standard executable lines
        let formattedLine = line;

        // Keywords
        const keywords = ['const ', 'let ', 'var ', 'function ', 'return ', 'require(', 'module.exports'];
        keywords.forEach(kw => {
          // Careful replacement to avoid breaking HTML we inject
          if (line.includes(kw)) {
             formattedLine = formattedLine.replace(new RegExp(`\\b${kw.replace('(', '\\(')}\\b`, 'g'), `<span class="code-keyword">${kw}</span>`);
          }
        });

        // Built-ins
        const builtIns = ['console', 'path', 'os', 'cp', 'fs'];
        builtIns.forEach(bi => {
            formattedLine = formattedLine.replace(new RegExp(`\\b${bi}\\b`, 'g'), `<span class="code-built-in">${bi}</span>`);
        });

        // Strings (Single quotes)
        formattedLine = formattedLine.replace(/'([^']+)'/g, '<span class="code-string">\'$1\'</span>');
        
        // Strings (Double quotes)
        formattedLine = formattedLine.replace(/"([^"]+)"/g, '<span class="code-string">"$1"</span>');

        // Numbers
        formattedLine = formattedLine.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');

        return (
          <div 
            key={index} 
            className="code-line" 
            dangerouslySetInnerHTML={{ __html: formattedLine || " " }} 
          />
        );
      });
    }

    // Otherwise, return standard text
    return file.content;
  };

  const handleFileSelect = (file) => {
    setActiveFile(file);
    setMobileMenuOpen(false); // Close sidebar on mobile when file is selected
  }

  return (
    <div className="app-container">
      {/* Mobile Top Header (Only visible on small screens) */}
      <div className="mobile-header">
        <h1>Learning Hub</h1>
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           {/* Hamburger Icon */}
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`mobile-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Glassmorphic Sidebar */}
      <nav className={`glass-panel sidebar animate-fade-in ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>Learning Hub</h1>
          <p>Your local Node.js playground</p>
        </div>

        <div className="file-list">
          {loading ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", padding: "0 12px" }}>
              Loading files...
            </p>
          ) : files.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", padding: "0 12px" }}>
              No .js files found.
            </p>
          ) : (
            files.map((file) => (
              <button
                key={file.name}
                onClick={() => handleFileSelect(file)}
                className={`file-btn ${
                  activeFile?.name === file.name ? "active" : ""
                }`}
              >
                {/* SVG Icon for JS/TXT file */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                {file.name}
              </button>
            ))
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="glass-panel main-content animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {activeFile ? (
          <>
            <div className="content-header">
              <h2>{activeFile.name}</h2>
              <span className="badge">
                {activeFile.name.endsWith(".js") ? "JavaScript" : "Text Data"}
              </span>
            </div>
            
            <div className="code-container">
              {/* Highlighted code display */}
              <pre>{renderContent(activeFile)}</pre>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              textAlign: "center",
              padding: "20px"
            }}
          >
            {loading ? "Initializing workspace..." : "Select a file to begin learning"}
          </div>
        )}
      </main>
    </div>
  );
}
