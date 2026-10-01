"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE_INOUT = [0.76, 0, 0.24, 1] as const;

export function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setActive(true);
    };

    window.addEventListener("page-transition-start", handleStart);

    return () => {
      window.removeEventListener("page-transition-start", handleStart);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    // Hide the transition after the new route has rendered
    const timer = setTimeout(() => {
      setActive(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-night"
            initial={{ y: "0%" }}
            animate={{ y: "-101%" }}
            transition={{
              duration: 0.8,
              ease: EASE_INOUT,
              delay: 0.05 + i * 0.07,
            }}
          />
        ))}
      </div>
    </div>
  );
}