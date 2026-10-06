"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Landmark, Pill } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { motion, useScroll, useTransform } from "framer-motion";
const ICONS = { pharma: Pill, banking: Landmark } as const;
import { useRef } from "react";

function ParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={imageRef}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[10%] h-[120%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
export default function IndustryCards() {
  return (
    <section className="w-full overflow-x-hidden bg-white ">
      {/* <h2 className="flex flex-col items-center justify-center !border-t !border-t-mist-400 bg-night py-4 text-center font-display text-[1.4rem] font-bold tracking-tight text-mist sm:py-8 sm:text-[2.4rem]">
    <span>Industries We Serve</span>
  </h2> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
        <div className=" flex flex-col gap-16  md:gap-0">
          {INDUSTRIES.map((ind, index) => {
            const Icon = ICONS[ind.icon];
            const imageOnRight = index % 2 === 0;

            const solutionCount = ind.sections.reduce(
              (n, s) => n + (s.items?.length ?? 0),
              0
            );

            return (
              <div
                key={ind.slug}
                className={`flex flex-col items-center gap-8 md:flex-row md:gap-0 ${imageOnRight ? "" : "md:flex-row-reverse"
                  }`}
              >
                {/* Content */}
                <div
                  className={`flex w-full flex-col justify-center md:w-1/2 ${imageOnRight ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"
                    }`}
                >
                  <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {ind.sections.length}{" "}
                    {ind.slug === "pharma"
                      ? "funnel stages"
                      : "strategic levers"}
                    {solutionCount > 0 && ` · ${solutionCount} solutions`}
                  </span>

                  <h3 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-7xl">
                    {ind.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {ind.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {ind.sections.map((s) => (
                      <li
                        key={s.id}
                        className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-700"
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group mt-6 inline-flex w-fit items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  >
                    <span className="text-sm sm:text-base font-medium text-neutral-900">
                      Explore {ind.name}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-200 text-neutral-800 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </div>

                {/* Full-bleed image */}
                {/* Full-bleed image */}
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 md:w-[50vw] ${imageOnRight
                      ? "md:mr-[calc((100vw-100%)/-2)]"
                      : "md:ml-[calc((100vw-100%)/-2)]"
                    }`}
                >
                  {"image" in ind && ind.image ? (
                    <ParallaxImage
                      src={ind.image as string}
                      alt={ind.name}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon
                        className="h-24 w-24 text-neutral-800"
                        strokeWidth={1.1}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
