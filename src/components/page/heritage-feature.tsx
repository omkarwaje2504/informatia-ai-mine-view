import { Plexus } from "@/components/hero/plexus";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { aboutPage as a } from "@/lib/pages";

export function HeritageFeature() {
  return (
    <div className="relative" style={{ height: "calc(170vh)" }}>
      <section
        className="z-0 flex flex-col overflow-hidden border-t border-line"
        style={{
          position: "sticky",
          top: "73px",
          height: "calc(100vh - 73px)",
        }}
      >
        {/* Heritage */}
        <div className="flex flex-1/3 md:flex-1 items-center bg-paper">
          <div className="container-x grid gap-4 py-8 lg:py-16 lg:grid-cols-[22rem_1fr] lg:gap-6">
            {/* Left: eyebrow + stat */}
            <div className="flex flex-col gap-4">
              <p className="eyebrow text-ink-muted">
                {a.heritage.eyebrow}
              </p>

              <div className="hidden lg:block">
                <div className="flex items-end gap-3">
                  <span className="font-text text-[11rem] font-bold leading-[0.85] tracking-[-0.04em] text-ink">
                    <AnimatedCounter value={a.heritage.stat.value} />
                  </span>

                  <span className="pb-1 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-teal">
                    {a.heritage.stat.label}
                  </span>
                </div>

                <div className="mt-4 h-px w-40 bg-gradient-to-r from-purple-light to-teal-light" />
              </div>
            </div>

            {/* Right: heading + paragraphs */}
            <div>
              <h2 className="max-w-2xl font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                {a.heritage.heading}
              </h2>

              <div className="mt-3 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-8">
                {a.heritage.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-[0.88rem] leading-relaxed text-ink-soft ${
                      i > 0 ? "hidden sm:block" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Closing */}
            <p className="lg:col-span-2 max-w-none font-display text-[0.88rem] leading-snug text-ink sm:block lg:mt-4 lg:text-[1rem]">
              {a.heritage.closing}
            </p>
          </div>
        </div>

        {/* Beliefs */}
        <div className="relative flex flex-2/3 md:flex-1 md:items-center overflow-hidden bg-night text-mist">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Plexus variant="dark" density={0.55} />
          </div>

          <div className="container-x relative py-8">
            <p className="eyebrow hidden text-mist-faint sm:inline-block">
              {a.beliefs.eyebrow}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:mt-6 md:gap-6 lg:grid-cols-4">
              {a.beliefs.items.map((b, i) => (
                <div
                  key={b.title}
                  className="border-t-2 border-mist/80 md:pt-5"
                >
                  <span className="font-text hidden text-[3rem] font-semibold text-gold sm:inline-block md:text-[5rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 font-display text-[1.1rem] font-semibold leading-snug text-mist">
                    <span className="font-text mr-2 inline-block text-[1.2rem] font-semibold text-gold sm:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {b.title}
                  </h3>

                  <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-soft">
                    {b.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}