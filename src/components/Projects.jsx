import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
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

  // ទិន្នន័យគម្រោង ៤ (អ្នកអាចបន្ថែម ឬប្តូរបាន)
  const projects = [
    {
      id: 1,
      title: 'E-Commerce',
      category: 'Web App',
      desc: 'A full-featured online store with seamless checkout and dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
      tags: ['React', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'UI/UX',
      desc: 'A clean, data-driven analytics dashboard for a B2B startup.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Figma', 'React'],
      link: '#'
    },
    {
      id: 3,
      title: 'Brand Identity',
      category: 'Design',
      desc: 'Complete visual identity and design system for a tech brand.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      tags: ['Branding', 'UI'],
      link: '#'
    },
    {
      id: 4,
      title: 'Mobile App',
      category: 'App',
      desc: 'A cross-platform fitness app with real-time tracking features.',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop',
      tags: ['Flutter', 'Firebase'],
      link: '#'
    }
  ];

  return (
    <section id="project" className={`projects-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container">
        
        {/* Header */}
        <div className="projects-header">
          <div className="projects-eyebrow">
            <span className="projects-eyebrow-line"></span>
            Recent Work
          </div>
          <h2 className="projects-title">Featured Projects</h2>
        </div>

        {/* ប្លង់ ៤ ជួរឈរ (4 Columns Grid) */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <a 
              href={project.link} 
              key={project.id} 
              className="project-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* រូបភាពគម្រោង */}
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <span className="project-view-btn">View</span>
                </div>
              </div>

              {/* ព័ត៌មានលម្អិត */}
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                
                {/* Tags */}
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;