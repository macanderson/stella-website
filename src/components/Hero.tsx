import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { IconArrow } from "./icons";

/**
 * What it is, where it ends, and how to install it.
 *
 * The second paragraph is the ADR-040 seam stated once, up front: Stella is an
 * execution engine, and governance — identity, policy, approval, lineage,
 * audit — is a plane it reports to rather than a thing it is. Sourced from
 * macanderson/stella `docs/spec/enterprise-authority-telemetry.md` § Purpose
 * ("Stella remains a local-first, provider-neutral execution engine. Oxagen
 * Enterprise adds the governed control plane…"), and README.md:25-31 for what
 * a default install does and does not send.
 */
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

      <p className="mt-5 max-w-[58ch] text-text-secondary">
        It is an execution engine, and it stops there. Identity, policy, approval, lineage and audit
        belong to a control plane above it — one you bring, or none at all. A default install has no
        control plane and no egress: nothing leaves the machine but the calls to the provider whose
        key you set.
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
        <a href="#governance" className="link text-sm">
          Where the engine ends
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
