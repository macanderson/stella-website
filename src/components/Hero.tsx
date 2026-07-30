import { SITE } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { Reveal } from "./Reveal";
import { Terminal } from "./Terminal";
import { IconGitHub, IconArrow } from "./icons";

/** The five-beat hero claim. Gold lands on the payoff word. */
const BEATS = ["Free.", "Configurable.", "Fast.", "Rust."] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <Reveal>
            <a
              href={SITE.repo}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-line-2 bg-white/[0.02] px-3 py-1.5 text-xs text-sub transition-colors hover:border-volt/50 hover:text-ink"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
              </span>
              <span className="mono">Open source · {SITE.license}</span>
              <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              {BEATS.map((b) => (
                <span key={b} className="text-ink">
                  {b}{" "}
                </span>
              ))}
              <br className="hidden sm:block" />
              <span className="text-gradient">And damn good.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sub">
              A terminal coding agent that does everything you already expect — and then{" "}
              <span className="text-ink">shows you its work</span>. Every model call, every
              decision, every proof, on the record and replayable.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 max-w-xl">
              <InstallBlock command={SITE.install} note="macOS &amp; Linux · no account, no gateway, no telemetry" />
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#transparency"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
              >
                See inside the box <IconArrow className="h-4 w-4" />
              </a>
              <a
                href={SITE.docs}
                target="_blank"
                rel="noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
              >
                Read the docs
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
          </Reveal>
        </div>

        <Reveal delay={0.12} className="flex items-center lg:pl-2">
          <div className="w-full">
            <Terminal />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
