"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * Pointer position relative to the viewport centre, ~[-0.5, 0.5] per axis,
 * spring-smoothed. Stays at 0 for reduced motion / coarse pointers.
 */
export function useParallax(): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.7 });
  const y = useSpring(my, { stiffness: 55, damping: 20, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return { x, y };
}
