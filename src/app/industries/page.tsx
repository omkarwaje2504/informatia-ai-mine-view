import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import { industryPage as a } from "@/lib/pages";
import IndustryCards from "@/components/sections/IndustryCards";
import ScrollToTop from "@/components/motion/ScrollToTop";

export const metadata: Metadata = {
  title: "Industries",
  description: a.intro,
};

export default function IndustriesRoute() {
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
        <IndustryCards />
      </main>
      <SiteFooter />
    </>
  );
}