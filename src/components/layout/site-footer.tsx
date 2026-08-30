import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { nav, ctas, site } from "@/lib/site";

const industries = [
  "Banking & Financial Institutions",
  "Healthcare & Pharma Organizations",
  "Enterprises & Corporates",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Logo href={null} className="h-9" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              A digital and AI solutions company transforming technology into
              measurable business outcomes — strategy, digital platforms and
              intelligent systems for complex, regulated environments.
            </p>
            <div className="mt-6">
              <ButtonLink href={ctas.primary.href}>{ctas.primary.label}</ButtonLink>
            </div>
          </div>

          <div>
            <h3 className="eyebrow !text-[0.7rem] text-teal">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow !text-[0.7rem] text-teal">Industries we serve</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {industries.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="mt-5 space-y-1 text-sm text-ink-faint">
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                  {site.email}
                </a>
              </p>
              <p>{site.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
          </p>
          <p className="flex gap-5">
            <Link href="/#" className="transition-colors hover:text-ink">Privacy Policy</Link>
            <Link href="/#" className="transition-colors hover:text-ink">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
