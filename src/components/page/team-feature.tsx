"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { animate, motion, useReducedMotion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TeamMember = {
  name: string;
  role: string;
  team: string;
  /** only set when the photo actually exists in /public */
  photo?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Card width follows the viewport height so heading + cards + controls fit
// one laptop screen (below the 73px header); capped at 17rem on tall
// screens and by width on phones. Everything inside the card scales off it.
const RAIL_VARS = {
  "--card-w": "min(68vw, clamp(12rem, calc((100svh - 381px) * 0.55), 17rem))",
} as CSSProperties;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// soft spring for the movement, plain tweens for colour and shadow
const SPRING: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 19,
  mass: 0.9,
  backgroundColor: { duration: 0.45, ease: "easeOut" },
  borderColor: { duration: 0.45, ease: "easeOut" },
  boxShadow: { duration: 0.5, ease: "easeOut" },
  opacity: { duration: 0.4, ease: "easeOut" },
};

const SHADOW_NONE = "0 0px 0px -20px rgba(10,14,26,0)";
const SHADOW_LIFT = "0 20px 40px -18px rgba(10,14,26,0.45)";

// quick slide for the moment the photo clears the card stack
const SLIDE: Transition = { duration: 0.32, ease: [0.4, 0, 0.2, 1] };
const INSTANT: Transition = { duration: 0 };

// photo poses: tucked behind the card, pulled clear of it (where it swaps
// layers), and settled in front
const PHOTO_REST = { x: "0%", y: "0%", rotate: 0, scale: 1, boxShadow: SHADOW_NONE };
const PHOTO_CLEAR = { x: "-40%", y: "-26%", rotate: -14, scale: 0.94, boxShadow: SHADOW_LIFT };
const PHOTO_FRONT = { x: "-10%", y: "-26%", rotate: -6, scale: 0.9, boxShadow: SHADOW_LIFT };

const INFO_REST = {
  x: "0%",
  y: "0%",
  rotate: 0,
  backgroundColor: "#fbfaf8",
  borderColor: "rgba(16,19,28,0.6)",
  boxShadow: SHADOW_NONE,
};
const INFO_OPEN = {
  x: "10%",
  y: "16%",
  rotate: 5,
  backgroundColor: "#ece4d6",
  borderColor: "rgba(16,19,28,0)",
  boxShadow: SHADOW_LIFT,
};

function TeamCard({
  member: m,
  index: i,
  active,
  dimmed,
  onTop,
  pressed,
  onEnter,
  onLeave,
  onToggle,
}: {
  member: TeamMember;
  index: number;
  active: boolean;
  dimmed: boolean;
  onTop: boolean;
  pressed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const t = reduce ? INSTANT : SPRING;
  const photoRef = useRef<HTMLSpanElement>(null);
  const infoRef = useRef<HTMLSpanElement>(null);
  const run = useRef(0);

  // Shuffle the photo from the back of the stack to the front (and back
  // again on leave): it slides clear of the card, swaps layers while it is
  // out of the way, then springs into place. Each run cancels the last, so
  // quick hover in/out never leaves it stuck mid-shuffle.
  useEffect(() => {
    const photo = photoRef.current;
    const info = infoRef.current;
    if (!photo || !info) return;
    const id = ++run.current;
    const alive = () => run.current === id;
    const slide = reduce ? INSTANT : SLIDE;
    const inFront = () => photo.style.zIndex === "2";

    void (async () => {
      if (active) {
        animate(info, INFO_OPEN, t);
        if (!inFront()) {
          await animate(photo, PHOTO_CLEAR, slide);
          if (!alive()) return;
          photo.style.zIndex = "2";
        }
        await animate(photo, PHOTO_FRONT, t);
      } else {
        if (inFront()) {
          await animate(photo, PHOTO_CLEAR, slide);
          if (!alive()) return;
          photo.style.zIndex = "0";
        }
        animate(info, INFO_REST, t);
        await animate(photo, PHOTO_REST, t);
      }
    })();
  }, [active, reduce, t]);

  return (
    <motion.li
      className="relative shrink-0 snap-start"
      style={{ zIndex: active ? 30 : onTop ? 20 : 1 }}
      initial={false}
      animate={{
        // brought to the front: lifts and grows; the others step back
        scale: active ? 1.06 : dimmed ? 0.96 : 1,
        y: active ? -10 : 0,
        opacity: dimmed ? 0.55 : 1,
      }}
      transition={t}
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && onEnter()}
        onBlur={onLeave}
        aria-pressed={pressed}
        aria-label={`${m.name}${m.role ? `, ${m.role}` : ""} — ${m.team}`}
        className="relative block aspect-[3/4] w-[var(--card-w)] text-left outline-none"
      >
        {/* photo — starts tucked exactly behind the card */}
        <span
          ref={photoRef}
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-2xl bg-night"
          style={{ zIndex: 0 }}
        >
          <motion.span
            className="block h-full w-full"
            initial={false}
            animate={{ scale: active ? 1 : 1.18 }}
            transition={reduce ? t : { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {m.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.photo}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple to-teal font-display text-[calc(var(--card-w)*0.26)] font-bold leading-none tracking-[-0.04em] text-mist/90">
                {initials(m.name)}
              </span>
            )}
          </motion.span>
        </span>

        {/* info card — name sits low so it stays readable under the photo */}
        <span
          ref={infoRef}
          className="relative flex h-full flex-col rounded-2xl border border-ink/60 bg-paper-bright p-5 sm:p-6"
          style={{ zIndex: 1 }}
        >
          <span className="flex items-start justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Informatia.svg" alt="" className="h-5 w-auto opacity-80" />
            <span className="font-text text-[0.85rem] font-semibold tracking-[0.08em] text-ink">
              {pad(i + 1)} ]
            </span>
          </span>

          <span className="mt-auto block">
            <span className="block font-display text-[clamp(1.1rem,calc(var(--card-w)*0.085),1.5rem)] font-light leading-tight tracking-[-0.01em] text-ink">
              {m.name}
            </span>
            <span className="mt-1 block text-[0.78rem] text-ink-muted">
              {m.role || `${m.team} Team`}
            </span>
          </span>

          <span className="mt-5 flex items-end justify-between gap-3">
            <span className="text-[0.72rem] text-ink-muted">[ Team</span>
            <span className="text-right text-[0.9rem] leading-snug text-ink-soft">
              {m.team}
            </span>
          </span>
        </span>
      </button>
    </motion.li>
  );
}

