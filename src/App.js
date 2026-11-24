import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Gallery from './components/Gallery';
import Projects from './components/Projects';
import Jobs from './components/Jobs';
import Contact from './components/Contact';
import NetworkBackground from './components/NetworkBackground';
import './App.css';

function App() {
  // កំណត់ Theme ដើម (Dark Mode)
  const [theme, setTheme] = useState('dark');

  const scrollContainerRef = useRef(null);
  const isScrolling = useRef(false);
  const currentSection = useRef(0);

  // បញ្ជូន Theme ទៅកាន់ <body> ដើម្បីអោយ CSS ដឹង
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // គ្រប់គ្រងការអូស ១ ដង = ១ Section (Slow & Smooth)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('section');
    const totalSections = sections.length;

    const scrollToSection = (index) => {
      if (index < 0 || index >= totalSections) return;

      isScrolling.current = true;
      const targetY = index * window.innerHeight;

      container.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      currentSection.current = index;

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    const handleWheel = (e) => {
      // ✅ បើនៅ Section ចុងក្រោយ & អូសចុះ → បើកអោយ Browser អូសទៅ Footer ធម្មតា
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 5;

      if (atBottom && e.deltaY > 0) return;

      e.preventDefault();

      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection.current + 1);
      } else {
        scrollToSection(currentSection.current - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // អនុគមន៍ប្តូរ Theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="App">
      {/* ផ្ទៃខាងក្រោយមាន Animation (Canvas) */}
      <NetworkBackground theme={theme} />

      {/* Header មានប៊ូតុង Theme និង Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* ប្រអប់អូសសម្រាប់ Section ទាំងអស់ */}
      <div className="scroll-container" id="scroll-container" ref={scrollContainerRef}>

        {/* ១. Hero Section */}
        <HeroSection />

        {/* ២. About Section */}
        <About />

        {/* ៣. Gallery Section — 4 columns, icon + text */}
        <Gallery />

        {/* ៤. Projects Section — 4 columns, image + info */}
        <Projects />

        {/* ៥. Jobs Section — 4 columns, icon + badge + salary + apply */}
        <Jobs />

        {/* ៦. Contact Section — info cards + form */}
        <Contact />

      </div>

      {/* ✅ Footer — សាមញ្ញតែ Copyright */}
      <footer className="app-footer">
        <div className="container app-footer-inner">
          <p className="app-footer-copy">
            © {new Date().getFullYear()} BrandLogo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;