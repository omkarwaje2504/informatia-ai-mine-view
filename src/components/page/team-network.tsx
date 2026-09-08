"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  animate,
  type PanInfo,
} from "framer-motion";

type Member = { name: string; role: string; avatarUrl?: string };
type Department = { name: string; members: readonly Member[] };
type Node = Member & { dept: string; color: string };
type Placed = { node: Node; x: number; y: number };

const PALETTE = [
  "var(--color-teal-light)",
  "var(--color-purple-light)",
  "var(--color-gold)",
  "var(--color-teal)",
  "var(--color-purple)",
];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Every member, flattened in department order, each carrying its
 * department's colour so the whole cluster can be highlighted together. */
function flatten(departments: readonly Department[]): Node[] {
  return departments.flatMap((dept, di) =>
    dept.members.map((m) => ({
      ...m,
      dept: dept.name,
      color: PALETTE[di % PALETTE.length],
      // fallback to a shared photo — replace per-member once individual
      // headshots exist. Must be a web path (served from /public), not a
      // filesystem path.
      avatarUrl: m.avatarUrl ?? "/doctor.jpg",
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

/** every card stays at least this many px inside the box edges */
const INSET = 14;

/** Round to 3dp — trig can differ in its last bit between the server and
 * client runtimes, which is enough to trip a hydration mismatch on the
 * serialized path/style strings. */
const round = (v: number) => Math.round(v * 1000) / 1000;

/** The central "drop card for preview" panel — a portrait card, ~40% of the
 * viewport height. */
function hubSize(screenH: number) {
  const s = Number.isFinite(screenH) && screenH > 0 ? screenH : 720;
  const h = Math.round(clamp(s * 0.4, 190, 400));
  return { w: Math.round(h * 0.72), h };
}

/** Orbiting card — a small landscape rectangle (~2:1), text only; it scales
 * up and flips to the photo once dropped on the hub. */
function cardSize(W: number, H: number) {
  const w0 = Number.isFinite(W) && W > 0 ? W : 1280;
  const h0 = Number.isFinite(H) && H > 0 ? H : 720;
  const w = Math.round(clamp(Math.min(w0 * 0.115, h0 * 0.26), 128, 190));
  const h = Math.round(w * 0.5);
  return { w, h: Math.max(h, 56) };
}

const finite = (v: number, fallback: number) =>
  Number.isFinite(v) ? v : fallback;

/**
 * Lay every card on a jittered grid that fills the whole area evenly, then
 * carve out the cells the hub circle sits on and give those cards the
 * left-over outer cells instead. Even coverage, still organic — the
 * collision solver afterwards only has to nudge, never rescue.
 */
function scatter(
  nodes: Node[],
  W: number,
  H: number,
  cardW: number,
  cardH: number,
  hubD: number,
): Placed[] {
  const w = finite(W, 1280);
  const h = finite(H, 720);
  const cx = w / 2;
  const cy = h / 2;
  const hw = cardW / 2;
  const hh = cardH / 2;
  const clearR = hubD / 2 + Math.hypot(hw, hh) + 8;
  const minX = hw + INSET;
  const maxX = Math.max(minX + 1, w - hw - INSET);
  const minY = hh + INSET;
  const maxY = Math.max(minY + 1, h - hh - INSET);

  // grid shaped to the area's aspect, a bit roomier than the card count
  const ratio = w / Math.max(h, 1);
  const cols = Math.max(3, Math.round(Math.sqrt(nodes.length * ratio * 1.25)));
  const rows = Math.max(2, Math.ceil((nodes.length * 1.25) / cols));
  const cw = w / cols;
  const ch = h / rows;

  // every cell whose centre is clear of the hub, ordered by a hash so cards
  // don't fill row-by-row
  const cells: { px: number; py: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = (c + 0.5) * cw;
      const py = (r + 0.5) * ch;
      if (Math.hypot(px - cx, py - cy) > clearR - Math.min(cw, ch) * 0.4) {
        cells.push({ px, py });
      }
    }
  }
  cells.sort(
    (a, b) => rnd(a.px * 1.7 + a.py * 3.1) - rnd(b.px * 1.7 + b.py * 3.1),
  );

  return nodes.map((node, i) => {
    const cell = cells[i % Math.max(cells.length, 1)] ?? { px: cx, py: cy };
    const s = seedOf(node.name);
    let x = cell.px + (rnd(s * 7 + 1) - 0.5) * cw * 0.62;
    let y = cell.py + (rnd(s * 13 + 2) - 0.5) * ch * 0.62;
    x = clamp(x, minX, maxX);
    y = clamp(y, minY, maxY);
    // any that still land on the circle get pushed straight out …
    const d = Math.hypot(x - cx, y - cy) || 1;
    if (d < clearR) {
      x = cx + ((x - cx) / d) * clearR;
      y = cy + ((y - cy) / d) * clearR;
    }
    // … then pulled back fully inside the box
    x = clamp(x, minX, maxX);
    y = clamp(y, minY, maxY);
    return {
      node,
      x: round(clamp(finite((x / w) * 100, 50), 0.5, 99.5)),
      y: round(clamp(finite((y / h) * 100, 50), 0.5, 99.5)),
    };
  });
}

/** Gap scales continuously with the actual container width instead of
 * jumping at a few fixed breakpoints — a "laptop"-width screen (1100-1440px)
 * sits right between two old steps and was getting whichever gap/pill-size
 * combo happened to not fit, causing overlap. */
function gapFor(containerW: number) {
  // small breathing room only — enough that cards never touch, but the
  // cluster still reads as tight
  return clamp(containerW * 0.005, 3, 9);
}

/**
 * Relax the scattered cards so none overlap each other or the hub. Overlaps
 * are resolved along the centre-to-centre vector (radial), never a single
 * axis — that's what stops clusters collapsing into straight lines — and a
 * soft wall force keeps cards off the edges instead of hard-pinning them
 * there.
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

  for (let iter = 0; iter < 160; iter++) {
    let moved = 0;

    for (let i = 0; i < items.length; i++) {
      const a = items[i];

      // clear of the hub (radial)
      const dcx = a.cx - cx0;
      const dcy = a.cy - cy0;
      const dist = Math.hypot(dcx, dcy) || 0.001;
      const minDist = hubHalf + Math.max(a.hw, a.hh);
      if (dist < minDist) {
        const push = minDist - dist;
        a.cx += (dcx / dist) * push;
        a.cy += (dcy / dist) * push;
        moved += push;
      }

      // soft wall force — nudge away from any edge it's crowding
      const overL = a.hw + INSET - a.cx;
      const overR = a.cx - (containerW - a.hw - INSET);
      const overT = a.hh + INSET - a.cy;
      const overB = a.cy - (containerH - a.hh - INSET);
      if (overL > 0) {
        a.cx += overL * 0.6;
        moved += overL;
      }
      if (overR > 0) {
        a.cx -= overR * 0.6;
        moved += overR;
      }
      if (overT > 0) {
        a.cy += overT * 0.6;
        moved += overT;
      }
      if (overB > 0) {
        a.cy -= overB * 0.6;
        moved += overB;
      }

      for (let j = i + 1; j < items.length; j++) {
        const b = items[j];
        const dx = b.cx - a.cx;
        const dy = b.cy - a.cy;
        const overlapX = a.hw + b.hw - Math.abs(dx);
        const overlapY = a.hh + b.hh - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;

        let nx = dx;
        let ny = dy;
        let d = Math.hypot(nx, ny);
        if (d < 0.01) {
          // exactly stacked — fan out along the golden angle by index
          const ang = i * 2.39996;
          nx = Math.cos(ang);
          ny = Math.sin(ang);
          d = 1;
        }
        nx /= d;
        ny /= d;
        const push = Math.min(overlapX, overlapY) / 2 + 0.5;
        a.cx -= nx * push;
        a.cy -= ny * push;
        b.cx += nx * push;
        b.cy += ny * push;
        moved += push;
      }
    }
    if (moved < 0.5) break;
  }

  // final safety clamp (the wall force means this rarely bites)
  items.forEach((it) => {
    const lx = it.hw + INSET;
    const ly = it.hh + INSET;
    it.cx = clamp(it.cx, lx, Math.max(lx + 1, containerW - it.hw - INSET));
    it.cy = clamp(it.cy, ly, Math.max(ly + 1, containerH - it.hh - INSET));
  });

  return items.map((it) => ({
    node: it.node,
    x: round((it.cx / containerW) * 100),
    y: round((it.cy / containerH) * 100),
  }));
}

const SCAN_MS = 900;

/** A light text card that floats in orbit and can be dragged onto the
 * central panel — where its photo then previews. The card itself never
 * changes; it just tosses toward the hub and springs back. */
function Pill({
  placed,
  seed,
  hovered,
  onHover,
  onLeave,
  delay,
  reduce,
  cardW,
  cardH,
  hubRef,
  containerRef,
  onDropOnHub,
  onDragActiveChange,
  isPreviewing,
}: {
  placed: Placed;
  seed: number;
  hovered: string | null;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
  reduce: boolean | null;
  cardW: number;
  cardH: number;
  hubRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDropOnHub: (node: Node) => void;
  onDragActiveChange: (active: boolean) => void;
  isPreviewing: boolean;
}) {
  const [arrived, setArrived] = useState(false);
  const [dragging, setDragging] = useState(false);
  const { node, x, y } = placed;
  const active = hovered === node.dept;

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragOpacity = useMotionValue(1);

  // per-node float parameters — deterministic so server/client match
  const floatDuration = 4.5 + rnd(seed * 3 + 11) * 3;
  const floatDelay = rnd(seed * 5 + 23) * 1.5;
  const ampY = 5 + rnd(seed * 9 + 41) * 4;
  const ampX = 3 + rnd(seed * 17 + 53) * 4;
  const floatEnabled = arrived && !reduce && !dragging && !isPreviewing;

  // this card stays hidden the whole time it's the one previewing in the
  // panel; it fades back onto its slot the moment another card takes over
  useEffect(() => {
    if (!isPreviewing) {
      dragX.set(0);
      dragY.set(0);
      const a = animate(dragOpacity, 1, { duration: 0.45, ease: EASE_OUT });
      return () => a.stop();
    }
  }, [isPreviewing, dragX, dragY, dragOpacity]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setDragging(false);
    onDragActiveChange(false);
    const springBack = () => {
      animate(dragX, 0, { duration: 0.5, ease: EASE_OUT });
      animate(dragY, 0, { duration: 0.5, ease: EASE_OUT });
    };
    const hub = hubRef.current;
    const container = containerRef.current;
    if (!hub || !container) return springBack();

    const hubRect = hub.getBoundingClientRect();
    // framer's info.point is pageX/pageY (document coords) — bring the drop
    // point into viewport space to match getBoundingClientRect
    const dropX = info.point.x - window.scrollX;
    const dropY = info.point.y - window.scrollY;
    const pad = 36;
    const onHub =
      dropX > hubRect.left - pad &&
      dropX < hubRect.right + pad &&
      dropY > hubRect.top - pad &&
      dropY < hubRect.bottom + pad;

    if (!onHub) return springBack();

    // slide toward the hub centre while fading out, so the card looks like
    // it drops *into* the panel; hand off to the parent and then silently
    // put the (still-invisible) card back on its orbit slot
    const containerRect = container.getBoundingClientRect();
    const slotCx = containerRect.left + (x / 100) * containerRect.width;
    const slotCy = containerRect.top + (y / 100) * containerRect.height;
    const hubCx = hubRect.left + hubRect.width / 2;
    const hubCy = hubRect.top + hubRect.height / 2;
    animate(dragX, hubCx - slotCx, { duration: 0.26, ease: EASE_OUT });
    animate(dragOpacity, 0, { duration: 0.24, ease: "easeIn" });
    animate(dragY, hubCy - slotCy, {
      duration: 0.26,
      ease: EASE_OUT,
      onComplete: () => onDropOnHub(node),
    });
    // the card now stays hidden — the effect above fades it back onto its
    // slot once it's no longer the previewed member
  };

  return (
    <motion.div
      className="absolute"
      style={{ zIndex: dragging ? 1000 : 20 }}
      initial={
        reduce
          ? false
          : { left: "50%", top: "50%", x: "-50%", y: "-50%", opacity: 0, scale: 0.2 }
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
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      onAnimationComplete={() => setArrived(true)}
    >
      <motion.div
        drag={!reduce}
        dragMomentum={false}
        dragElastic={0.12}
        style={{ x: dragX, y: dragY, opacity: dragOpacity, touchAction: "none" }}
        onDragStart={() => {
          setDragging(true);
          onDragActiveChange(true);
        }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.08 }}
        className="relative"
      >
        <motion.div
          className="flex cursor-grab items-center bg-night-2 gap-2.5 overflow-hidden rounded-xl px-3 active:cursor-grabbing"
          style={{
            width: cardW,
            height: cardH,
border: `1px solid ${node.color}`,
            boxShadow: active
              ? `0 0 0 2px ${node.color}, 0 10px 30px -8px rgba(0,0,0,0.5)`
              : "0 8px 24px -10px rgba(0,0,0,0.55)",
          }}
          animate={
            floatEnabled
              ? { y: [0, -ampY, 0, ampY * 0.6, 0], x: [0, ampX, 0, -ampX * 0.6, 0] }
              : { y: 0, x: 0 }
          }
          transition={
            floatEnabled
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
          <div className="min-w-0 flex-1 w-full text-center">
            <p className="truncate font-display text-[0.76rem] font-medium leading-tight text-white sm:text-[0.84rem]">
              {node.name}
            </p>
            {node.role ? (
              <p className="truncate text-[0.58rem] leading-tight text-ink-muted sm:text-[0.86rem]">
                {node.role}
              </p>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Team as a connected network — a glowing central hub for the founder with
 * every individual team member scattered around it in three staggered
 * rings. On scroll into view each node grows outward from the hub to its
 * spot, then drifts in a gentle, never-ending float.
 *
 * Drag any card onto the hub to "scan" it: a sweeping beam plays over the
 * card, then it flips to reveal the person's photo. Only one card is ever
 * docked at a time — dropping a new one sends the currently docked card
 * back to its orbit slot first.
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
  const [dragActive, setDragActive] = useState(false);

  const nodes = useMemo(() => flatten(departments), [departments]);

  // hub + card sizing, all derived from the viewport in the effect below
  const [dims, setDims] = useState(() => ({
    hub: { w: 210, h: 290 },
    card: { w: 160, h: 80 },
  }));
  const [placed, setPlaced] = useState<Placed[]>(() =>
    scatter(nodes, 1280, 760, 160, 80, 300),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  // which member is previewing in the central panel, and whether the scan
  // has finished (2 sweeps) and flipped to the photo
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  const handleDropOnHub = useCallback((node: Node) => {
    setPreviewName(node.name);
    setRevealed(false);
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    // two full scan sweeps, then flip to the image
    scanTimerRef.current = setTimeout(() => setRevealed(true), SCAN_MS * 2);
  }, []);

  const previewNode = previewName
    ? (nodes.find((n) => n.name === previewName) ?? null)
    : null;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resolve = () => {
      const W = container.offsetWidth;
      const H = container.offsetHeight;
      // wait for the container to actually have a size (h-full of the
      // h-[calc(100dvh-nav)] section) — the ResizeObserver re-fires once it does
      if (W < 200 || H < 200) return;

      const hub = hubSize(H);
      const card = cardSize(W, H);
      setDims({ hub, card });

      const sizes = new Map<string, { w: number; h: number }>();
      nodes.forEach((n) => sizes.set(n.name, card));

      // treat the portrait hub as a circle of its longer side for clearance
      const hubClear = Math.max(hub.w, hub.h) + 16;
      const scattered = scatter(nodes, W, H, card.w, card.h, hubClear);
      const settled = resolveCollisions(
        scattered,
        sizes,
        W,
        H,
        hubClear,
        gapFor(W),
      );
      setPlaced(settled);
    };

    const raf = requestAnimationFrame(resolve);
    const ro = new ResizeObserver(() => resolve());
    ro.observe(container);
    window.addEventListener("resize", resolve);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resolve);
    };
  }, [nodes]);

  return (
    <div ref={containerRef} className="relative h-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
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
              stroke={active ? node.color : "var(--color-line-soft)"}
              strokeWidth={active ? 0.35 : 0.25}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
            />
          );
        })}
      </svg>

      {/* hub — the portrait "drop card for preview" panel. A dropped card
          first shows its name here, the scan beam sweeps twice, then the
          panel flips to reveal the photo. */}
      <motion.div
        ref={hubRef}
        animate={dragActive && !reduce ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        style={{ width: dims.hub.w, height: dims.hub.h, perspective: 1200 }}
        className={
          "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-shadow duration-300 " +
          (dragActive
            ? "shadow-[0_0_140px_-8px_rgba(255,255,255,0.55)]"
            : "shadow-[0_0_100px_-24px_rgba(255,255,255,0.4)]")
        }
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* front — prompt, or the dropped name while it scans */}
          <div
            className={
              "absolute inset-0 grid place-items-center overflow-hidden rounded-2xl px-5 text-center [backface-visibility:hidden] " +
              (dragActive && !previewNode ? "bg-white" : "bg-mist/95")
            }
          >
            {previewNode ? (
              <div>
                <p className="font-display text-[1.1rem] font-semibold leading-tight text-ink sm:text-[1.35rem]">
                  {previewNode.name}
                </p>
                {previewNode.role ? (
                  <p className="mt-1.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink-muted sm:text-[0.72rem]">
                    {previewNode.role}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="font-display text-[0.82rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-ink-muted sm:text-[0.95rem]">
                {dragActive ? "Drop to preview" : "Drag and drop card for preview"}
              </p>
            )}

            {previewNode && !revealed ? (
              <motion.div
                key={previewNode.name}
                aria-hidden
                className="pointer-events-none absolute inset-0"
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: SCAN_MS / 1000,
                  ease: "linear",
                  repeat: 1,
                }}
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-teal-light) 55%, transparent) 45%, color-mix(in oklab, var(--color-teal-light) 85%, transparent) 50%, color-mix(in oklab, var(--color-teal-light) 55%, transparent) 55%, transparent 100%)",
                }}
              />
            ) : null}
          </div>

          {/* back — the photo */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-night-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {previewNode?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewNode.avatarUrl}
                alt={previewNode.name}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            ) : null}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/80 to-transparent px-4 pb-3 pt-12 text-center">
              <p className="font-display text-[0.9rem] font-semibold leading-tight text-mist">
                {previewNode?.name}
              </p>
              {previewNode?.role ? (
                <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-teal-light/90">
                  {previewNode.role}
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>

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
          cardW={170}
          cardH={65}
          hubRef={hubRef}
          containerRef={containerRef}
          onDropOnHub={handleDropOnHub}
          onDragActiveChange={setDragActive}
          isPreviewing={previewName === p.node.name}
        />
      ))}
    </div>
  );
}