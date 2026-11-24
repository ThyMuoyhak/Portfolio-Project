import { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    const target = container || window;

    const handleScroll = () => {
      const y = container ? container.scrollTop : window.scrollY;
      setIsScrolled(y > 20);
    };

    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Project', href: '#project' },
    { name: 'Jobs', href: '#jobs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <a href="#home" className="logo">
          <div className="logo-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="logo-text">Brand<span>Logo</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={item.name} className="nav-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <a href={item.href} className="nav-link">
                  <span className="nav-text">{item.name}</span>
                  <span className="nav-underline"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          {/* ☀️/🌙 ប៊ូតុងបិទបើក Theme */}
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <a href="#contact" className="cta-button">
            <span>Get Started</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-list">
          {navItems.map((item, index) => (
            <li key={item.name} style={{ animationDelay: `${index * 0.1}s` }}>
              <a
                href={item.href}
                className="nav-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav-mobile-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;