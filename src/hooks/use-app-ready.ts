"use client";

import { useSyncExternalStore } from "react";

/**
 * Global "the intro is over, start revealing the page" signal. The preloader
 * flips it (immediately, if the preloader is skipped). CSS entrance animations
 * are gated on the `app-ready` class; Framer ones use `useAppReady()`.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markAppReady() {
  if (ready) return;
  ready = true;
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("app-ready");
  }
  listeners.forEach((fn) => fn());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Failsafe: never leave gated content hidden if the preloader misbehaves.
if (typeof window !== "undefined") {
  window.setTimeout(markAppReady, 6500);
}

export function useAppReady(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
}
