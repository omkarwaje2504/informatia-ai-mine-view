import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { LeadershipFeature } from "@/components/page/leadership-feature";
import { TeamFeature, type TeamMember } from "@/components/page/team-feature";
import { aboutPage as a } from "@/lib/pages";
import ScrollToTop from "@/components/motion/ScrollToTop";
import { HeritageFeature } from "@/components/page/heritage-feature";

export const metadata: Metadata = {
  title: "About Us",
  description: a.intro,
};

// only hand a photo to the card if the file is really in /public — the rest
// get an initials placeholder instead of a broken image
const photoIfExists = (src?: string) =>
  src && existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;

const teamMembers: TeamMember[] = [
  {
    name: a.leadership.name,
    role: a.leadership.role,
    team: "Leadership",
    photo: photoIfExists(a.leadership.photo),
  },
  ...a.team.departments.flatMap((d) =>
    d.members.map((m) => ({
      name: m.name,
      role: m.role,
      team: d.name,
      photo: photoIfExists(m.avatarUrl),
    })),
  ),
];

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

        {/* team — "Meet our Team" card rail; the rail bleeds to the right
            edge so it can't sit inside container-x */}
        <section className="relative z-10 overflow-hidden bg-paper">
          <TeamFeature
            eyebrow={a.team.eyebrow}
            heading={a.team.heading}
            body={a.team.body}
            members={teamMembers}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}