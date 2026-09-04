"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Leader = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  quote: string;
  credentials: readonly string[];
  note: string;
};

/**
 * Founder & CEO feature — the portrait runs full-bleed behind the section,
 * the name is set huge but light, and the pull-quote is a giant low-opacity
 * watermark with only the closing mark at full brightness.
 */
export function LeadershipFeature({
  leader,
  cta,
}: {
  leader: Leader;
  cta: { href: string; label: string };
}) {
  const reduce = useReducedMotion();
  const rise = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay: i * 0.07, ease: EASE_OUT },
        };

  return (
    <section className="relative overflow-hidden border-t border-line-night bg-night text-mist">
      {/* full-bleed founder photo */}
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photo}
          alt=""
          className="h-full w-full object-cover object-top opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/90 to-night" />
      </div>

      <div className="container-x relative py-24 md:py-32">
        {/* name + role, badge to the right */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <motion.div {...rise(0)}>
            <h2 className="font-display text-[3rem] font-normal leading-[0.95] tracking-[-0.02em] text-mist sm:text-[4.5rem] lg:text-[5.5rem]">
              {leader.name}
            </h2>
            <p className="mt-2 text-[1.1rem] text-mist/55 sm:text-[1.4rem]">
              {leader.role}
            </p>
          </motion.div>

          <motion.div
            {...rise(1)}
            className="flex max-w-[12rem] items-start gap-2.5 text-[0.8rem] leading-snug text-mist-soft"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-mist/25 text-[0.7rem]">
              ✦
            </span>
            {leader.credentials[0]}
          </motion.div>
        </div>

        {/* narrow bio */}
        <motion.p
          {...rise(2)}
          className="mt-14 max-w-[17rem] text-[0.92rem] leading-relaxed text-mist-soft md:mt-20"
        >
          {leader.bio}
        </motion.p>

        {/* divider */}
        <motion.div
          {...rise(3)}
          aria-hidden
          className="my-10 flex items-center gap-3 text-mist/40 md:my-14"
        >
          <span className="h-px flex-1 bg-mist/15" />
          <span className="text-lg leading-none">+</span>
        </motion.div>

        {/* giant pull-quote — words blur/fade in one by one on scroll */}
        <div className="flex items-start justify-between gap-6">
          <blockquote className="max-w-4xl font-display text-[2rem] font-normal leading-[1.08] tracking-[-0.02em] text-mist sm:text-[3.1rem] lg:text-[4rem]">
            {leader.quote.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-[filter,opacity]"
                initial={reduce ? false : { opacity: 0.08, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.045,
                  ease: EASE_OUT,
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </blockquote>
          <motion.span
            aria-hidden
            {...rise(4)}
            className="shrink-0 font-display text-[3rem] leading-none text-mist sm:text-[4.5rem]"
          >
            &rdquo;
          </motion.span>
        </div>

        {/* closing line + cta */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-8 md:mt-20">
          <motion.p
            {...rise(5)}
            className="max-w-[17rem] text-[0.92rem] leading-relaxed text-mist-soft"
          >
            {leader.credentials[1]}.{" "}
            <span className="text-mist/45">{leader.note}</span>
          </motion.p>

          <motion.div {...rise(6)}>
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3 text-[0.9rem] font-medium text-night transition-colors duration-300 hover:bg-white"
            >
              {cta.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
