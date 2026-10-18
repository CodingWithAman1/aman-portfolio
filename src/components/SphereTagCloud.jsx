import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/audio';

// Aman Sharma's exact technical stack
const TAGS = [
  'Python', 'JavaScript (ES6+)', 'Flask 3.x', 'PostgreSQL', 'SQLite',
  'SQLAlchemy 2.0', 'Gemini Vision AI', 'RESTful APIs', 'Tailwind CSS',
  'Bootstrap 5', 'Chart.js', 'C Language', 'HTML5 & CSS3', 'Vercel Serverless',
  'Render Cloud', 'Netlify', 'Git & GitHub', 'Postman', 'Leaflet GPS',
  'Cloudinary', 'LeetCode (200+)', 'Data Structures', 'Algorithms', 'DBMS'
];

export default function SphereTagCloud() {
  const containerRef = useRef(null);
  const [activeTag, setActiveTag] = useState(null);
  const itemsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0.002, targetY: 0.002 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = TAGS.length;
    const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.44 || 200;

    // Distribute points on sphere using Fibonacci spiral
    itemsRef.current = TAGS.map((tag, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        text: tag,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        radius
      };
    });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      mouseRef.current.targetX = dy * 0.0006;
      mouseRef.current.targetY = -dx * 0.0006;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0.002;
      mouseRef.current.targetY = 0.002;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let angleX = 0.002;
    let angleY = 0.002;

    const tick = () => {
      angleX += (mouseRef.current.targetX - angleX) * 0.05;
      angleY += (mouseRef.current.targetY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      itemsRef.current.forEach((item) => {
        // Rotate around Y
        const x1 = item.x * cosY - item.z * sinY;
        const z1 = item.x * sinY + item.z * cosY;

        // Rotate around X
        const y2 = item.y * cosX - z1 * sinX;
        const z2 = item.y * sinX + z1 * cosX;

        item.x = x1;
        item.y = y2;
        item.z = z2;
      });

      // Force state update through DOM direct manipulation for maximum 60fps performance
      const elements = container.querySelectorAll('.tag-sphere-item');
      itemsRef.current.forEach((item, idx) => {
        const el = elements[idx];
        if (!el) return;

        const depth = radius * 2;
        const scale = (item.z + depth) / (depth * 1.3);
        const alpha = Math.max(0.2, Math.min(1, (item.z + radius) / (radius * 1.8)));
        const left = item.x + container.offsetWidth / 2;
        const top = item.y + container.offsetHeight / 2;

        el.style.transform = `translate3d(${left}px, ${top}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = alpha.toFixed(2);
        el.style.zIndex = Math.round(item.z + radius);
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[540px] h-[420px] md:h-[480px] lg:h-[520px] mx-auto select-none overflow-hidden"
    >
      {TAGS.map((tag, i) => (
        <span
          key={i}
          className={`tag-sphere-item absolute left-0 top-0 cursor-pointer text-sm md:text-base lg:text-lg font-bold px-2.5 py-1 rounded transition-colors whitespace-nowrap will-change-transform ${
            activeTag === tag
              ? 'text-[#08fdd8] drop-shadow-[0_0_16px_#08fdd8] scale-125'
              : 'text-[#909090] hover:text-[#08fdd8]'
          }`}
          onMouseEnter={() => {
            setActiveTag(tag);
            sound.playButtonHover();
          }}
          onMouseLeave={() => setActiveTag(null)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
