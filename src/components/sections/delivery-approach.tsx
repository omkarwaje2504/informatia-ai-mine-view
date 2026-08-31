import { Fragment } from "react";
import { Plexus } from "@/components/hero/plexus";
import { approach } from "@/lib/content";

export function DeliveryApproach() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden border-t border-line bg-orange-50 py-10 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <Plexus variant="dark" density={0.85} />
      </div>
      <div className="container-x relative">
        <header className="max-w-2xl" data-reveal>
          <p className="eyebrow text-ink-muted">{approach.eyebrow}</p>
          <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            {approach.heading}
          </h2>
          <p className="mt-2 text-[1.1rem] leading-relaxed text-ink-soft">
            {approach.intro}
          </p>
        </header>

        <div
          className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-3"
          data-reveal-group
        >
          {approach.steps.map((s, i) => (
            <Fragment key={s.title}>
              <div className="lg:min-w-0 lg:flex-1">
                <div className="border-t-2 border-ink">
                  <span className="font-text text-[3.8rem] font-semibold text-gold">
                    {s.n}
                  </span>
                  <h3
                    className=" font-display text-[1.35rem] font-semibold text-ink"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-md leading-relaxed text-ink-soft">
                    {s.detail}
                  </p>
                </div>
              </div>

              {i < approach.steps.length - 1 ? (
                <div className="flex shrink-0 items-center justify-center self-center lg:self-start lg:pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Informatia-logo-minimal.png"
                    alt=""
                    aria-hidden
                    width={638}
                    height={463}
                    className="h-7 w-auto rotate-180 lg:h-8 lg:rotate-90"
                  />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
