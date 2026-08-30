"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { Plexus } from "./plexus";
import { OrchestratorDiagram, OrchestratorList } from "./orchestrator-diagram";
import { useParallax } from "@/hooks/use-parallax";
import { useAppReady } from "@/hooks/use-app-ready";
import { sceneOne, sceneTwo } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Words with a staggered CSS reveal (survives paused rAF in previews). */
function Words({
  text,
  className,
  start = 0.15,
}: {
  text: string;
  className?: string;
  start?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="rise-in inline-block"
          style={{ animationDelay: `${start + i * 0.05}s` }}
        >
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

function SceneOneContent() {
  return (
    <div className="relative">
      <p
        className="fade-in mb-8 max-w-sm text-md italic leading-relaxed text-ink-soft lg:absolute lg:right-0 lg:top-1.5 lg:mb-0 lg:max-w-[20rem] lg:text-right"
        style={{ animationDelay: "0.6s" }}
      >
        {sceneOne.body}
      </p>
      <h1 className="font-display text-[1.8rem] font-semibold leading-[1.22] tracking-[-0.01em] text-ink sm:text-[2.15rem] lg:max-w-[52rem] lg:text-[2.35rem]">
        <Words text={sceneOne.heading} />
      </h1>
    </div>
  );
}

function toneClass(tone: string) {
  if (tone === "gold") return "text-gold";
  if (tone === "teal") return "text-teal-light";
  return "text-mist";
}

function SceneTwoHeadline() {
  return (
    <h2 className="font-display text-[1.9rem] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[2.5rem] lg:text-[3rem]">
      {sceneTwo.headingLines.map((line, i) => (
        <span key={line.text} className="block">
          <span
            className={cn("rise-in inline-block", toneClass(line.tone))}
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          >
            {line.text}
          </span>
          {"trailing" in line && line.trailing ? (
            <span
              className="rise-in ml-3 inline-block font-serif text-[0.5em] font-normal italic text-mist"
              style={{ animationDelay: `${0.05 + i * 0.08 + 0.05}s` }}
            >
              {line.trailing}
            </span>
          ) : null}
        </span>
      ))}
    </h2>
  );
}

/** Centred text block — sits in the middle of the constellation. */
function SceneTwoContent({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-[36rem] text-center" : "max-w-xl",
      )}
    >
      <p
        className="fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-line-night bg-night/50 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-mist-soft backdrop-blur-sm"
        style={{ animationDelay: "0s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        {sceneTwo.eyebrow}
      </p>

      <SceneTwoHeadline />

      <div
        className={cn(
          "mt-6 space-y-3.5 text-[0.95rem] leading-relaxed text-mist-soft",
          centered ? "mx-auto max-w-[30rem]" : "max-w-md",
        )}
      >
        {sceneTwo.body.map((p, i) => (
          <p
            key={p.slice(0, 12)}
            className="fade-in"
            style={{ animationDelay: `${0.4 + i * 0.12}s` }}
          >
            {p}
          </p>
        ))}
      </div>

      <div
        className={cn(
          "fade-in mt-8 flex flex-wrap gap-3",
          centered && "justify-center",
        )}
        style={{ animationDelay: "0.72s" }}
      >
        <Link
          href={sceneTwo.ctas.primary.href}
          className="group inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3 text-[0.9rem] font-medium text-night transition-colors duration-300 hover:bg-white"
        >
          {sceneTwo.ctas.primary.label}
          <span
            aria-hidden
            className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
        <Link
          href={sceneTwo.ctas.secondary.href}
          className="inline-flex items-center rounded-full border border-line-night bg-night/40 px-6 py-3 text-[0.9rem] font-medium text-mist backdrop-blur-sm transition-colors duration-300 hover:border-mist"
        >
          {sceneTwo.ctas.secondary.label}
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------- hero --------------------------------- */

export function Hero() {
  const reduce = useReducedMotion();
  const go = useAppReady() || !!reduce;
  const { x, y } = useParallax();
  const plexX = useTransform(x, (v) => v * 22);
  const plexY = useTransform(y, (v) => v * 14);

  const outer = useRef<HTMLDivElement>(null);
  const sceneOneRef = useRef<HTMLDivElement>(null);
  const plexusLight = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleA = useRef<HTMLDivElement>(null);
  const sceneB = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(sceneB.current, { autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: outer.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              // reveal the diagram at the same moment the Scene 2 text starts
              // fading in (see the sceneB tween at timeline position 0.3)
              onUpdate: (self) => setRevealed(self.progress >= 0.3),
            },
          });

          // Scene 1 text leaves WHILE the panel grows in width AND height at once,
          // finishing full-width exactly as its top reaches the nav (top:0) and it
          // hits 80% height. Then it HOLDS there for the rest of the pinned scroll.
          tl.to(
            sceneOneRef.current,
            { yPercent: -22, autoAlpha: 0, ease: "none", duration: 0.32 },
            0,
          )
            .to(
              plexusLight.current,
              { autoAlpha: 0.2, ease: "none", duration: 0.32 },
              0,
            )
            .to(
              panel.current,
              {
                width: "100%",
                height: "80%",
                top: "0%",
                borderTopLeftRadius: "1.25rem",
                borderTopRightRadius: "1.25rem",
                ease: "power2.inOut",
                duration: 0.36,
              },
              0,
            )
            .to(
              titleA.current,
              {
                autoAlpha: 0,
                yPercent: -12,
                filter: "blur(6px)",
                ease: "none",
                duration: 0.14,
              },
              0.2,
            )
            .fromTo(
              sceneB.current,
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.26 },
              0.3,
            )
            // hold the finished state for the remaining scroll
            .to({}, { duration: 0.5 });
        },
      );

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        setRevealed(true);
      });
    },
    { scope: outer },
  );

  return (
    <section
      ref={outer}
      className="relative bg-paper md:h-[200vh] motion-reduce:md:h-auto"
    >
      <div className="relative overflow-hidden bg-paper md:sticky md:top-[4.25rem] md:h-[calc(100svh-4.25rem)] motion-reduce:md:static motion-reduce:md:h-auto motion-reduce:md:overflow-visible">
        {/* light plexus behind scene one */}
        <motion.div
          ref={plexusLight}
          style={reduce ? undefined : { x: plexX, y: plexY }}
          initial={reduce ? false : { opacity: 0 }}
          animate={go ? { opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.15 }}
          className="pointer-events-none absolute inset-[-4%] -z-10"
        >
          <Plexus variant="light" density={1.15} className="opacity-80" />
        </motion.div>

        {/* SCENE 1 */}
        <div
          ref={sceneOneRef}
          className="container-x relative pt-20 pb-16 md:absolute md:inset-x-0 md:top-0 md:pt-[9vh] motion-reduce:md:static"
        >
          <SceneOneContent />
        </div>

        {/* scroll cue — reveals last */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
          className="pointer-events-none absolute bottom-[42%] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-ink-faint md:flex"
        >
          Scroll
          <motion.span
            aria-hidden
            className="block h-8 w-px bg-gradient-to-b from-ink-faint to-transparent"
            animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* MORPHING DARK PANEL */}
        <motion.div
          ref={panel}
          initial={reduce ? false : { opacity: 0, y: 100 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.05, ease: EASE, delay: 0.25 }}
          className={cn(
            "relative mx-auto w-[92%] overflow-hidden rounded-t-[1.5rem] bg-night text-mist",
            // peek: anchored by top at 41% → occupies the bottom 59% of the stage
            "md:absolute md:left-1/2 md:top-[41%] md:h-[59%] md:w-[65%] md:-translate-x-1/2 md:rounded-t-[2.25rem]",
            "motion-reduce:md:static motion-reduce:md:h-auto motion-reduce:md:w-[92%] motion-reduce:md:top-auto motion-reduce:md:translate-x-0",
          )}
        >
          <Plexus variant="dark" density={1.1} className="opacity-60" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 80% at 8% 12%, rgba(108,42,142,0.42), transparent 60%), radial-gradient(45% 75% at 94% 94%, rgba(28,195,182,0.2), transparent 60%)",
            }}
          />
          {/* always-on purple glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/40 blur-[130px]"
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.16, 1], opacity: [0.45, 0.72, 0.45] }
            }
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Scene A — centred title while the panel is small */}
          <div
            ref={titleA}
            className="relative z-10 hidden px-8 text-center md:absolute md:inset-0 md:grid md:place-items-center motion-reduce:md:hidden"
          >
            <h2 className="max-w-4xl font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.02em] text-mist">
              {sceneTwo.centeredHeading}
            </h2>
          </div>

          {/* Scene B — full split */}
          <div
            ref={sceneB}
            className="relative z-10 md:absolute md:inset-0 motion-reduce:md:static motion-reduce:md:py-14"
          >
            {/* lg+ : text centred inside the full-stage constellation */}
            <div className="relative hidden h-full lg:block">
              <OrchestratorDiagram active={revealed} />
              <div className="absolute inset-0 z-20 grid place-items-center px-6">
                <div className="pointer-events-none absolute h-[26rem] w-[42rem] rounded-full bg-[radial-gradient(ellipse,rgba(10,14,26,0.9),rgba(10,14,26,0.55)_45%,transparent_72%)]" />
                <div className="pointer-events-auto relative">
                  <SceneTwoContent centered />
                </div>
              </div>
            </div>

            {/* below lg : stacked */}
            <div className="container-x flex h-full flex-col justify-center gap-8 py-14 lg:hidden">
              <SceneTwoContent />
              <OrchestratorList />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
