"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Member = { name: string; role: string };
type Department = { name: string; members: readonly Member[] };
type Node = Member & { dept: string; color: string; priority: boolean };
type Placed = { node: Node; x: number; y: number };

const PALETTE = [
  "var(--color-teal-light)",
  "var(--color-purple-light)",
  "var(--color-gold)",
  "var(--color-teal)",
  "var(--color-purple)",
];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** These are the senior/lead names — they anchor the innermost ring,
 * closest to the founder, with everyone else scattered further out. */
const PRIORITY = new Set([
  "Annil Lad",
  "Omkar",
  "Wasim",
  "Prasad",
  "Kamlesh",
  "Aniket",
  "Sushant",
  "Tina",
  "Manjiri",
  "Sanjib",
]);

/** Every member, flattened in department order, each carrying its
 * department's colour so the whole cluster can be highlighted together. */
function flatten(departments: readonly Department[]): Node[] {
  return departments.flatMap((dept, di) =>
    dept.members.map((m) => ({
      ...m,
      dept: dept.name,
      color: PALETTE[di % PALETTE.length],
      priority: PRIORITY.has(m.name),
    })),
  );
}

/** Deterministic pseudo-random in [0, 1) — same on server and client, no
 * hydration mismatch, unlike Math.random(). */
function rnd(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Stable per-node seed derived from the name itself, so jitter doesn't
 * shift around when nodes get reshuffled between rings. */
function seedOf(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % 100000;
  }
  return h;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Round to 3dp — trig can differ in its last bit between the server and
 * client runtimes, which is enough to trip a hydration mismatch on the
 * serialized path/style strings. */
const round = (v: number) => Math.round(v * 1000) / 1000;

/** Scatter every node across the full circle around the hub — the priority
 * names anchor the innermost ring, everyone else splits across two outer
 * rings, each evenly spaced then nudged with jitter so the whole thing
 * reads as organic rather than a mechanical grid. */
function layout(nodes: Node[]): Placed[] {
  const buckets: Node[][] = [[], [], []];
  let restCount = 0;
  nodes.forEach((node) => {
    if (node.priority) {
      buckets[0].push(node);
    } else {
      buckets[1 + (restCount % 2)].push(node);
      restCount++;
    }
  });

  const placed: Placed[] = [];
  buckets.forEach((bucket, ring) => {
    const n = bucket.length;
    bucket.forEach((node, idx) => {
      const seed = seedOf(node.name);
      const angle =
        (idx / n) * Math.PI * 2 -
        Math.PI / 2 +
        ring * 0.35 +
        (rnd(seed * 7 + 3) - 0.5) * 0.22;
      const radius = 22 + ring * 15 + (rnd(seed * 13 + 1) - 0.5) * 4;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      placed.push({
        node,
        x: round(clamp(50 + dx * radius, 12, 88)),
        y: round(clamp(50 + dy * radius, 6, 94)),
      });
    });
  });
  return placed;
}

/** Smaller gap on narrow screens — the same fixed gap that reads as
 * "not too close" on desktop would force an impractically tall section
 * once 29 cards have to share a narrow width. */
function gapFor(containerW: number) {
  if (containerW < 480) return 8;
  if (containerW < 820) return 12;
  if (containerW < 1100) return 16;
  return 20;
}

/**
 * Push overlapping cards apart using their *actual* rendered sizes, so no
 * two cards ever overlap at any breakpoint — the polar scatter from
 * layout() is just a starting guess; this settles it into something
 * collision-free.
 */
function resolveCollisions(
  base: Placed[],
  sizes: Map<string, { w: number; h: number }>,
  containerW: number,
  containerH: number,
  hubSize: number,
  gap: number,
): Placed[] {
  if (!containerW || !containerH) return base;

  const items = base.map((p) => {
    const size = sizes.get(p.node.name);
    return {
      node: p.node,
      cx: (p.x / 100) * containerW,
      cy: (p.y / 100) * containerH,
      hw: (size?.w ?? 130) / 2 + gap,
      hh: (size?.h ?? 40) / 2 + gap,
    };
  });

  const hubHalf = hubSize / 2 + gap;
  const cx0 = containerW / 2;
  const cy0 = containerH / 2;

  for (let iter = 0; iter < 80; iter++) {
    let moved = false;

    for (let i = 0; i < items.length; i++) {
      // keep clear of the hub
      const a = items[i];
      const dcx = a.cx - cx0;
      const dcy = a.cy - cy0;
      const dist = Math.hypot(dcx, dcy) || 0.001;
      const minDist = hubHalf + gap + Math.max(a.hw, a.hh);
      if (dist < minDist) {
        const push = minDist - dist;
        a.cx += (dcx / dist) * push;
        a.cy += (dcy / dist) * push;
        moved = true;
      }

      for (let j = i + 1; j < items.length; j++) {
        const b = items[j];
        const dx = b.cx - a.cx;
        const dy = b.cy - a.cy;
        const overlapX = a.hw + b.hw - Math.abs(dx);
        const overlapY = a.hh + b.hh - Math.abs(dy);
        if (overlapX > 0 && overlapY > 0) {
          moved = true;
          if (overlapX < overlapY) {
            const push = overlapX / 2 + 0.5;
            const dir = dx === 0 ? (i < j ? 1 : -1) : Math.sign(dx);
            a.cx -= dir * push;
            b.cx += dir * push;
          } else {
            const push = overlapY / 2 + 0.5;
            const dir = dy === 0 ? 1 : Math.sign(dy);
            a.cy -= dir * push;
            b.cy += dir * push;
          }
        }
      }
    }
    if (!moved) break;
  }

  items.forEach((it) => {
    it.cx = clamp(it.cx, it.hw, containerW - it.hw);
    it.cy = clamp(it.cy, it.hh, containerH - it.hh);
  });

  return items.map((it) => ({
    node: it.node,
    x: round((it.cx / containerW) * 100),
    y: round((it.cy / containerH) * 100),
  }));
}

function countOverlaps(
  placed: Placed[],
  sizes: Map<string, { w: number; h: number }>,
  containerW: number,
  containerH: number,
  gap: number,
): number {
  const rects = placed.map((p) => {
    const size = sizes.get(p.node.name) ?? { w: 130, h: 40 };
    const cx = (p.x / 100) * containerW;
    const cy = (p.y / 100) * containerH;
    return {
      left: cx - size.w / 2 - gap,
      right: cx + size.w / 2 + gap,
      top: cy - size.h / 2 - gap,
      bottom: cy + size.h / 2 + gap,
    };
  });
  let n = 0;
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i];
      const b = rects[j];
      if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
        n++;
      }
    }
  }
  return n;
}

