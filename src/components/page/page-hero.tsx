"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Plexus } from "@/components/hero/plexus";

/** Shared hero for the sub-pages — dark, plexus backdrop, big display heading. */
export function PageHero({
  eyebrow,
  heading,
  intro,
  children,
  bgImage,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
  /** optional photographic background, dimmed under a dark scrim */
  bgImage?: string;
}) {
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    const handleTransitionComplete = () => {
      setTransitionComplete(true);
    };

    window.addEventListener(
      "page-transition-complete",
      handleTransitionComplete
    );

    return () => {
      window.removeEventListener(
        "page-transition-complete",
        handleTransitionComplete
      );
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-night pb-16 pt-36 text-mist sm:pt-44 md:pb-24">
      {bgImage ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/75 to-night" />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Plexus variant="dark" density={0.6} />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 55% at 15% 0%, rgba(108,42,142,0.22), transparent 70%)",
        }}
      />

      <motion.div
        className="container-x relative"
        variants={containerVariants}
        initial="hidden"
        animate={transitionComplete ? "visible" : "hidden"}
      >
        <motion.p
          variants={itemVariants}
          className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-teal-light"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-5 max-w-4xl font-display text-[2.3rem] font-bold leading-[1.08] tracking-[-0.03em] text-mist sm:text-[3.2rem] lg:text-[3.9rem]"
        >
          {heading}
        </motion.h1>

        {intro ? (
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-mist-soft"
          >
            {intro}
          </motion.p>
        ) : null}

        {children ? (
          <motion.div variants={itemVariants} className="mt-8">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}

/** "A → B → C → D" flow, matching the delivery-approach treatment. */
export function FlowRow({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={
        "flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] " +
        (className ?? "")
      }
    >
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden className="text-teal-light">
              →
            </span>
          ) : null}

          <span>{s}</span>
        </span>
      ))}
    </div>
  );
}