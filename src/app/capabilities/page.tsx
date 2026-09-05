import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero, FlowRow } from "@/components/page/page-hero";
import { Plexus } from "@/components/hero/plexus";
import { capabilitiesPage as c } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Our Capabilities",
  description: c.intro,
};

export default function CapabilitiesRoute() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero eyebrow={c.eyebrow} heading={c.heading} intro={c.intro} />

        {/* tracks */}
        <section className="relative border-t border-line bg-paper py-16 md:py-24">
          <div className="container-x space-y-4">
            {c.tracks.map((t) => (
              <article
                key={t.n}
                className="grid gap-6 border-t border-ink py-8 md:grid-cols-[16rem_1fr] md:gap-12"
              >
                <div>
                  <span className="font-display text-[0.8rem] font-semibold text-gold">
                    {t.n}
                  </span>
                  <h2 className="mt-2 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                    {t.title}
                  </h2>
                </div>
                <div>
                  <p className="font-display text-[1.15rem] font-semibold text-ink">
                    {t.headline}
                  </p>
                  <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
                    {t.detail}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* close */}
        <section className="relative overflow-hidden bg-night py-20 text-mist md:py-28">
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
          <div className="container-x relative max-w-3xl">
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-mist sm:text-[2.8rem]">
              {c.close.heading}
            </h2>
            <FlowRow steps={c.close.flow} className="mt-6 text-mist-soft" />
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist-soft">
              {c.close.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={c.ctas.primary.href}
                className="group inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3 text-[0.9rem] font-medium text-night transition-colors duration-300 hover:bg-white"
              >
                {c.ctas.primary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href={c.ctas.secondary.href}
                className="inline-flex items-center rounded-full border border-line-night px-6 py-3 text-[0.9rem] font-medium text-mist transition-colors duration-300 hover:border-mist"
              >
                {c.ctas.secondary.label}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
