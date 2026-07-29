import { SITE, STATS } from "@/lib/site";
import { InstallBlock } from "./InstallBlock";
import { Reveal } from "./Reveal";
import { Terminal } from "./Terminal";
import { IconArrow, IconGitHub, IconBolt } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* left — pitch */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <a
              href="#free"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-line-2 bg-white/[0.02] px-3 py-1.5 text-xs text-sub transition-colors hover:border-cursor/40 hover:text-ink"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cursor opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cursor" />
              </span>
              <span className="mono">Free &amp; open source · {SITE.license}</span>
              <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              The autonomous agent that{" "}
              <span className="text-gradient">proves its own work.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-sub sm:text-lg">
              Stella is a completely free, open-source software delivery system. One
              deterministic loop plans, edits, and ships — and every change carries{" "}
              <span className="text-ink">proof it actually works</span>, not just a green
              checkmark. It&apos;s the best agent nobody&apos;s using yet. Let&apos;s fix that.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 max-w-xl">
              <InstallBlock
                command={SITE.install}
                note="macOS &amp; Linux · x86_64 / arm64 · SHA-256 verified · no account, no gateway"
              />
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#get"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
              >
                <IconBolt className="h-4 w-4" /> Get started
              </a>
              <a
                href={SITE.repo}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
              >
                <IconGitHub className="h-4 w-4" /> Star on GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-ink">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-sub">
                    <span className="text-ink/80">{s.label}</span>
                    <br />
                    {s.sub}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* right — live terminal */}
        <Reveal delay={0.12} className="flex items-center lg:pl-2">
          <div className="w-full">
            <Terminal />
          </div>
        </Reveal>
      </div>

      {/* provider marquee */}
      <Reveal delay={0.1} className="mt-20">
        <ProviderMarquee />
      </Reveal>
    </section>
  );
}

const PROVIDERS = [
  "Anthropic",
  "OpenAI",
  "Gemini",
  "xAI",
  "DeepSeek",
  "Z.ai",
  "OpenRouter",
  "Vertex",
  "Bedrock",
  "Ollama",
  "vLLM",
  "LM Studio",
];

function ProviderMarquee() {
  const row = [...PROVIDERS, ...PROVIDERS];
  return (
    <div className="mx-auto max-w-6xl px-5">
      <p className="mono mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-chevron">
        Bring your own key — runs on any model
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-10">
          {row.map((p, i) => (
            <span
              key={i}
              className="mono whitespace-nowrap text-sm text-sub/70 transition-colors hover:text-ink"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
