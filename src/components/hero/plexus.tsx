"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Pt = { x: number; y: number; vx: number; vy: number; r: number; ph: number };

const PALETTE = {
  light: { line: "150,153,170", dot: "150,150,175" },
  dark: { line: "70,92,140", dot: "120,140,205" },
};

/**
 * Live constellation backdrop — a canvas of drifting nodes wired together
 * whenever they're close. Runs continuously; pauses when off-screen and for
 * reduced motion (renders one static frame).
 */
export function Plexus({
  variant = "light",
  className,
  density = 1,
}: {
  variant?: "light" | "dark";
  className?: string;
  /** relative multiplier on the auto (by-area) node count */
  density?: number;
  seed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pal = PALETTE[variant];
    const LINK = 148;

    let w = 0;
    let h = 0;
    const pts: Pt[] = [];
    let raf = 0;
    let running = false;

    const spawn = (): Pt => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      r: Math.random() * 1.5 + 0.6,
      ph: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(130, Math.max(24, Math.round(((w * h) / 20000) * density)));
      while (pts.length < target) pts.push(spawn());
      if (pts.length > target) pts.length = target;
      for (const p of pts) {
        p.x = Math.min(w, Math.max(0, p.x));
        p.y = Math.min(h, Math.max(0, p.y));
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -24) p.x = w + 24;
          else if (p.x > w + 24) p.x = -24;
          if (p.y < -24) p.y = h + 24;
          else if (p.y > h + 24) p.y = -24;
        }
      }

      const lineBase = variant === "dark" ? 0.5 : 0.42;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * lineBase;
            ctx.strokeStyle = `rgba(${pal.line},${a.toFixed(3)})`;
            ctx.lineWidth = variant === "dark" ? 1 : 0.8;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const tw = reduce ? 0.7 : 0.55 + 0.45 * Math.sin(t * 0.0012 + p.ph);
        ctx.fillStyle = `rgba(${pal.dot},${(0.35 + 0.5 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (p.ph % 5 < 1 ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(0);
    start();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [variant, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
