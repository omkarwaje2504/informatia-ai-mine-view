import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official logo asset (public/Informatia-logo.png, 3131×676). */
export function Logo({ className, href = "/" }: { className?: string; href?: string | null }) {
  const art = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Informatia-logo.png"
      alt="Informatia AI Pvt Ltd — Engineering Innovation. Delivering Excellence."
      width={3131}
      height={676}
      className={cn("h-8 w-auto sm:h-10", className)}
    />
  );

  if (href === null) return art;
  return (
    <Link href={href} aria-label="Informatia — home" className="inline-flex shrink-0">
      {art}
    </Link>
  );
}
