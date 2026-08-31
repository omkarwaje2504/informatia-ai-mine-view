"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* aspect ratios of the two assets (w / h) */
const FULL_AR = 772.94 / 160.18; // Informatia-main.svg — full lockup
const MARK_AR = 1044 / 761.33; //   Informatia.svg      — the "AI" mark only

/**
 * Header logo. At the top of the page it shows the full Informatia AI lockup;
 * once you scroll it smoothly collapses to just the "AI" mark, and expands
 * back to the full lockup when you return to the top.
 */
export function HeaderLogo({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // A sentinel just below the fold; when it leaves the viewport we've
    // scrolled. Works regardless of the scroll mechanism (Lenis included).
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:28px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <span
      aria-label="Informatia AI — home"
      className={cn(
        "relative block h-9 overflow-hidden [transition:width_650ms_cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      style={{ width: `calc(2.25rem * ${scrolled ? MARK_AR : FULL_AR})` }}
    >
      {/* full lockup */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Informatia-main.svg"
        alt=""
        aria-hidden
        className="absolute left-0 top-0 h-full max-w-none transition-[opacity,transform,filter] duration-500 ease-out"
        style={{
          width: `calc(2.25rem * ${FULL_AR})`,
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? "translateX(-10px)" : "none",
          filter: scrolled ? "blur(2px)" : "none",
        }}
      />
      {/* "AI" mark only */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Informatia.svg"
        alt=""
        aria-hidden
        className="absolute left-0 top-0 h-full max-w-none origin-left transition-[opacity,transform] duration-500 ease-out"
        style={{
          width: `calc(2.25rem * ${MARK_AR})`,
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "none" : "scale(0.8)",
        }}
      />
    </span>
  );
}
