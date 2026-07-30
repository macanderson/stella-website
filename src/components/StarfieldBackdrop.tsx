"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 (parallax + size)
  r: number;
  base: number; // base brightness
  tw: number; // twinkle phase
  tws: number; // twinkle speed
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
};

/**
 * Deep-space canvas: three parallax star layers, gentle drift, twinkle, and
 * rare vermilion shooting stars. Scroll nudges the layers for depth.
 * Static single frame under prefers-reduced-motion.
 */
export function StarfieldBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let raf = 0;
    let t = 0;
    let scrollY = window.scrollY;
    // deterministic-ish PRNG so the field looks intentional
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(260, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => {
        const z = rand();
        return {
          x: rand() * w,
          y: rand() * h,
          z,
          r: 0.4 + z * 1.5,
          base: 0.25 + rand() * 0.6,
          tw: rand() * Math.PI * 2,
          tws: 0.6 + rand() * 1.8,
        };
      });
    };

    const spawnShooter = () => {
      const fromLeft = rand() > 0.5;
      const y = rand() * h * 0.5;
      const speed = 6 + rand() * 4;
      shooters.push({
        x: fromLeft ? -40 : w + 40,
        y,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: speed * (0.35 + rand() * 0.3),
        life: 0,
        max: 60 + rand() * 30,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const drift = reduce ? 0 : t * 0.006;
      const sOff = (scrollY / Math.max(h, 1)) * 40;

      for (const s of stars) {
        const parY = s.y - sOff * (0.2 + s.z * 0.8);
        const px = ((s.x + drift * (0.2 + s.z)) % (w + 20)) - 10;
        const py = ((parY % (h + 20)) + (h + 20)) % (h + 20) - 10;
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * 0.02 * s.tws + s.tw);
        const a = s.base * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        // cool white core; the brightest/nearest stars burn gold
        const gold = s.z > 0.82;
        ctx.fillStyle = gold
          ? `rgba(255, 226, 158, ${a})`
          : `rgba(207, 217, 238, ${a})`;
        ctx.fill();
        if (s.z > 0.7 && !reduce) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = gold
            ? `rgba(245, 193, 69, ${a * 0.14})`
            : `rgba(90, 160, 255, ${a * 0.13})`;
          ctx.fill();
        }
      }

      // shooting stars
      for (const sh of shooters) {
        sh.life += 1;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const p = sh.life / sh.max;
        const alpha = Math.sin(p * Math.PI);
        const tailX = sh.x - sh.vx * 6;
        const tailY = sh.y - sh.vy * 6;
        const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
        grad.addColorStop(0, "rgba(46,123,255,0)");
        grad.addColorStop(1, `rgba(140,190,255,${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sh.x, sh.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,230,170,${alpha})`;
        ctx.fill();
      }
      shooters = shooters.filter((s) => s.life < s.max && s.x > -80 && s.x < w + 80);

      t += 1;
      if (!reduce) {
        if (t % 260 === 0 && shooters.length < 2 && rand() > 0.35) spawnShooter();
        raf = requestAnimationFrame(draw);
      }
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      build();
      if (reduce) draw();
    };

    build();
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* nebula washes */}
      <div className="absolute inset-0 bg-void" />
      <div
        className="absolute -top-[20%] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 opacity-80"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 40%, rgba(46,123,255,0.20), rgba(90,160,255,0.07) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] left-[-10%] h-[70vh] w-[70vw] opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(245,193,69,0.10), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[60vh] w-[55vw] opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(21,80,200,0.18), transparent 70%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      {/* vignette to seat content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(5,7,12,0.6) 100%)",
        }}
      />
    </div>
  );
}
