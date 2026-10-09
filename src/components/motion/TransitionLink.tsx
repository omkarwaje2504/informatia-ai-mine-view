"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

type TransitionLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow browser's normal behaviour for modified clicks
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    e.preventDefault();

    window.dispatchEvent(new Event("page-transition-start"));

    // Let the panels start before changing the route
    setTimeout(() => {
      router.push(href.toString());
    }, 500);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}