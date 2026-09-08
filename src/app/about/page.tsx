import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { LeadershipFeature } from "@/components/page/leadership-feature";
import { TeamFeature } from "@/components/page/team-feature";
import { Plexus } from "@/components/hero/plexus";
import { aboutPage as a } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About Us",
  description: a.intro,
};

export default function AboutRoute() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow={a.eyebrow}
          heading={a.heading}
          intro={a.intro}
          bgImage="/aboutbg.jpg"
        />

        {/* heritage + beliefs — pinned as one full-screen unit (split in
            half). The outer wrapper is taller than the pinned content, so it
            stays fully visible for a "wait" — a bit of extra scroll — before
            leadership (right after) starts rising up to cover it. */}
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
              <div className="container-x grid gap-6 py-8 lg:grid-cols-[22rem_1fr] lg:gap-16">
                <p className="eyebrow text-ink-muted">{a.heritage.eyebrow}</p>
                <div>
                  <h2 className="max-w-2xl font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                    {a.heritage.heading}
                  </h2>
                  <p className="mt-2 lg:mt-5 max-w-2xl text-[0.88rem] leading-relaxed text-ink-soft">
                    {a.heritage.body}
                  </p>
                </div>
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
                      <span className="font-text text-[3rem] font-semibold text-gold hidden sm:inline-block">
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

        {/* team — one dynamic viewport minus the sticky navbar, full width so
            the network scatters edge to edge without the page scrolling */}
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
