"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Plexus } from "@/components/hero/plexus";
import { orchestration } from "@/lib/content";
import { cn } from "@/lib/utils";

const { eyebrow, heading, body, points, nodes } = orchestration;
const STEPS = points.length; // scroll states: 0 … STEPS

/* minimal line glyphs, one per stage / point */
const GLYPH_PATHS = [
  "M7 3h7l4 4v14H7zM14 3v4h4",
  "M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3",
  "M4 12l5 5L20 6",
  "M12 3l9 16H3zM12 10v4M12 17h.01",
  "M3 7h18v10H3zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5",
];

function Glyph({ i, className }: { i: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={GLYPH_PATHS[i] ?? GLYPH_PATHS[0]} />
    </svg>
  );
}

/* Fixed geometry so connectors line up exactly with the node boxes.
   viewBox is 0 0 100 100, preserveAspectRatio="none" → 1 unit = 1%.
   Every connector segment is axis-aligned, so the stretch never bends it. */
const NODE = { w: 42, h: 19 };
const POS = [
  { left: 2, top: 6 }, //  0  Application intake
  { left: 56, top: 6 }, //  1  Credit & identity
  { left: 2, top: 41 }, //  2  Underwriting decision
  { left: 56, top: 41 }, //  3  Exception
  { left: 2, top: 76 }, //  4  Funding & closing
];
const CONNECTORS = [
  { d: "M44 15.5 H56", from: 1 }, // 0 -> 1
  { d: "M77 25 V33 H23 V41", from: 2 }, // 1 -> 2
  { d: "M44 50.5 H56", from: 3, dashed: true }, // 2 <-> 3
  { d: "M23 60 V76", from: 4 }, // 2 -> 4
];

function Diagram({ step }: { step: number }) {
  const stroke = (active: boolean) =>
    active ? "var(--color-teal-light)" : "rgba(255,255,255,0.13)";

  return (
    <div
      className="relative w-full rounded-2xl border border-line-night bg-night-2/40 p-5"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative aspect-[6/5] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          {CONNECTORS.map((c, i) => (
            <path
              key={i}
              d={c.d}
              stroke={stroke(step >= c.from)}
              strokeWidth="1"
              strokeDasharray={c.dashed ? "2.5 2.5" : undefined}
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke] duration-500"
            />
          ))}
        </svg>

        {step >= 3 ? (
          <span className="absolute left-1/2 top-[50.5%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-night px-1.5 py-0.5 text-[0.55rem] text-mist-faint">
            low confidence
          </span>
        ) : null}

        {nodes.map((n, i) => {
          const on = i <= step;
          return (
            <div
              key={n.title}
              style={{
                left: `${POS[i].left}%`,
                top: `${POS[i].top}%`,
                width: `${NODE.w}%`,
                height: `${NODE.h}%`,
              }}
              className={cn(
                "absolute rounded-xl border transition-colors duration-500",
                on
                  ? "border-teal-light/55 bg-teal-light/[0.07]"
                  : "border-line-night bg-night-2/70",
              )}
            >
              {on ? (
                <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-night px-2 py-0.5 text-[0.55rem] font-medium text-teal-light ring-1 ring-teal-light/40">
                  <span className="h-1 w-1 rounded-full bg-teal-light" />
                  {n.badge}
                </span>
              ) : null}
              <div className="flex h-full items-center gap-3 px-3">
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-500",
                    on
                      ? "bg-teal-light text-night"
                      : "bg-white/[0.04] text-mist-faint",
                  )}
                >
                  <Glyph i={i} className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[0.98rem] font-semibold",
                      on ? "text-mist" : "text-mist-faint",
                    )}
                  >
                    {n.title}
                  </p>
                  <p className="text-[0.92rem] text-mist-faint">{n.stage}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Orchestration() {
  const reduce = useReducedMotion();
  const outer = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(reduce ? STEPS : 0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const st = ScrollTrigger.create({
            trigger: outer.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) =>
              setStep(
                Math.max(
                  0,
                  Math.min(STEPS, Math.floor(self.progress * (STEPS + 1))),
                ),
              ),
          });
          return () => st.kill();
        },
      );
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () =>
        setStep(STEPS),
      );
    },
    { scope: outer },
  );

  return (
    <section
      ref={outer}
      id="capabilities"
      className="relative bg-night text-mist lg:h-[300vh] motion-reduce:lg:h-auto"
    >
      <div className="relative lg:sticky lg:top-[4.25rem] lg:flex lg:h-[calc(100svh-4.25rem)] lg:items-center lg:overflow-hidden motion-reduce:lg:static motion-reduce:lg:h-auto">
        {/* animated backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Plexus variant="dark" density={0.55} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 12% 4%, rgba(108,42,142,0.16), transparent 70%)",
          }}
        />

        <div className="container-x relative z-10 mx-auto w-full py-16 md:py-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
            {/* LEFT — heading stays put; the list grows beneath it */}
            <div>
              <div className="flex items-start gap-5">
                <div className="pt-1">
                  <p className="text-[0.66rem] font-semibold uppercase  text-teal-light">
                    {eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] text-mist sm:text-[2.3rem]">
                    {heading}
                  </h2>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-mist-soft">
                    {body}
                  </p>
                </div>
              </div>

              <div className="mt-9 space-y-1.5 border-t border-line-night pt-8">
                {points.map((p, i) => {
                  const on = i < step;
                  const latest = i === step - 1;
                  return (
                    <div
                      key={p.title}
                      className={cn(
                        "flex gap-3.5 rounded-xl p-3 transition-all duration-500",
                        on
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-3 opacity-0",
                        latest && "bg-white/[0.04] ring-1 ring-line-night",
                      )}
                    >
                      <Glyph
                        i={i}
                        className="mt-0.5 h-4 w-4 shrink-0 text-mist-faint"
                      />
                      <div>
                        <p className="text-[0.9rem] font-semibold text-mist">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[0.82rem] leading-relaxed text-mist-soft">
                          {p.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — the process diagram */}
            <div className="hidden lg:block">
              <Diagram step={step} />
            </div>
          </div>

          {/* below lg — a plain stage list */}
          <ol className="mt-10 space-y-2 lg:hidden">
            {nodes.map((n) => (
              <li
                key={n.title}
                className="flex items-center gap-3 rounded-xl border border-line-night bg-night-2/60 p-3.5"
              >
                <span className="text-[0.64rem] font-medium uppercase  text-teal-light">
                  {n.stage}
                </span>
                <span className="text-[0.9rem] font-semibold text-mist">
                  {n.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
