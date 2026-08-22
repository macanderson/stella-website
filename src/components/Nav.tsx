import { SITE } from "@/lib/site";
import { StellaGlyph } from "./StellaMark";
import { IconGitHub } from "./icons";

const LINKS = [
  { href: "#receipts", label: "How it works" },
  { href: "#recordings", label: "Recordings" },
  { href: "#install", label: "Install" },
];

/**
 * Server component. The old header ran a scroll listener to swap its
 * background; a header that is opaque from the first paint needs no
 * JavaScript and cannot cause a repaint on every scroll frame.
 */
export function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-void"
      style={{ height: "var(--header-h)" }}
    >
      <nav aria-label="Primary" className="wrap flex h-full items-center gap-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Stella — home">
          <StellaGlyph className="h-5 w-auto text-text" />
          <span className="mono text-sm font-semibold tracking-tight">stella</span>
        </a>

        <ul className="mx-auto hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-text-secondary hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <span className="mono hidden text-2xs text-text-tertiary sm:inline">v{SITE.version}</span>
          <a
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-text"
          >
            <IconGitHub className="h-5 w-5" aria-hidden />
            <span className="sr-only">Stella on GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
