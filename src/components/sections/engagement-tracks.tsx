import { engagementTracks } from "@/lib/content";
import { cn } from "@/lib/utils";

const { eyebrow, heading, sub, tracks } = engagementTracks;

/**
 * Card stack: every card is `position: sticky` and pins near the top, each one
 * offset a little lower than the last so the previous card's header keeps
 * peeking out. As you scroll, the next card slides up from below and lands on
 * top — one card resting on another. Pure CSS, no scroll listeners.
 */
export function EngagementTracks() {
  return (
    <section
      id="capabilities"
      className="relative bg-night py-24 text-mist md:py-32"
    >
      <div className="container-x">
        <header className="max-w-2xl">
          <p className="eyebrow text-mist-faint">{eyebrow}</p>
          <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-mist sm:text-[2.6rem]">
            {heading}
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-mist-soft">{sub}</p>
        </header>

        {/* the stack */}
        <div className="relative mt-16 pb-[8vh]">
          {tracks.map((t, i) => (
            <div
              key={t.n}
              className={cn("sticky", i > 0 && "mt-[10vh]")}
              style={{ top: `calc(5.5rem + ${i * 3}rem)` }}
            >
              <article className="overflow-hidden rounded-3xl border border-line-night bg-night-2 shadow-[0_-22px_60px_-16px_rgba(0,0,0,0.75)] md:min-h-[46vh]">
                {/* header bar — this is the strip that peeks when stacked */}
                <div className="flex items-baseline gap-4 border-b border-line-night bg-white/[0.03] px-7 py-5 md:px-12 md:py-6">
                  <span className="font-display text-[1.1rem] font-semibold text-gold">
                    {t.n}
                  </span>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-tight tracking-[-0.01em] text-mist sm:text-[1.7rem]">
                    {t.title}
                  </h3>
                </div>

                <div className="grid gap-8 px-7 py-8 md:grid-cols-2 md:gap-14 md:px-12 md:py-11">
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-teal-light">
                      Core Focus &amp; Solutions
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-soft">
                      {t.focus}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-teal-light">
                      Business Impact &amp; ROI
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-soft">
                      {t.impact}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
