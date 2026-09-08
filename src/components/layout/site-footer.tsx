import type { ReactNode } from "react";
import Link from "next/link";
import { Plexus } from "@/components/hero/plexus";
import { nav, ctas, site } from "@/lib/site";

const industries = [
  "Banking & Financial Services",
  "Healthcare & Life Sciences",
  "Enterprises & Corporates",
];

const legal = [
  { href: "/#", label: "Privacy Policy" },
  { href: "/#", label: "Terms & Conditions" },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
    >
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-orange-50">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Plexus variant="light" density={0.6} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

      {/* --- link grid --- */}
      <div className="container-x relative z-10 pb-12 pt-20">
        <div
          className="grid gap-8 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-10"
          data-reveal-group
          data-reveal-y="30"
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Informatia.svg"
              alt="Informatia AI"
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              A digital and AI solutions company turning technology into
              measurable business outcomes — for complex, regulated
              environments.
            </p>
            <Link
              href={ctas.primary.href}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-medium text-paper transition-colors duration-300 hover:bg-purple"
            >
              {ctas.primary.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <nav aria-label="Company">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-teal">
              Company
            </h3>
            <ul className="mt-2 md:mt-4 space-y-1 md:space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-teal">
              Industries
            </h3>
            <ul className="mt-2 md:mt-4 space-y-1 md:space-y-3 text-sm text-ink-soft">
              {industries.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-teal">
              Get in touch
            </h3>
            <ul className="mt-2 md:mt-4 space-y-1 md:space-y-3 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
              <li>{site.location}</li>
            </ul>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-4 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
          </p>
          <p className="flex gap-6">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </p>
        </div>

        {/* --- oversized wordmark, within the container --- */}
        {/* <div
          className="mt-6 w-full select-none border-t border-line pt-10 hidden lg:block"
          data-reveal
          data-reveal-y="60"
        >
          <p className="text-[9rem] font-display font-extrabold text-ink">INFORMATIA AI</p>
        </div> */}
      </div>
    </footer>
  );
}
