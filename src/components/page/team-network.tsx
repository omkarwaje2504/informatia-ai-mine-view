"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Member = { name: string; role: string };
type Department = { name: string; members: readonly Member[] };

const PALETTE = [
  "var(--color-teal-light)",
  "var(--color-purple-light)",
  "var(--color-gold)",
];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Branch = {
  dept: Department;
  color: string;
  x: number;
  y: number;
  /** translate percentages so the panel grows away from the hub */
  tx: number;
  ty: number;
  align: "left" | "right" | "center";
};

/** One anchor per department, evenly spaced around the hub; each panel is
 * anchored so it grows outward, away from the centre, to avoid overlap. */
function layout(departments: readonly Department[]): Branch[] {
  const n = departments.length;
  return departments.map((dept, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const x = 50 + dx * 36 * 1.25;
    const y = 50 + dy * 36 * 0.85;
    const tx = dx > 0.35 ? 0 : dx < -0.35 ? -100 : -50;
    const ty = dy > 0.35 ? 0 : dy < -0.35 ? -100 : -50;
    const align = dx > 0.35 ? "left" : dx < -0.35 ? "right" : "center";
    return { dept, color: PALETTE[i % PALETTE.length], x, y, tx, ty, align };
  });
}

/**
 * Team as a connected network — one line per department radiating from the
 * founder hub to its own labelled section, every member's full name listed.
 */
export function TeamNetwork({
  leader,
  departments,
}: {
  leader: { name: string; role: string };
  departments: readonly Department[];
}) {
  const reduce = useReducedMotion();
  const branches = useMemo(() => layout(departments), [departments]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="mt-14">
      {/* lg+ — radial department network */}
      <div className="relative hidden h-[46rem] lg:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {branches.map((b) => (
            <line
              key={b.dept.name}
              x1={50}
              y1={50}
              x2={b.x}
              y2={b.y}
              stroke={
                hovered === b.dept.name
                  ? b.color
                  : "var(--color-line-night)"
              }
              strokeWidth={hovered === b.dept.name ? 0.35 : 0.15}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
            />
          ))}
        </svg>

        {/* hub */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-teal-light/40 bg-night bg-teal-light/[0.06] px-6 py-3.5 text-center">
          <p className="font-display text-[1rem] font-semibold text-mist">
            {leader.name}
          </p>
          <p className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-teal-light/80">
            {leader.role}
          </p>
        </div>

        {branches.map((b, i) => (
          <motion.div
            key={b.dept.name}
            className="absolute z-20 w-[11.5rem]"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `translate(${b.tx}%, ${b.ty}%)`,
              textAlign: b.align,
            }}
            onMouseEnter={() => setHovered(b.dept.name)}
            onMouseLeave={() => setHovered((h) => (h === b.dept.name ? null : h))}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_OUT }}
          >
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300"
              style={{ color: hovered === b.dept.name ? b.color : "var(--color-mist)" }}
            >
              {b.dept.name}
            </h3>
            <ul className="mt-2 space-y-1">
              {b.dept.members.map((m) => (
                <li key={m.name} className="text-[0.82rem] leading-snug">
                  <span className="font-medium text-mist-soft">{m.name}</span>
                  {m.role ? (
                    <span className="text-[0.7rem] text-mist-faint">
                      {" "}
                      — {m.role}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* below lg — grouped list */}
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:hidden">
        {departments.map((d, i) => (
          <div key={d.name}>
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: PALETTE[i % PALETTE.length] }}
            >
              {d.name}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {d.members.map((m) => (
                <li key={m.name} className="text-[0.88rem] leading-snug">
                  <span className="font-medium text-mist-soft">{m.name}</span>
                  {m.role ? (
                    <span className="text-[0.76rem] text-mist-faint">
                      {" "}
                      — {m.role}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
