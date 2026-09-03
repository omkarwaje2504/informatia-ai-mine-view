import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Plexus } from "@/components/hero/plexus";
import { connectPage as c } from "@/lib/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect With Us",
  description: c.intro,
};

export default function ConnectRoute() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <Plexus variant="light" density={0.85} />
        </div>
        <section className="container-x relative pb-24 sm:pb-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow flex items-center gap-3 text-teal">
                <span className="h-px w-8 bg-ink/30" />
                {c.eyebrow}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
                {c.heading}
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                {c.intro}
              </p>

              <div className="mt-9 border-t border-line pt-6">
                <h2 className="font-display text-[1.15rem] font-semibold text-ink">
                  {c.challenge.heading}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                  {c.challenge.body}
                </p>
              </div>

              <p className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {c.proof}
              </p>

              <div className="mt-6 space-y-1 text-sm text-ink-faint">
                <p>{site.email}</p>
                <p>{site.phone}</p>
                <p>{site.location}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-paper-bright p-6 shadow-float sm:p-9">
              <p className="mb-5 text-sm font-medium text-ink">{c.formNote}</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
