import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const trailerRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.rubber-band-anim')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    let rafId;
    const animateTrailer = () => {
      trailerRef.current.x += (mouseRef.current.x - trailerRef.current.x) * 0.18;
      trailerRef.current.y += (mouseRef.current.y - trailerRef.current.y) * 0.18;
      setTrailerPos({ x: trailerRef.current.x, y: trailerRef.current.y });
      rafId = requestAnimationFrame(animateTrailer);
    };

    rafId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central crisp dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          backgroundColor: isHovered ? '#fd2155' : '#08fdd8',
          transform: `translate(-50%, -50%) ${isClicking ? 'scale(0.7)' : 'scale(1)'}`,
          boxShadow: isHovered ? '0 0 10px #fd2155' : '0 0 8px #08fdd8'
        }}
      />

      {/* Trailing smooth ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border transition-all duration-150 ease-out"
        style={{
          left: `${trailerPos.x}px`,
          top: `${trailerPos.y}px`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderColor: isHovered ? '#fd2155' : '#08fdd8',
          borderWidth: isHovered ? '2px' : '1px',
          opacity: isHovered ? 0.8 : 0.45,
          transform: `translate(-50%, -50%) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`,
          backgroundColor: isHovered ? 'rgba(253, 33, 85, 0.05)' : 'transparent'
        }}
      />
    </>
  );
}
