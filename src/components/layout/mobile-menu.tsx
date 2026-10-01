"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { nav, ctas } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-paper lg:hidden"
        >
          <div className="container-x flex h-[4.5rem] items-center justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-ink" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-ink" />
              </span>
            </button>
          </div>

          <nav className="container-x mt-6 flex flex-col">
            {nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-line py-5 font-display text-3xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="container-x mt-10">
            <ButtonLink href={ctas.primary.href} className="w-full justify-center" onClick={onClose}>
              {ctas.primary.label}
            </ButtonLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
