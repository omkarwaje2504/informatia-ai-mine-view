import type { Metadata } from "next";
import "./globals.css";
import { display, text } from "@/lib/fonts";
import { site } from "@/lib/site";
import { CursorLayer } from "@/components/motion/cursor-layer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/motion/preloader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SmoothScroll />
        <Preloader />
        {children}
        <CursorLayer />
      </body>
    </html>
  );
}
