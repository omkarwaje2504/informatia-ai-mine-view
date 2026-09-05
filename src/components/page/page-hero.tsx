import type { ReactNode } from "react";
import { Plexus } from "@/components/hero/plexus";

/** Shared hero for the sub-pages — dark, plexus backdrop, big display heading. */
export function PageHero({
  eyebrow,
  heading,
  intro,
  children,
  bgImage,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
  /** optional photographic background, dimmed under a dark scrim */
  bgImage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night pb-16 pt-36 text-mist sm:pt-44 md:pb-24">
      {bgImage ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/75 to-night" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Plexus variant="dark" density={0.6} />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 55% at 15% 0%, rgba(108,42,142,0.22), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-teal-light">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.3rem] font-bold leading-[1.08] tracking-[-0.03em] text-mist sm:text-[3.2rem] lg:text-[3.9rem]">
          {heading}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-mist-soft">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

/** "A → B → C → D" flow, matching the delivery-approach treatment. */
export function FlowRow({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={
        "flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] " +
        (className ?? "")
      }
    >
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden className="text-teal-light">
              →
            </span>
          ) : null}
          <span>{s}</span>
        </span>
      ))}
    </div>
  );
}
