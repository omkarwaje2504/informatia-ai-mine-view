"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plexus } from "@/components/hero/plexus";
import { industries } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IndustriesShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const sector = industries.sectors[active];

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-paper py-24 md:py-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <Plexus variant="light" density={0.85} />
      </div>
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
          {/* left rail — sticks while the cards scroll past */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-ink-muted">{industries.eyebrow}</p>
            <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {industries.heading}
            </h2>
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-ink-soft">
              {industries.sub}
            </p>

            <div className="mt-3 border-t border-line pt-6">
              <Link
                href={industries.ctas.primary.href}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
              >
                {industries.ctas.primary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* right — tabs + the active sector card */}
          <div>
            <div className="flex flex-wrap gap-2">
              {industries.sectors.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
                    i === active
                      ? "bg-ink text-paper"
                      : "border border-line text-ink-muted hover:border-ink hover:text-ink",
                  )}
                >
                  {s.tab}
                </button>
              ))}
            </div>

            <div className="relative mt-5 overflow-hidden rounded-3xl border border-line-night bg-night text-mist">
              <Plexus variant="dark" density={0.6} className="opacity-25" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 60% at 12% 0%, rgba(108,42,142,0.28), transparent 68%)",
                }}
              />

              <motion.div
                key={sector.id}
                initial={reduce ? false : { opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative flex min-h-[22rem] flex-col gap-8 p-8 sm:p-12"
              >
                <h3 className="max-w-xl font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em] text-mist sm:text-[2.15rem]">
                  {sector.title}
                </h3>
                <ol className="max-w-2xl space-y-4">
                  {sector.points.map((p, i) => (
                    <li key={p} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-0.5 font-display text-[0.9rem] font-semibold text-teal-light"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.95rem] leading-relaxed text-mist-soft">
                        {p}
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
