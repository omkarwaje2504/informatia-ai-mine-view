"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { markAppReady } from "@/hooks/use-app-ready";

const KEY = "informatia:loaded";
const EASE_INOUT = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Phase = "loading" | "leaving" | "skip";

export function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }

    if (seen || reduce) {
      markAppReady();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("skip");
      return;
    }

    document.documentElement.style.overflow = "hidden";

    let n = 0;
    const counter = window.setInterval(() => {
      n = Math.min(100, n + Math.random() * 9 + 4);
      setCount(Math.round(n));
      if (n >= 100) window.clearInterval(counter);
    }, 95);

    const leave = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      document.documentElement.style.overflow = "";
      setPhase("leaving"); // triggers the wipe-out; markAppReady on exit-complete
    }, 2400);

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

          {/* content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-mist"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <svg viewBox="0 0 60 44" className="h-16 w-auto" fill="none" aria-hidden>
              <motion.path
                d="M7 40 L24 6 L41 40"
                stroke="var(--color-purple-light)"
                strokeWidth={8}
                strokeLinejoin="miter"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
              />
              <motion.path
                d="M44 40 L29 10"
                stroke="var(--color-teal-light)"
                strokeWidth={7}
                strokeLinecap="square"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
              />
            </svg>

            <div className="mt-6 overflow-hidden">
              <motion.p
                className="font-display text-lg font-bold uppercase tracking-[0.32em]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.7 }}
              >
                Informatia <span className="text-purple-light">A</span>
                <span className="text-teal-light">I</span>
              </motion.p>
            </div>

            <motion.p
              className="mt-2 text-[0.7rem] tracking-[0.2em] text-mist-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Engineering Innovation. Delivering Excellence
            </motion.p>
          </motion.div>

          {/* progress */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-8 text-mist sm:px-14"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <span className="font-display text-[2.5rem] font-bold leading-none tracking-tight sm:text-[3.5rem]">
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
