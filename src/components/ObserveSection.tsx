import { Reveal } from "./Reveal";

const KPIS = [
  { label: "runs", value: "214", sub: "last 7 days" },
  { label: "resolve rate", value: "92%", sub: "+6 vs. prev" },
  { label: "spend", value: "$3.71", sub: "$0.017 / task" },
  { label: "tokens", value: "4.2M", sub: "71% cached" },
];

const BARS = [34, 41, 28, 55, 47, 62, 51, 73, 58, 66, 80, 71, 88, 76];

const MODELS = [
  { name: "sonnet-5", cost: "$0.014", w: 92 },
  { name: "opus-4.8", cost: "$0.031", w: 64 },
  { name: "local · qwen", cost: "$0.000", w: 100 },
  { name: "deepseek-v3", cost: "$0.006", w: 78 },
];

const TOOLS = [
  { name: "edit_file", calls: "1,204", p50: "12ms" },
  { name: "run_tests", calls: "318", p50: "1.9s" },
  { name: "verify_done", calls: "214", p50: "2.4s" },
  { name: "graph_query", calls: "540", p50: "8ms" },
];

export function ObserveSection() {
  return (
    <section id="observe" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="chip text-cursor">stella observe</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                See exactly what your agent did — and what it cost.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-sub">
                One command opens the <span className="text-ink">Observatory</span>: a
                loopback-only, read-only dashboard built from the SQLite your own runs recorded.
                Resolve rate, dollars per resolved task, token cache hits, tool latency, files
                touched, and a live code-graph — all served as a single embedded page that makes{" "}
                <span className="text-ink">zero external calls</span>.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-line-2 bg-[#0a0a0c]/80 px-3.5 py-2.5">
                <span className="mono text-cursor">$</span>
                <code className="mono text-sm text-ink">stella observe --open</code>
              </div>
              <p className="mono mt-3 text-xs text-chevron">
                binds 127.0.0.1:7787 · every database opened read-only · nothing leaves your
                machine
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="halo absolute inset-0" />
              <div className="relative overflow-hidden rounded-xl border border-line-2 bg-[#0a0a0c]/90 shadow-2xl backdrop-blur-sm">
                {/* window header */}
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="mono ml-3 flex-1 truncate rounded bg-white/[0.03] px-2 py-1 text-[11px] text-sub">
                    127.0.0.1:7787 — observatory
                  </div>
                </div>

                <div className="p-4">
                  {/* window selector */}
                  <div className="mb-4 flex items-center gap-1.5">
                    {["24h", "7d", "30d", "all"].map((w) => (
                      <span
                        key={w}
                        className={`mono rounded px-2 py-0.5 text-[11px] ${
                          w === "7d"
                            ? "bg-cursor/15 text-cursor"
                            : "text-chevron hover:text-sub"
                        }`}
                      >
                        {w}
                      </span>
                    ))}
                  </div>

                  {/* KPI tiles */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {KPIS.map((k) => (
                      <div
                        key={k.label}
                        className="rounded-lg border border-line bg-white/[0.015] p-2.5"
                      >
                        <div className="mono text-[10px] uppercase tracking-wider text-chevron">
                          {k.label}
                        </div>
                        <div className="mt-1 text-lg font-semibold tracking-tight text-ink">
                          {k.value}
                        </div>
                        <div className="mono text-[10px] text-sub">{k.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* chart */}
                  <div className="mt-3 rounded-lg border border-line bg-white/[0.015] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="mono text-[10px] uppercase tracking-wider text-chevron">
                        tokens / run
                      </span>
                      <span className="mono text-[10px] text-sub">14 runs</span>
                    </div>
                    <div className="flex h-24 items-end gap-1">
                      {BARS.map((b, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-cursor/30 to-cursor/80"
                          style={{
                            height: `${b}%`,
                            animation: "rise 0.9s var(--ease-out-expo) both",
                            animationDelay: `${i * 45}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* models + tools */}
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-line bg-white/[0.015] p-3">
                      <div className="mono mb-2 text-[10px] uppercase tracking-wider text-chevron">
                        $ / resolved task
                      </div>
                      <div className="space-y-2">
                        {MODELS.map((m) => (
                          <div key={m.name}>
                            <div className="flex items-center justify-between">
                              <span className="mono text-[11px] text-ink">{m.name}</span>
                              <span className="mono text-[11px] text-sub">{m.cost}</span>
                            </div>
                            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-cursor/70"
                                style={{ width: `${m.w}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-line bg-white/[0.015] p-3">
                      <div className="mono mb-2 text-[10px] uppercase tracking-wider text-chevron">
                        tool leaderboard
                      </div>
                      <div className="space-y-1.5">
                        {TOOLS.map((t) => (
                          <div
                            key={t.name}
                            className="flex items-center justify-between border-b border-line/60 pb-1 last:border-0"
                          >
                            <span className="mono text-[11px] text-ink">{t.name}</span>
                            <span className="mono text-[11px] text-sub">
                              {t.calls} · <span className="text-chevron">{t.p50}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