/**
 * The container's fixed height is just a starting guess — with 29 cards it
 * isn't always tall enough to fit everyone without overlap. Grow it (and
 * re-resolve) until nothing overlaps, so the promise is unconditional
 * rather than "usually fine".
 */
function fitLayout(
  base: Placed[],
  sizes: Map<string, { w: number; h: number }>,
  containerW: number,
  startHeight: number,
  hubSize: number,
  hardCap: number,
): { height: number; placed: Placed[] } {
  const gap = gapFor(containerW);
  let height = Math.max(startHeight, 1);
  let placed = resolveCollisions(base, sizes, containerW, height, hubSize, gap);
  let tries = 0;
  // capped so the network always fits in ~one screen — with the full page
  // width to spread across, the wider canvas does the work instead
  const maxHeight = Math.min(startHeight * 1.5, hardCap);
  while (
    countOverlaps(placed, sizes, containerW, height, gap) > 0 &&
    height < maxHeight &&
    tries < 25
  ) {
    height *= 1.08;
    placed = resolveCollisions(base, sizes, containerW, height, hubSize, gap);
    tries++;
  }
  return { height: Math.min(height, maxHeight), placed };
}

function Dot({ color, active }: { color: string; active: boolean }) {
  return (
    <span className="relative grid h-4 w-4 shrink-0 place-items-center sm:h-5 sm:w-5 lg:h-6 lg:w-6">
      <span
        className="absolute inset-0 rounded-full border transition-opacity duration-300"
        style={{ borderColor: color, opacity: active ? 1 : 0.45 }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full transition-transform duration-300 sm:h-2 sm:w-2"
        style={{ background: color, transform: active ? "scale(1.25)" : "scale(1)" }}
      />
    </span>
  );
}

function Pill({
  placed,
  seed,
  hovered,
  onHover,
  onLeave,
  delay,
  reduce,
  registerRef,
}: {
  placed: Placed;
  seed: number;
  hovered: string | null;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
  reduce: boolean | null;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const [arrived, setArrived] = useState(false);
  const { node, x, y } = placed;
  const active = hovered === node.dept;

  // per-node float parameters — deterministic so server/client match, varied
  // enough that the whole cluster doesn't bob in unison
  const floatDuration = 4.5 + rnd(seed * 3 + 11) * 3;
  const floatDelay = rnd(seed * 5 + 23) * 1.5;
  const ampY = 5 + rnd(seed * 9 + 41) * 4;
  const ampX = 3 + rnd(seed * 17 + 53) * 4;

  return (
    <motion.div
      className="absolute z-20"
      initial={
        reduce
          ? false
          : { left: "50%", top: "50%", x: "-50%", y: "-50%", opacity: 0, scale: 0.15 }
      }
      whileInView={{
        left: `${x}%`,
        top: `${y}%`,
        x: "-50%",
        y: "-50%",
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      onAnimationComplete={() => setArrived(true)}
    >
      <motion.div
        ref={registerRef}
        className="flex w-20 items-center gap-1 rounded-lg border bg-night-2/85 px-1.5 py-1 backdrop-blur-sm sm:w-32 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2 md:w-40 lg:w-[12.5rem] lg:gap-2.5 lg:px-3.5"
        style={{ borderColor: active ? node.color : "var(--color-line-night)" }}
        animate={
          arrived && !reduce
            ? { y: [0, -ampY, 0, ampY * 0.6, 0], x: [0, ampX, 0, -ampX * 0.6, 0] }
            : { y: 0, x: 0 }
        }
        transition={
          arrived && !reduce
            ? {
                duration: floatDuration,
                delay: floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.2 }
        }
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <Dot color={node.color} active={active} />
        <div className="min-w-0">
          <p className="truncate text-[0.6rem] font-semibold leading-tight text-mist sm:text-[0.72rem] lg:text-[1.22rem]">
            {node.name}
          </p>
          {node.role ? (
            <p className="truncate text-[0.5rem] leading-tight text-mist-faint sm:text-[0.6rem] lg:text-[0.88rem]">
              {node.role}
            </p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Team as a connected network — a glowing central hub for the founder with
 * every individual team member scattered around it in three staggered
 * rings. On scroll into view each node grows outward from the hub to its
 * spot, then drifts in a gentle, never-ending float.
 */
export function TeamNetwork({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for callers; the hub now shows a static "Our Team" label instead of the leader's name
  leader,
  departments,
}: {
  leader: { name: string; role: string };
  departments: readonly Department[];
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  const base = useMemo(() => layout(flatten(departments)), [departments]);
  const [placed, setPlaced] = useState(base);
  const [height, setHeight] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef(new Map<string, HTMLDivElement>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resolve = () => {
      const sizes = new Map<string, { w: number; h: number }>();
      pillRefs.current.forEach((el, name) => {
        sizes.set(name, { w: el.offsetWidth, h: el.offsetHeight });
      });
      const hubSize = hubRef.current
        ? Math.max(hubRef.current.offsetWidth, hubRef.current.offsetHeight)
        : 0;
      const fitted = fitLayout(
        base,
        sizes,
        container.offsetWidth,
        container.offsetHeight,
        hubSize,
        window.innerHeight * 0.95,
      );
      setPlaced(fitted.placed);
      setHeight((prev) =>
        prev !== null && Math.abs(prev - fitted.height) < 4 ? prev : fitted.height,
      );
    };

    const raf = requestAnimationFrame(resolve);
    const ro = new ResizeObserver(() => resolve());
    ro.observe(container);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [base]);

  return (
    <div
      ref={containerRef}
      className="relative mt-8 h-[92vh] max-h-[58rem]"
      style={height !== null ? { height: `${height}px` } : undefined}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {placed.map(({ node, x, y }) => {
          const active = hovered === node.dept;
          // bow the line out perpendicular to the hub→node axis for an
          // organic curve instead of a straight spoke
          const mx = (50 + x) / 2;
          const my = (50 + y) / 2;
          const nx = -(y - 50);
          const ny = x - 50;
          const len = Math.hypot(nx, ny) || 1;
          const bow = 5;
          const cx = round(mx + (nx / len) * bow);
          const cy = round(my + (ny / len) * bow);
          return (
            <path
              key={node.name}
              d={`M50,50 Q${cx},${cy} ${x},${y}`}
              fill="none"
              stroke={active ? node.color : "var(--color-line-night)"}
              strokeWidth={active ? 0.35 : 0.15}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
            />
          );
        })}
      </svg>

      {/* hub */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden
          className="absolute -inset-4 rounded-full border border-teal-light/15 motion-safe:animate-pulse sm:-inset-6 lg:-inset-8"
        />
        <span
          aria-hidden
          className="absolute -inset-2 rounded-full border border-teal-light/25 sm:-inset-3 lg:-inset-4"
        />
        <div
          ref={hubRef}
          className="relative grid h-16 w-16 place-items-center rounded-full border-2 border-teal-light/50 bg-night text-center shadow-[0_0_70px_-14px_rgba(28,195,182,0.45)] sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40"
        >
          <div className="px-1.5 sm:px-2.5 lg:px-3">
            <p className="font-display text-[0.66rem] font-bold leading-tight text-mist sm:text-[0.85rem] md:text-[1rem] lg:text-[1.15rem]">
              Our Team
            </p>

          </div>
        </div>
      </div>

      {placed.map((p, i) => (
        <Pill
          key={p.node.name}
          placed={p}
          seed={i}
          hovered={hovered}
          onHover={() => setHovered(p.node.dept)}
          onLeave={() => setHovered((h) => (h === p.node.dept ? null : h))}
          delay={i * 0.025}
          reduce={reduce}
          registerRef={(el) => {
            if (el) pillRefs.current.set(p.node.name, el);
            else pillRefs.current.delete(p.node.name);
          }}
        />
      ))}
    </div>
  );
}
