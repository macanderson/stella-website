import { Reveal } from "./Reveal";

export function EmbedSection() {
  return (
    <section id="embed" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="chip text-cursor">Ship it inside your product</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Your product. Stella&apos;s loop as the engine.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-sub">
                <code className="mono text-ink">stella-core</code> is a zero-I/O engine: every
                model call goes through a <span className="text-ink">Provider</span> port, every
                tool through a <span className="text-ink">ToolExecutor</span> port, and the whole
                thing emits one ordered <code className="mono text-ink">AgentEvent</code> stream.
                Adding a vendor or a tool is an adapter, never a rewrite.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-sub">
                <code className="mono text-ink">stella-serve</code> wraps it as a headless
                sidecar — your host drives a turn over the wire and answers every model and tool
                call by reverse-RPC. The engine holds{" "}
                <span className="text-ink">no ambient authority</span>: it can only touch what
                your app hands back.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["zero-I/O core", "bearer auth", "SSE frames", "non-root container", "reverse-RPC"].map(
                  (t) => (
                    <span
                      key={t}
                      className="mono rounded-full border border-line-2 bg-white/[0.02] px-2.5 py-1 text-[11px] text-sub"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {/* architecture strip */}
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-xl border border-line bg-[#0a0a0c]/70 p-4">
                <ArchNode top="your app" bottom="host process" />
                <Wire label="turns / SSE" />
                <ArchNode top="stella-serve" bottom="Rust core" accent />
                <Wire label="reverse-RPC" />
                <ArchNode top="your tools" bottom="+ providers" />
              </div>

              {/* code */}
              <div className="overflow-hidden rounded-xl border border-line-2 bg-[#08080a]">
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span className="mono text-[11px] text-sub">drive a turn</span>
                  <span className="mono ml-auto text-[11px] text-chevron">SSE</span>
                </div>
                <pre className="mono overflow-x-auto p-4 text-[12.5px] leading-relaxed">
                  <code>
                    <span className="text-chevron"># run the engine as a sidecar</span>
                    {"\n"}
                    <span className="text-cursor">$</span>{" "}
                    <span className="text-ink">docker run -p 8080:8080 stella-serve</span>
                    {"\n\n"}
                    <span className="text-chevron"># your app opens a turn…</span>
                    {"\n"}
                    <span className="text-cursor">$</span>{" "}
                    <span className="text-ink">curl -N localhost:8080</span>
                    <span className="text-ember">/v1/turns</span> \{"\n"}
                    {"    "}
                    <span className="text-ink">-H</span>{" "}
                    <span className="text-sub">&apos;authorization: Bearer $TOKEN&apos;</span> \
                    {"\n"}
                    {"    "}
                    <span className="text-ink">-d</span>{" "}
                    <span className="text-sub">
                      &apos;&#123;&quot;prompt&quot;:&quot;triage this stack trace&quot;&#125;&apos;
                    </span>
                    {"\n\n"}
                    <span className="text-sub">
                      → ServerFrame: tool_call &quot;read_file&quot;
                    </span>
                    {"\n"}
                    <span className="text-sub">
                      ← POST /tool-result &#123; ok, contents &#125;
                    </span>
                    {"\n"}
                    <span className="text-cursor">→ ServerFrame: turn_done ✓</span>
                  </code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ArchNode({
  top,
  bottom,
  accent,
}: {
  top: string;
  bottom: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 text-center ${
        accent
          ? "border-cursor/40 bg-cursor/[0.06]"
          : "border-line bg-white/[0.02]"
      }`}
    >
      <div className={`mono text-xs ${accent ? "text-cursor" : "text-ink"}`}>{top}</div>
      <div className="mono mt-0.5 text-[10px] text-chevron">{bottom}</div>
    </div>
  );
}

function Wire({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-px w-full min-w-[14px] bg-gradient-to-r from-transparent via-line-2 to-transparent" />
      <span className="mono mt-1 hidden text-[9px] text-chevron sm:block">{label}</span>
    </div>
  );
}
