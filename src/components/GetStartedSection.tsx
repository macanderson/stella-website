import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { Reveal } from "./Reveal";
import { StellaWordmark } from "./StellaMark";
import { IconGitHub, IconArrow } from "./icons";

export function GetStartedSection() {
  return (
    <section id="get" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-gradient-to-b from-white/[0.035] to-transparent p-8 sm:p-12">
            <div className="halo absolute inset-x-0 top-0" />

            <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="chip text-gold">Free, forever</p>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  One binary.
                  <br className="hidden sm:block" /> No account.
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sub">
                  Open source under {SITE.license}. Bring your own key — or point it at a local
                  model and never send a byte anywhere. The AGPL covers Stella, not the code you
                  write with it.
                </p>
              </div>

              <div>
                <p className="mono mb-3 text-[11px] uppercase tracking-widest text-chevron">
                  Install
                </p>
                <div className="space-y-3">
                  <InstallBlock command={SITE.install} note="prebuilt binary · SHA-256 verified" />
                  <InstallBlock command={SITE.brewInstall} note="Homebrew" />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.docs}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
                  >
                    Read the docs <IconArrow className="h-4 w-4" />
                  </a>
                  <a
                    href={SITE.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
                  >
                    <IconGitHub className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-20 text-center">
            <StellaWordmark className="mx-auto h-9 w-auto text-ink" />
            <p className="mx-auto mt-6 max-w-lg text-balance text-lg leading-relaxed text-sub">
              Free. Configurable. Fast. Rust.
              <br />
              <span className="text-ink">And it shows you its work.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
