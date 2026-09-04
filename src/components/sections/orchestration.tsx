"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plexus } from "@/components/hero/plexus";
import { PointerSplash } from "@/components/motion/pointer-splash";
import { orchestration } from "@/lib/content";

const { eyebrow, heading, body, cta, points, nodes } = orchestration;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Orchestration() {
  const reduce = useReducedMotion();

  const fold = reduce
    ? {}
    : {
        initial: { opacity: 0, rotateX: -88 },
        whileInView: { opacity: 1, rotateX: 0 },
        viewport: { once: true, margin: "-15% 0px -15% 0px" },
        transition: { duration: 0.85, ease: EASE_OUT },
        style: { transformOrigin: "top center" as const },
      };

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-night py-20 text-mist md:py-28"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Plexus variant="dark" density={0.55} />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 15% 8%, rgba(108,42,142,0.16), transparent 70%)",
        }}
      />
      <PointerSplash tone="purple" size={25} />

      <div className="container-x relative z-10">
        {/* heading */}
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-teal-light">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-mist sm:text-[2.7rem]">
            {heading}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-mist-soft">
            {body}
          </p>
        </div>

        {/* folding cards */}
        <div className="mt-12 space-y-4 [perspective:1200px] md:mt-16">
          {points.map((p, i) => (
            <motion.article
              key={p.title}
              {...fold}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-line bg-paper-bright p-7 text-ink [transform-style:preserve-3d] md:grid-cols-12 md:gap-6 md:p-10"
            >
              <div className="md:col-span-5">
                <span className="font-text text-[0.8rem] font-semibold text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.4rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">
                  {p.title}
                </h3>
              </div>
              <div className="md:col-span-7 md:flex md:items-center">
                <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                  {p.detail}
                </p>
              </div>
            </motion.article>
          ))}

          {/* how it connects — a compact stepper */}
          <motion.div {...fold} className="pt-2 [transform-style:preserve-3d]">
            <ol className="flex items-start">
              {nodes.map((n, i) => (
                <li
                  key={n.title}
                  className="relative flex flex-1 flex-col items-center px-1 text-center"
                >
                  {i < nodes.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-[0.45rem] -z-0 h-px w-full bg-gradient-to-r from-teal-light/50 to-line-night"
                    />
                  ) : null}
                  <span className="relative z-10 h-[0.9rem] w-[0.9rem] rounded-full bg-teal-light ring-4 ring-night" />
                  <span className="mt-3 font-display text-[0.82rem] font-semibold leading-tight text-mist sm:text-[0.95rem]">
                    {n.title}
                  </span>
                  <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-teal-light">
                    {n.badge}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <Link
          href={cta.href}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border border-mist/25 px-6 py-3 text-[0.9rem] font-medium text-mist transition-colors duration-300 hover:border-teal-light hover:text-teal-light"
        >
          {cta.label}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
