"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Site-wide scroll in/out transitions. Any element tagged `data-reveal`
 * rises + fades in as it enters the viewport and settles back out as it
 * leaves — in both scroll directions. `data-reveal-group` does the same for
 * its direct children with a stagger. `data-reveal-y="N"` tunes the travel.
 *
 * Elements that run their own scroll choreography (the hero, pinned sections)
 * simply don't carry the attribute.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const IN = { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", overwrite: true };
      const OUT = (y: number) => ({
        opacity: 0,
        y,
        duration: 0.5,
        ease: "power2.in",
        overwrite: true,
      });

      // single elements
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const y = Number(el.dataset.revealY ?? 46);
        gsap.set(el, { opacity: 0, y, willChange: "transform, opacity" });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          end: "bottom 8%",
          onEnter: () => gsap.to(el, IN),
          onEnterBack: () => gsap.to(el, IN),
          onLeave: () => gsap.to(el, OUT(-y * 0.7)),
          onLeaveBack: () => gsap.to(el, OUT(y)),
        });
      });

      // staggered groups
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const y = Number(group.dataset.revealY ?? 44);
        const kids = Array.from(group.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.set(kids, { opacity: 0, y, willChange: "transform, opacity" });
        const enter = () =>
          gsap.to(kids, { ...IN, stagger: 0.09, duration: 0.7 });
        const leave = (dir: number) =>
          gsap.to(kids, { ...OUT(y * dir), stagger: 0.04, duration: 0.4 });
        ScrollTrigger.create({
          trigger: group,
          start: "top 88%",
          end: "bottom 6%",
          onEnter: enter,
          onEnterBack: enter,
          onLeave: () => leave(-0.7),
          onLeaveBack: () => leave(1),
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
