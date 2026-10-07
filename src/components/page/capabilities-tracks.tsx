"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { capabilitiesPage as c } from "@/lib/pages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CapabilitiesTracks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only animate when the user hasn't asked for reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-track]");

        items.forEach((el, i) => {
          const fromLeft = i % 2 === 0;
          const distance = window.innerWidth < 768 ? 40 : 120;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // when the top of the card hits 85% of the viewport
              toggleActions: "play none none reverse", // replays when scrolling back up
            },
          });

          // Whole card slides in from alternating sides
          tl.from(el, {
            x: fromLeft ? -distance : distance,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          // Inner pieces follow slightly after, from the same side
          tl.from(
            el.querySelectorAll("[data-track-part]"),
            {
              x: fromLeft ? -40 : 40,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.12,
            },
            "-=0.6"
          );

          // Tags pop in last
          tl.from(
            el.querySelectorAll("[data-track-tag]"),
            {
              y: 12,
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.05,
            },
            "-=0.4"
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    // overflow-x-clip stops the off-screen cards from causing a horizontal scrollbar
    <section
      ref={root}
      className="relative overflow-x-clip border-t border-line bg-paper py-16 md:py-24"
    >
      <div className="container-x space-y-4">
        {c.tracks.map((t) => (
          <article
            key={t.n}
            data-track
            className="grid gap-6 border-t border-ink py-8 md:grid-cols-[16rem_1fr] md:gap-12"
          >
            <div data-track-part>
              <span className="font-text text-[3rem] font-semibold text-gold md:text-[4rem]">
                {t.n}
              </span>

              <h2 className="mt-2 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {t.title}
              </h2>
            </div>

            <div>
              <p
                data-track-part
                className="font-display text-[1.5rem] font-semibold text-ink/90 sm:text-[2rem]"
              >
                {t.headline}
              </p>

              <p
                data-track-part
                className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft"
              >
                {t.detail}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    data-track-tag
                    className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}