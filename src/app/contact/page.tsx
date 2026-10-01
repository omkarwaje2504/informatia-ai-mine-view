import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Plexus } from "@/components/hero/plexus";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Have questions or a project in mind? Tell Informatia AI what you're trying to achieve and we'll get back to you.",
};

const expect = [
  "A conversation about outcomes, not a sales pitch.",
  "An initial view on where AI and digital can move the needle.",
  "How strategy, execution and optimization would work on your project.",
];

export default function ContactPage() {
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
                Let&apos;s talk
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
                Start a conversation.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                Tell us what you&apos;re trying to achieve — we&apos;ll get back
                to you.
              </p>

              <ul className="mt-9 space-y-3">
                {expect.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple to-teal" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 border-t border-line pt-5 text-sm text-ink-faint">
                <p>{site.email}</p>
                <p className="mt-1">{site.phone}</p>
                <p className="mt-1">{site.location}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-paper-bright p-6 shadow-float sm:p-9">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
