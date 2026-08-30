"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { nav, activeNav } from "@/lib/site";
import { useAppReady } from "@/hooks/use-app-ready";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const go = useAppReady() || !!reduce;
  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={go ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md py-1"
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-[4.25rem]">
        <Link href="/" aria-label="Informatia — home" className="group inline-flex shrink-0">
          <Logo
            href={null}
            className="h-7 transition-transform duration-300 ease-out-expo group-hover:scale-[1.03] sm:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item, i) => {
            const active = item.label === activeNav;
            return (
              <motion.div
                key={item.href}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={go ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative block px-3 py-2 text-[0.9rem] transition-colors duration-200",
                    active ? "text-purple" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center bg-current transition-transform duration-300 ease-out-expo",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <MobileNav />
      </div>
    </motion.header>
  );
}

function MobileNav() {
  return (
    <details className="group relative lg:hidden">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
        <span className="relative block h-3 w-6">
          <span className="absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300 group-open:top-1.5 group-open:rotate-45" />
          <span className="absolute left-0 top-1.5 h-0.5 w-full bg-ink transition-opacity duration-200 group-open:opacity-0" />
          <span className="absolute left-0 top-3 h-0.5 w-4 bg-ink transition-transform duration-300 group-open:top-1.5 group-open:w-full group-open:-rotate-45" />
        </span>
      </summary>
      <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-line bg-paper-bright p-2 shadow-float">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-paper",
              item.label === activeNav ? "text-purple" : "text-ink-soft",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
