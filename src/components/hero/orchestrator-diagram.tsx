"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Brain, Compass, Globe, Server, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NodeDef = {
  /** tailwind position classes, hugging an edge so the centre stays clear */
  pos: string;
  /** endpoint in the 0–100 SVG space (spoke runs from the hub at 50,50) */
  svg: [number, number];
  Icon: LucideIcon;
  title: string;
  sub: string;
};

const nodes: NodeDef[] = [
  { pos: "top-[6%] left-[3%]", svg: [12, 14], Icon: Compass, title: "AI Strategy", sub: "advisory & roadmap" },
  { pos: "top-[6%] right-[3%]", svg: [88, 14], Icon: Server, title: "AI Development", sub: "build & scale" },
  { pos: "top-1/2 left-[1%] -translate-y-1/2", svg: [5, 50], Icon: Brain, title: "Any LLM", sub: "vendor-neutral" },
  { pos: "top-1/2 right-[1%] -translate-y-1/2", svg: [95, 50], Icon: ShieldCheck, title: "SOC 2 & ISO 27001", sub: "compliant" },
  { pos: "bottom-[6%] left-[3%]", svg: [12, 86], Icon: Globe, title: "60+ clients", sub: "worldwide" },
  { pos: "bottom-[6%] right-[3%]", svg: [88, 86], Icon: Zap, title: "AI Optimization", sub: "measure & scale" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 190, damping: 16 } },
};

/* --------- full-stage constellation: hub at centre, nodes on every side -------- */

export function OrchestratorDiagram({
  className,
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const show = active || !!reduce;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {/* radial spokes + travelling pulses (SMIL — always in motion) */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-purple-light)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-purple-light)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((n, i) => (
          <path
            key={i}
            d={`M50 50 L ${n.svg[0]} ${n.svg[1]}`}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={0.2}
          />
        ))}

        {!reduce &&
          nodes.map((n, i) => (
            <circle key={`p${i}`} r={0.6} fill="var(--color-teal-light)">
              <animateMotion
                dur={`${3.4 + i * 0.35}s`}
                repeatCount="indefinite"
                path={`M50 50 L ${n.svg[0]} ${n.svg[1]}`}
              />
            </circle>
          ))}
        {!reduce &&
          nodes.map((n, i) => (
            <circle key={`q${i}`} r={0.5} fill="var(--color-purple-light)" opacity={0.8}>
              <animateMotion
                dur={`${4 + i * 0.4}s`}
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
                path={`M${n.svg[0]} ${n.svg[1]} L50 50`}
              />
            </circle>
          ))}

        {/* pulsing hub */}
        <circle cx="50" cy="50" r="9" fill="url(#hub)">
          {!reduce && (
            <animate attributeName="r" values="7;11;7" dur="4s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="50" cy="50" r="0.9" fill="var(--color-teal-light)" />
      </svg>

      {/* perimeter nodes */}
      {nodes.map((n) => (
        <motion.div
          key={n.title}
          variants={item}
          className={cn(
            "group pointer-events-auto absolute flex w-[7.5rem] flex-col items-center gap-1.5 text-center",
            n.pos,
          )}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/40 bg-white text-gold shadow-md transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-teal-light group-hover:shadow-[0_0_0_1px_var(--color-teal-light),0_16px_36px_-10px_rgba(28,195,182,0.45)]">
              <n.Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-center rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm">
              <span className="text-[0.72rem] font-bold text-mist transition-colors duration-300 group-hover:text-teal-light">
                {n.title}
              </span>
              <span className="text-[0.62rem] text-mist-faint">{n.sub}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* --------------------------- stacked (mobile) ------------------------- */

const listParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function OrchestratorList({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("grid gap-2.5 sm:grid-cols-2", className)}
      variants={listParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {nodes.map((n) => (
        <motion.div
          key={n.title}
          variants={listItem}
          className="flex items-center gap-3 rounded-2xl border border-line-night bg-night-card p-4 transition-colors hover:border-teal-light/40"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-gold">
            <n.Icon className="h-5 w-5" />
          </div>
          <span className="text-sm leading-tight text-mist">
            {n.title} <span className="text-mist-faint">{n.sub}</span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
