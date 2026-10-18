import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sliders, RefreshCw, Eye, Sparkles } from 'lucide-react';

const PRESETS = [
  { id: 'ribbon', name: 'Pink Ribbon (Original)' },
  { id: 'spirograph', name: '3D Spirograph Knot' },
  { id: 'attractor', name: 'Quantum Vortex' },
  { id: 'harmonic', name: 'Harmonic Waves' }
];

const COLOR_THEMES = [
  { id: 'magenta', name: 'Neon Pink (Default)', color: '#fd2155', glow: 'rgba(253, 33, 85, 0.6)', secondary: '#ff6b8b' },
  { id: 'cyberpunk', name: 'Cyberpunk Dual', color: '#fd2155', glow: 'rgba(8, 253, 216, 0.5)', secondary: '#08fdd8' },
  { id: 'cyan', name: 'Electric Cyan', color: '#08fdd8', glow: 'rgba(8, 253, 216, 0.6)', secondary: '#80ffea' },
  { id: 'matrix', name: 'Matrix Emerald', color: '#00ff88', glow: 'rgba(0, 255, 136, 0.6)', secondary: '#66ffb3' },
  { id: 'solar', name: 'Solar Amber', color: '#ffaa00', glow: 'rgba(255, 170, 0, 0.6)', secondary: '#ffdd66' }
];

