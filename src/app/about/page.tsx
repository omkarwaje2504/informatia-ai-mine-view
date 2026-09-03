import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { Portrait } from "@/components/page/portrait";
import { TeamTree } from "@/components/page/team-tree";
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

        {/* leadership */}
        <section className="relative border-t border-line bg-paper-bright py-20 md:py-28">
          <div className="container-x grid items-start gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
            <Portrait
              src={a.leadership.photo}
              name={a.leadership.name}
              role={a.leadership.role}
            />
            <div>
              <p className="eyebrow text-ink-muted">{a.leadership.eyebrow}</p>
              <h2 className="mt-5 font-display text-[1.7rem] font-bold tracking-[-0.02em] text-ink sm:text-[2.1rem]">
                {a.leadership.name}
              </h2>
              <p className="mt-1 text-[0.9rem] font-medium uppercase tracking-[0.14em] text-teal">
                {a.leadership.role}
              </p>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
                {a.leadership.bio}
              </p>
              <Link
                href={a.cta.href}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
              >
                {a.cta.label}
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

        {/* team */}
        <section className="relative overflow-hidden bg-night py-20 text-mist md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>
          <div className="container-x relative">
            <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-16">
              <div>
                <p className="eyebrow text-mist-faint">{a.team.eyebrow}</p>
                <p className="mt-5 text-[1.05rem] leading-relaxed text-mist-soft">
                  {a.team.body}
                </p>
              </div>
              <dl className="flex flex-wrap items-end gap-x-12 gap-y-6 self-end">
                <div>
                  <dt className="sr-only">Teams</dt>
                  <dd className="font-text text-[3.2rem] font-bold leading-none tracking-[-0.02em] text-mist sm:text-[3.8rem]">
                    {a.team.departments.length}
                  </dd>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-mist-faint">
                    Specialist teams
                  </p>
                </div>
                <div>
                  <dt className="sr-only">People</dt>
                  <dd className="font-text text-[3.2rem] font-bold leading-none tracking-[-0.02em] text-mist sm:text-[3.8rem]">
                    {a.team.departments.reduce(
                      (n, d) => n + d.members.length,
                      0,
                    )}
                  </dd>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-mist-faint">
                    People delivering
                  </p>
                </div>
              </dl>
            </div>

            <TeamTree
              leader={{ name: a.leadership.name, role: a.leadership.role }}
              departments={a.team.departments}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
