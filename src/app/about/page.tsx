import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { LeadershipFeature } from "@/components/page/leadership-feature";
import { TeamFeature } from "@/components/page/team-feature";
import { Plexus } from "@/components/hero/plexus";
import { aboutPage as a } from "@/lib/pages";
import ScrollToTop from "@/components/motion/ScrollToTop";

export const metadata: Metadata = {
  title: "About Us",
  description: a.intro,
};

export default function AboutRoute() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow={a.eyebrow}
          heading={a.heading}
          intro={a.intro}
          bgImage="/aboutbg.jpg"
        />

        {/* heritage + beliefs — pinned as one full-screen unit (split in
            half); leadership, a normal-flow section right after, scrolls up
            and visually covers this pinned pair, then continues scrolling
            normally like any other section. */}
        <div className="relative" style={{ height: "calc(170vh)" }}>
          <section
            className="z-0 flex flex-col overflow-hidden border-t border-line"
            style={{
              position: "sticky",
              top: "73px",
              height: "calc(100vh - 73px)",
            }}
          >
            {/* heritage — top half */}
            <div className="flex flex-1/3 md:flex-1 items-center bg-paper">
              <div className="container-x grid gap-4 py-8 lg:py-16 lg:grid-cols-[22rem_1fr] lg:gap-6">

                {/* left: eyebrow + stat */}
                <div className="flex flex-col gap-4">
                  <p className="eyebrow text-ink-muted">
                    {a.heritage.eyebrow}
                  </p>

                  <div className="hidden lg:block">
                    <div className="flex items-end gap-3">
                      <span className="font-text text-[11rem] font-bold leading-[0.85] tracking-[-0.04em] text-ink">
                        {a.heritage.stat.value}
                      </span>

                      <span className="pb-1 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-teal">
                        {a.heritage.stat.label}
                      </span>
                    </div>

                    <div className="mt-4 h-px w-40 bg-gradient-to-r from-purple-light to-teal-light" />
                  </div>
                </div>

                {/* right: heading + paragraphs */}
                <div>
                  <h2 className="max-w-2xl font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                    {a.heritage.heading}
                  </h2>

                  <div className="mt-3 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-8">
                    {a.heritage.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={`text-[0.88rem] leading-relaxed text-ink-soft ${i > 0 ? "hidden sm:block" : ""
                          }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* closing: full width */}
                <p className="lg:col-span-2  max-w-none font-display text-[0.88rem] lg:text-[1rem] leading-snug text-ink sm:block lg:mt-4">
                  {a.heritage.closing}
                </p>

              </div>
            </div>

            {/* beliefs — bottom half */}
            <div className="relative flex flex-2/3 md:flex-1 md:items-center overflow-hidden bg-night text-mist">
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <Plexus variant="dark" density={0.55} />
              </div>
              <div className="container-x relative py-8">
                <p className="eyebrow text-mist-faint hidden sm:inline-block">{a.beliefs.eyebrow}</p>
                <div className="md:mt-6 grid gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {a.beliefs.items.map((b, i) => (
                    <div key={b.title} className="border-t-2 border-mist/80 md:pt-5">
                      <span className="font-text text-[3rem] md:text-[5rem] font-semibold text-gold hidden sm:inline-block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-display text-[1.1rem] font-semibold leading-snug text-mist">
                        <span className="font-text text-[1.2rem] pr-2 font-semibold text-gold sm:hidden inline-block">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-soft">
                        {b.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* leadership — Founder & CEO — NOT sticky; it's a normal section
            that simply sits above (z-10) the pinned pair above, so it
            visually rises up and covers them as it scrolls past, then keeps
            scrolling normally like anything else. */}
        <div className="relative z-10">
          <LeadershipFeature leader={a.leadership} cta={a.cta} />
        </div>

        {/* team — full width, no container-x, so the network can scatter
            edge to edge */}
        <section className="relative h-[calc(100dvh-73px)] overflow-hidden border-t border-line-night bg-night-2 text-mist">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>
          <div className="relative h-full">
            <TeamFeature
              team={a.team}
              leader={{ name: a.leadership.name, role: a.leadership.role }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}