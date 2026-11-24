import { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ចលនាពេលអូសមកដល់ (Replay Animation)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ទិន្នន័យសម្រាប់ ៤ ជួរឈរ (អ្នកអាចប្តូរអក្សរ និង Icon បានតាមចិត្ត)
  const galleryItems = [
    {
      id: 1,
      title: 'Web Design',
      desc: 'Modern, responsive and user-friendly interfaces.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Development',
      desc: 'Clean, scalable and high-performance code.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      id: 3,
      title: 'UI / UX',
      desc: 'Intuitive experiences that users love to use.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Branding',
      desc: 'Building strong, memorable brand identities.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      )
    }
  ];

  return (
    <section id="gallery" className={`gallery-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container">
        
        {/* Header ខាងលើ */}
        <div className="gallery-header">
          <div className="gallery-eyebrow">
            <span className="gallery-eyebrow-line"></span>
            My Expertise
          </div>
          <h2 className="gallery-title">What I Do</h2>
        </div>

        {/* បង្ហាញ ៤ ជួរឈរ (Grid) */}
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-card"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="gallery-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="gallery-card-title">{item.title}</h3>
              <p className="gallery-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;