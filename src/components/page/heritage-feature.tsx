"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Plexus } from "@/components/hero/plexus";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { aboutPage as a } from "@/lib/pages";

const STEPS = a.heritage.journey;

// Curve geometry in viewBox units. The path rises left to right — reaching
// new heights — with an S-bend between milestones. Each milestone sits at the
// centre of its label column (1/6, 3/6, 5/6 of the width).
const W = 1200;
const H = 200;
const NODES = [
  { x: 200, y: 160 },
  { x: 600, y: 105 },
  { x: 1000, y: 50 },
];
const START_Y = 195;
const PATH =
  "M0 195 C100 195 100 160 200 160 C400 160 400 105 600 105 C800 105 800 50 1000 50 C1100 50 1100 15 1200 15";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function HeritageFeature() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const samples = useRef<{ x: number; y: number }[]>([]);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduce = useReducedMotion();

  // The journey is driven by scroll while the section is pinned: the curve
  // draws itself, the travelling dot rides along it and each milestone lights
  // up (and counts up) as the dot reaches it. It completes a little before
  // the pin releases.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 30%", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const [active, setActive] = useState(-1);

  // x along the curve only ever increases, so "drawing" it is a clip rect
  // growing to the right, and the dot's height is read from a sampled table.
  const draw = useCallback((v: number) => {
    const x = v * W;
    clipRef.current?.setAttribute("width", String(x));

    const pts = samples.current;
    const head = headRef.current;
    if (head && pts.length) {
      const j = Math.max(1, pts.findIndex((p) => p.x >= x));
      const p0 = pts[j - 1];
      const p1 = pts[j] ?? p0;
      const t = p1.x === p0.x ? 0 : (x - p0.x) / (p1.x - p0.x);
      head.style.left = pct(x, W);
      head.style.top = pct(p0.y + (p1.y - p0.y) * t, H);
    }

    setActive(NODES.filter((n) => x >= n.x - 1).length - 1);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    samples.current = Array.from({ length: 241 }, (_, i) => {
      const p = path.getPointAtLength((len * i) / 240);
      return { x: p.x, y: p.y };
    });
    draw(reduce ? 1 : progress.get());
  }, [draw, progress, reduce]);

  useMotionValueEvent(progress, "change", (v) => {
    if (!reduce) draw(v);
  });

  return (
    <div ref={wrapRef} className="relative" style={{ height: "calc(170vh)" }}>
      <section
        className="z-0 flex flex-col overflow-hidden border-t border-line"
        style={{
          position: "sticky",
          top: "73px",
          height: "calc(100vh - 73px)",
        }}
      >
        {/* Heritage — the journey */}
        <div className="flex flex-1/3 md:flex-[3] items-center bg-paper">
          <div className="container-x w-full py-6 lg:py-[clamp(1rem,4vh,2.5rem)]">
            {/* Header: eyebrow + heading, summary */}
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-end lg:gap-12">
              <div>
                <p className="eyebrow text-ink-muted">{a.heritage.eyebrow}</p>
                <h2 className="mt-2 max-w-2xl font-display text-[1.4rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.2rem] lg:text-[clamp(2rem,5vh,2.6rem)]">
                  {a.heritage.heading}
                </h2>
              </div>
              <p className="hidden text-[0.95rem] leading-relaxed text-ink-soft sm:block lg:text-[1.05rem]">
                {a.heritage.summary}
              </p>
            </div>

            {/* Curve */}
            <div className="relative mt-6 h-16 sm:h-24 lg:mt-[clamp(0.5rem,3vh,2rem)] lg:h-[clamp(72px,14vh,180px)]">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id={`${uid}-grad`}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    x2={W}
                    y1="0"
                    y2="0"
                  >
                    <stop offset="0" style={{ stopColor: "var(--color-purple-light)" }} />
                    <stop offset="1" style={{ stopColor: "var(--color-teal-light)" }} />
                  </linearGradient>
                  <clipPath id={`${uid}-clip`}>
                    <rect ref={clipRef} x="0" y="-40" width="0" height={H + 80} />
                  </clipPath>
                </defs>

                {/* road ahead */}
                <path
                  ref={pathRef}
                  d={PATH}
                  fill="none"
                  className="stroke-ink-faint"
                  strokeWidth={1.5}
                  strokeDasharray="4 7"
                  vectorEffect="non-scaling-stroke"
                />
                {/* road travelled */}
                <path
                  d={PATH}
                  fill="none"
                  stroke={`url(#${uid}-grad)`}
                  strokeWidth={4}
                  strokeLinecap="round"
                  clipPath={`url(#${uid}-clip)`}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {NODES.map((n, i) => {
                const on = i <= (reduce ? NODES.length - 1 : active);
                return (
                  <div key={i}>
                    {/* drop line from milestone to its label */}
                    <span
                      aria-hidden
                      className={`absolute bottom-0 border-l border-dashed transition-colors duration-500 ${
                        on ? "border-teal" : "border-ink-faint/60"
                      }`}
                      style={{ left: pct(n.x, W), top: pct(n.y, H) }}
                    />
                    <span
                      aria-hidden
                      className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 sm:size-5 lg:size-6 ${
                        on
                          ? "border-teal bg-teal shadow-[0_0_0_7px_rgba(14,156,147,0.15)]"
                          : "border-ink-faint bg-paper"
                      }`}
                      style={{ left: pct(n.x, W), top: pct(n.y, H) }}
                    />
                  </div>
                );
              })}

              {!reduce && (
                <span
                  ref={headRef}
                  aria-hidden
                  className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-light shadow-[0_0_0_6px_rgba(28,195,182,0.25)] sm:size-3.5"
                  style={{ left: 0, top: pct(START_Y, H) }}
                />
              )}
            </div>

            {/* Milestones */}
            <ol className="grid grid-cols-3 gap-3 pt-3 sm:gap-6 sm:pt-4">
              {STEPS.map((s, i) => {
                const on = i <= (reduce ? STEPS.length - 1 : active);
                return (
                  <li key={s.title} className="text-center">
                    <p
                      className={`inline-flex items-start justify-center font-text font-bold leading-none tracking-[-0.04em] tabular-nums transition-colors duration-500 text-[2rem] sm:text-[3rem] lg:text-[clamp(2.75rem,6.5vh,4.75rem)] ${
                        on ? "text-ink" : "text-ink-faint/60"
                      }`}
                    >
                      {on && !reduce ? (
                        <AnimatedCounter value={s.value} duration={1200} />
                      ) : (
                        s.value
                      )}
                      <span className="ml-1.5 mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-teal sm:text-[0.75rem]">
                        {s.unit}
                      </span>
                    </p>

                    <p className="mt-2 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink-muted sm:text-[0.7rem]">
                      {s.marker}
                    </p>

                    <h3
                      className={`mt-1 font-display text-[0.78rem] font-semibold leading-snug transition-colors duration-500 sm:text-[1.1rem] lg:text-[1.3rem] ${
                        on ? "text-ink" : "text-ink-faint"
                      }`}
                    >
                      {s.title}
                    </h3>

                    <p
                      className={`mx-auto mt-1.5 hidden max-w-xs text-[0.88rem] leading-relaxed transition-colors duration-500 sm:block ${
                        on ? "text-ink-soft" : "text-ink-faint/70"
                      }`}
                    >
                      {s.detail}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Beliefs */}
        <div className="relative flex flex-2/3 md:flex-[2] md:items-center overflow-hidden bg-night text-mist">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>

          <div className="container-x relative py-8 md:py-6">
            <p className="eyebrow hidden text-mist-faint sm:inline-block">
              {a.beliefs.eyebrow}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:mt-4 md:gap-6 lg:grid-cols-4">
              {a.beliefs.items.map((b, i) => (
                <div
                  key={b.title}
                  className="border-t-2 border-mist/80 md:pt-3"
                >
                  <span className="font-text hidden text-[3rem] font-semibold text-gold sm:inline-block md:text-[clamp(3rem,7vh,5rem)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 font-display text-[1.1rem] font-semibold leading-snug text-mist">
                    <span className="font-text mr-2 inline-block text-[1.2rem] font-semibold text-gold sm:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {b.title}
                  </h3>

                  <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-soft">
                    {b.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
