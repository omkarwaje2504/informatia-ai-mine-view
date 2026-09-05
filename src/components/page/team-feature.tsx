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


  return (
    <>
      <motion.div
        {...rise(2)}
        aria-hidden
        className="flex items-center gap-3 text-mist/40"
      >
      </motion.div>

      <TeamNetwork leader={leader} departments={team.departments} />
    </>
  );
}
