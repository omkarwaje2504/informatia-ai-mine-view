"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const EASE_INOUT = [0.76, 0, 0.24, 1] as const;
const PANELS = 5;

type Phase = "idle" | "covering" | "covered" | "revealing";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const hrefRef = useRef<string | null>(null);
  const fallbackRef = useRef<number | null>(null);

  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // intercept internal link clicks
  useEffect(() => {
    if (reduce) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (phaseRef.current !== "idle") return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      if (a.getAttribute("rel")?.includes("external")) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // same page (or hash-only jump) -> no transition
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      e.stopPropagation(); // stop next/link from navigating on its own
      hrefRef.current = url.pathname + url.search + url.hash;
      go("covering");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  // new route rendered -> reveal
  useEffect(() => {
    if (phaseRef.current !== "covered") return;
    const t = window.setTimeout(() => {
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
      go("revealing");
    }, 150);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // lock scroll while the transition is active
  useEffect(() => {
    document.documentElement.style.overflow = phase === "idle" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  const target =
    phase === "idle" ? "101%" : phase === "revealing" ? "-101%" : "0%";

  const handleDone = () => {
    if (phaseRef.current === "covering") {
      go("covered");
      router.push(hrefRef.current!);
      // safety net in case the route never changes
      fallbackRef.current = window.setTimeout(() => go("revealing"), 3000);
    } else if (phaseRef.current === "revealing") {
      go("idle"); // snaps panels back below the screen, instantly
    }
  };

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[190] flex ${
        phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {Array.from({ length: PANELS }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-night"
          initial={false}
          animate={{ y: target }}
          transition={
            phase === "idle"
              ? { duration: 0 }
              : { duration: 0.8, ease: EASE_INOUT, delay: i * 0.07 }
          }
          onAnimationComplete={i === PANELS - 1 ? handleDone : undefined}
        />
      ))}
    </div>
  );
}