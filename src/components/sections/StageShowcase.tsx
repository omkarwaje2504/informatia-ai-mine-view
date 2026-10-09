import Image from "next/image";
import Link from "next/link";
import { solutionImage, type IndustrySection } from "@/lib/industries";

type Item = { name: string; description: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** One "page screenshot" style card in the showcase wall. */
function ShowcaseCard({ item }: { item: Item }) {
  const image = solutionImage(item.name);
  return (
    <article className="h-full overflow-hidden rounded-2xl bg-paper-bright shadow-[0_18px_40px_-22px_rgba(10,14,26,0.45)] ring-1 ring-ink/[0.06] transition-transform duration-500 ease-out-expo hover:-translate-y-1">
      <div className="relative aspect-[2.4/1] overflow-hidden bg-gradient-to-br from-purple to-teal">
        {image ? (
          // unoptimized: serve the file as-is (like the Products page), so a
          // replaced image shows up at once instead of a cached resize
          <Image src={image} alt={item.name} fill unoptimized className="object-cover object-[center_30%]" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-[2.4rem] font-bold text-mist/85">
            {initials(item.name)}
          </span>
        )}
      </div>
      <div className="px-5 py-3">
        <h3 className="font-display text-[1.1rem] font-bold leading-snug text-ink">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-[0.86rem] leading-relaxed text-ink-soft">{item.description}</p>
      </div>
    </article>
  );
}

/**
 * Showcase treatment for a funnel stage: centred title, copy and CTAs over a
 * white-to-brand gradient panel, with the stage's solutions as a grid of
 * cards (middle column set lower for a staggered, showcase feel).
 */
export function StageShowcase({ stage }: { stage: IndustrySection }) {
  const items = stage.items ?? [];

  return (
    <div
      id={stage.id}
      className="relative scroll-mt-28 overflow-hidden rounded-[2rem] pb-14 pt-12 sm:pb-16 sm:pt-14"
      style={{
        background:
          "radial-gradient(60% 45% at 50% 100%, rgba(28,195,182,0.35), transparent 70%), linear-gradient(180deg, #fbfaf8 0%, #f2ecf8 34%, #b98fd4 68%, #4a1f68 88%, #1d0f33 100%)",
      }}
    >
      {/* header */}
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-bright/70 px-3 py-1 font-text text-[0.8rem] font-semibold tracking-[0.1em] text-teal backdrop-blur">
          {stage.number}
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-muted">
            Funnel stage
          </span>
        </span>
        <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          {stage.title}
        </h2>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">{stage.description}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/connect"
            className="group inline-flex items-center gap-2 rounded-full bg-purple px-6 py-3 text-[0.9rem] font-medium text-white transition-colors duration-300 hover:bg-ink"
          >
            Start a Conversation
            <span aria-hidden className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center rounded-full border border-ink/80 px-6 py-3 text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            Explore all products
          </Link>
        </div>
      </div>

      {/* the stage's solutions — each shown once */}
      <ul className="relative mt-10 grid gap-5 px-5 sm:mt-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:gap-6 lg:px-10 lg:pb-6 lg:[&>li:nth-child(3n+2)]:translate-y-6">
        {items.map((it) => (
          <li key={it.name}>
            <ShowcaseCard item={it} />
          </li>
        ))}
      </ul>
    </div>
  );
}
