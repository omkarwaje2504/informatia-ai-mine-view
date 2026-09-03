"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Square portrait that falls back to an initials monogram if the image is missing. */
export function Portrait({
  src,
  name,
  role,
  className,
}: {
  src: string;
  name: string;
  role?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-paper",
        className,
      )}
    >
      {failed ? (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-purple/12 to-teal/12">
          <span className="font-display text-[3.5rem] font-bold text-ink/25">
            {initials}
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={role ? `${name}, ${role}` : name}
          width={640}
          height={640}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
