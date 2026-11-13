'use client';

import { useEffect, useRef } from 'react';

interface Pt { x: number; y: number; n: number[] }
interface Pulse { a: number; b: number; t: number; v: number; signal: boolean }

/** Ambient network behind the hero mark. Decorative: hidden from assistive tech, static under reduced motion. */
export function HeroNet() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let W = 0, H = 0, raf = 0, seed = 7;
    let pts: Pt[] = [], edges: [number, number][] = [], pulses: Pulse[] = [];
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const build = () => {
      const r = canvas.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      if (!W) return;
      canvas.width = W * d; canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      seed = 7; pts = []; edges = []; pulses = [];
      const s = Math.max(42, W / 8);
      let row = 0;
      for (let y = s * 0.4; y < H; y += s * 0.866, row++) {
        for (let x = (row % 2 ? s / 2 : 0) + s * 0.2; x < W; x += s) pts.push({ x: x + rnd() * 12 - 6, y: y + rnd() * 12 - 6, n: [] });
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          if (dx * dx + dy * dy < s * s * 1.5 && rnd() > 0.22) { edges.push([i, j]); pts[i].n.push(j); pts[j].n.push(i); }
        }
      }
      for (let k = 0; k < 9; k++) {
        const a = Math.floor(rnd() * pts.length);
        if (pts[a]?.n.length) pulses.push({ a, b: pts[a].n[0], t: rnd(), v: 0.004 + rnd() * 0.004, signal: k === 0 });
      }
    };

    const fade = (p: Pt) => Math.max(0.08, 1 - Math.hypot((p.x - W / 2) / (W / 2), (p.y - H * 0.4) / (H * 0.6)) * 0.7);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        ctx.strokeStyle = `rgba(132,144,156,${0.2 * Math.min(fade(pts[i]), fade(pts[j]))})`;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
      for (const p of pts) { ctx.fillStyle = `rgba(132,144,156,${0.55 * fade(p)})`; ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3); }
      for (const u of pulses) {
        const A = pts[u.a], B = pts[u.b];
        ctx.fillStyle = u.signal ? '#8ED13B' : '#E5E8EB';
        ctx.fillRect(A.x + (B.x - A.x) * u.t - 2.5, A.y + (B.y - A.y) * u.t - 2.5, 5, 5);
      }
    };

    const tick = () => {
      for (const u of pulses) {
        u.t += u.v;
        if (u.t >= 1) { const n = pts[u.b].n; u.a = u.b; u.b = n[Math.floor(Math.random() * n.length)]; u.t = 0; }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => { cancelAnimationFrame(raf); build(); if (!W) return; if (still) draw(); else tick(); };
    start();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(start, 150); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
