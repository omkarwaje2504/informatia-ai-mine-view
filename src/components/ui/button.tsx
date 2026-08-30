import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

type Variant = "primary" | "line" | "text";

const styles: Record<Variant, string> = {
  primary:
    "group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-purple",
  line:
    "group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:border-ink",
  text: "group inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  magnetic = false,
  ...props
}: Props) {
  const el = (
    <Link href={href} className={cn(styles[variant], className)} {...props}>
      {children}
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "transition-transform duration-300 ease-out-expo group-hover:translate-x-1",
            variant === "text" && "group-hover:translate-x-1.5",
          )}
        >
          →
        </span>
      ) : null}
    </Link>
  );
  return magnetic ? <Magnetic className="inline-flex">{el}</Magnetic> : el;
}
