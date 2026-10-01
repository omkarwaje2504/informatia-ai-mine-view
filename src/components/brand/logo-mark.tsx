import type { SVGProps } from "react";

/**
 * The Informatia "peak" mark — two angled strokes forming an upward chevron,
 * echoing the custom "A" in the wordmark (purple leg + parallel teal stroke).
 */
export function LogoMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 60 44"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {/* purple chevron */}
      <path
        d="M7 40 L24 6 L41 40"
        stroke="var(--color-purple)"
        strokeWidth="8"
        strokeLinejoin="miter"
      />
      {/* teal parallel stroke on the trailing edge */}
      <path
        d="M44 40 L29 10"
        stroke="var(--color-teal)"
        strokeWidth="7"
        strokeLinecap="square"
      />
    </svg>
  );
}
