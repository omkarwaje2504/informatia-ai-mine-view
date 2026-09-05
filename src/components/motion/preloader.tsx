"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { markAppReady } from "@/hooks/use-app-ready";

const EASE_INOUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** how long the splash stays before it wipes away — shown on every refresh */
const HOLD_MS = 3000;
const COUNT_MS = 2700;

type Phase = "loading" | "leaving" | "skip";
type Flight = { x: number; y: number; scale: number };

export function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [count, setCount] = useState(0);
  const [flight, setFlight] = useState<Flight | null>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) {
      markAppReady();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("skip");
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const counter = window.setInterval(() => {
      const p = Math.min(100, ((performance.now() - start) / COUNT_MS) * 100);
      setCount(Math.round(p));
      if (p >= 100) window.clearInterval(counter);
    }, 60);

    const leave = window.setTimeout(() => {
      document.documentElement.style.overflow = "";

      // measure where the header's logo actually sits so the mark can fly
      // to (and morph into) that exact spot rather than just fading out
      const from = markRef.current?.getBoundingClientRect();
      const to = document
        .querySelector('header img[src="/Informatia-main.svg"]')
        ?.getBoundingClientRect();
      if (from && to && from.width > 0) {
        setFlight({
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: to.width / from.width,
        });
      }

      setPhase("leaving"); // triggers the wipe-out; markAppReady on exit-complete
    }, HOLD_MS);

    return () => {
      window.clearInterval(counter);
      window.clearTimeout(leave);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  if (phase === "skip") return null;

  return (
    <AnimatePresence onExitComplete={markAppReady}>
      {phase === "loading" && (
        <motion.div key="preloader" className="fixed inset-0 z-[200] overflow-hidden">
          {/* wipe panels */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-night"
                initial={{ y: 0 }}
                exit={{ y: "-101%" }}
                transition={{ duration: 0.8, ease: EASE_INOUT, delay: 0.05 + i * 0.07 }}
              />
            ))}
          </div>

          {/* mark — kept independent of the text/progress fade below so it
              can fly to (and morph into) the header logo's exact spot
              instead of just disappearing with the rest of the content */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center pb-16"
            style={{ opacity: 1 }}
            initial={{ y: 18, scale: 0.92 }}
            animate={{ y: 0, scale: 1 }}
            exit={
              flight
                ? {
                    x: flight.x,
                    y: flight.y,
                    scale: flight.scale,
                    transition: { duration: 0.7, ease: EASE_INOUT },
                  }
                : { opacity: 0, transition: { duration: 0.3 } }
            }
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.12 }}
          >
            <div ref={markRef} className="relative">
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-purple-light/25 blur-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0.5], scale: 1.3 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.2 }}
              />
              <svg viewBox="0 0 1044 761.33" className="h-20 w-auto sm:h-24" aria-hidden>
                <defs>
                  <clipPath id="pl-wipe-a">
                    <motion.rect
                      x={0}
                      width={1044}
                      initial={{ y: 762, height: 0 }}
                      animate={{ y: 0, height: 762 }}
                      transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.25 }}
                    />
                  </clipPath>
                  <clipPath id="pl-wipe-b">
                    <motion.rect
                      x={0}
                      width={1044}
                      initial={{ y: 762, height: 0 }}
                      animate={{ y: 0, height: 762 }}
                      transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.55 }}
                    />
                  </clipPath>
                </defs>
                <path
                  clipPath="url(#pl-wipe-a)"
                  fill="var(--color-purple-light)"
                  d="M474.98,7.79h-161.13L7.61,754.67h160.09L390.96,212.73l230.23,541.94h159.96L475.04,7.79h-.07Z"
                />
                <path
                  clipPath="url(#pl-wipe-b)"
                  fill="var(--color-teal-light)"
                  d="M732.06,7.79h-161.13l307.28,746.88h159.96L732.06,7.79h0Z"
                />
              </svg>
            </div>
          </motion.div>

          {/* tagline */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center text-center justify-center px-6 pt-32 text-mist sm:pt-36"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.p
              className="text-[1.7rem] text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.15 }}
            >
              Engineering Innovation. Delivering Excellence
            </motion.p>
          </motion.div>

          {/* progress */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-8 text-mist sm:px-14"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <span className="font-text text-[2.5rem] font-bold leading-none tracking-tight sm:text-[3.5rem]">
              {String(count).padStart(3, "0")}
            </span>
            <span className="pb-2 text-[0.7rem] uppercase tracking-[0.2em] text-mist-faint">
              Loading
            </span>
          </motion.div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-purple-light to-teal-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
