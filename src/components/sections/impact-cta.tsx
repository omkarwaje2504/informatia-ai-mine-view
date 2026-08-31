import { Plexus } from "@/components/hero/plexus";
import { PointerSplash } from "@/components/motion/pointer-splash";
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
function LogoMarquee() {
  const clients = impact.clients;
  const half = Math.ceil(clients.length / 2);

  const leftRow = clients.slice(0, half);
  const rightRow = clients.slice(half);

  const loop = (items: readonly (typeof clients)[number][]) => [
    ...items,
    ...items,
  ];

  return (
    <div className="my-12 w-full space-y-4">
      <p className="container-x text-[0.9rem] font-semibold uppercase tracking-[0.2em] text-mist-faint">
        {impact.bandLabel}
      </p>

      {/* Left → Right */}
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
        <div className="flex shrink-0 items-center gap-4 motion-safe:animate-[marquee-right_45s_linear_infinite] hover:[animation-play-state:paused]">
          {loop(leftRow).map((c, i) => (
            <span
              key={`left-${i}`}
              className="group flex h-20 shrink-0 items-center rounded-lg bg-white px-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                width={192}
                height={64}
                className="h-16 w-auto object-contain grayscale opacity-80 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Right → Left */}
      <div className="flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
        <div className="flex shrink-0 items-center gap-4 motion-safe:animate-[marquee-left_45s_linear_infinite] hover:[animation-play-state:paused]">
          {loop(rightRow).map((c, i) => (
            <span
              key={`right-${i}`}
              className="group flex h-20 shrink-0 items-center rounded-lg bg-white px-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                width={192}
                height={64}
                className="h-16 w-auto object-contain grayscale opacity-80 transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ImpactCta() {
  return (
    <section id="connect" className="relative bg-night text-mist ">
      

      <div className="relative overflow-hidden py-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-20">
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

        <div className="container-x relative">
          {/* proof stats */}
          <dl
            className="flex flex-col gap-x-16 gap-y-8 border-t border-line-night pt-10 sm:flex-row"
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
        </div>
      </div>
    </section>
  );
}
