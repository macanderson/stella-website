import { Reveal } from "./Reveal";

/**
 * The parity story, told honestly: not "we have every feature," but
 * "the files you already wrote are adopted on init." That is verifiable
 * (extensions.rs symlinks .claude/{commands,skills,agents}) and stronger.
 */
const CARRIES_OVER = [
  { k: ".claude/commands/", d: "symlinked in on init — your slash commands just work" },
  { k: ".claude/skills/", d: "adopted as-is, SKILL.md and all" },
  { k: ".claude/agents/", d: "your subagent personas come along" },
  { k: "MCP servers", d: "stdio + streamable-HTTP, with OAuth 2.1" },
  { k: "Lifecycle hooks", d: "SessionStart, PreToolUse, PostToolUse" },
  { k: "AGENTS.md / CLAUDE.md", d: "converted into checkable steering by stella ingest" },
];

const ALSO_HERE = [
  "Durable sessions + resume",
  "Automatic compaction",
  "Headless JSON / stream-JSON",
  "Task board & sub-agents",
  "Web search & fetch",
  "Git tools + CI-to-green",
  "Per-tool permissions & guards",
  "A real tabbed TUI",
  "Hard USD budget caps",
  "Offline code graph",
];

const ONLY_HERE = [
  { k: "stella inspect", d: "replay the exact context any model call received, digest-verified" },
  { k: "witness protocol", d: "fail→pass proof the agent structurally cannot fake" },
  { k: "CGP conformance", d: "context recall over an open protocol, not a private pipe" },
  { k: "stella observe", d: "local dashboard: spend, resolve rate, $/resolved task" },
  { k: "per-role routing", d: "worker, judge, and triage each on their own model" },
  { k: "stella fleet", d: "a task DAG fanned out to parallel workers" },
];

export function ParitySection() {
  return (
    <section id="parity" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="chip text-sub">Switching cost: about a minute</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Everything you already wrote{" "}
            <span className="text-gold">still works.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub">
            Run <code className="mono text-ink">stella init</code> in a repo you already use with
            another agent. Your commands, skills, and agents are symlinked in — not copied, not
            converted, not rewritten.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.05}>
            <div>
              <p className="mono mb-5 text-[11px] uppercase tracking-widest text-chevron">
                Carries over on init
              </p>
              <ul className="space-y-3.5">
                {CARRIES_OVER.map((e) => (
                  <li key={e.k} className="border-l-2 border-gold/40 pl-4">
                    <code className="mono text-sm text-gold">{e.k}</code>
                    <p className="mt-1 text-sm leading-relaxed text-sub">{e.d}</p>
                  </li>
                ))}
              </ul>
              <p className="mono mt-6 text-[11px] uppercase tracking-widest text-chevron">
                Also here
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {ALSO_HERE.map((p) => (
                  <li key={p} className="flex items-baseline gap-2.5 text-sm text-sub">
                    <span className="mono shrink-0 text-gold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="mono mb-5 text-[11px] uppercase tracking-widest text-chevron">
                What you can&apos;t get anywhere else
              </p>
              <ul className="space-y-3.5">
                {ONLY_HERE.map((e) => (
                  <li key={e.k} className="border-l-2 border-volt/50 pl-4">
                    <code className="mono text-sm text-volt-bright">{e.k}</code>
                    <p className="mt-1 text-sm leading-relaxed text-sub">{e.d}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4">
                <p className="text-sm leading-relaxed text-sub">
                  Written in <span className="text-ink">Rust</span> — one static binary, no runtime
                  to install. <span className="text-ink">BYOK</span> across nine providers or any
                  local model. Nothing leaves your machine by default.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
