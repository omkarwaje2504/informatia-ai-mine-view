"use client";

import { useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import { productNetwork } from "@/lib/content";
import { cn } from "@/lib/utils";

const { eyebrow, heading, products } = productNetwork;

/* --- wire every node to its three nearest neighbours (dedup, undirected) --- */
function buildEdges(pts: readonly { x: number; y: number }[]) {
  const set = new Set<string>();
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => set.add(i < j ? `${i}:${j}` : `${j}:${i}`));
  });
  return [...set].map((s) => s.split(":").map(Number) as [number, number]);
}

const EDGES = buildEdges(products);
const ADJ = products.map(
  (_, i) =>
    new Set(
      EDGES.filter(([a, b]) => a === i || b === i).map(([a, b]) =>
        a === i ? b : a,
      ),
    ),
);

/**
 * SVG coords. viewBox height matches the aspect-[16/9] frame so that
 * preserveAspectRatio="none" scales x and y equally — keeps the flowing
 * pulses perfectly circular. HTML node positions still use raw `y%`.
 */
const VB_H = 56.25;
const SVG_PTS = products.map((p) => ({ x: p.x, y: (p.y * VB_H) / 100 }));

/* ------------------------------ the web ------------------------------ */

function NetworkWeb() {
  const reduce = useReducedMotion();
  const { x, y } = useParallax();
  const px = useTransform(x, (v) => v * 16);
  const py = useTransform(y, (v) => v * 12);
  const [active, setActive] = useState<number | null>(null);

  const clear = (i: number) => setActive((cur) => (cur === i ? null : cur));

  return (
    <div className="relative mx-auto mt-6 hidden aspect-[16/9] w-full max-w-4xl md:block">
      <motion.div
        style={reduce ? undefined : { x: px, y: py }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-[4%]"
          animate={reduce ? undefined : { x: [0, 9, -5, 0], y: [0, -7, 4, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* connections + flowing current */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 100 ${VB_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {EDGES.map(([a, b], i) => {
              const on = active !== null && (a === active || b === active);
              return (
                <line
                  key={i}
                  x1={SVG_PTS[a].x}
                  y1={SVG_PTS[a].y}
                  x2={SVG_PTS[b].x}
                  y2={SVG_PTS[b].y}
                  stroke="currentColor"
                  strokeWidth={on ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "transition duration-300",
                    on
                      ? "text-teal-light opacity-90"
                      : active !== null
                        ? "text-mist opacity-[0.06]"
                        : "text-mist opacity-20",
                  )}
                />
              );
            })}

            {/* travelling pulses — a current running through every wire */}
            {!reduce &&
              EDGES.map(([a, b], i) => {
                const on = active !== null && (a === active || b === active);
                const from = i % 2 === 0 ? SVG_PTS[a] : SVG_PTS[b];
                const to = i % 2 === 0 ? SVG_PTS[b] : SVG_PTS[a];
                const path = `M${from.x} ${from.y} L${to.x} ${to.y}`;
                const dur = 2.8 + (i % 5) * 0.6;
                const begin = -((i * 1.7) % dur);
                return (
                  <g
                    key={`pulse-${i}`}
                    className={cn(
                      "text-teal-light transition-opacity duration-300",
                      active !== null && !on && "opacity-20",
                    )}
                  >
                    <circle r={0.9} fill="currentColor" opacity={0.18}>
                      <animateMotion
                        dur={`${dur}s`}
                        begin={`${begin}s`}
                        repeatCount="indefinite"
                        path={path}
                        calcMode="linear"
                      />
                    </circle>
                    <circle r={0.42} fill="currentColor" opacity={0.85}>
                      <animateMotion
                        dur={`${dur}s`}
                        begin={`${begin}s`}
                        repeatCount="indefinite"
                        path={path}
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                );
              })}
          </svg>

          {/* nodes — the label pill sits ON the point; wires tuck under it */}
          {products.map((p, i) => {
            const on = active === i;
            const near = active !== null && ADJ[active].has(i);
            const dim = active !== null && !on && !near;

            return (
              <button
                key={p.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => clear(i)}
                onFocus={() => setActive(i)}
                onBlur={() => clear(i)}
                onClick={() => setActive((cur) => (cur === i ? null : i))}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={cn(
                  "group absolute -translate-x-1/2 -translate-y-1/2 outline-none transition-opacity duration-300",
                  on ? "z-30" : near ? "z-20" : "z-10",
                  dim && "opacity-35",
                )}
                aria-label={`${p.name}: ${p.blurb}`}
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[0.8rem] font-medium tracking-tight backdrop-blur transition-colors duration-300",
                    on
                      ? "border-teal-light bg-white text-[#4a1d6b] shadow-[0_0_20px_rgba(28,195,182,0.4)]"
                      : near
                        ? "border-teal-light/50 bg-white/95 text-ink"
                        : "border-white/10 bg-white/85 text-ink-soft group-hover:border-teal-light/40",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                      on || near ? "bg-teal-light" : "bg-mist-faint",
                    )}
                  />
                  {p.name}
                </span>

                {on ? (
                  <span
                    className={cn(
                      "pointer-events-none absolute z-40 w-56 rounded-xl border border-line-night bg-night-card/95 p-3.5 text-left shadow-card backdrop-blur",
                      p.y > 55 ? "bottom-full mb-2" : "top-full mt-2",
                      p.x > 70
                        ? "right-0"
                        : p.x < 30
                          ? "left-0"
                          : "left-1/2 -translate-x-1/2",
                    )}
                  >
                    <span className="mb-1 block text-[0.78rem] font-semibold text-mist">
                      {p.name}
                    </span>
                    <span className="block text-[0.8rem] leading-relaxed text-mist-soft">
                      {p.blurb}
                    </span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* --------------------------- stacked (mobile / reduced motion) --------------------------- */

export function ProductList({ className }: { className?: string }) {
  return (
    <ul className={cn("mt-10 grid gap-3 sm:grid-cols-2", className)}>
      {products.map((p) => (
        <li
          key={p.name}
          className="rounded-2xl border border-line-night bg-night-card/70 p-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-teal-light" />
            <span className="text-[0.9rem] font-semibold text-mist">
              {p.name}
            </span>
          </div>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-mist-soft">
            {p.blurb}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ in-panel content ------------------------------ */

/**
 * The product web as it appears inside the hero's "We build…" panel — a compact
 * header plus the interactive web. Mobile falls back to <ProductList/>, rendered
 * by the hero's stacked layout.
 */
export function ProductNetworkContent() {
  return (
    <div className="hidden h-full flex-col justify-center px-6 md:flex lg:px-12">
      <header className="mx-auto w-full max-w-4xl">
        <p className="mb-3 flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-mist-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </p>
        <h2 className="font-display text-[1.6rem] font-bold leading-[1.1] tracking-[-0.02em] text-mist sm:text-[2rem]">
          {heading}
        </h2>
      </header>
      <NetworkWeb />
      <p className="mx-auto mt-4 w-full max-w-4xl text-[0.7rem] uppercase tracking-[0.2em] text-mist-faint">
        Hover a node to explore
      </p>
    </div>
  );
}
