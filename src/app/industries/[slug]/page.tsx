import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/page/page-hero";
import ScrollToTop from "@/components/motion/ScrollToTop";
import IndustryDetail from "@/components/sections/IndustryDetail";
import { INDUSTRIES, getIndustry } from "@/lib/industries";

// Next 15: params is a Promise. (On Next 14, use `{ params: { slug: string } }` and drop the awaits.)
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.summary };
}

export default async function IndustryRoute({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

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