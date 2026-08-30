import { PromoBanner } from "@/components/hero/promo-banner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/hero/hero";
import { promo } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <PromoBanner eyebrow={promo.eyebrow} text={promo.text} />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
      </main>
      <SiteFooter />
    </>
  );
}
