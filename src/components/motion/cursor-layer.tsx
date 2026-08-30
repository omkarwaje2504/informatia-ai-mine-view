"use client";

import { useEffect, useRef } from "react";

/**
 * Replaces the OS cursor with a circle, and trails a soft purple glow behind
 * the pointer. Fine-pointer + no-reduced-motion only; otherwise renders nothing
 * and leaves the native cursor alone.
 */
export function CursorLayer() {
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const glowSoft = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const r = ring.current;
    const g = glow.current;
    const gs = glowSoft.current;
    if (!r || !g || !gs) return;

    document.documentElement.classList.add("cursor-hidden");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rp = { ...target };
    const gp = { ...target };
    let raf = 0;
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      r.style.opacity = "1";
      g.style.opacity = "1";
      gs.style.opacity = "1";
    };
    const hide = () => {
      shown = false;
      r.style.opacity = "0";
      g.style.opacity = "0";
      gs.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      show();
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        "a,button,[role='button'],label,summary,input,select,textarea",
      );
      r.classList.toggle("is-active", interactive);
    };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => r.classList.remove("is-down");

    const tick = () => {
      rp.x += (target.x - rp.x) * 0.4;
      rp.y += (target.y - rp.y) * 0.4;
      gp.x += (target.x - gp.x) * 0.12;
      gp.y += (target.y - gp.y) * 0.12;
      const rt = `translate3d(${rp.x}px, ${rp.y}px, 0) translate(-50%, -50%)`;
      const gt = `translate3d(${gp.x}px, ${gp.y}px, 0) translate(-50%, -50%)`;
      r.style.transform = rt;
      g.style.transform = gt;
      gs.style.transform = gt;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <>
      <div ref={glowSoft} aria-hidden className="cursor-glow cursor-glow--soft" style={{ opacity: 0 }} />
      <div ref={glow} aria-hidden className="cursor-glow" style={{ opacity: 0 }} />
      <div ref={ring} aria-hidden className="cursor-ring" />
    </>
  );
}
