import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";

/**
 * Install, licensing and telemetry.
 *
 * The licensing and telemetry copy below mirrors macanderson/stella's
 * LICENSING.md and README.md § Telemetry. It is legally load-bearing: do not
 * soften it, sharpen it, or summarise away a condition. If a statement here
 * cannot be traced to those files, delete it rather than rephrase it.
 */
export function InstallSection() {
  return (
    <section id="install" className="section" aria-labelledby="install-h">
      <div className="wrap">
        <div className="prose-block">
          <p className="eyebrow">Install</p>
          <h2 id="install-h" className="measure">One binary. No account.</h2>
          <p>
            macOS and Linux, x86_64 or arm64. Windows is not supported: private persistence depends
            on Unix owner and mode primitives, and non-Unix builds fail closed on sensitive state
            writes.
          </p>
        </div>

        <div className="mt-10 grid max-w-3xl gap-3">
          <InstallBlock
            command={SITE.install}
            label="prebuilt binary install"
            note="Downloads the latest release tarball and verifies its SHA-256. Falls back to cargo install when no prebuilt binary matches your platform."
          />
          <InstallBlock command={SITE.brewInstall} label="Homebrew install" note="Homebrew tap." />
          <InstallBlock
            command={SITE.cargoInstall}
            label="cargo install"
            note="Requires Rust 1.90 or later. The --git flag is required: the crates are not published to crates.io."
          />
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-12 border-t border-hairline pt-16 md:grid-cols-2">
          <div>
            <h3>Licence</h3>
            <p className="mt-4 text-sm text-text-secondary">
              Stella is dual-licensed. The open source track is{" "}
              <a
                href={`${SITE.repo}/blob/main/LICENSE`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                AGPL-3.0-only
              </a>{" "}
              — version 3 only, with the &ldquo;or any later version&rdquo; clause deliberately not
              granted. Distributing a modified Stella, or running one as a network service, obliges
              you to publish your modifications.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              Using Stella to write closed-source software does not make that software AGPL. The
              copyleft covers Stella itself and works derived from it, not the output of running it.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              A commercial track exists for shipping Stella inside a product you do not publish the
              source of, for offering a modified Stella over a network, and for procurement rules
              that prohibit AGPL code.
            </p>
            <a
              href={SITE.licensing}
              target="_blank"
              rel="noreferrer"
              className="link mt-5 inline-block text-sm"
            >
              Which track am I on?
            </a>
          </div>

          <div>
            <h3>Telemetry</h3>
            <p className="mt-4 text-sm text-text-secondary">
              Executions, events, token and cost figures, and the files-touched ledger are recorded
              in <code className="mono text-text">.stella/private/store.db</code>. It is a plain
              SQLite file; query it with any SQLite client.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              Community and default installs have zero telemetry egress: no spool and no HTTP client
              is constructed for it. Model calls still go to whichever provider key you set — that is
              the one thing that leaves your machine, and pointing{" "}
              <code className="mono text-text">--base-url</code> at a local server removes it.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              An install becomes enrolled in managed enterprise export only through a signed
              enterprise-telemetry document in the org-managed settings scope. Prompts, paths, tool
              names, arguments and results, reasoning, errors, git state, memories and rules are
              excluded from that export.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={`${SITE.docs}/telemetry`}
                target="_blank"
                rel="noreferrer"
                className="link text-sm"
              >
                Telemetry documentation
              </a>
              <a href="#governance" className="link text-sm">
                What an enrolled export can and cannot show
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
