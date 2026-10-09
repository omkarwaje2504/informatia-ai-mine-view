"use client";

import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { solutionImage, type IndustryItem, type IndustrySection } from "@/lib/industries";
import { DiagnosisArt } from "@/components/sections/diagnosis-art";
import { textDigits } from "@/components/sections/text-digits";

const DESKTOP = "(min-width: 1024px)";

/**
 * The finished scene (recoloured to the brand purple); the base plate — the
 * same scene, sharp, with only the six devices melted away (the consultation
 * and the room stay); and the whole scene melted, for the screen's edges.
 */
const SCENE_IMAGE = "/industries/diagnosis-hub.webp";
const PLATE_IMAGE = "/industries/diagnosis-hub-plate.webp";
const ROOM_IMAGE = "/industries/diagnosis-hub-room.webp";
const W = 1536;
const H = 1024;

/**
 * Where each solution lives in the scene, in reveal order. `box` is the
 * device's area in source pixels; `label` is where its caption sits, in % of
 * the scene.
 */
const SCENE: { item: string; box: [number, number, number, number]; label: { left: number; top: number } }[] = [
  { item: "Cardio App", box: [15, 200, 385, 795], label: { left: 2, top: 80 } }, // the phone
  { item: "HScore", box: [365, 82, 692, 268], label: { left: 46, top: 6 } }, // the results card
  { item: "Nexus Ring", box: [368, 275, 738, 575], label: { left: 46, top: 34 } }, // watch + sensor
  { item: "Enkare", box: [585, 505, 948, 888], label: { left: 37, top: 88.5 } }, // clinic tablet
  { item: "Thermal Reports", box: [945, 498, 1242, 880], label: { left: 58.5, top: 88.5 } }, // printer
  { item: "KAMPET", box: [1132, 58, 1452, 805], label: { left: 79, top: 82 } }, // kiosk
];

const pad = (n: number) => String(n).padStart(2, "0");

/** a rectangular mask that fades out over `edge` % of each side */
const feather = (edge: number): CSSProperties => {
  const g = (dir: string) => `linear-gradient(${dir}, transparent, #000 ${edge}%, #000 ${100 - edge}%, transparent)`;
  const mask = `${g("to right")}, ${g("to bottom")}`;
  return { maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" };
};

/** the scene's own edges blend into the full-screen room */
const FEATHER = feather(7);
/** a device's sharp area melts into the blurred room around it (wide, so no seams show) */
const PIECE_FEATHER = feather(16);

/** true on lg+ screens — the pinned scroll story only runs there */
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

/** One device: the sharp scene, cropped to its box, scaling into place with a glow. */
function Piece({
  box,
  progress,
  range,
}: {
  box: [number, number, number, number];
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // pad the device's box so the feathered fade falls on the room, not the device
  const PAD = 36;
  const x0 = Math.max(0, box[0] - PAD);
  const y0 = Math.max(0, box[1] - PAD);
  const x1 = Math.min(W, box[2] + PAD);
  const y1 = Math.min(H, box[3] + PAD);
  const w = x1 - x0;
  const h = y1 - y0;
  const place: CSSProperties = {
    left: `${(x0 / W) * 100}%`,
    top: `${(y0 / H) * 100}%`,
    width: `${(w / W) * 100}%`,
    height: `${(h / H) * 100}%`,
  };
  const mid = (range[0] + range[1]) / 2;
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.88, 1]);
  const glow = useTransform(progress, [range[0], mid, range[1]], [0, 0.85, 0.3]);

  return (
    <>
      <motion.div
        aria-hidden
        className="absolute rounded-full bg-purple-light blur-3xl"
        style={{ ...place, opacity: glow }}
      />
      <motion.div
        aria-hidden
        className="absolute"
        style={{
          ...place,
          ...PIECE_FEATHER,
          backgroundImage: `url(${SCENE_IMAGE})`,
          backgroundSize: `${(W / w) * 100}% ${(H / h) * 100}%`,
          backgroundPosition: `${(x0 / (W - w)) * 100}% ${(y0 / (H - h)) * 100}%`,
          opacity,
          scale,
        }}
      />
    </>
  );
}

