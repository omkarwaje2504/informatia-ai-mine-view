import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { LeadershipFeature } from "@/components/page/leadership-feature";
import { TeamFeature } from "@/components/page/team-feature";
import { Plexus } from "@/components/hero/plexus";
import { aboutPage as a } from "@/lib/pages";
import ScrollToTop from "@/components/motion/ScrollToTop";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { HeritageFeature } from "@/components/page/heritage-feature";

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

      {/* Heritage + Beliefs */}
        <HeritageFeature />

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