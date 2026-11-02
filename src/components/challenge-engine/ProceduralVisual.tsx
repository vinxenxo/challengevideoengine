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
      } else if (drawAmbient(ctx, type, time, width, height, phase, ink, accent)) {
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


type Ctx = CanvasRenderingContext2D;
function drawAmbient(ctx: Ctx, type: VisualType, t: number, w: number, h: number, ph: number, ink: string, accent: string): boolean {
  const cx = w / 2, cy = h / 2, s = Math.min(w, h);
  const line = (pts: [number, number][], alpha: number) => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.globalAlpha = alpha; ctx.stroke(); };
  switch (type) {
    case 'lissajous': {
      for (let k = 0; k < 14; k++) { const pts: [number, number][] = []; for (let i = 0; i <= 400; i++) { const a = i / 400 * Math.PI * 2; pts.push([cx + Math.sin(a * 3 + t * .25 + k * .05 + ph) * w * .42, cy + Math.sin(a * 4 + k * .09) * h * .4]); } ctx.strokeStyle = k % 4 ? ink : accent; line(pts, .15 + k / 30); }
      return true; }
    case 'orbits': {
      for (let r = 1; r <= 9; r++) { const R = s * .05 * r; ctx.strokeStyle = ink; ctx.globalAlpha = .18; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.5, R * .55, -.35, 0, Math.PI * 2); ctx.stroke();
        for (let m = 0; m < 3; m++) { const a = t * (.9 / r) + m * 2.1 + r + ph; const x = cx + Math.cos(a) * R * 1.5, y = cy + Math.sin(a) * R * .55; const rx = (x - cx) * Math.cos(-.35) - (y - cy) * Math.sin(-.35) + cx, ry = (x - cx) * Math.sin(-.35) + (y - cy) * Math.cos(-.35) + cy; ctx.fillStyle = m ? ink : accent; ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(rx, ry, 2.2, 0, Math.PI * 2); ctx.fill(); } }
      return true; }
    case 'lattice': {
      const g = 34; ctx.fillStyle = ink;
      for (let x = 0; x < w + g; x += g) for (let y = 0; y < h + g; y += g) { const d = Math.hypot(x - cx, y - cy) / s; const z = Math.sin(d * 9 - t * 1.2 + ph); ctx.globalAlpha = .15 + .6 * Math.max(0, z); ctx.fillRect(x + z * 4, y, 2 + Math.max(0, z) * 3, 2 + Math.max(0, z) * 3); }
      return true; }
    case 'spiral': {
      for (let arm = 0; arm < 5; arm++) { const pts: [number, number][] = []; for (let i = 0; i < 260; i++) { const r = i / 260 * s * .7; const a = arm / 5 * Math.PI * 2 + i * .035 - t * .3 + ph; pts.push([cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r]); } ctx.strokeStyle = arm % 2 ? accent : ink; line(pts, .45); }
      return true; }
    case 'helix': {
      for (let i = 0; i < 60; i++) { const y = i / 60 * h; const a = i * .3 + t * .8 + ph; const x1 = cx + Math.sin(a) * w * .3, x2 = cx - Math.sin(a) * w * .3; const depth = (Math.cos(a) + 1) / 2;
        ctx.strokeStyle = ink; line([[x1, y], [x2, y]], .1 + depth * .3); ctx.fillStyle = accent; ctx.globalAlpha = .4 + depth * .6; ctx.beginPath(); ctx.arc(x1, y, 1.5 + depth * 2, 0, 7); ctx.fill(); ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(x2, y, 1.5 + (1 - depth) * 2, 0, 7); ctx.fill(); }
      return true; }
    case 'terrain': {
      for (let row = 0; row < 30; row++) { const z = row / 30; const pts: [number, number][] = []; for (let x = 0; x <= w; x += 8) { const nx = x / w; const hgt = Math.sin(nx * 8 + row * .4 + ph) * Math.cos(nx * 3 - t * .4 + row * .2) * 40 * z; pts.push([x, h * .2 + z * z * h * .8 - hgt]); } ctx.strokeStyle = ink; line(pts, .1 + z * .6); }
      return true; }
    case 'radar': {
      ctx.strokeStyle = ink; for (let r = 1; r <= 6; r++) { ctx.globalAlpha = .2; ctx.beginPath(); ctx.arc(cx, cy, s * .08 * r, 0, Math.PI * 2); ctx.stroke(); }
      const sweep = t * .7 + ph; for (let k = 0; k < 40; k++) { const a = sweep - k * .02; ctx.strokeStyle = accent; line([[cx, cy], [cx + Math.cos(a) * s * .48, cy + Math.sin(a) * s * .48]], .5 * (1 - k / 40)); }
      for (let i = 0; i < 24; i++) { const a = i * 2.4 + ph, r = s * (.1 + (i * 37 % 100) / 260); const age = ((sweep - a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); ctx.fillStyle = accent; ctx.globalAlpha = Math.max(0, 1 - age / 3); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.5, 0, 7); ctx.fill(); }
      return true; }
    case 'moire': {
      const o1x = cx + Math.cos(t * .3) * s * .12, o2x = cx - Math.cos(t * .3) * s * .12;
      for (let r = 6; r < s * .8; r += 9) { ctx.strokeStyle = ink; ctx.globalAlpha = .22; ctx.beginPath(); ctx.arc(o1x, cy, r, 0, 7); ctx.stroke(); ctx.strokeStyle = accent; ctx.globalAlpha = .16; ctx.beginPath(); ctx.arc(o2x, cy + Math.sin(t * .25 + ph) * 20, r, 0, 7); ctx.stroke(); }
      return true; }
    case 'tunnel': {
      for (let i = 0; i < 22; i++) { const z = ((i / 22) + t * .06) % 1; const k = z * z; const side = 6; const pts: [number, number][] = []; for (let j = 0; j <= side; j++) { const a = j / side * Math.PI * 2 + z * 1.5 + ph; pts.push([cx + Math.cos(a) * s * .9 * k, cy + Math.sin(a) * s * .9 * k]); } ctx.strokeStyle = i % 5 ? ink : accent; line(pts, k * .8); }
      return true; }
    case 'rings': {
      for (let i = 0; i < 12; i++) { const r = s * (.06 + i * .035); const start = t * (i % 2 ? .4 : -.3) + i + ph; ctx.strokeStyle = i % 3 ? ink : accent; ctx.globalAlpha = .3 + i / 30; ctx.lineWidth = i % 4 ? 1 : 2.5; ctx.beginPath(); ctx.arc(cx, cy, r, start, start + Math.PI * (.5 + (i % 4) * .35)); ctx.stroke(); }
      ctx.lineWidth = 1; return true; }
    default: return false;
  }
}