/** "Meet our Team" — a horizontal card rail. Hovering (or tapping) a card
 * tilts it aside and shuffles the member's photo from behind it to the front. */
export function TeamFeature({
  eyebrow,
  heading,
  body,
  members,
}: {
  eyebrow: string;
  heading: readonly string[];
  body: string;
  members: readonly TeamMember[];
}) {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [inset, setInset] = useState(20);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // the last card brought forward keeps the top layer, so it never slips
  // under a neighbour while it is still springing back into place
  const [top, setTop] = useState<number | null>(null);
  const focus = hovered ?? open;

  // the rail bleeds to the right edge, but its first card lines up with the
  // page container — mirror the container's left content edge as padding
  useLayoutEffect(() => {
    const head = headRef.current;
    if (!head) return;
    const measure = () => {
      const left = head.getBoundingClientRect().left;
      const padLeft = parseFloat(getComputedStyle(head).paddingLeft);
      setInset(left + padLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(head);
    return () => ro.disconnect();
  }, []);

  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 1;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  const sync = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    setIndex(
      atEnd
        ? members.length - 1
        : Math.min(members.length - 1, Math.round(t.scrollLeft / stepWidth())),
    );
    setEdges({ start: t.scrollLeft <= 4, end: atEnd });
  }, [members.length, stepWidth]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // step from the snapped index, not the live scroll position, so rapid
  // clicks don't get swallowed by a smooth scroll still in flight
  const go = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(members.length - 1, index + dir));
    setIndex(next);
    trackRef.current?.scrollTo({ left: next * stepWidth(), behavior: "smooth" });
  };

  return (
    <div className="py-12">
      {/* Heading */}
      <div
        ref={headRef}
        className="container-x flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <header>
          <p className="eyebrow text-ink-muted">{eyebrow}</p>
          <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            {heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <p className="max-w-md text-[1.1rem] leading-relaxed text-ink-soft lg:pb-1">
          {body}
        </p>
      </div>

      {/* Rail — the top padding is headroom for the photo shuffle; it is
          pulled up under the heading so that empty space doesn't push the
          cards off short (laptop) screens */}
      <ol
        ref={trackRef}
        onScroll={sync}
        className="mt-[calc(2rem_-_var(--card-w)*0.54)] flex snap-x snap-mandatory gap-6 overflow-x-auto pb-[calc(var(--card-w)*0.42)] pt-[calc(var(--card-w)*0.54)] [scrollbar-width:none] lg:gap-10 [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: inset, scrollPaddingInline: inset, ...RAIL_VARS }}
      >
        {members.map((m, i) => (
          <TeamCard
            key={`${m.team}-${m.name}`}
            member={m}
            index={i}
            active={focus === i}
            dimmed={focus !== null && focus !== i}
            onTop={top === i}
            pressed={open === i}
            onEnter={() => {
              setHovered(i);
              setTop(i);
            }}
            onLeave={() => setHovered((h) => (h === i ? null : h))}
            onToggle={() => {
              setOpen((o) => (o === i ? null : i));
              setTop(i);
            }}
          />
        ))}
      </ol>

      {/* Controls */}
      <div className="container-x flex items-center justify-between gap-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={edges.start}
            aria-label="Previous team member"
            className="flex size-11 items-center justify-center rounded-full bg-[#ece4d6] text-ink transition-colors duration-300 hover:bg-ink hover:text-mist disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={edges.end}
            aria-label="Next team member"
            className="flex size-11 items-center justify-center rounded-full bg-[#ece4d6] text-ink transition-colors duration-300 hover:bg-ink hover:text-mist disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <p className="font-text text-[1.1rem] tracking-[0.06em] text-ink-muted" aria-live="polite">
          <span className="font-semibold text-ink">{pad(index + 1)}</span>/{pad(members.length)} ]
        </p>
      </div>
    </div>
  );
}
