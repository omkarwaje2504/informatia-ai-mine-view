"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { industrySolutions } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Decorative pixel-grid glyph that sits over each card's top-right corner. */
const GLYPHS = [
  {
    bg: "bg-ink",
    cells: [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  },
  {
    bg: "bg-teal",
    cells: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  },
  {
    bg: "bg-ink-muted",
    cells: [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
  },
];

function GridGlyph({ i }: { i: number }) {
  const g = GLYPHS[i % GLYPHS.length];
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-5 right-5 grid h-14 w-14 place-items-center rounded-xl shadow-card",
        g.bg,
      )}
    >
      <svg viewBox="0 0 20 20" className="h-6 w-6">
        {g.cells.map((v, idx) =>
          v ? (
            <rect
              key={idx}
              x={(idx % 5) * 4 + 0.6}
              y={Math.floor(idx / 5) * 4 + 0.6}
              width={2.8}
              height={2.8}
              rx={0.4}
              fill="white"
              opacity={0.92}
            />
          ) : null,
        )}
      </svg>
    </span>
  );
}

export function IndustrySolutions() {
  const reduce = useReducedMotion();

  return (
    <section
      id="solutions"
      className="relative border-t border-line bg-paper-bright py-24 md:py-32"
    >
      <div className="container-x">
        <header className="max-w-2xl">
          <p className="eyebrow text-ink-muted">{industrySolutions.eyebrow}</p>
          <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            {industrySolutions.heading}
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
            {industrySolutions.sub}
          </p>
        </header>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {industrySolutions.cards.map((c, i) => (
            <motion.article
              key={c.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="relative flex flex-col rounded-2xl border border-line p-6 pt-9"
              style={{
                background:
                  "linear-gradient(180deg, rgba(28,195,182,0.09), var(--color-paper) 60%)",
              }}
            >
              <GridGlyph i={i} />

              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {industrySolutions.cardEyebrow}
              </p>
              <h3 className="mt-2 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {c.name}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-soft">
                {c.blurb}
              </p>

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {c.solutions.map((sol) => (
                  <li key={sol}>
                    <Link
                      href="/contact"
                      className="group flex items-center gap-3 py-3 text-[0.85rem] font-medium text-ink"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                      />
                      {sol}
                      <span
                        aria-hidden
                        className="ml-auto text-ink-faint transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-ink px-4 py-2 text-[0.8rem] font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {industrySolutions.ctaPrefix} {c.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
