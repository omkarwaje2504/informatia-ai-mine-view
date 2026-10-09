import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import IndustryDetail from "@/components/sections/IndustryDetail";
import ScrollToTop from "@/components/motion/ScrollToTop";
import { INDUSTRIES } from "@/lib/industries";

// Pharma is the only industry we serve for now, so /industries shows it
// directly instead of a one-card listing (old /industries/* links redirect
// here — see next.config.ts).
const industry = INDUSTRIES[0];

export const metadata: Metadata = {
  title: industry.name,
  description: industry.summary,
};

export default function IndustriesRoute() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Industries"
          heading={industry.name}
          intro={industry.summary}
          bgImage="/aboutbg.jpg"
        />
        <IndustryDetail industry={industry} />
      </main>
      <SiteFooter />
    </>
  );
}
