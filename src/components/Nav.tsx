"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { StellaGlyph } from "./StellaMark";
import { IconGitHub } from "./icons";

const LINKS = [
  { href: "#proof", label: "Proof" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#observe", label: "Observe" },
  { href: "#embed", label: "Embed" },
  { href: "#free", label: "Free" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center gap-6 px-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Stella — home">
          <StellaGlyph className="h-6 w-auto text-ink" />
          <span className="mono text-sm font-semibold tracking-tight text-ink">stella</span>
          <span className="mono hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-sub sm:inline">
            v{SITE.version}
          </span>
        </a>

        <div className="mx-auto hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-sub transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="Stella on GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-line-2 text-sub transition-colors hover:border-line-2 hover:text-ink sm:flex"
          >
            <IconGitHub className="h-4.5 w-4.5" />
          </a>
          <a
            href="#get"
            className="btn-primary inline-flex items-center rounded-md px-3.5 py-2 text-sm"
          >
            Install
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line-2 text-ink md:hidden"
          >
            <span className="mono text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-b border-line bg-void/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-sub hover:bg-white/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
