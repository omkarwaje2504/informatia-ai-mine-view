import { PromoBanner } from "@/components/hero/promo-banner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/hero/hero";
import { IndustriesShowcase } from "@/components/sections/industries";
import { IndustrySolutions } from "@/components/sections/industry-solutions";
import { promo } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <PromoBanner eyebrow={promo.eyebrow} text={promo.text} />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <IndustriesShowcase />
        <IndustrySolutions />
      </main>
      <SiteFooter />
    </>
  );
}