export default function LiveRibbonCanvas() {
  const canvasRef = useRef(null);
  const [preset, setPreset] = useState('ribbon');
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0]);
  const [strands, setStrands] = useState(38);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isInteractive, setIsInteractive] = useState(true);

  // Interaction refs
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
    dragStartX: 0,
    dragStartY: 0,
    rotX: 0.15,
    rotY: -0.25,
    targetRotX: 0.15,
    targetRotY: -0.25
  });

  const animStateRef = useRef({
    time: 0,
    lastFrame: 0,
    rafId: null
  });

  // Handle mouse move across window or canvas
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / innerHeight) * 2 - 1;

      mouseRef.current.targetX = normalizedX;
      mouseRef.current.targetY = normalizedY;

      if (mouseRef.current.isDown) {
        const deltaX = (e.clientX - mouseRef.current.dragStartX) * 0.008;
        const deltaY = (e.clientY - mouseRef.current.dragStartY) * 0.008;
        mouseRef.current.targetRotY += deltaX;
        mouseRef.current.targetRotX += deltaY;
        mouseRef.current.dragStartX = e.clientX;
        mouseRef.current.dragStartY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      // Don't intercept clicks on control panel
      if (e.target.closest('.ribbon-control-panel')) return;
      mouseRef.current.isDown = true;
      mouseRef.current.dragStartX = e.clientX;
      mouseRef.current.dragStartY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const numPoints = 220; // Number of points along the curve
    const focalLength = 480;

    const render = (now) => {
      if (!animStateRef.current.lastFrame) {
        animStateRef.current.lastFrame = now;
      }
      const dt = Math.min((now - animStateRef.current.lastFrame) / 1000, 0.1);
      animStateRef.current.lastFrame = now;
      animStateRef.current.time += dt * speed;
      const t = animStateRef.current.time;

      // Smooth mouse damping
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      if (!m.isDown) {
        // Natural subtle idle breathing & mouse tilt
        m.targetRotY = -0.25 + m.x * 0.45 + Math.sin(t * 0.3) * 0.1;
        m.targetRotX = 0.15 + m.y * 0.35 + Math.cos(t * 0.25) * 0.08;
      }
      m.rotY += (m.targetRotY - m.rotY) * 0.08;
      m.rotX += (m.targetRotX - m.rotX) * 0.08;

      // Clear canvas with subtle trail effect or clean clear
      ctx.clearRect(0, 0, width, height);

      // Center of projection - in hero section, slightly offset to right and vertically centered
      const cx = width * 0.52;
      const cy = height * 0.50;
      const baseScale = Math.min(width, height) * 0.58;

      // Trigonometric cache for 3D rotation
      const cosY = Math.cos(m.rotY);
      const sinY = Math.sin(m.rotY);
      const cosX = Math.cos(m.rotX);
      const sinX = Math.sin(m.rotX);

      // Blend mode for neon luminosity
      ctx.globalCompositeOperation = 'screen';

      const strandCount = strands;
      const ribbonWidth = baseScale * 0.24;

      // Draw each strand
      for (let s = 0; s < strandCount; s++) {
        const strandRatio = (s / (strandCount - 1)) - 0.5; // -0.5 to +0.5
        const strandOffset = strandRatio * ribbonWidth;

        // Opacity variation across the ribbon (brighter in center, fading smoothly at edges)
        const edgeFactor = 1 - Math.abs(strandRatio * 1.8);
        const alpha = Math.max(0.12, Math.min(0.65, edgeFactor * 0.55));

        // Strand color interpolation
        if (colorTheme.id === 'cyberpunk') {
          ctx.strokeStyle = s % 2 === 0
            ? `rgba(253, 33, 85, ${alpha})`
            : `rgba(8, 253, 216, ${alpha * 0.9})`;
        } else {
          ctx.strokeStyle = `${colorTheme.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        }
        ctx.lineWidth = 1.1;

        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= numPoints; i++) {
          const u = (i / numPoints) * Math.PI * 2;

          let rawX = 0;
          let rawY = 0;
          let rawZ = 0;

          // Compute 3D space curves based on preset
          if (preset === 'ribbon') {
            // The exact elegant looping ribbon from the reference image
            // Harmonic parametric space curve with characteristic sweeping figure-eights
            const p1 = t * 0.4;
            const p2 = t * 0.3;

            // X coordinates: horizontal sweep and loop
            rawX = Math.sin(u + p1) * 0.95 + Math.sin(u * 2 - p2) * 0.35;
            // Y coordinates: elegant vertical spine and loops
            rawY = Math.cos(u * 1.5 + p2) * 0.85 + Math.sin(u * 0.5) * 0.45;
            // Z coordinates: depth loop
            rawZ = Math.cos(u * 2 + p1) * 0.65 + Math.sin(u * 3) * 0.25;

            // Offset across normal for parallel ribbon strands
            const nx = Math.cos(u + p1) * 0.7;
            const ny = -Math.sin(u * 1.5 + p2) * 0.5;
            const nz = Math.sin(u * 2) * 0.8;

            rawX += nx * strandRatio * 0.42;
            rawY += ny * strandRatio * 0.42;
            rawZ += nz * strandRatio * 0.42;

          } else if (preset === 'spirograph') {
            // 3D Lissajous Trefoil Knot
            const p = 2;
            const q = 3;
            const r = 0.6 + 0.35 * Math.sin(t * 0.4 + strandRatio * 0.5);
            rawX = r * (Math.cos(p * u + t * 0.3) + 0.3 * Math.cos(q * u));
            rawY = r * (Math.sin(p * u + t * 0.3) - 0.3 * Math.sin(q * u));
            rawZ = 0.5 * Math.sin(q * u + t * 0.5) + strandRatio * 0.28;

          } else if (preset === 'attractor') {
            // Quantum Lorenz / Rossler inspired attractor ribbons
            const a = 1.1;
            const b = 0.9;
            rawX = Math.sin(u * 2 + t * 0.5) * Math.cos(u + strandRatio * 0.4) * a;
            rawY = Math.sin(u * 3 - t * 0.3) * 0.85;
            rawZ = Math.cos(u * 2 + t * 0.4) * b + strandRatio * 0.35;

          } else {
            // Harmonic wave ribbon
            rawX = (u / Math.PI - 1) * 1.4;
            rawY = Math.sin(u * 3 + t * 0.9 + strandRatio * 2) * 0.45 + Math.cos(u * 1.5 - t * 0.5) * 0.3;
            rawZ = Math.cos(u * 2 + t * 0.7) * 0.5 + strandRatio * 0.3;
          }

          // Scale to base size
          const px = rawX * baseScale;
          const py = rawY * baseScale;
          const pz = rawZ * baseScale;

          // 3D Rotation: Yaw around Y axis
          const x1 = px * cosY - pz * sinY;
          const z1 = px * sinY + pz * cosY;

          // Pitch around X axis
          const y2 = py * cosX - z1 * sinX;
          const z2 = py * sinX + z1 * cosX;

          // Perspective projection
          const perspective = focalLength / (focalLength + z2 + baseScale * 0.5);
          const screenX = cx + x1 * perspective;
          const screenY = cy + y2 * perspective;

          if (!started) {
            ctx.moveTo(screenX, screenY);
            started = true;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }

      // Render glowing leading particle / apex spark
      const leadU = (t * 0.8) % (Math.PI * 2);
      const leadX = Math.sin(leadU + t * 0.4) * 0.95 * baseScale;
      const leadY = Math.cos(leadU * 1.5 + t * 0.3) * 0.85 * baseScale;
      const leadZ = Math.cos(leadU * 2 + t * 0.4) * 0.65 * baseScale;

      const lx1 = leadX * cosY - leadZ * sinY;
      const lz1 = leadX * sinY + leadZ * cosY;
      const ly2 = leadY * cosX - lz1 * sinX;
      const lz2 = leadY * sinX + lz1 * cosX;
      const lPersp = focalLength / (focalLength + lz2 + baseScale * 0.5);

      const sparkX = cx + lx1 * lPersp;
      const sparkY = cy + ly2 * lPersp;

      // Glow pulse at head
      const radialGrad = ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, 14);
      radialGrad.addColorStop(0, '#ffffff');
      radialGrad.addColorStop(0.3, colorTheme.secondary);
      radialGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animStateRef.current.rafId = requestAnimationFrame(render);
    };

    animStateRef.current.rafId = requestAnimationFrame(render);

    return () => {
      if (animStateRef.current.rafId) {
        cancelAnimationFrame(animStateRef.current.rafId);
      }
      window.removeEventListener('resize', resize);
    };
  }, [preset, colorTheme, strands, speed]);

  const resetRotation = useCallback(() => {
    mouseRef.current.targetRotX = 0.15;
    mouseRef.current.targetRotY = -0.25;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* The 3D Ribbon Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D live animation in space!"
      />

      {/* Interactive Controls Floating Widget */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto ribbon-control-panel">
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#181818]/90 hover:bg-[#252525] border border-[#333333] hover:border-[#08fdd8] text-xs text-white/90 shadow-2xl backdrop-blur-md transition-all duration-300"
          title="Customize live 3D animation"
        >
          <Sliders size={14} className="text-[#08fdd8]" />
          <span>Animation Controls</span>
          <span className="w-2 h-2 rounded-full bg-[#fd2155] animate-ping" />
        </button>

        {showControls && (
          <div className="absolute bottom-12 right-0 w-72 p-4 rounded-xl bg-[#161616]/95 border border-[#333333] shadow-2xl backdrop-blur-xl text-white text-xs space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#282828] pb-2">
              <span className="font-semibold text-sm flex items-center gap-1.5 text-white">
                <Sparkles size={14} className="text-[#08fdd8]" />
                Animation Settings
              </span>
              <button
                onClick={resetRotation}
                className="text-[#8d8d8d] hover:text-[#08fdd8] flex items-center gap-1 transition-colors"
                title="Reset 3D camera angle"
              >
                <RefreshCw size={11} /> Reset
              </button>
            </div>

            {/* Shape Preset */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8d8d8d] block mb-1.5 font-mono">
                Mathematical Shape
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreset(p.id)}
                    className={`px-2 py-1.5 rounded text-left truncate transition-all ${
                      preset === p.id
                        ? 'bg-[#fd2155]/20 text-[#fd2155] border border-[#fd2155]/60 font-medium'
                        : 'bg-[#222222] text-[#aaaaaa] hover:bg-[#2b2b2b] hover:text-white border border-transparent'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8d8d8d] block mb-1.5 font-mono">
                Neon Palette
              </label>
              <div className="flex items-center gap-2">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setColorTheme(theme)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      colorTheme.id === theme.id ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.name}
                  />
                ))}
              </div>
            </div>

            {/* Strands Count */}
            <div>
              <div className="flex justify-between text-[11px] text-[#8d8d8d] mb-1">
                <span>Density / Strands</span>
                <span className="text-[#08fdd8] font-mono">{strands}</span>
              </div>
              <input
                type="range"
                min="16"
                max="60"
                step="2"
                value={strands}
                onChange={(e) => setStrands(parseInt(e.target.value))}
                className="w-full accent-[#fd2155] bg-[#333333] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-[#8d8d8d] mb-1">
                <span>Motion Velocity</span>
                <span className="text-[#08fdd8] font-mono">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-[#08fdd8] bg-[#333333] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="text-[10px] text-[#777777] italic pt-1 border-t border-[#252525]">
              💡 Tip: Click and drag anywhere on the canvas to orbit and inspect in 3D!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
