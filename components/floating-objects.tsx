'use client';

import { useEffect, useRef, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

// 0=normal, 1=button(pump), 2=card(jet)
type HoverMode = 0 | 1 | 2;

export function FloatingObjects() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevMouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const trailRef = useRef<TrailDot[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const hoverModeRef = useRef<HoverMode>(0);
  const pumpRef = useRef(0);
  const jetRef = useRef(0);
  const spidyIntroRef = useRef(0); // frames counter for intro message
  const mouseMovedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;
    const bgCtx = bgCanvas.getContext('2d');
    const fgCtx = fgCanvas.getContext('2d');
    if (!bgCtx || !fgCtx) return;

    const DOT_COUNT = 220;
    const LEG_RADIUS = 200;
    const LEG_COUNT = 6;
    const TRAIL_FADE = 0.015;

    const resize = () => {
      bgCanvas.width = fgCanvas.width = window.innerWidth;
      bgCanvas.height = fgCanvas.height = window.innerHeight;
      distributeDots();
    };

    const distributeDots = () => {
      const cols = Math.ceil(Math.sqrt(DOT_COUNT * (bgCanvas.width / bgCanvas.height)));
      const rows = Math.ceil(DOT_COUNT / cols);
      const cellW = bgCanvas.width / cols;
      const cellH = bgCanvas.height / rows;
      const dots: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (dots.length >= DOT_COUNT) break;
          dots.push({
            x: c * cellW + Math.random() * cellW,
            y: r * cellH + Math.random() * cellH,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            radius: Math.random() * 1.8 + 0.8,
            opacity: Math.random() * 0.5 + 0.3,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.025 + 0.008,
          });
        }
      }
      dotsRef.current = dots;
    };

    resize();
    window.addEventListener('resize', resize);

    const getHoverMode = (el: Element | null): HoverMode => {
      if (!el) return 0;
      // Check for skill cards first (data-hoverable)
      if (el.hasAttribute('data-hoverable') || el.closest('[data-hoverable]')) return 2;
      // Check for regular interactive elements (buttons, links)
      const tag = el.tagName.toLowerCase();
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return 1;
      if (el.getAttribute('role') === 'button') return 1;
      const parent = el.closest('a, button, [role="button"], input, textarea, select');
      if (parent) return 1;
      const style = window.getComputedStyle(el);
      if (style.cursor === 'pointer') return 1;
      return 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const target = document.elementFromPoint(e.clientX, e.clientY);
      hoverModeRef.current = getHoverMode(target);
      mouseMovedRef.current = true;
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // ---- Drawing helpers ----

    const drawSpiderBody = (cx: number, cy: number, angle: number, scale: number = 1) => {
      fgCtx.save();
      fgCtx.translate(cx, cy);
      fgCtx.rotate(angle);
      fgCtx.scale(scale, scale);

      fgCtx.beginPath();
      fgCtx.ellipse(-5, 0, 6, 5, 0, 0, Math.PI * 2);
      fgCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      fgCtx.fill();
      fgCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      fgCtx.lineWidth = 0.5;
      fgCtx.stroke();

      fgCtx.beginPath();
      fgCtx.ellipse(5, 0, 4, 3.5, 0, 0, Math.PI * 2);
      fgCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      fgCtx.fill();
      fgCtx.stroke();

      fgCtx.beginPath();
      fgCtx.arc(7.5, -1.5, 1, 0, Math.PI * 2);
      fgCtx.arc(7.5, 1.5, 1, 0, Math.PI * 2);
      fgCtx.fillStyle = 'rgba(232, 72, 85, 0.9)';
      fgCtx.fill();

      const grad = fgCtx.createRadialGradient(0, 0, 0, 0, 0, 20);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      fgCtx.beginPath();
      fgCtx.arc(0, 0, 20, 0, Math.PI * 2);
      fgCtx.fillStyle = grad;
      fgCtx.fill();

      fgCtx.restore();
    };

    const drawLeg = (
      bodyX: number, bodyY: number,
      footX: number, footY: number,
      alpha: number, walkOffset: number, legSide: number
    ) => {
      const dx = footX - bodyX;
      const dy = footY - bodyY;
      const dist = Math.hypot(dx, dy);
      const midX = bodyX + dx * 0.45;
      const midY = bodyY + dy * 0.45;
      const perpX = -dy / dist;
      const perpY = dx / dist;
      const bendAmount = dist * 0.3 + Math.sin(walkOffset) * 8;
      const jointX = midX + perpX * bendAmount * legSide;
      const jointY = midY + perpY * bendAmount * legSide;

      fgCtx.beginPath();
      fgCtx.moveTo(bodyX, bodyY);
      fgCtx.lineTo(jointX, jointY);
      fgCtx.lineTo(footX, footY);
      fgCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
      fgCtx.lineWidth = alpha * 2;
      fgCtx.lineJoin = 'round';
      fgCtx.stroke();

      fgCtx.beginPath();
      fgCtx.arc(jointX, jointY, 1.5, 0, Math.PI * 2);
      fgCtx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
      fgCtx.fill();

      fgCtx.beginPath();
      fgCtx.arc(footX, footY, 2, 0, Math.PI * 2);
      fgCtx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
      fgCtx.fill();
    };

    const drawJetCursor = (cx: number, cy: number, angle: number) => {
      fgCtx.save();
      fgCtx.translate(cx, cy);
      fgCtx.rotate(angle + Math.PI / 2);

      fgCtx.beginPath();
      fgCtx.moveTo(0, -12);
      fgCtx.lineTo(-7, 7);
      fgCtx.lineTo(0, 3);
      fgCtx.lineTo(7, 7);
      fgCtx.closePath();
      fgCtx.fillStyle = 'rgba(232, 72, 85, 0.9)';
      fgCtx.fill();
      fgCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      fgCtx.lineWidth = 0.8;
      fgCtx.stroke();

      fgCtx.beginPath();
      fgCtx.moveTo(0, -8);
      fgCtx.lineTo(-3, 4);
      fgCtx.lineTo(0, 2);
      fgCtx.lineTo(3, 4);
      fgCtx.closePath();
      fgCtx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      fgCtx.fill();

      const grad = fgCtx.createRadialGradient(0, 0, 0, 0, 0, 18);
      grad.addColorStop(0, 'rgba(232, 72, 85, 0.15)');
      grad.addColorStop(1, 'rgba(232, 72, 85, 0)');
      fgCtx.beginPath();
      fgCtx.arc(0, 0, 18, 0, Math.PI * 2);
      fgCtx.fillStyle = grad;
      fgCtx.fill();

      fgCtx.restore();
    };

    let lastTrailX = -9999;
    let lastTrailY = -9999;

    const animate = () => {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
      const dots = dotsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mode = hoverModeRef.current;
      timeRef.current += 0.06;

      // Smooth transitions
      const pumpTarget = mode === 1 ? 1 : 0;
      pumpRef.current += (pumpTarget - pumpRef.current) * 0.12;
      const pump = pumpRef.current;

      const jetTarget = mode === 2 ? 1 : 0;
      jetRef.current += (jetTarget - jetRef.current) * 0.15;
      const jet = jetRef.current;

      // ---- Background dots (behind cards) ----
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.twinkle += dot.twinkleSpeed;
        if (dot.x < -10) dot.x = bgCanvas.width + 10;
        if (dot.x > bgCanvas.width + 10) dot.x = -10;
        if (dot.y < -10) dot.y = bgCanvas.height + 10;
        if (dot.y > bgCanvas.height + 10) dot.y = -10;
        dot.vx += (Math.random() - 0.5) * 0.003;
        dot.vy += (Math.random() - 0.5) * 0.003;
        const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
        if (speed > 0.3) {
          dot.vx = (dot.vx / speed) * 0.3;
          dot.vy = (dot.vy / speed) * 0.3;
        }

        const tw = dot.opacity * (0.6 + Math.sin(dot.twinkle) * 0.4);
        bgCtx.beginPath();
        bgCtx.arc(dot.x, dot.y, dot.radius * 4, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(255, 255, 255, ${tw * 0.05})`;
        bgCtx.fill();
        bgCtx.beginPath();
        bgCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(255, 255, 255, ${tw})`;
        bgCtx.fill();
      }

      // ---- Foreground: spider / pump / jet ----
      if (mx > -999) {
        const pmx = prevMouseRef.current.x;
        const pmy = prevMouseRef.current.y;
        let angle = 0;
        if (pmx > -999) angle = Math.atan2(my - pmy, mx - pmx);

        // Body pump offset (mode 1: button hover)
        // sinVal: -1 (pulled back/up) to +1 (pushed forward/down)
        const sinVal = Math.sin(timeRef.current * 8);
        const pumpOffset = pump * sinVal * 18;
        const bodyX = mx;
        const bodyY = my + pumpOffset;

        // Scale: big when back (sinVal=-1), small when forward (sinVal=+1)
        // Range: 1.4 (back) to 0.6 (forward) during full pump
        const pumpScale = pump > 0.1 ? 1 + pump * (-sinVal) * 0.4 : 1;

        // Spider visibility: hide when jet is active
        const spiderAlpha = 1 - jet;

        if (spiderAlpha > 0.05) {
          fgCtx.globalAlpha = spiderAlpha;

          const nearDots = dots
            .map((dot, i) => ({ i, d: Math.hypot(dot.x - mx, dot.y - my) }))
            .filter(o => o.d < LEG_RADIUS && o.d > 15)
            .sort((a, b) => a.d - b.d)
            .slice(0, LEG_COUNT);

          // Legs connect from body (which pumps) to dots (which stay)
          nearDots.forEach(({ i, d }, legIndex) => {
            const dot = dots[i];
            const alpha = (1 - d / LEG_RADIUS);
            const walkPhase = timeRef.current * 3 + legIndex * Math.PI / 3;
            const side = legIndex % 2 === 0 ? 1 : -1;
            drawLeg(bodyX, bodyY, dot.x, dot.y, alpha, pump > 0.1 ? 0 : walkPhase, side);
          });

          // Spider body: pumped position, scaled, faces down during pump
          drawSpiderBody(bodyX, bodyY, pump > 0.1 ? Math.PI / 2 : angle, pumpScale);
          fgCtx.globalAlpha = 1;
        }

        // Jet cursor + trail (mode 2: skill card hover)
        if (jet > 0.05) {
          fgCtx.globalAlpha = jet;

          const distFromLast = Math.hypot(mx - lastTrailX, my - lastTrailY);
          if (distFromLast > 3) {
            const steps = Math.min(5, Math.floor(distFromLast / 3));
            for (let s = 0; s < steps; s++) {
              const frac = s / steps;
              trailRef.current.push({
                x: lastTrailX + (mx - lastTrailX) * frac + (Math.random() - 0.5) * 2,
                y: lastTrailY + (my - lastTrailY) * frac + (Math.random() - 0.5) * 2,
                alpha: 0.8 + Math.random() * 0.2,
                size: 0.8 + Math.random() * 1.2,
              });
            }
            lastTrailX = mx;
            lastTrailY = my;
          }

          drawJetCursor(mx, my, angle);
          fgCtx.globalAlpha = 1;
        }

        if (lastTrailX < -999) { lastTrailX = mx; lastTrailY = my; }
      }

      // Trail dots (always draw, fade naturally)
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const td = trail[i];
        td.alpha -= TRAIL_FADE;
        if (td.alpha <= 0) { trail.splice(i, 1); continue; }
        fgCtx.beginPath();
        fgCtx.arc(td.x, td.y, td.size * 3, 0, Math.PI * 2);
        fgCtx.fillStyle = `rgba(255, 255, 255, ${td.alpha * 0.05})`;
        fgCtx.fill();
        fgCtx.beginPath();
        fgCtx.arc(td.x, td.y, td.size, 0, Math.PI * 2);
        fgCtx.fillStyle = `rgba(255, 255, 255, ${td.alpha * 0.9})`;
        fgCtx.fill();
      }

      // ---- Spidy intro message (near cursor, first ~5 seconds) ----
      if (mouseMovedRef.current && spidyIntroRef.current < 350) {
        spidyIntroRef.current++;
        const introAlpha = spidyIntroRef.current < 280
          ? Math.min(1, spidyIntroRef.current / 30)
          : Math.max(0, (350 - spidyIntroRef.current) / 70);

        if (introAlpha > 0 && mx > -999) {
          const bx = mx + 35;
          const by = my - 30;

          fgCtx.save();
          fgCtx.globalAlpha = introAlpha * 0.95;

          // Angular box
          const bw = 155;
          const bh = 38;
          const cut = 8;
          fgCtx.beginPath();
          fgCtx.moveTo(bx, by);
          fgCtx.lineTo(bx + bw - cut, by);
          fgCtx.lineTo(bx + bw, by + cut);
          fgCtx.lineTo(bx + bw, by + bh);
          fgCtx.lineTo(bx + cut, by + bh);
          fgCtx.lineTo(bx, by + bh - cut);
          fgCtx.closePath();
          fgCtx.fillStyle = 'rgba(10, 6, 16, 0.88)';
          fgCtx.fill();
          fgCtx.strokeStyle = 'rgba(232, 72, 85, 0.5)';
          fgCtx.lineWidth = 1;
          fgCtx.stroke();

          // Arrow from box to spider
          fgCtx.beginPath();
          fgCtx.moveTo(bx, by + 15);
          fgCtx.lineTo(bx - 8, by + 19);
          fgCtx.lineTo(bx, by + 23);
          fgCtx.fillStyle = 'rgba(232, 72, 85, 0.5)';
          fgCtx.fill();

          // Text line 1
          fgCtx.font = '600 11px system-ui, sans-serif';
          fgCtx.fillStyle = '#fff';
          fgCtx.fillText("Hey! I'm ", bx + 10, by + 16);
          fgCtx.fillStyle = '#e84855';
          fgCtx.fillText('Spidy', bx + 65, by + 16);
          fgCtx.fillStyle = '#fff';
          fgCtx.fillText(' 🕷️', bx + 93, by + 16);

          // Text line 2
          fgCtx.font = '400 9.5px system-ui, sans-serif';
          fgCtx.fillStyle = 'rgba(154, 149, 168, 0.9)';
          fgCtx.fillText('Your navigation assistant', bx + 10, by + 31);

          fgCtx.restore();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <canvas ref={fgCanvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }} />
    </>
  );
}
