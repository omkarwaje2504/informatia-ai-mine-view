"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/lib/industries";
import { impact } from "@/lib/content";
import { StageShowcase } from "@/components/sections/StageShowcase";
import { StageSpotlight } from "@/components/sections/StageSpotlight";
import { StageReveal } from "@/components/sections/StageReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

/** funnel stage shown with the full-width showcase treatment */
const SHOWCASE_STAGE = "awareness";
/** funnel stage shown as an illustrated list beside a CTA card */
const SPOTLIGHT_STAGE = "presence-engagement";
/** funnel stage whose cards glide in from both sides on scroll */
const GLIDE_STAGE = "diagnosis";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function IndustryDetail({
  industry,
}: {
  industry: Industry;
}) {
  const hasItems = industry.sections.some((s) => s.items?.length);

  return (
    <section
      // overflow-x-clip: lets the full-bleed Diagnosis story break out of the
      // container without a horizontal scrollbar (clip keeps sticky working)
      className="w-full overflow-x-clip bg-white py-12 sm:py-16"
    >
      <div className="mx-auto container">

        {/* Intro — heading + CTA, rule, wide image, then copy beside stats */}
        <div className="mx-auto">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-ink-muted">Our approach</p>
                <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
                  {industry.headline}
                </h2>
              </div>
              <Link
                href="/connect"
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-purple px-6 py-3 text-[0.9rem] font-medium text-white transition-colors duration-300 hover:bg-ink sm:self-auto"
              >
                Start a Conversation
                <span aria-hidden className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <div className="mt-8 h-px bg-line" />
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mt-8 aspect-[2.5/1] overflow-hidden rounded-3xl border border-line sm:aspect-[4.5/1]">
              <Image
                src="/industries/approach.png"
                alt=""
                fill
                unoptimized
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] lg:gap-12">
            {industry.paragraphs.map((p, index) => (
              <Reveal key={p} delay={150 + index * 100}>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">{p}</p>
              </Reveal>
            ))}
            {impact.stats.map((s, index) => (
              <Reveal key={s.label} delay={350 + index * 100}>
                <p className="bg-gradient-to-r from-purple-light/45 via-purple-light to-purple bg-clip-text font-text text-[3rem] font-bold leading-none tracking-[-0.04em] text-transparent tabular-nums sm:text-[3.5rem]">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{s.label}</p>
              </Reveal>
            ))}
          </div>

          {industry.badges && (
            <Reveal delay={200}>
              <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {industry.badges.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-800"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {/* Sections */}
        {hasItems ? (
          <div className="mt-10 space-y-14">
            {industry.sections.map((s, sectionIndex) =>
              s.id === SHOWCASE_STAGE ? (
                <Reveal key={s.id}>
                  <StageShowcase stage={s} />
                </Reveal>
              ) : s.id === SPOTLIGHT_STAGE ? (
                <Reveal key={s.id}>
                  <StageSpotlight stage={s} />
                </Reveal>
              ) : s.id === GLIDE_STAGE ? (
                // runs its own scroll-linked entrance, so no Reveal wrapper
                <StageReveal key={s.id} stage={s} />
              ) : (
              <div
                key={s.id}
                id={s.id}
                className="scroll-mt-28"
              >
                {/* Section heading */}
                <Reveal delay={sectionIndex * 100}>
                  <div className="flex items-start gap-6 sm:gap-4">
                    <span className="text-2xl font-semibold tabular-nums text-neutral-300 sm:text-4xl">
                      {s.number}
                    </span>

                    <div className="max-w-xl">
                      <h4 className="text-lg font-semibold text-neutral-900 sm:text-xl">
                        {s.title}
                      </h4>

                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Solution cards */}
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {s.items?.map((it, itemIndex) => (
                    <Reveal
                      key={`${s.id}-${it.name}`}
                      delay={itemIndex * 80}
                    >
                      <li className="h-full rounded-xl bg-neutral-100 p-5 transition-transform duration-300 hover:-translate-y-1">
                        <h5 className="text-base font-semibold text-neutral-900">
                          {it.name}
                        </h5>

                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                          {it.description}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              ),
            )}
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {industry.sections.map((s, index) => (
              <Reveal key={s.id} delay={index * 100}>
                <li
                  id={s.id}
                  className="flex h-full flex-col rounded-xl bg-neutral-100 p-6"
                >
                  <span className="text-3xl font-semibold tabular-nums text-neutral-300">
                    {s.number}
                  </span>

                  <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                    {s.title}
                  </h4>

                  {s.tagline && (
                    <p className="mt-1 text-sm font-medium text-neutral-800">
                      {s.tagline}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {s.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}