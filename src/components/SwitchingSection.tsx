import { SITE } from "@/lib/site";

/**
 * What carries over, and what is missing. Both halves verified against
 * macanderson/stella at v0.6.8; the second half is the more useful one and
 * is not softened.
 *
 *   symlink adoption   stella-cli/src/extensions.rs:15-16, :344
 *                      stella-cli/src/commands_cmd.rs:9
 *   ingest             stella-cli/src/main.rs:630, ingest_cmd.rs:5
 *   MCP transports     stella-mcp/src/registry.rs:375 (streamable-http, sse)
 *   MCP OAuth 2.1      stella-mcp/src/oauth.rs:1
 *   hooks              README.md:58-59
 *   providers          stella-cli/src/config.rs:152 (nine entries)
 *   budget             README.md:53-54
 *   slash surface      README.md:361-372 (no /compact)
 *   crates.io          README.md "Not on crates.io"
 */
const CARRIES_OVER: Array<[string, string]> = [
  [".claude/commands/", "symlinked into .stella/ by stella init, not copied or rewritten"],
  [".claude/skills/", "adopted in place, SKILL.md and all"],
  [".claude/agents/", "adopted in place; .agents/ is read the same way"],
  ["AGENTS.md, CLAUDE.md", "stella ingest turns the markdown you already wrote into rules"],
  ["MCP servers", "stdio, streamable-HTTP and SSE transports; OAuth 2.1 for hosted ones"],
  ["Lifecycle hooks", "SessionStart, PreToolUse and PostToolUse, declared in settings.json"],
];

const MISSING: Array<[string, string]> = [
  ["No IDE extension", "the terminal is the only surface"],
  ["No checkpoint or rewind", "sessions are durable and resumable, but not rewindable"],
  ["No vim mode", "keybindings are not configurable"],
  ["No /compact, no --continue", "compaction is automatic and not a command you invoke"],
  ["Not on crates.io", "cargo install needs --git; publish = false is set workspace-wide"],
  ["No Windows support", "private persistence depends on Unix owner and mode primitives"],
];

export function SwitchingSection() {
  return (
    <section id="switching" className="section" aria-labelledby="switching-h">
      <div className="wrap">
        <div className="prose-block">
          <p className="eyebrow">Switching</p>
          <h2 id="switching-h" className="measure">What carries over, and what is not here yet.</h2>
          <p>
            Stella does not claim parity with the agent you are using. It claims that the files you
            already wrote are adopted on <code className="mono text-text">stella init</code>, and it
            is specific about the rest.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          <div>
            <h3 className="mono text-2xs uppercase tracking-[0.12em] text-text-tertiary">
              Adopted on init
            </h3>
            <dl className="mt-6 space-y-5">
              {CARRIES_OVER.map(([k, d]) => (
                <div key={k}>
                  <dt className="mono text-sm text-brand-bright">{k}</dt>
                  <dd className="mt-1 text-sm text-text-secondary">{d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mono text-2xs uppercase tracking-[0.12em] text-text-tertiary">
              Not implemented
            </h3>
            <dl className="mt-6 space-y-5">
              {MISSING.map(([k, d]) => (
                <div key={k}>
                  <dt className="text-sm text-text">{k}</dt>
                  <dd className="mt-1 text-sm text-text-secondary">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="measure mt-16 text-text-secondary">
          One static Rust binary, no runtime to install. Bring your own key across{" "}
          {SITE.providerCount} hosted providers, or point{" "}
          <code className="mono text-text">--base-url</code> at any OpenAI-compatible server and use
          no hosted key at all. <code className="mono text-text">--budget</code> caps a run in US
          dollars and aborts between steps, never mid-tool.
        </p>
      </div>
    </section>
  );
}
