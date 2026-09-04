"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TeamNetwork } from "@/components/page/team-network";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Department = {
  name: string;
  members: readonly { name: string; role: string }[];
};

/** "Our Team" feature — matches the leadership feature's rhythm: big
 * headline, a floated badge, a narrow word-by-word reveal of the intro
 * copy, a divider, then the org tree. */
export function TeamFeature({
  team,
  leader,
}: {
  team: { eyebrow: string; body: string; departments: readonly Department[] };
  leader: { name: string; role: string };
}) {
  const reduce = useReducedMotion();
  const rise = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay: i * 0.07, ease: EASE_OUT },
        };

  const teamCount = team.departments.length;
  const peopleCount = team.departments.reduce(
    (n, d) => n + d.members.length,
    0,
  );

  return (
    <>
      {/* headline row — badge floated right */}
      <div className="flex flex-wrap items-start justify-between gap-8">
        <motion.h2
          {...rise(0)}
          className="font-display text-[3rem] font-normal leading-[0.95] tracking-[-0.02em] text-mist sm:text-[4rem] lg:text-[4.8rem]"
        >
          {team.eyebrow}
        </motion.h2>
        <motion.div
          {...rise(1)}
          className="flex max-w-[12rem] items-start gap-2.5 text-[0.8rem] leading-snug text-mist-soft"
        >
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-mist/25 text-[0.7rem]">
            ✦
          </span>
          {teamCount} teams · {peopleCount} people delivering
        </motion.div>
      </div>

      {/* narrow supporting copy — words blur/fade in on scroll */}
      <p className="mt-14 max-w-[17rem] text-[0.92rem] leading-relaxed text-mist-soft md:mt-20">
        {team.body.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block will-change-[filter,opacity]"
            initial={reduce ? false : { opacity: 0.08, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: i * 0.03, ease: EASE_OUT }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </p>

      {/* divider */}
      <motion.div
        {...rise(2)}
        aria-hidden
        className="my-10 flex items-center gap-3 text-mist/40 md:my-14"
      >
        <span className="h-px flex-1 bg-mist/15" />
        <span className="text-lg leading-none">+</span>
      </motion.div>

      <TeamNetwork leader={leader} departments={team.departments} />
    </>
  );
}
