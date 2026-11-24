import { useEffect, useRef, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  // Reveal animation on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Projects', href: '#project' },
    { name: 'Jobs', href: '#jobs' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-.99-.02-1.94-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.67.8.55C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.24 2h3.31l-7.23 8.26L22.75 22h-6.66l-5.21-6.82L4.9 22H1.58l7.73-8.84L1.25 2h6.83l4.71 6.23L18.24 2zm-1.16 18h1.83L7.02 3.9H5.05L17.08 20z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`} ref={footerRef}>
      <div className="container footer-container">

        {/* Left: logo + tagline */}
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <div className="footer-logo-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="footer-logo-text">Brand<span>Logo</span></span>
          </a>
          <p className="footer-tagline">
            Building modern digital experiences with clean code & thoughtful design.
          </p>
        </div>

        {/* Center: nav links */}
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="footer-nav-link">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: socials */}
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="footer-social-btn"
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} BrandLogo. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <span className="footer-heart">♥</span> in Cambodia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;