/** The caption beside a device — glides up once the device has landed. */
function Label({
  n,
  item,
  at,
  progress,
  range,
}: {
  n: number;
  item: IndustryItem;
  at: { left: number; top: number };
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const start = range[0] + (range[1] - range[0]) * 0.45;
  const opacity = useTransform(progress, [start, range[1]], [0, 1]);
  const y = useTransform(progress, [start, range[1]], [14, 0]);

  return (
    <motion.div
      className="absolute z-10 w-[19%] min-w-[11rem] max-w-[16rem] rounded-2xl bg-paper-bright/90 p-3 shadow-[0_20px_40px_-22px_rgba(74,31,104,0.5)] ring-1 ring-ink/[0.07] backdrop-blur-md"
      style={{ left: `${at.left}%`, top: `${at.top}%`, opacity, y }}
    >
      <p className="flex items-baseline gap-2">
        <span className="font-text text-[0.75rem] font-semibold tracking-[0.08em] text-teal">{pad(n)}</span>
        <span className="font-display text-[0.98rem] font-bold leading-snug text-ink">{textDigits(item.name)}</span>
      </p>
      <p className="mt-1 line-clamp-2 text-[0.74rem] leading-relaxed text-ink-soft">{item.description}</p>
    </motion.div>
  );
}

/** Phones / reduced motion: the finished scene, then the solutions as a list. */
function StaticScene({ stage, items }: { stage: IndustrySection; items: IndustryItem[] }) {
  return (
    <div id={stage.id} className="scroll-mt-28 py-4">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-ink-muted">{stage.number} · Funnel stage</p>
        <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {stage.title}
        </h2>
        <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{stage.description}</p>
      </header>
      <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-3xl ring-1 ring-ink/[0.08]">
        <Image src={SCENE_IMAGE} alt="Connected diagnosis tools" fill unoptimized className="object-cover" />
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => {
          const image = solutionImage(it.name);
          return (
            <li key={it.name} className="flex items-center gap-3 rounded-2xl bg-paper-bright p-3 ring-1 ring-ink/[0.07]">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#fbf7fe] to-[#ece2f7]">
                {image ? (
                  <Image src={image} alt="" fill unoptimized className="object-cover" />
                ) : (
                  <DiagnosisArt name={it.name} className="absolute inset-0 h-full w-full" />
                )}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[1rem] font-bold leading-snug text-ink">{textDigits(it.name)}</h3>
                <p className="mt-0.5 line-clamp-2 text-[0.8rem] leading-relaxed text-ink-soft">{it.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Scroll story for a funnel stage. The section pins full-screen over the
 * scene with its devices melted away (the consultation and room stay as the
 * base); scrolling brings each device back into its place, one at a time,
 * with a caption; the last stretch resolves the finished scene with all its
 * labels.
 * Phones and reduced motion get the finished scene with a list.
 */
export function StageReveal({ stage }: { stage: IndustrySection }) {
  const items = stage.items ?? [];
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  return desktop && !reduce ? (
    <ScrollStory stage={stage} items={items} />
  ) : (
    <StaticScene stage={stage} items={items} />
  );
}

function ScrollStory({ stage, items }: { stage: IndustrySection; items: IndustryItem[] }) {
  const byName = new Map(items.map((it) => [it.name, it]));
  const story = SCENE.filter((s) => byName.has(s.item));
  const trackRef = useRef<HTMLDivElement>(null);

  // 0 when the frame locks in, 1 just before it releases
  const { scrollYProgress: p } = useScroll({ target: trackRef, offset: ["start 77px", "end end"] });

  const introOpacity = useTransform(p, [0.03, 0.11], [1, 0]);
  const introY = useTransform(p, [0.03, 0.11], [0, -30]);
  const cornerOpacity = useTransform(p, [0.08, 0.14], [0, 1]);
  const sharpOpacity = useTransform(p, [0.86, 0.96], [0, 1]);

  // the devices take turns across 0.12 → 0.84
  const slice = 0.72 / Math.max(1, story.length);
  const rangeOf = (i: number): [number, number] => [0.12 + i * slice, 0.12 + (i + 1) * slice];

  return (
    // full-bleed: break out of the page container (the parent section clips the overflow)
    <div ref={trackRef} id={stage.id} className="relative ml-[calc(50%-50vw)] h-[420vh] w-screen scroll-mt-28">
      <div className="sticky top-[77px] h-[calc(100vh-77px)] overflow-hidden">
        {/* the room, melted, filling the screen edges */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ROOM_IMAGE} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />

        {/* the scene at its true shape, so every device lines up with the plate */}
        <div className="absolute left-1/2 top-1/2 aspect-[3/2] w-[min(100%,calc((100vh-77px)*1.5))] -translate-x-1/2 -translate-y-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLATE_IMAGE} alt="" aria-hidden className="absolute inset-0 h-full w-full" style={FEATHER} />

          {story.map((s, i) => (
            <Piece key={s.item} box={s.box} progress={p} range={rangeOf(i)} />
          ))}

          {/* finale: the whole scene resolves sharp */}
          <motion.img
            src={SCENE_IMAGE}
            alt="Connected diagnosis tools — app, wearable, sensor, clinic tablet, kiosk and report printer"
            className="absolute inset-0 h-full w-full"
            style={{ ...FEATHER, opacity: sharpOpacity }}
          />

          {story.map((s, i) => (
            <Label key={s.item} n={i + 1} item={byName.get(s.item)!} at={s.label} progress={p} range={rangeOf(i)} />
          ))}

          {/* corner title once the story is under way */}
          <motion.div style={{ opacity: cornerOpacity }} className="absolute left-[2%] top-[3%] z-10">
            <p className="eyebrow text-ink-muted">{stage.number} · Funnel stage</p>
            <p className="mt-1 font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-ink">
              {stage.title}
            </p>
          </motion.div>
        </div>

        {/* intro over the base scene — a soft veil keeps it readable */}
        <motion.div
          aria-hidden
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 z-20"
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(45% 45% at 50% 50%, rgba(251,250,248,0.92), rgba(251,250,248,0.55) 60%, transparent 85%)" }}
          />
        </motion.div>
        <motion.header
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-x-0 top-1/2 z-20 mx-auto max-w-2xl -translate-y-1/2 px-6 text-center"
        >
          <p className="eyebrow text-ink-muted">{stage.number} · Funnel stage</p>
          <h2 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
            {stage.title}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{stage.description}</p>
          <p className="mt-8 text-[0.8rem] uppercase tracking-[0.2em] text-ink-muted">Scroll to assemble</p>
        </motion.header>
      </div>
    </div>
  );
}
