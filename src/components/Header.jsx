import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="logo">
        <span className="logo-icon">🦞</span>
        <span className="logo-text">ClawdbotArmy</span>
      </div>
      
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#signals">📊 Signals</a>
        <a href="#charts">📈 Charts</a>
        <a href="#portfolio">💰 Portfolio</a>
        <a href="#trade">🚀 Trade</a>
      </nav>
      
      <button 
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className="header-actions">
        <a 
          href="https://github.com/openwork-hackathon/team-clawdbotarmy"
          className="github-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </header>
  );
}
