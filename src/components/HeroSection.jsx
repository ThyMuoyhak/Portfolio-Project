import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollProgress(Math.min(container.scrollTop / window.innerHeight, 1));
          ticking = false;
        });
        ticking = true;
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let isVisible = true;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const points = [];
    const radius = 160;
    for (let i = 0; i < 350; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 350);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }

    let rotX = 0;
    let rotY = 0;

    const rotateX = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };
    const rotateY = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
    };

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / dpr / 2;
      const cy = canvas.height / dpr / 2;
      rotX += 0.003;
      rotY += 0.005;

      // ទាញយកពណ៌ពី CSS Variables តាម Theme
      const computedStyle = getComputedStyle(document.body);
      const lineColor = computedStyle.getPropertyValue('--globe-line').trim();
      const dotColor = computedStyle.getPropertyValue('--globe-dot').trim();

      const projected = points.map(p => {
        let pt = rotateX(p, rotX);
        pt = rotateY(pt, rotY);
        const fov = 600;
        const scale = fov / (fov + pt.z);
        return { x: pt.x * scale + cx, y: pt.y * scale + cy, z: pt.z, scale };
      });

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      projected.forEach(p => {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) draw();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className={`hero ${scrollProgress < 0.5 ? 'visible' : ''}`}>
      <div className="container hero-2col">
        <div className="hero-text-col" style={{ opacity: 1 - scrollProgress * 1.5, transform: `translateY(${scrollProgress * -100}px)` }}>
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Available for new projects
          </div>
          <h1 className="hero-title">
            <span className="hero-line"><span className="hero-word">Hi, I'm</span></span>
            <span className="hero-line"><span className="hero-word gradient">Alex Carter</span></span>
            <span className="hero-line"><span className="hero-word">Creative Developer</span></span>
          </h1>
          <p className="hero-subtitle">
            I design and build fast, modern websites and web apps
            that turn ideas into unforgettable digital experiences.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="hero-btn primary"><span>Let's Talk</span></a>
          </div>
        </div>
        <div className="hero-visual-col">
          <div className="hero-sphere-container" style={{ opacity: 1 - scrollProgress * 1.5, transform: `translateY(${scrollProgress * 100}px) scale(${1 - scrollProgress * 0.2})`, filter: `blur(${scrollProgress * 10}px)` }}>
            <canvas ref={canvasRef} className="sphere-canvas"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;