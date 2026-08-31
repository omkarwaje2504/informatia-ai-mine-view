"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** glow palette */
  tone?: "brand" | "purple" | "teal";
  /** diameter of the glow, in rem */
  size?: number;
};

const TONES: Record<NonNullable<Props["tone"]>, string> = {
  brand:
    "radial-gradient(circle, rgba(150,60,205,0.5), rgba(28,195,182,0.2) 46%, transparent 72%)",
  purple: "radial-gradient(circle, rgba(150,60,205,0.55), transparent 68%)",
  teal: "radial-gradient(circle, rgba(28,195,182,0.5), transparent 68%)",
};

/**
 * A soft blurred glow that trails the cursor inside its host section — the
 * "mouse splash". Drop it as an absolute layer between a section's background
 * and its content. rAF-driven, no re-renders; off for touch + reduced motion.
 */
export function PointerSplash({ className, tone = "brand", size = 34 }: Props) {
  const layer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    const d = dot.current;
    const host = el?.parentElement;
    if (!el || !d || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let shown = false;

    const rect = () => host.getBoundingClientRect();
    const r0 = rect();
    target.x = pos.x = r0.width / 2;
    target.y = pos.y = r0.height * 0.35;

    const onMove = (e: PointerEvent) => {
      const r = rect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!shown) {
        shown = true;
        d.style.opacity = "1";
      }
    };
    const onLeave = () => {
      shown = false;
      d.style.opacity = "0";
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      d.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={layer}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        ref={dot}
        className="absolute left-0 top-0 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 will-change-transform"
        style={{
          height: `${size}rem`,
          width: `${size}rem`,
          background: TONES[tone],
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
