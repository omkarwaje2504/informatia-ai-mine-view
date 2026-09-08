"use client";

import { TeamNetwork } from "@/components/page/team-network";

type Department = {
  name: string;
  members: readonly { name: string; role: string; avatarUrl?: string }[];
};

/** "Our Team" — the scattered, draggable member network, filling the
 * section's dynamic-viewport height. */
export function TeamFeature({
  team,
  leader,
}: {
  team: { eyebrow: string; body: string; departments: readonly Department[] };
  leader: { name: string; role: string };
}) {
  return (
    <TeamNetwork leader={leader} departments={team.departments} />
  );
}
