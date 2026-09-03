import Link from "next/link";
import { Plexus } from "@/components/hero/plexus";
import { PageHero, FlowRow } from "@/components/page/page-hero";
import type { IndustryPage as IndustryPageData } from "@/lib/pages";

export function IndustryPageView({ data }: { data: IndustryPageData }) {
  return (
    <>
      <PageHero
        eyebrow={data.name}
        heading={data.heading}
        intro={data.intro}
      />

      {/* strategic lever */}
      <section className="relative border-t border-line bg-paper py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow text-ink-muted">{data.lever.label}</p>
          <p className="mt-5 max-w-2xl text-[1.15rem] leading-relaxed text-ink">
            {data.lever.body}
          </p>
          <FlowRow steps={data.lever.flow} className="mt-8 text-ink-soft" />
        </div>
      </section>

      {/* pillars */}
      <section className="relative overflow-hidden bg-night py-20 text-mist md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Plexus variant="dark" density={0.55} />
        </div>
        <div className="container-x relative">
          <h2 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.02em] text-mist sm:text-[2.5rem]">
            {data.pillarsLabel}
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
            {data.pillars.map((p, i) => (
              <article
                key={p.title}
                className="flex flex-col rounded-2xl border border-line-night bg-night-2/50 p-6"
              >
                <span className="font-display text-[0.8rem] font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-mist">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-mist-soft">
                  {p.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line-night pt-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line-night bg-white/5 px-2.5 py-1 text-[0.68rem] font-medium text-mist-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* delivery + close */}
      <section className="relative border-t border-line bg-paper-bright py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow text-ink-muted">{data.delivery.label}</p>
          <FlowRow steps={data.delivery.flow} className="mt-5 text-ink" />
          <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
            {data.delivery.body}
          </p>

          <div className="mt-16 border-t border-line pt-12">
            <h2 className="max-w-2xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {data.close}
            </h2>
            <Link
              href={data.cta.href}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
            >
              {data.cta.label}
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
