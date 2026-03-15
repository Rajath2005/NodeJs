"use client";

import { useEffect, useState } from "react";

// Pure React tokenizer - no dangerouslySetInnerHTML, no broken regex
function tokenizeLine(line) {
  const tokens = [];
  let remaining = line;
  let key = 0;

  const patterns = [
    { regex: /'[^']*'/, className: "tok-string" },
    { regex: /"[^"]*"/, className: "tok-string" },
    { regex: /\b(const|let|var|function|return|if|else|try|catch|finally|async|await|new|throw|class|import|from|export|default)\b/, className: "tok-keyword" },
    { regex: /\b(require|module\.exports|module)\b/, className: "tok-keyword" },
    { regex: /\b(console|path|os|cp|fs|process|Math|JSON|Promise|Array|Object|String|Number|Boolean|Error|Buffer|global)\b/, className: "tok-builtin" },
    { regex: /\.\b(log|join|resolve|extname|basename|dirname|readFileSync|readdirSync|statSync|isFile|execSync|arch|platform|networkInterfaces|cpus|freemem|totalmem|uptime|userInfo|cwd)\b/, className: "tok-method" },
    { regex: /\b\d+\.?\d*\b/, className: "tok-number" },
  ];

  while (remaining.length > 0) {
    let earliest = null;
    let earliestIndex = remaining.length;
    let matchedPattern = null;

    for (const pat of patterns) {
      const match = remaining.match(pat.regex);
      if (match && match.index < earliestIndex) {
        earliest = match;
        earliestIndex = match.index;
        matchedPattern = pat;
      }
    }

    if (earliest && matchedPattern) {
      // Push any plain text before the match
      if (earliestIndex > 0) {
        tokens.push(<span key={key++} className="tok-plain">{remaining.substring(0, earliestIndex)}</span>);
      }
      // Push the highlighted token
      tokens.push(<span key={key++} className={matchedPattern.className}>{earliest[0]}</span>);
      remaining = remaining.substring(earliestIndex + earliest[0].length);
    } else {
      // No more matches, push the rest as plain text
      tokens.push(<span key={key++} className="tok-plain">{remaining}</span>);
      break;
    }
  }

  return tokens;
}

export default function Home() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("/api/files");
        const data = await res.json();
        setFiles(data);
        if (data.length > 0) setActiveFile(data[0]);
      } catch (err) {
        console.error("Error loading files:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  const renderCode = (file) => {
    if (!file || !file.content) return null;

    const lines = file.content.split("\n");

    return lines.map((line, i) => {
      // Comment lines
      if (line.trim().startsWith("//")) {
        return <div key={i} className="line comment-line">{line || "\u00A0"}</div>;
      }
      // Code lines with tokenized highlighting
      return <div key={i} className="line code-line">{tokenizeLine(line) || "\u00A0"}</div>;
    });
  };

  const selectFile = (file) => {
    setActiveFile(file);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Mobile Header ── */}
      <header className="mob-header">
        <h1 className="gradient-text">Learning Hub</h1>
        <button className="mob-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* ── Backdrop (mobile only) ── */}
      {menuOpen && <div className="mob-backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="shell">
        {/* ── Sidebar ── */}
        <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
          <div className="sidebar__head">
            <h1 className="gradient-text">Learning Hub</h1>
            <p>Your Node.js playground</p>
          </div>

          <nav className="sidebar__list">
            {loading && <p className="sidebar__hint">Loading…</p>}
            {!loading && files.length === 0 && <p className="sidebar__hint">No files found.</p>}
            {files.map((f) => (
              <button
                key={f.name}
                className={`sidebar__btn ${activeFile?.name === f.name ? "sidebar__btn--active" : ""}`}
                onClick={() => selectFile(f)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                <span>{f.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main viewer ── */}
        <main className="viewer">
          {activeFile ? (
            <>
              <div className="viewer__head">
                <h2 className="viewer__title">{activeFile.name}</h2>
                <span className="viewer__badge">
                  {activeFile.name.endsWith(".js") ? "JavaScript" : "Text"}
                </span>
              </div>
              <div className="viewer__code">
                <pre>{renderCode(activeFile)}</pre>
              </div>
            </>
          ) : (
            <div className="viewer__empty">
              {loading ? "Loading…" : "Select a file to begin learning"}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
