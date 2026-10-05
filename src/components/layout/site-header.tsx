"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { HeaderLogo } from "@/components/brand/header-logo";
import { nav } from "@/lib/site";
import { useAppReady } from "@/hooks/use-app-ready";
import { cn } from "@/lib/utils";

function isActive(href: string, pathname: string) {
  if (href.startsWith("/#")) return pathname === "/";
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const reduce = useReducedMotion();
  const go = useAppReady() || !!reduce;
  const pathname = usePathname();

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={go ? { y: 0, opacity: 1 } : undefined}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      }}
      className="sticky top-0 z-50 border-b border-line bg-orange-50 backdrop-blur-md py-1"
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-[4.25rem]">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Informatia AI — home"
          className="group inline-flex shrink-0 items-center"
        >
          <HeaderLogo className="transition-transform duration-300 ease-out-expo group-hover:scale-[1.03]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item, i) => {
            const hasDropdown = "dropdown" in item;

            const active = hasDropdown
              ? item.dropdown.some((subItem) =>
                  isActive(subItem.href, pathname)
                )
              : isActive(item.href, pathname);

            return (
              <motion.div
                key={item.label}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={go ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.4,
                  delay: 0.25 + i * 0.05,
                }}
                className={cn(
                  "relative",
                  hasDropdown && "group"
                )}
              >
                {hasDropdown ? (
                  <>
                    {/* Products */}
                    <button
                      type="button"
                      className={cn(
                        "group relative flex items-center gap-1 px-3 py-2 text-[0.9rem] transition-colors duration-200",
                        active
                          ? "text-purple"
                          : "text-ink-soft hover:text-ink"
                      )}
                    >
                      {item.label}

                      {/* Arrow */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="transition-transform duration-200 group-hover:rotate-180"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Active / hover underline */}
                      <span
                        className={cn(
                          "pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center bg-current transition-transform duration-300 ease-out-expo",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    <div className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="rounded-2xl border border-line bg-paper-bright p-2 shadow-float">

                        {item.dropdown.map((subItem) => {
                          const subActive = isActive(
                            subItem.href,
                            pathname
                          );

                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block rounded-xl px-4 py-3 text-sm transition-colors",
                                subActive
                                  ? "bg-paper text-purple"
                                  : "text-ink-soft hover:bg-paper hover:text-ink"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}

                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block px-3 py-2 text-[0.9rem] transition-colors duration-200",
                      active
                        ? "text-purple"
                        : "text-ink-soft hover:text-ink"
                    )}
                  >
                    {item.label}

                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center bg-current transition-transform duration-300 ease-out-expo",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </nav>

        <MobileNav pathname={pathname} />
      </div>
    </motion.header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <details className="group relative lg:hidden">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
        <span className="relative block h-3 w-6">
          <span className="absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300 group-open:top-1.5 group-open:rotate-45" />
          <span className="absolute left-0 top-1.5 h-0.5 w-full bg-ink transition-opacity duration-200 group-open:opacity-0" />
          <span className="absolute left-0 top-3 h-0.5 w-4 bg-ink transition-transform duration-300 group-open:top-1.5 group-open:w-full group-open:-rotate-45" />
        </span>
      </summary>

      <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-line bg-paper-bright p-2 shadow-float">

        {nav.map((item) => {
          const hasDropdown = "dropdown" in item;

          const active = hasDropdown
            ? item.dropdown.some((subItem) =>
                isActive(subItem.href, pathname)
              )
            : isActive(item.href, pathname);

          if (hasDropdown) {
            return (
              <div key={item.label} className="px-2 py-2">
                <div
                  className={cn(
                    "px-2 py-2 text-sm font-medium",
                    active ? "text-purple" : "text-ink"
                  )}
                >
                  {item.label}
                </div>

                <div className="mt-1 border-l border-line pl-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 text-sm transition-colors",
                        isActive(subItem.href, pathname)
                          ? "text-purple"
                          : "text-ink-soft hover:bg-paper hover:text-ink"
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-paper",
                active ? "text-purple" : "text-ink-soft"
              )}
            >
              {item.label}
            </Link>
          );
        })}

      </div>
    </details>
  );
}
