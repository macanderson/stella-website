import { SITE } from "@/lib/site";
import { StellaGlyph } from "./StellaMark";
import { IconGitHub } from "./icons";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Proof", href: "#proof" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Observe", href: "#observe" },
      { label: "Embed", href: "#embed" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: SITE.docs },
      { label: "GitHub", href: SITE.repo },
      { label: "Context Graph Protocol", href: SITE.cgp },
      { label: "Changelog", href: `${SITE.repo}/blob/main/CHANGELOG.md` },
    ],
  },
  {
    title: "Install",
    links: [
      { label: "curl · install.sh", href: `${SITE.repo}/blob/main/install.sh` },
      { label: "Homebrew tap", href: SITE.repo },
      { label: "Build with cargo", href: SITE.repo },
      { label: "License (AGPL-3.0)", href: `${SITE.repo}/blob/main/LICENSE` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <StellaGlyph className="h-6 w-auto text-ink" />
              <span className="mono text-sm font-semibold text-ink">stella</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sub">
              Autonomous software delivery with built-in proof. Free and open source.
            </p>
            <a
              href={SITE.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-line-2 text-sub transition-colors hover:text-ink"
              aria-label="GitHub"
            >
              <IconGitHub className="h-4.5 w-4.5" />
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mono text-[11px] uppercase tracking-widest text-chevron">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-sub transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="mono text-xs text-chevron">
            © {new Date().getFullYear()} Oxagen · Stella v{SITE.version} · {SITE.license}
          </p>
          <p className="mono text-xs text-chevron">
            <span className="text-cursor">›</span>stella<span className="text-cursor">▮</span>{" "}
            — built by an agent that proves its work
          </p>
        </div>
      </div>
    </footer>
  );
}
