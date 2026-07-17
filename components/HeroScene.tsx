'use client';

import { useEffect, useRef } from 'react';

/* Generative canyon-at-dusk scene: layered ridgelines with mouse parallax,
   a horizon glow, twinkling stars, and ember sparks rising from the canyon.
   Seeded with 1993 (founding year) so the landscape is identical every load.
   Pure canvas — no dependencies. Honors prefers-reduced-motion with a
   single static frame. */

type Layer = { pts: number[]; color: string; par: number };
type Spark = { x: number; y: number; vy: number; sway: number; phase: number; size: number; life: number; age: number };
type Star = { x: number; y: number; r: number; base: number; speed: number; phase: number };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PAD = 90; // horizontal overdraw so parallax never shows edges

    let W = 0, H = 0, dpr = 1;
    let layers: Layer[] = [];
    let stars: Star[] = [];
    let sparks: Spark[] = [];
    let raf = 0;
    let last = performance.now();
    let running = false;

    /* pointer parallax state (lerped for weight) */
    let targetX = 0, targetY = 0, curX = 0, curY = 0;

    const LAYER_SPECS = [
      { color: '#4f2d18', par: 0.16, height: 0.30, jag: 26, step: 110 },
      { color: '#36200f', par: 0.34, height: 0.24, jag: 34, step: 90  },
      { color: '#22150b', par: 0.60, height: 0.17, jag: 40, step: 75  },
      { color: '#120d08', par: 1.00, height: 0.10, jag: 46, step: 65  },
    ];

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = mulberry32(1993);
      layers = LAYER_SPECS.map((spec) => {
        const pts: number[] = [];
        const baseY = H * (1 - spec.height);
        let x = -PAD;
        let y = baseY;
        while (x <= W + PAD) {
          pts.push(x, y);
          const run = rand();
          x += spec.step * (0.6 + rand() * 0.9);
          if (run < 0.22) {
            /* mesa plateau — hold elevation */
          } else {
            y = baseY + (rand() - 0.62) * spec.jag * 2.2;
            y = Math.min(Math.max(y, baseY - spec.jag * 2.4), baseY + spec.jag * 1.2);
          }
        }
        pts.push(W + PAD, y);
        return { pts, color: spec.color, par: spec.par };
      });

      stars = Array.from({ length: 60 }, () => ({
        x: rand() * W,
        y: rand() * H * 0.45,
        r: 0.4 + rand() * 1.1,
        base: 0.08 + rand() * 0.3,
        speed: 0.4 + rand() * 1.2,
        phase: rand() * Math.PI * 2,
      }));

      sparks = Array.from({ length: 52 }, () => spawnSpark(rand, true));
    }

    function spawnSpark(rand: () => number, anywhere = false): Spark {
      return {
        x: Math.random() * W,
        y: anywhere ? H * (0.6 + Math.random() * 0.4) : H * (0.86 + Math.random() * 0.14),
        vy: 9 + Math.random() * 16,
        sway: 6 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        size: 0.8 + Math.random() * 1.7,
        life: 7 + Math.random() * 7,
        age: anywhere ? Math.random() * 6 : 0,
      };
    }

    function draw(t: number, dt: number) {
      /* sky — near-black cooling into a warm horizon */
      const sky = ctx!.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#131110');
      sky.addColorStop(0.55, '#171310');
      sky.addColorStop(0.82, '#241409');
      sky.addColorStop(1, '#2b1608');
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, W, H);

      /* stars */
      for (const s of stars) {
        const a = reduced ? s.base : s.base * (0.65 + 0.35 * Math.sin(t * 0.001 * s.speed + s.phase));
        ctx!.globalAlpha = a;
        ctx!.fillStyle = '#f5ede4';
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      /* setting sun — ember glow low on the right */
      const sunX = W * 0.68 + curX * 0.1;
      const sunY = H * 0.72;
      const pulse = reduced ? 1 : 1 + 0.025 * Math.sin(t * 0.0004);
      const sun = ctx!.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.42 * pulse);
      sun.addColorStop(0, 'rgba(232, 84, 26, 0.38)');
      sun.addColorStop(0.35, 'rgba(201, 75, 12, 0.16)');
      sun.addColorStop(1, 'rgba(201, 75, 12, 0)');
      ctx!.fillStyle = sun;
      ctx!.fillRect(0, 0, W, H);

      /* canyon ridgelines, back to front, each with its own parallax weight */
      const idle = reduced ? 0 : Math.sin(t * 0.00013) * 7;
      for (const layer of layers) {
        const ox = (curX + idle) * layer.par;
        const oy = curY * layer.par * 0.45;
        ctx!.save();
        ctx!.translate(ox, oy);
        ctx!.fillStyle = layer.color;
        ctx!.beginPath();
        ctx!.moveTo(layer.pts[0], layer.pts[1]);
        for (let i = 2; i < layer.pts.length; i += 2) ctx!.lineTo(layer.pts[i], layer.pts[i + 1]);
        ctx!.lineTo(W + PAD, H + 80);
        ctx!.lineTo(-PAD, H + 80);
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }

      /* ember sparks drifting up out of the canyon */
      if (!reduced) {
        ctx!.globalCompositeOperation = 'lighter';
        for (let i = 0; i < sparks.length; i++) {
          const p = sparks[i];
          p.age += dt;
          if (p.age >= p.life) { sparks[i] = spawnSpark(Math.random); continue; }
          p.y -= p.vy * dt;
          const x = p.x + Math.sin(p.age * 0.9 + p.phase) * p.sway;
          const lifeFade = Math.sin((p.age / p.life) * Math.PI);
          ctx!.globalAlpha = 0.55 * lifeFade;
          ctx!.fillStyle = i % 3 === 0 ? '#ffb27a' : '#ff6c27';
          ctx!.beginPath();
          ctx!.arc(x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
        ctx!.globalCompositeOperation = 'source-over';
      }
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      draw(now, dt);
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onPointer = (e: PointerEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * -34;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * -14;
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop();
      else start();
    };
    const onResize = () => { build(); if (reduced) draw(performance.now(), 0); };

    build();
    if (reduced) {
      draw(performance.now(), 0);
    } else {
      start();
      window.addEventListener('pointermove', onPointer, { passive: true });
    }
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    /* fade the scene in once the first frame exists */
    canvas.style.opacity = '1';

    return () => {
      stop();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
