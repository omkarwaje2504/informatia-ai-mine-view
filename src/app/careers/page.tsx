import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { Plexus } from "@/components/hero/plexus";
import { careersPage as c } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Grow With Us",
  description: c.intro,
};

export default function CareersRoute() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero eyebrow={c.eyebrow} heading={c.heading} intro={c.intro} />

        {/* reasons */}
        <section className="relative border-t border-line bg-paper py-20 md:py-28">
          <div className="container-x">
            <p className="eyebrow text-ink-muted">{c.reasonsLabel}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {c.reasons.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-line bg-paper-bright p-6"
                >
                  <h3 className="font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                    {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* apply */}
        <section className="relative overflow-hidden bg-night py-20 text-mist md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.6} />
          </div>
          <div className="container-x relative max-w-2xl">
            <h2 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.02em] text-mist sm:text-[2.5rem]">
              {c.apply.heading}
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-mist-soft">
              {c.apply.body}
            </p>
            <a
              href={`mailto:${c.apply.email}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3 text-[0.9rem] font-medium text-night transition-colors duration-300 hover:bg-white"
            >
              {c.apply.cta}
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
