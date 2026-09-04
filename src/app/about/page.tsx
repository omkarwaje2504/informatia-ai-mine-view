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
        <PageHero eyebrow={a.eyebrow} heading={a.heading} intro={a.intro} />

        {/* heritage */}
        <section className="relative border-t border-line bg-paper py-20 md:py-28">
          <div className="container-x grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
            <p className="eyebrow text-ink-muted">{a.heritage.eyebrow}</p>
            <div>
              <h2 className="max-w-2xl font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                {a.heritage.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
                {a.heritage.body}
              </p>
            </div>
          </div>
        </section>

        {/* beliefs */}
        <section className="relative overflow-hidden bg-night py-20 text-mist md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>
          <div className="container-x relative">
            <p className="eyebrow text-mist-faint">{a.beliefs.eyebrow}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {a.beliefs.items.map((b, i) => (
                <div
                  key={b.title}
                  className="border-t-2 border-mist/80 pt-5"
                >
                  <span className="font-text text-[0.8rem] font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[1.1rem] font-semibold leading-snug text-mist">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-soft">
                    {b.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* leadership — Founder & CEO */}
        <LeadershipFeature leader={a.leadership} cta={a.cta} />

        {/* team */}
        <section className="relative overflow-hidden border-t border-line-night bg-night-2 py-20 text-mist md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>
          <div className="container-x relative">
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
