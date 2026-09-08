"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const node: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Minimal connected-node line — the quiet visual bridge for Scene 2.
 * A single hairline rule with a node per step and one travelling pulse;
 * collapses to a stacked list below sm.
 */
export function FlowLine({
  steps,
  active = true,
  className,
}: {
  steps: readonly string[];
  active?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const show = active || !!reduce;

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className={cn("relative md:w-full md:max-w-[42rem]", className)}
      aria-hidden
    >
      {/* horizontal — sm and up */}
      <div className="relative hidden sm:block">
        <div className="absolute inset-x-0 top-[0.3rem] h-px bg-line-night" />
        {!reduce && show ? (
          <motion.div
            className="absolute top-[0.3rem] h-px w-14 bg-gradient-to-r from-transparent via-teal-light to-transparent"
            initial={{ left: "-3.5rem" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.4,
            }}
          />
        ) : null}

        <div className="relative flex items-start justify-between">
          {steps.map((s) => (
            <motion.div
              key={s}
              variants={node}
              className="flex flex-col items-center gap-3"
            >
              <span className="block h-[0.6rem] w-[0.6rem] rounded-full border border-teal-light/70 bg-night" />
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mist-soft">
                {s}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* stacked — below sm */}
      <div className="flex md:flex-col md:gap-3 sm:hidden">
        {steps.map((s) => (
          <motion.div key={s} variants={node} className="flex items-center gap-3">
            <span className="block h-[0.55rem] w-[0.55rem] shrink-0 rounded-full border border-teal-light/70" />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mist-soft">
              {s}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
