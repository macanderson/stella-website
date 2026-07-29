import { Reveal } from "./Reveal";
import { IconReceipt } from "./icons";

const LADDER = [
  { k: "DeterministicPass", d: "fail→pass flip proven — submit fast", strong: true },
  { k: "JudgePass", d: "model judge confirms when inconclusive", strong: false },
  { k: "Unverified", d: "no evidence yet — keep working", strong: false },
  { k: "Failed", d: "clear failure — revise", strong: false },
];

export function ProofSection() {
  return (
    <section id="proof" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="chip text-cursor">Proof, not vibes</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A green checkmark isn&apos;t evidence.
            <br />
            <span className="text-ember">A fail→pass flip is.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-sub">
            Before Stella accepts a change, it replays your new test against the{" "}
            <span className="text-ink">previous</span> code in a shadow worktree pinned at{" "}
            <code className="mono text-ink">git HEAD</code>. The test must{" "}
            <span className="text-ink">fail there</span> and{" "}
            <span className="text-ink">pass on the change</span>. The transition itself is the
            proof — a passing suite alone is never enough.
          </p>
        </Reveal>

        {/* flip visual */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <FlipCard
              label="shadow worktree @ git HEAD"
              sub="the code before your change"
              verdict="RED"
              tone="red"
              line="test_login_rate_limit … FAILED"
              detail="429 never returned · limiter absent"
            />
            <div className="flex items-center justify-center md:px-2">
              <div className="flex flex-col items-center gap-2">
                <div className="mono rotate-90 text-2xl text-cursor md:rotate-0">→</div>
                <span className="mono text-[10px] uppercase tracking-widest text-chevron">
                  flip
                </span>
              </div>
            </div>
            <FlipCard
              label="your change"
              sub="same test, same command"
              verdict="GREEN"
              tone="green"
              line="test_login_rate_limit … ok"
              detail="429 after N requests · deterministic"
            />
          </div>
        </Reveal>

        {/* witness + ladder + receipts */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.05} className="lg:col-span-2">
            <div className="card h-full p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                No test? An independent witness writes one.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sub">
                When you don&apos;t hand Stella a test command, a separate{" "}
                <span className="text-ink">witness author</span> drafts the failing test from a
                pristine snapshot — <span className="text-ink">tamper-excluded</span> from the
                code under change, and it never sees the implementation. The flip can&apos;t be
                gamed because the thing proving the work isn&apos;t the thing doing the work.
              </p>
              <div className="mt-6">
                <p className="mono mb-3 text-[11px] uppercase tracking-widest text-chevron">
                  Evidence ladder
                </p>
                <ul className="space-y-2">
                  {LADDER.map((l, i) => (
                    <li key={l.k} className="flex items-center gap-3">
                      <span
                        className={`mono w-5 text-right text-xs ${
                          l.strong ? "text-cursor" : "text-chevron"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`mono rounded px-2 py-0.5 text-xs ${
                          l.strong
                            ? "bg-cursor/10 text-cursor ring-1 ring-cursor/30"
                            : "bg-white/[0.03] text-sub"
                        }`}
                      >
                        {l.k}
                      </span>
                      <span className="text-sm text-sub">{l.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card flex h-full flex-col p-6">
              <IconReceipt className="h-7 w-7 text-cursor" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Receipts you can replay
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sub">
                Every model call records a receipt — the exact ordered context blocks it was
                sent.{" "}
                <code className="mono text-ink">stella inspect</code> rebuilds the precise
                message array, system prompt included, and re-checks it against the digests
                taken at emission.
              </p>
              <div className="mt-4 rounded-lg border border-line bg-void/60 p-3">
                <p className="mono text-xs text-sub">
                  <span className="text-cursor">✓</span> sha256:9f2c…a71
                </p>
                <p className="mono mt-1 text-xs text-chevron">
                  12 blocks · digests match · 100% local
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  label,
  sub,
  verdict,
  tone,
  line,
  detail,
}: {
  label: string;
  sub: string;
  verdict: string;
  tone: "red" | "green";
  line: string;
  detail: string;
}) {
  const isGreen = tone === "green";
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-[#0a0a0c]/80 p-5 ${
        isGreen ? "border-cursor/30" : "border-line-2"
      }`}
    >
      {isGreen && <div className="sweep pointer-events-none absolute inset-0 opacity-60" />}
      <div className="flex items-center justify-between">
        <span className="mono text-[11px] text-sub">{label}</span>
        <span
          className={`mono rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider ${
            isGreen
              ? "bg-cursor/15 text-cursor"
              : "bg-chevron/20 text-sub"
          }`}
        >
          {verdict}
        </span>
      </div>
      <p className="mono mt-1 text-[10px] text-chevron">{sub}</p>
      <div className="mt-5 space-y-1.5">
        <p className={`mono text-sm ${isGreen ? "text-ink" : "text-sub"}`}>
          <span className={isGreen ? "text-cursor" : "text-[#ff6b57]"}>
            {isGreen ? "✓" : "✗"}
          </span>{" "}
          {line}
        </p>
        <p className="mono text-xs text-chevron">{detail}</p>
      </div>
    </div>
  );
}
