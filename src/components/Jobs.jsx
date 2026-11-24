import { useEffect, useRef, useState } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll-reveal animation (replays every time it enters view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Job data — edit freely
  const jobs = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'TechNova Co., Ltd.',
      type: 'Full-time',
      location: 'Phnom Penh (Hybrid)',
      salary: '$1,200 – $1,800',
      desc: 'Build modern, high-performance web apps with React and TypeScript. Lead UI architecture and mentor junior devs.',
      tags: ['React', 'TypeScript', 'Next.js'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      id: 2,
      role: 'UI/UX Designer',
      company: 'Pixel Studio',
      type: 'Full-time',
      location: 'Remote',
      salary: '$900 – $1,400',
      desc: 'Design intuitive, beautiful interfaces for web and mobile. Create design systems and interactive prototypes in Figma.',
      tags: ['Figma', 'Prototyping', 'Design System'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
    },
    {
      id: 3,
      role: 'Backend Developer',
      company: 'CloudBase Solutions',
      type: 'Full-time',
      location: 'Phnom Penh',
      salary: '$1,000 – $1,600',
      desc: 'Build scalable REST/GraphQL APIs with Node.js and PostgreSQL. Optimize database queries and microservices.',
      tags: ['Node.js', 'PostgreSQL', 'GraphQL'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
    },
    {
      id: 4,
      role: 'Mobile App Developer',
      company: 'FreshWorks KH',
      type: 'Contract',
      location: 'Remote',
      salary: '$800 – $1,200',
      desc: 'Develop cross-platform mobile apps with Flutter. Integrate Firebase auth, push notifications, and real-time data.',
      tags: ['Flutter', 'Firebase', 'Dart'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
    },
  ];

  return (
    <section id="jobs" className={`jobs-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="jobs-header">
          <div className="jobs-eyebrow">
            <span className="jobs-eyebrow-line"></span>
            Open Positions
          </div>
          <h2 className="jobs-title">We're Hiring</h2>
        </div>

        {/* 4-column grid */}
        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className="job-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Top: icon + type badge */}
              <div className="job-card-top">
                <div className="job-icon-wrapper">{job.icon}</div>
                <span className={`job-badge ${job.type === 'Remote' || job.type === 'Contract' ? 'job-badge-alt' : ''}`}>
                  {job.type}
                </span>
              </div>

              {/* Role + company */}
              <h3 className="job-role">{job.role}</h3>
              <p className="job-company">{job.company}</p>

              {/* Meta */}
              <div className="job-meta">
                <div className="job-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {job.location}
                </div>
                <div className="job-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {job.salary}
                </div>
              </div>

              <p className="job-desc">{job.desc}</p>

              {/* Tags */}
              <div className="job-tags">
                {job.tags.map((tag) => (
                  <span key={tag} className="job-tag">{tag}</span>
                ))}
              </div>

              {/* Apply button */}
              <a href="#contact" className="job-apply-btn">
                Apply Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Jobs;