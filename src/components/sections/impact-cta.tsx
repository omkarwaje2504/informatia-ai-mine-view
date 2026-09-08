"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Plexus } from "@/components/hero/plexus";
import { PointerSplash } from "@/components/motion/pointer-splash";
import { gsap, useGSAP } from "@/lib/gsap";
import { impact } from "@/lib/content";

/** Curved purple→green wave — the transition into the dark closing section. */
function BrandWave() {
  return (
    <div className="bg-paper-bright">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
        className="block h-[clamp(64px,9vw,120px)] w-full"
      >
        <defs>
          <linearGradient id="informatia-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-purple)" />
            <stop offset="0.52" stopColor="var(--color-teal)" />
            <stop offset="1" stopColor="#5fc08c" />
          </linearGradient>
        </defs>
        <path
          d="M0,52 C 300,4 560,4 760,34 C 960,64 1160,64 1440,24 L1440,120 L0,120 Z"
          fill="url(#informatia-band)"
        />
      </svg>
    </div>
  );
}

/** Scrolling client-logo strip — black by default, colour on hover, pauses on hover. */
/** Responsive client-logo marquee.
 * Desktop: 2 rows
 * Mobile / tablet: 4 rows with randomized logo distribution
 */
function LogoMarquee() {
  const clients = impact.clients;

  // Deterministic shuffle so the order doesn't change on every render.
  const shuffled = [...clients].sort((a, b) => {
    const hash = (value: string) => {
      let h = 0;
      for (let i = 0; i < value.length; i++) {
        h = (h << 5) - h + value.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h);
    };

    return hash(a.name) - hash(b.name);
  });

  const desktopHalf = Math.ceil(clients.length / 2);

  const desktopRows = [
    clients.slice(0, desktopHalf),
    clients.slice(desktopHalf),
  ];

  // Split randomized logos into 4 roughly equal rows for mobile/tablet.
  const mobileRows = Array.from({ length: 4 }, (_, rowIndex) =>
    shuffled.filter((_, index) => index % 4 === rowIndex),
  );

  const loop = (items: readonly (typeof clients)[number][]) => [
    ...items,
    ...items,
  ];

  const Logo = ({
    client,
    index,
  }: {
    client: (typeof clients)[number];
    index: number;
  }) => (
    <span
      key={`${client.name}-${index}`}
      className="
        group flex shrink-0 items-center justify-center
        rounded-md bg-white
        px-2.5 py-2
        sm:rounded-lg sm:px-3 sm:py-2.5
        lg:h-20 lg:px-4
      "
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={client.logo}
        alt={client.name}
        width={150}
        height={48}
        className="
          h-8 w-auto max-w-[90px]
          object-contain
          opacity-90
          grayscale
          transition duration-300
          group-hover:opacity-100
          group-hover:grayscale-0
          sm:h-9 sm:max-w-[105px]
          md:h-10 md:max-w-[120px]
          lg:h-16 lg:max-w-[192px]
        "
      />
    </span>
  );

  return (
    <div className="my-8 w-full space-y-3 sm:my-10 sm:space-y-4 lg:my-12">
      <p className="container-x text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-mist-faint sm:text-[0.9rem] sm:tracking-[0.2em]">
        {impact.bandLabel}
      </p>

      {/* =========================
          MOBILE + TABLET
          4 logo rows
         ========================= */}
      <div className="space-y-2.5 md:space-y-3 lg:hidden">
        {mobileRows.map((row, rowIndex) => {
          const items = loop(row);
          const animationClass =
            rowIndex % 2 === 0
              ? "motion-safe:animate-[marquee-right_32s_linear_infinite]"
              : "motion-safe:animate-[marquee-left_32s_linear_infinite]";

          return (
            <div
              key={`mobile-row-${rowIndex}`}
              className="
          flex w-full overflow-hidden
          [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]
        "
            >
              <div
                className={`
            flex min-w-max shrink-0 items-center gap-2
            sm:gap-2.5
            ${animationClass}
          `}
              >
                {items.map((client, index) => (
                  <Logo
                    key={`${rowIndex}-${client.name}-${index}`}
                    client={client}
                    index={index}
                  />
                ))}
              </div>

              {/* Duplicate track for completely seamless movement */}
              <div
                aria-hidden="true"
                className={`
            flex min-w-max shrink-0 items-center gap-2
            sm:gap-2.5
            ${animationClass}
          `}
              >
                {items.map((client, index) => (
                  <Logo
                    key={`duplicate-${rowIndex}-${client.name}-${index}`}
                    client={client}
                    index={index}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          DESKTOP
          2 logo rows
         ========================= */}
      <div className="hidden space-y-4 lg:block">
        {desktopRows.map((row, rowIndex) => (
          <div
            key={`desktop-row-${rowIndex}`}
            className="
              flex w-full overflow-hidden
              [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]
            "
          >
            <div
              className={`
                flex shrink-0 items-center gap-4
                motion-safe:animate-[marquee-${
                  rowIndex === 0 ? "right" : "left"
                }_45s_linear_infinite]
                hover:[animation-play-state:paused]
              `}
            >
              {loop(row).map((client, index) => (
                <Logo
                  key={`${rowIndex}-${client.name}-${index}`}
                  client={client}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImpactCta() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // as this section rises up and covers the pinned "How We Deliver" steps
  // above it, drift the backdrop at a different rate for a parallax cue
  useGSAP(
    () => {
      if (reduce || !sectionRef.current || !bgRef.current) return;
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative bg-night text-mist "
    >
      <div className="relative overflow-hidden py-10 lg:py-20">
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-x-0 -top-[15%] h-[130%] opacity-20 will-change-transform"
        >
          <Plexus variant="dark" density={0.6} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 45% at 50% 0%, rgba(108,42,142,0.2), transparent 72%)",
          }}
        />

        {/* mouse splash */}
        <PointerSplash tone="purple" size={30} />

        <div className="container-x relative" data-reveal>
          <h2
            className="mt-6 max-w-4xl font-display text-[2.1rem] font-bold leading-[1.72] tracking-[-0.03em] sm:text-[3.2rem] lg:text-[3rem]"
            style={{
              fontWeight: 400,
            }}
          >
            {impact.questions.map((q) => (
              <span key={q.highlight} className="block text-mist">
                {q.lead} <span className="text-[#0e9c93]">{q.highlight}</span>?
              </span>
            ))}
          </h2>

          <p className="mt-2 max-w-xl text-[1.1rem]  text-mist">
            {impact.body}
          </p>
        </div>

        {/* full-bleed client logo marquee */}
        <LogoMarquee />

        <div className=" relative">
          {/* proof stats */}
          <dl
            className="flex container-x gap-x-16 gap-y-8 border-t border-line-night pt-10"
            data-reveal-group
          >
            {impact.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-baseline gap-1">
                <dt className="font-text text-[2.8rem] font-bold leading-none text-gold sm:text-[5.9rem]">
                  {s.value}
                </dt>
                <dd className=" text-[1.1rem] leading-snug text-white">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* closing call to action */}
          <div
            className="mt-10 m-4 md:mx-10 rounded-3xl border border-[#f2ddc4] bg-orange-50 p-8 sm:mt-20 sm:p-12"
            data-reveal
          >
            <h2 className="max-w-3xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {impact.ctaHeading}
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
              {impact.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={impact.ctas.primary.href}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
              >
                {impact.ctas.primary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href={impact.ctas.secondary.href}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:border-ink"
              >
                {impact.ctas.secondary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
