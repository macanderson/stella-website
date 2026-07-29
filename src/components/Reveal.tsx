"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Scroll-triggered fade/rise. Progressive enhancement only: the markup is
 * visible by default; `.js .reveal` (set by the head script) hides it until
 * this observer adds `.in`. A fail-safe timer guarantees it always reveals.
 */
export function Reveal({ children, delay = 0, y = 22, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Fail-safe: never leave content hidden if the observer never fires.
    const t = window.setTimeout(() => el.classList.add("in"), 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}s`, ["--reveal-y" as string]: `${y}px` }}
    >
      {children}
    </div>
  );
}
