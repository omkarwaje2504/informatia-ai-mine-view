import type { ReactNode } from "react";

/**
 * Mini product-UI illustrations for the Diagnosis stage — white cards with a
 * soft lavender shadow, purple / teal / gold accents, on a 160×100 canvas.
 * Gradient and filter ids are prefixed per illustration so they can share a
 * page.
 */

const PURPLE = "#a45cc4";
const SOFT = "#ece2f7";
const LINE = "#e4d7f2";
const TEAL = "#1cc3b6";
const GOLD = "#e0a13a";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-deep`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b77ad6" />
        <stop offset="1" stopColor="#6c2a8e" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6effc" />
        <stop offset="1" stopColor="#d6bdee" />
      </linearGradient>
      <linearGradient id={`${id}-pulse`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={TEAL} />
        <stop offset="1" stopColor={PURPLE} />
      </linearGradient>
      <filter id={`${id}-lift`} x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3.2" floodColor="#6c2a8e" floodOpacity="0.14" />
      </filter>
    </defs>
  );
}

/** a white, softly lifted card */
const Card = ({ id, ...r }: { id: string; x: number; y: number; width: number; height: number; rx?: number }) => (
  <rect {...r} rx={r.rx ?? 8} fill="#fff" filter={`url(#${id}-lift)`} />
);

