import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { LeadershipFeature } from "@/components/page/leadership-feature";
import { TeamFeature } from "@/components/page/team-feature";
import { Plexus } from "@/components/hero/plexus";
import { productPage as a } from "@/lib/pages";
import ProductsShowcase from "@/components/sections/ProductsShowcase";

export const metadata: Metadata = {
  title: "Product",
  description: a.intro,
};

export default function ProductRoute() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow={a.eyebrow}
          heading={a.heading}
          intro={a.intro}
          bgImage="/aboutbg.jpg"
        />
        <ProductsShowcase/>
      </main>
      <SiteFooter />
    </>
  );
}