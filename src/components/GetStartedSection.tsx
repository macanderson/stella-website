import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { Reveal } from "./Reveal";
import { StellaWordmark } from "./StellaMark";
import { IconGitHub, IconLock, IconArrow } from "./icons";

const FREEDOMS = [
  { k: "Run", d: "on your own proprietary code — the AGPL covers Stella, not what you build with it" },
  { k: "Read", d: "every line — the whole engine is open source" },
  { k: "Modify", d: "fork it, wire new providers and tools as adapters" },
  { k: "Redistribute", d: "share it under the same license, forever" },
];

export function GetStartedSection() {
  return (
    <section id="free" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12">
            <div className="halo absolute inset-x-0 top-0" />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
              {/* left */}
              <div>
                <p className="chip text-cursor">Completely free</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  $0. No account. No gateway.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-sub">
                  Stella is open source under {SITE.license}. Bring your own key to any of nine
                  providers — or a local model — and everything you run stays on your machine by
                  default. There&apos;s nothing to sign up for.
                </p>

                <ul className="mt-7 space-y-3">
                  {FREEDOMS.map((f) => (
                    <li key={f.k} className="flex items-start gap-3">
                      <span className="mono mt-0.5 rounded bg-cursor/10 px-2 py-0.5 text-xs text-cursor ring-1 ring-cursor/25">
                        {f.k}
                      </span>
                      <span className="text-sm text-sub">{f.d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-start gap-3 rounded-lg border border-line bg-void/50 p-3.5">
                  <IconLock className="mt-0.5 h-4 w-4 shrink-0 text-sub" />
                  <p className="text-xs leading-relaxed text-sub">
                    Building a closed-source product or hosted service on top of the engine? A
                    commercial license from Oxagen lets you embed without publishing your
                    changes.
                  </p>
                </div>
              </div>

              {/* right — install */}
              <div id="get" className="flex flex-col justify-center">
                <p className="mono mb-3 text-[11px] uppercase tracking-widest text-chevron">
                  Install in one line
                </p>
                <div className="space-y-3">
                  <InstallBlock command={SITE.install} note="prebuilt binary · SHA-256 verified" />
                  <InstallBlock command={SITE.brewInstall} note="Homebrew" />
                  <InstallBlock command={SITE.cargoInstall} note="build from source with cargo" />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={SITE.docs}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
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

        {/* closer */}
        <Reveal delay={0.1}>
          <div className="mt-20 text-center">
            <StellaWordmark className="mx-auto h-9 w-auto text-ink" />
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-sub">
              It&apos;s the best agent nobody&apos;s using. It plans, it ships, and it{" "}
              <span className="text-ink">proves every step</span>. The only thing missing is
              you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
