"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/lib/industries";

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
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Back */}
        <Reveal>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All industries
          </Link>
        </Reveal>

        {/* Intro */}
        <div className="mx-auto mt-8 max-w-7xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {industry.headline}
            </h2>
          </Reveal>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {industry.paragraphs.map((p, index) => (
              <Reveal key={p} delay={index * 100}>
                <p>{p}</p>
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
            {industry.sections.map((s, sectionIndex) => (
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
            ))}
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