const Bar = ({ x, y, w, fill = LINE, h = 4 }: { x: number; y: number; w: number; fill?: string; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
);

const Tick = ({ cx, cy, r = 5, fill = TEAL }: { cx: number; cy: number; r?: number; fill?: string }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={fill} />
    <path
      d={`M${cx - r * 0.45} ${cy}l${r * 0.32} ${r * 0.34} ${r * 0.62}-${r * 0.7}`}
      stroke="#fff"
      strokeWidth={r * 0.32}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </>
);

const ART: Record<string, (id: string) => ReactNode> = {
  // risk score gauge beside a colour-coded checklist
  HScore: (id) => (
    <>
      <Card id={id} x={16} y={14} width={128} height={72} rx={10} />
      <path d="M30 60A22 22 0 0 1 74 60" stroke={SOFT} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M30 60A22 22 0 0 1 62 40.4" stroke={`url(#${id}-pulse)`} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M52 60 59.3 45.7" stroke="#6c2a8e" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="52" cy="60" r="3.4" fill="#6c2a8e" />
      <Bar x={38} y={70} w={28} fill="#c9a6e6" />
      <circle cx="92" cy="34" r="3.2" fill={TEAL} />
      <Bar x={99} y={32} w={32} />
      <circle cx="92" cy="47" r="3.2" fill={GOLD} />
      <Bar x={99} y={45} w={26} />
      <circle cx="92" cy="60" r="3.2" fill={PURPLE} />
      <Bar x={99} y={58} w={30} />
      <Bar x={88} y={71} w={22} fill={`url(#${id}-deep)`} h={6} />
    </>
  ),

  // cardiology app — phone with a heart and ECG, plus floating stat cards
  "Cardio App": (id) => (
    <>
      <rect x="60" y="8" width="40" height="84" rx="9" fill="#fff" stroke={LINE} strokeWidth="1.2" filter={`url(#${id}-lift)`} />
      <Bar x={72} y={13} w={16} h={3} />
      <path d="M80 47s-12-7.2-12-15.4a6.4 6.4 0 0 1 12-3.2 6.4 6.4 0 0 1 12 3.2C92 39.8 80 47 80 47z" fill={`url(#${id}-deep)`} />
      <path d="M64 62h8l3-7 4 13 3-9 2 3h12" stroke={`url(#${id}-pulse)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Bar x={67} y={75} w={26} />
      <Bar x={67} y={82} w={18} />
      <Card id={id} x={14} y={30} width={38} height={26} rx={7} />
      <circle cx="24" cy="43" r="5" fill={SOFT} />
      <path d="M21.5 43h1.6l1-2.4 1.4 4.4 1-2h1.4" stroke={PURPLE} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Bar x={32} y={39} w={14} h={3} />
      <Bar x={32} y={45} w={10} h={3} />
      <Card id={id} x={108} y={50} width={38} height={24} rx={7} />
      <Tick cx={118} cy={62} r={4.6} />
      <Bar x={126} y={58} w={14} h={3} />
      <Bar x={126} y={64} w={10} h={3} />
    </>
  ),

  // dedicated assessment tool — clipboard with ticked items
  KAMPET: (id) => (
    <>
      <Card id={id} x={44} y={13} width={70} height={80} rx={9} />
      <rect x="65" y="8" width="28" height="11" rx="5" fill={`url(#${id}-deep)`} />
      {[31, 45, 59, 73].map((y, i) => (
        <g key={y}>
          {i < 3 ? (
            <Tick cx={58} cy={y + 2} r={4.6} />
          ) : (
            <rect x="53.4" y={y - 2.6} width="9.2" height="9.2" rx="2.4" fill="none" stroke="#c9a6e6" strokeWidth="1.4" />
          )}
          <Bar x={68} y={y} w={i % 2 ? 26 : 34} />
        </g>
      ))}
      <circle cx="124" cy="26" r="11" fill={`url(#${id}-deep)`} filter={`url(#${id}-lift)`} />
      <path d="M119.5 26.4l3 3 6-6.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="30" cy="70" r="7" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.2" />
    </>
  ),

  // visual assessment report — heat-map scan with a colour scale
  "Thermal Reports": (id) => (
    <>
      <defs>
        <radialGradient id={`${id}-heat`} cx="0.55" cy="0.5" r="0.6">
          <stop offset="0" stopColor={GOLD} />
          <stop offset="0.35" stopColor="#d77fb4" />
          <stop offset="0.7" stopColor={PURPLE} />
          <stop offset="1" stopColor="#4a1f68" />
        </radialGradient>
        <linearGradient id={`${id}-scale`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD} />
          <stop offset="0.5" stopColor={PURPLE} />
          <stop offset="1" stopColor="#4a1f68" />
        </linearGradient>
      </defs>
      <Card id={id} x={18} y={12} width={80} height={76} rx={10} />
      <rect x="26" y="20" width="64" height="42" rx="7" fill={`url(#${id}-heat)`} />
      <ellipse cx="44" cy="34" rx="9" ry="7" fill={GOLD} opacity=".55" />
      <Bar x={26} y={69} w={42} />
      <Bar x={26} y={77} w={28} />
      <Card id={id} x={106} y={24} width={40} height={52} rx={8} />
      <rect x="114" y="32" width="6" height="36" rx="3" fill={`url(#${id}-scale)`} />
      <Bar x={125} y={34} w={14} h={3} />
      <Bar x={125} y={48} w={11} h={3} />
      <Bar x={125} y={62} w={13} h={3} />
    </>
  ),

  // connected touchpoint — smart ring sending a signal to a phone card
  "Nexus Ring": (id) => (
    <>
      <ellipse cx="66" cy="62" rx="30" ry="12" fill={`url(#${id}-deep)`} filter={`url(#${id}-lift)`} />
      <ellipse cx="66" cy="57" rx="30" ry="12" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="1.4" />
      <ellipse cx="66" cy="57" rx="20" ry="7" fill={SOFT} />
      <circle cx="66" cy="46" r="2.8" fill={TEAL} />
      {[12, 20, 28].map((r, i) => (
        <path
          key={r}
          d={`M${84 + r * 0.2} ${38 - r}a${r} ${r} 0 0 1 ${r} ${r}`}
          stroke={PURPLE}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity={1 - i * 0.28}
        />
      ))}
      <Card id={id} x={110} y={48} width={36} height={30} rx={7} />
      <Tick cx={120} cy={63} r={4.6} />
      <Bar x={128} y={59} w={12} h={3} />
      <Bar x={128} y={65} w={9} h={3} />
    </>
  ),

  // in-clinic engagement — tablet on a stand, chat bubble, heart badge
  Enkare: (id) => (
    <>
      <path d="M62 74h16l4 14H58z" fill={SOFT} />
      <rect x="28" y="14" width="84" height="60" rx="9" fill="#fff" stroke={LINE} strokeWidth="1.2" filter={`url(#${id}-lift)`} />
      <circle cx="46" cy="34" r="8" fill={`url(#${id}-deep)`} />
      <circle cx="46" cy="32" r="2.8" fill="#fff" />
      <path d="M41.4 38.6a5.2 5.2 0 0 1 9.2 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <Bar x={60} y={29} w={38} />
      <Bar x={60} y={37} w={26} />
      <rect x="38" y="52" width="64" height="12" rx="6" fill={SOFT} />
      <path d="M42 58h7l2-4 3 8 2-4h8" stroke={`url(#${id}-pulse)`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="104" y="18" width="42" height="22" rx="9" fill={`url(#${id}-deep)`} filter={`url(#${id}-lift)`} />
      <circle cx="116" cy="29" r="2" fill="#fff" />
      <circle cx="125" cy="29" r="2" fill="#fff" />
      <circle cx="134" cy="29" r="2" fill="#fff" />
      <circle cx="126" cy="66" r="10" fill={TEAL} filter={`url(#${id}-lift)`} />
      <path d="M126 71s-5-3-5-6.4a2.6 2.6 0 0 1 5-1.2 2.6 2.6 0 0 1 5 1.2c0 3.4-5 6.4-5 6.4z" fill="#fff" />
    </>
  ),
};

/** generic fallback — a lifted report card */
const FALLBACK = (id: string) => (
  <>
    <Card id={id} x={40} y={14} width={80} height={72} rx={10} />
    <Bar x={52} y={30} w={44} fill={`url(#${id}-deep)`} h={6} />
    <Bar x={52} y={44} w={56} />
    <Bar x={52} y={54} w={40} />
    <Tick cx={58} cy={70} r={5} />
  </>
);

export function DiagnosisArt({ name, className }: { name: string; className?: string }) {
  const id = `da-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const draw = ART[name] ?? FALLBACK;
  return (
    <svg viewBox="0 0 160 100" fill="none" aria-hidden className={className}>
      <Defs id={id} />
      {draw(id)}
    </svg>
  );
}
