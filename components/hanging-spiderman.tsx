'use client';

import { useEffect, useRef, useState } from 'react';

export function HangingSpiderman() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ropeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const t1 = setTimeout(() => setShowBubble(true), 1200);
    const t2 = setTimeout(() => setFadingOut(true), 5500);
    const t3 = setTimeout(() => setShowBubble(false), 6300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !ropeCanvasRef.current) return;
    const canvas = ropeCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ROPE_W = 50;
    const ROPE_H = 180;
    canvas.width = ROPE_W * 2;
    canvas.height = ROPE_H * 2;
    ctx.scale(2, 2);

    const animate = () => {
      timeRef.current += 0.025;
      const t = timeRef.current;
      const angle = Math.sin(t * 1.2) * 2.5;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotate(${angle}deg)`;
      }

      ctx.clearRect(0, 0, ROPE_W, ROPE_H);
      const cx = ROPE_W / 2;

      const drawStrand = (
        phaseOffset: number, amplitude: number, freq: number,
        color: string, width: number, waviness: number
      ) => {
        ctx.beginPath();
        for (let y = 0; y <= ROPE_H; y += 0.8) {
          const wave = Math.sin(y * freq + phaseOffset + t * 0.6) * amplitude;
          const wobble = Math.sin(y * 0.25 + phaseOffset * 2 + t * 0.4) * waviness;
          const x = cx + wave + wobble;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      };

      drawStrand(0, 1.5, 0.08, 'rgba(200, 195, 190, 0.5)', 3, 1);
      drawStrand(0, 4, 0.15, 'rgba(210, 200, 195, 0.45)', 1.8, 0.5);
      drawStrand(Math.PI * 0.66, 4, 0.15, 'rgba(190, 185, 180, 0.4)', 1.6, 0.5);
      drawStrand(Math.PI * 1.33, 4, 0.15, 'rgba(175, 170, 165, 0.35)', 1.4, 0.5);
      drawStrand(Math.PI * 0.33, 5, 0.13, 'rgba(220, 215, 210, 0.2)', 0.7, 1.5);
      drawStrand(Math.PI, 5.5, 0.11, 'rgba(215, 210, 205, 0.18)', 0.6, 2);
      drawStrand(Math.PI * 1.5, 4.5, 0.14, 'rgba(210, 205, 200, 0.15)', 0.5, 1.8);

      const glow = ctx.createRadialGradient(cx, ROPE_H / 2, 0, cx, ROPE_H / 2, 8);
      glow.addColorStop(0, 'rgba(255, 245, 240, 0.04)');
      glow.addColorStop(1, 'rgba(255, 245, 240, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(cx - 8, 0, 16, ROPE_H);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="hidden md:block absolute pointer-events-none"
      style={{ top: '0px', left: '32px', zIndex: 51 }}
    >
      <div
        ref={wrapperRef}
        style={{
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <canvas
          ref={ropeCanvasRef}
          style={{ width: '50px', height: '180px', display: 'block', position: 'relative', zIndex: 2 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/spiderman.png"
          alt=""
          draggable={false}
          style={{
            width: '220px',
            objectFit: 'contain',
            display: 'block',
            marginTop: '-65px',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.5))',
          }}
        />

        {/* Welcome message — angular style */}
        {showBubble && (
          <div
            style={{
              position: 'absolute',
              right: '-200px',
              top: '200px',
              zIndex: 10,
              pointerEvents: 'none',
              opacity: fadingOut ? 0 : 1,
              transform: fadingOut ? 'scale(0.6) translateX(-20px)' : 'scale(1)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Arrow toward Spider-Man */}
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '18px',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '12px solid rgba(232, 72, 85, 0.5)',
            }} />

            {/* Angular message box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(232, 72, 85, 0.12), rgba(15, 10, 20, 0.92))',
              border: '1px solid rgba(232, 72, 85, 0.5)',
              borderRadius: '4px',
              padding: '12px 16px',
              maxWidth: '180px',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
              boxShadow: '0 4px 30px rgba(232, 72, 85, 0.1), 0 0 1px rgba(232, 72, 85, 0.4)',
            }}>
              <p style={{
                color: '#fff',
                fontSize: '13px',
                lineHeight: '1.5',
                margin: 0,
                fontWeight: 600,
                letterSpacing: '0.3px',
              }}>
                Welcome to my web!
              </p>
              <p style={{
                color: 'rgba(232, 72, 85, 0.7)',
                fontSize: '10px',
                margin: '4px 0 0 0',
                fontFamily: 'monospace',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                ▸ scroll to explore
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
