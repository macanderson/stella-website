import { Reveal } from "./Reveal";
import {
  IconSkills,
  IconWand,
  IconGraph,
  IconScript,
  IconEngine,
  IconVideo,
  IconObserve,
  IconProof,
} from "./icons";
import type { ReactNode, SVGProps } from "react";

type Cap = {
  icon: (p: SVGProps<SVGSVGElement>) => ReactNode;
  title: string;
  body: string;
  code: string;
  href?: string;
};

const CAPS: Cap[] = [
  {
    icon: IconSkills,
    title: "Search skills with one command",
    body: "Discover community skills from the registry without leaving the terminal. Install is always a confirmed step — never silent.",
    code: 'npx skills find "pdf extraction"',
  },
  {
    icon: IconWand,
    title: "Create skills & agents in English",
    body: "Describe a skill and the model drafts its SKILL.md for you. Recurring lessons get promoted into new skills automatically — Stella writes its own playbook.",
    code: "/skills → new · LLM-drafted",
  },
  {
    icon: IconGraph,
    title: "Context Graph Protocol conformant",
    body: "An open, versioned wire protocol for context recall. Any provider that's green on the public conformance suite plugs in. Stella is the reference host.",
    code: "contextgraph/1.0 · CI-checked",
    href: "https://github.com/macanderson/context-graph-protocol",
  },
  {
    icon: IconObserve,
    title: "Rich telemetry, all local",
    body: "A loopback-only Observatory over the SQLite your runs recorded — spend, resolve rate, tokens, tool latency, code-graph. Zero external calls.",
    code: "stella observe --open",
    href: "#observe",
  },
  {
    icon: IconScript,
    title: "Script it into anything",
    body: "Headless one-shots emit a versioned JSON envelope. Fan out fleets from a TOML DAG. Wire lifecycle hooks. It's automation-native.",
    code: "stella run --output-format stream-json",
  },
  {
    icon: IconEngine,
    title: "Bake it in as your engine",
    body: "stella-core is a zero-I/O engine behind clean ports; stella-serve remotes every model and tool call over the wire. Embed the loop in your own app.",
    code: "stella-serve · POST /v1/turns",
    href: "#embed",
  },
  {
    icon: IconVideo,
    title: "It even makes videos",
    body: "Generate SVGs, images, and text-to-video straight from a run, behind your own key. Real video generation — cost-gated so it never surprises you.",
    code: "generate_video · text → mp4",
    href: "#video",
  },
  {
    icon: IconProof,
    title: "Proof is the default",
    body: "Every change ships with a deterministic fail→pass flip and a replayable receipt. Autonomy you can actually audit.",
    code: "verify_done · fail→pass",
    href: "#proof",
  },
];

export function CapabilitiesGrid() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="chip text-cursor">Everything in the box</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            One binary. An absurd amount of range.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub">
            46 always-on tools — up to 58 with the code graph, media keys, search, and an issue
            backend. Here&apos;s the part people keep missing.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="card group flex h-full flex-col p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white/[0.02] text-cursor transition-colors group-hover:border-cursor/40">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-sub">{c.body}</p>
                <div className="mt-4 overflow-hidden rounded-md border border-line bg-void/60 px-2.5 py-1.5">
                  <code className="mono block truncate text-[11px] text-sub group-hover:text-ink">
                    <span className="text-cursor">$</span> {c.code}
                  </code>
                </div>
              </div>
            );
            return (
              <Reveal key={c.title} delay={(i % 4) * 0.05}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
