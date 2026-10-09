import type { ReactNode } from "react";

/**
 * Soft "glass" illustrations for solutions — lavender bodies, white edges and
 * purple / teal accents, drawn on a 64×64 grid. Each icon owns its gradient
 * ids (prefixed with its key), so several can share a page.
 */

const PURPLE = "#a45cc4";
const LAVENDER = "#c9a6e6";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6effc" />
        <stop offset="1" stopColor="#d6bdee" />
      </linearGradient>
      <linearGradient id={`${id}-deep`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b77ad6" />
        <stop offset="1" stopColor="#6c2a8e" />
      </linearGradient>
      <linearGradient id={`${id}-teal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3fd6c9" />
        <stop offset="1" stopColor="#0e9c93" />
      </linearGradient>
    </defs>
  );
}

/** points for a 5-point star centred on (cx, cy) */
function star(cx: number, cy: number, r: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 ? r * 0.45 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

const ICONS: Record<string, (id: string) => ReactNode> = {
  // personalised website — browser window with a doctor profile
  Webie: (id) => (
    <>
      <rect x="7" y="11" width="50" height="40" rx="7" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" />
      <path d="M7 20.5h50" stroke="#fff" strokeWidth="1.5" />
      <circle cx="13.5" cy="15.8" r="1.7" fill={PURPLE} />
      <circle cx="18.8" cy="15.8" r="1.7" fill={LAVENDER} />
      <circle cx="24.1" cy="15.8" r="1.7" fill="#1cc3b6" />
      <circle cx="20" cy="32" r="6.5" fill={`url(#${id}-deep)`} />
      <circle cx="20" cy="30.2" r="2.3" fill="#fff" opacity=".9" />
      <path d="M15.8 36.2a4.8 4.8 0 0 1 8.4 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".9" fill="none" />
      <rect x="31" y="27" width="19" height="3.2" rx="1.6" fill={PURPLE} opacity=".6" />
      <rect x="31" y="33.4" width="13" height="3.2" rx="1.6" fill={PURPLE} opacity=".35" />
      <rect x="13" y="43" width="38" height="3.2" rx="1.6" fill="#fff" opacity=".95" />
    </>
  ),

  // interactive clinic view — globe wrapped in a 360° orbit
  Insta360: (id) => (
    <>
      <circle cx="32" cy="32" r="16" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" />
      <path d="M32 16c-5 4.4-7.4 9.8-7.4 16s2.4 11.6 7.4 16M32 16c5 4.4 7.4 9.8 7.4 16S37 43.6 32 48M16 32h32" stroke="#fff" strokeWidth="1.4" fill="none" />
      <path
        d="M54.5 34.6C52 39.4 43 43 32 43S12 39.4 9.5 34.6M9.5 29.4C12 24.6 21 21 32 21c7 0 13.2 1.4 17.2 3.6"
        stroke={`url(#${id}-deep)`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M46.6 21.4l3.6 3.4-4.8 1.6" stroke={`url(#${id}-deep)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="50" cy="13" r="5.5" fill={`url(#${id}-teal)`} />
      <path d="M47.6 13h4.8M50 10.6v4.8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),

  // in-clinic engagement — tablet with a pulse line and a heart badge
  Enkare: (id) => (
    <>
      <rect x="14" y="8" width="36" height="48" rx="7" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" />
      <rect x="19" y="14" width="26" height="30" rx="4" fill="#fff" opacity=".8" />
      <path d="M21.5 31h5.5l3-7.5 4.2 13.5 3-6h5.3" stroke={`url(#${id}-deep)`} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="50" r="2.1" fill={PURPLE} />
      <circle cx="48.5" cy="12.5" r="7.5" fill={`url(#${id}-teal)`} stroke="#fff" strokeWidth="1.5" />
      <path d="M48.5 16.4s-3.9-2.4-3.9-5a2 2 0 0 1 3.9-.9 2 2 0 0 1 3.9.9c0 2.6-3.9 5-3.9 5z" fill="#fff" />
    </>
  ),

  // reputation — review bubble with five stars
  "Google Reviews": (id) => (
    <>
      <path
        d="M13 12h38a7 7 0 0 1 7 7v17a7 7 0 0 1-7 7H31l-9.5 8v-8H13a7 7 0 0 1-7-7V19a7 7 0 0 1 7-7z"
        fill={`url(#${id}-glass)`}
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {[16.5, 24.3, 32, 39.7, 47.5].map((cx, i) => (
        <polygon key={cx} points={star(cx, 27.5, 4.2)} fill={i < 4 ? `url(#${id}-deep)` : LAVENDER} />
      ))}
      <rect x="20" y="35" width="24" height="2.8" rx="1.4" fill="#fff" opacity=".95" />
    </>
  ),

  // clinic materials — printed sheets with a medical cross
  "Clinic Inputs": (id) => (
    <>
      <rect x="22" y="9" width="30" height="40" rx="5" transform="rotate(9 37 29)" fill="#e9dcf6" stroke="#fff" strokeWidth="1.5" />
      <path d="M15 13h21l9 9v28a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V18a5 5 0 0 1 5-5z" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M36 13v6.5a2.5 2.5 0 0 0 2.5 2.5H45" fill="#fff" opacity=".85" />
      <circle cx="22.5" cy="30" r="6" fill={`url(#${id}-deep)`} />
      <path d="M22.5 27v6M19.5 30h6" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
      <rect x="16" y="41" width="23" height="2.8" rx="1.4" fill={PURPLE} opacity=".5" />
      <rect x="16" y="46.5" width="15" height="2.8" rx="1.4" fill={PURPLE} opacity=".3" />
    </>
  ),

  // patient camps — medical tent with a flag
  "OPD Camps": (id) => (
    <>
      <path d="M32 12 56 51H8z" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M32 26.5 41 51H23z" fill={`url(#${id}-deep)`} />
      <path d="M32 33v7M28.5 36.5h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 12V4.5" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 4.5l8 3-8 3z" fill={`url(#${id}-teal)`} />
      <path d="M5 51h54" stroke={LAVENDER} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
};

/** generic fallback — a soft sparkle */
const FALLBACK = (id: string) => (
  <>
    <circle cx="32" cy="32" r="18" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.5" />
    <path d="M32 20l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill={`url(#${id}-deep)`} />
  </>
);

export function SolutionIcon({ name, className }: { name: string; className?: string }) {
  const id = `si-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const draw = ICONS[name] ?? FALLBACK;
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Defs id={id} />
      {draw(id)}
    </svg>
  );
}
