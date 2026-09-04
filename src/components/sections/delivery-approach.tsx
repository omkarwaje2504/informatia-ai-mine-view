"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Plexus } from "@/components/hero/plexus";
import { approach } from "@/lib/content";

const N = approach.steps.length;
const SPAN = 0.9 / N; // scroll share per step (last 10% is settle room)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function DeliveryApproach() {
  const reduce = useReducedMotion() ?? false;
  const outer = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const animate = wide && !reduce;

  useEffect(() => {
    if (!animate) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = outer.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setProgress(total > 0 ? clamp01(-rect.top / total) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animate]);

  return (
    <section
      ref={outer}
      id="approach"
      className="relative border-t border-line bg-orange-50 lg:h-[440vh] motion-reduce:lg:h-auto"
    >
      <div className="relative overflow-hidden py-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0 motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:py-12">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <Plexus variant="dark" density={0.85} />
        </div>

        <div className="container-x relative w-full">
          <header className="max-w-2xl">
            <p className="eyebrow text-ink-muted">{approach.eyebrow}</p>
            <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {approach.heading}
            </h2>
            <p className="mt-2 text-[1.1rem] leading-relaxed text-ink-soft">
              {approach.intro}
            </p>
          </header>

          {/* scrubbed progress */}
          {/* <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-ink/15">
            <div
              className="h-full origin-left bg-ink"
              style={{ transform: `scaleX(${animate ? progress : 1})` }}
            />
          </div> */}

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
            {approach.steps.map((s, i) => {
              const start = i * SPAN;
              const end = start + SPAN + 0.06;
              const rev = animate ? clamp01((progress - start) / (end - start)) : 1;
              const line = animate
                ? clamp01((progress - start) / ((end - start) * 0.7))
                : 1;
              const arrowRev = animate
                ? clamp01((progress - start - 0.04) / (SPAN - 0.04))
                : 1;

              return (
                <Fragment key={s.title}>
                  <div className="lg:min-w-0 lg:flex-1">
                    <div
                      className="h-[3px] w-full origin-left bg-ink"
                      style={{ transform: `scaleX(${line})` }}
                    />
                    <div
                      style={{
                        opacity: rev,
                        transform: `translateY(${(1 - rev) * 24}px)`,
                      }}
                    >
                      <span className="mt-3 block font-text text-[3.2rem] font-semibold leading-none text-gold lg:text-[3.6rem]">
                        {s.n}
                      </span>
                      <h3 className="mt-1 font-display text-[1.35rem] font-normal text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-md leading-relaxed text-ink-soft">
                        {s.detail}
                      </p>
                    </div>
                  </div>

                  {i < N - 1 ? (
                    <div
                      className="hidden shrink-0 items-center self-start pt-6 lg:flex"
                      style={{ opacity: arrowRev }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/Informatia-logo-minimal.png"
                        alt=""
                        aria-hidden
                        width={638}
                        height={463}
                        className="h-8 w-auto rotate-90"
                      />
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
