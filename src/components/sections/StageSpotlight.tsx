import type { IndustrySection } from "@/lib/industries";
import { SolutionIcon } from "@/components/sections/solution-icons";
import { textDigits } from "@/components/sections/text-digits";

const pad = (n: number) => String(n).padStart(2, "0");

/** one-line focus for each solution, shown in the meta row */
const TAGS: Record<string, string> = {
  Webie: "Personal websites",
  Insta360: "Virtual clinic tours",
  Enkare: "In-clinic engagement",
  "Google Reviews": "Online reputation",
  "Clinic Inputs": "Clinic materials",
  "OPD Camps": "Patient camps",
};

/**
 * Spotlight treatment for a funnel stage: centred header over the stage's
 * solutions as a two-column grid of illustrated rows.
 */
export function StageSpotlight({ stage }: { stage: IndustrySection }) {
  const items = stage.items ?? [];

  return (
    <div id={stage.id} className="scroll-mt-28 py-4">
      {/* header */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow flex items-center justify-center gap-2.5 text-ink-muted">
          <span aria-hidden className="flex gap-1">
            <span className="size-1.5 rounded-full bg-purple-light/60" />
            <span className="size-1.5 rounded-full bg-purple-light" />
          </span>
          {stage.number} · Funnel stage
          <span aria-hidden className="flex gap-1">
            <span className="size-1.5 rounded-full bg-purple-light" />
            <span className="size-1.5 rounded-full bg-purple-light/60" />
          </span>
        </p>
        <h2 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {stage.title}
        </h2>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">{stage.description}</p>
      </header>

      {/* solutions */}
      <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-x-8 md:gap-y-5">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="group flex gap-5 rounded-3xl p-3 transition-colors duration-300 hover:bg-paper"
            >
              <span className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fbf7fe] to-[#efe5f8] ring-1 ring-ink/[0.06] sm:size-28">
                <SolutionIcon
                  name={it.name}
                  className="size-16 drop-shadow-[0_10px_14px_rgba(108,42,142,0.28)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-105 sm:size-20"
                />
              </span>
              <div className="min-w-0 py-1">
                <h3 className="font-display text-[1.15rem] font-bold leading-snug text-ink">{textDigits(it.name)}</h3>
                <p className="mt-1.5 line-clamp-2 text-[0.88rem] leading-relaxed text-ink-soft">
                  {it.description}
                </p>
                <p className="mt-3 flex items-center gap-3 text-[0.78rem] text-ink-muted">
                  <span className="font-text font-semibold tracking-[0.08em] text-teal">{pad(i + 1)}</span>
                  <span aria-hidden className="h-3.5 w-px bg-line" />
                  <span>{TAGS[it.name] ?? stage.title}</span>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
