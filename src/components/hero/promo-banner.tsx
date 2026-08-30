"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Plexus } from "./plexus";
import { useParallax } from "@/hooks/use-parallax";
import { useAppReady } from "@/hooks/use-app-ready";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PromoBanner({ eyebrow, text }: { eyebrow: string; text: string }) {
  const reduce = useReducedMotion();
  const ready = useAppReady();
  const go = ready || !!reduce;
  const { x, y } = useParallax();
  const px = useTransform(x, (v) => v * 26);
  const py = useTransform(y, (v) => v * 16);

  return (
    <div className="relative overflow-hidden bg-night text-mist py-5">
      <motion.div style={reduce ? undefined : { x: px, y: py }} className="absolute inset-[-6%]">
        <Plexus variant="dark" density={1.3} className="opacity-75" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 130% at 18% 0%, rgba(108,42,142,0.4), transparent 60%), radial-gradient(50% 130% at 88% 100%, rgba(28,195,182,0.22), transparent 60%)",
        }}
      />

      <div className="container-x relative flex min-h-[8.5rem] flex-col items-center justify-center gap-2.5 py-8 text-center sm:min-h-[9.5rem]">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
          className="eyebrow text-teal-light"
        >
          {eyebrow}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="max-w-2xl font-display text-base font-normal leading-snug tracking-tight sm:text-lg lg:text-[1.45rem]"
        >
          {text}
        </motion.p>

        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          animate={go ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-1 h-px w-16 origin-center bg-gradient-to-r from-purple-light to-teal-light"
        />
      </div>
    </div>
  );
}
