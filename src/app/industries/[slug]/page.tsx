import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { IndustryPageView } from "@/components/page/industry-page";
import { industryPages } from "@/lib/pages";

export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = industryPages[slug];
  if (!page) return {};
  return { title: page.name, description: page.intro };
}

export default async function IndustryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = industryPages[slug];
  if (!data) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <IndustryPageView data={data} />
      </main>
      <SiteFooter />
    </>
  );
}
