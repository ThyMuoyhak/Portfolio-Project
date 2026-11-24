import { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let isRunning = true;

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

    let rotX = 0, rotY = 0;
    const rotateX = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };
    const rotateY = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
    };

    const draw = () => {
      if (!isRunning) return; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / dpr / 2, cy = canvas.height / dpr / 2;
      rotX += 0.003; rotY += 0.005;

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
          if (Math.sqrt(dx * dx + dy * dy) < 40) {
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
      isRunning = entry.isIntersecting;
      if (isRunning) draw(); 
    });
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="about" className={`about ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="container about-2col">
        <div className="about-visual-col">
          <div className="about-sphere-container"><canvas ref={canvasRef} className="sphere-canvas"></canvas></div>
        </div>
        <div className="about-text-col">
          <div className="about-eyebrow"><span className="about-eyebrow-line"></span>About Me</div>
          <h2 className="about-title">Hi, I'm <span className="about-name">Alex Carter</span></h2>
          <div className="about-bio">
            <p className="about-text">I'm a <strong>creative developer</strong> and <strong>designer</strong> based in a small studio with a big mission — to build digital experiences that feel effortless, look beautiful, and actually work.</p>
            <p className="about-text">I started coding <strong>5 years ago</strong> after falling in love with the idea that a few lines of code could create something people interact with every day.</p>
          </div>
          <div className="about-actions"><a href="#contact" className="about-btn primary">Let's Work Together</a></div>
        </div>
      </div>
    </section>
  );
};
export default About;