import { SITE } from "@/lib/site";
import { StellaGlyph } from "./StellaMark";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#receipts" },
      { label: "Recordings", href: "#recordings" },
      { label: "Switching", href: "#switching" },
      { label: "Install", href: "#install" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: SITE.docs },
      { label: "Source", href: SITE.repo },
      { label: "Changelog", href: `${SITE.repo}/blob/main/CHANGELOG.md` },
      { label: "Context Graph Protocol", href: SITE.cgp },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "AGPL-3.0-only", href: `${SITE.repo}/blob/main/LICENSE` },
      { label: "Licensing tracks", href: SITE.licensing },
      { label: "Security", href: `${SITE.repo}/blob/main/SECURITY.md` },
      { label: "Code of conduct", href: `${SITE.repo}/blob/main/CODE_OF_CONDUCT.md` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline py-16">
      <div className="wrap">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <StellaGlyph className="h-5 w-auto text-text" />
              <span className="mono text-sm font-semibold">stella</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              A terminal coding agent written in Rust, by Oxagen.
            </p>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mono text-2xs uppercase tracking-[0.12em] text-text-tertiary">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-text-secondary hover:text-text"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mono mt-16 border-t border-hairline pt-6 text-xs text-text-tertiary">
          © {new Date().getFullYear()} Oxagen, Inc. · Stella v{SITE.version} · {SITE.license}
        </p>
      </div>
    </footer>
  );
}
