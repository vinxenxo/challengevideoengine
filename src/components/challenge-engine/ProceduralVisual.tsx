import { useEffect, useRef } from 'react';
import type { VisualType } from '@/data/challenge-engine';

export function ProceduralVisual({ type, compact = false, seed = 2718, paused = false }: { type: VisualType; compact?: boolean; seed?: number; paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, visible = true, elapsed = 0, last = 0;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colors = getComputedStyle(canvas);
    const ink = colors.getPropertyValue('--canvas-ink').trim();
    const accent = colors.getPropertyValue('--canvas-accent').trim();
    let width = 1, height = 1;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * .5, cy = height * .5, size = Math.min(width, height);
      const phase = (seed % 997) / 997 * Math.PI * 2;
      ctx.lineWidth = compact ? .8 : 1;
      ctx.strokeStyle = ink;
      if (type === 'waves') {
        for (let row = 0; row < 44; row++) {
          ctx.beginPath();
          for (let x = 0; x <= width; x += 5) {
            const nx = (x - cx) / size;
            const envelope = Math.exp(-nx * nx * 3);
            const y = cy + (row - 22) * size / 65 + Math.sin(nx * 9 + row * .13 + time * .32 + phase) * size * .18 * envelope + Math.cos(nx * 5 - row * .08 + time * .2) * size * .07;
            if (x === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          }
          ctx.globalAlpha = .25 + .65 * Math.sin((row / 44) * Math.PI); ctx.stroke();
        }
      } else if (type === 'bloom' || type === 'symmetry') {
        for (let ring = 0; ring < 35; ring++) {
          ctx.beginPath();
          for (let i = 0; i <= 240; i++) {
            const a = i / 240 * Math.PI * 2;
            const lobes = type === 'bloom' ? 7 : 6;
            const radius = size * (.035 + ring * .009) * (1 + .24 * Math.cos(a * lobes + ring * .16 + phase + time * .2));
            const rot = a + ring * .025 + time * .06;
            const x = cx + Math.cos(rot) * radius, y = cy + Math.sin(rot) * radius;
            if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          }
          ctx.globalAlpha = .3 + ring / 55; ctx.stroke();
        }
      } else {
        ctx.strokeStyle = accent;
        for (let i = 0; i < (compact ? 65 : 150); i++) {
          const a = i * 2.399963 + phase, radius = size * (.08 + ((i * 37 + seed) % 131) / 330);
          ctx.beginPath();
          for (let j = 0; j < 22; j++) {
            const t = time * .12 + j * .035;
            const twist = type === 'forces' ? Math.sin(a * 3 + t) * .65 : Math.sin(t + a) * .15;
            const x = cx + Math.cos(a + t + twist) * radius * (1 + .12 * Math.sin(t * 2 + a));
            const y = cy + Math.sin(a + t + twist) * radius * .82;
            if (j === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
          }
          ctx.globalAlpha = .25 + (i % 7) / 12; ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };
    const tick = (now: number) => {
      if (last) elapsed += Math.min(now - last, 50) / 1000;
      last = now; draw(elapsed); frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      draw(elapsed);
      if (visible && !document.hidden && !paused && !media.matches) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1,rect.width); height = Math.max(1,rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0); sync();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync(); });
    observer.observe(canvas);
    window.addEventListener('resize',resize); document.addEventListener('visibilitychange',sync); media.addEventListener('change',sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize',resize); document.removeEventListener('visibilitychange',sync); media.removeEventListener('change',sync); };
  },[type,seed,paused,compact]);
  return <canvas ref={ref} className={`procedural-canvas canvas-${type}`} role="img" aria-label={`${type} — seed-defined browser procedural illustration, not a production render`}>A deterministic procedural illustration. World: {type}. Seed: {seed}. This is not a D renderer output.</canvas>;
}
