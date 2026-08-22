import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { IconArrow } from "./icons";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-h" className="wrap pt-32 pb-24 md:pt-40 md:pb-32">
      <p className="eyebrow">
        Terminal coding agent · Rust · {SITE.license}
      </p>

      <h1 id="hero-h" className="mt-6 max-w-3xl">A coding agent that keeps receipts.</h1>

      <p className="mt-6 max-w-[58ch] text-lg text-text-secondary">
        Stella records a receipt for every model call — the ordered context blocks it sent, each
        content-addressed by digest. <code className="mono text-text">stella inspect</code> rebuilds
        that exact message array afterwards and re-checks it against the digests taken at emission.
      </p>

      <div className="mt-10 max-w-3xl">
        <InstallBlock
          accent
          command={SITE.install}
          note="macOS and Linux, x86_64 or arm64. The installer verifies the release tarball&rsquo;s SHA-256."
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="#receipts" className="btn btn-primary">
          How it works
          <IconArrow className="h-4 w-4" aria-hidden />
        </a>
        <a href={SITE.docs} target="_blank" rel="noreferrer" className="link text-sm">
          Documentation
        </a>
        <a href={SITE.repo} target="_blank" rel="noreferrer" className="link text-sm">
          Source
        </a>
      </div>
    </section>
  );
}
