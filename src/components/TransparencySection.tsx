import { Reveal } from "./Reveal";
import { IconReceipt, IconProof, IconGraph } from "./icons";
import { SITE } from "@/lib/site";

/**
 * The anti-black-box story, told as three named mechanisms:
 * inspect (see the exact context) → witness (proof you can't fake) →
 * CGP (an open protocol instead of a private pipe).
 */
export function TransparencySection() {
  return (
    <section id="transparency" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="chip text-volt-bright">Not a black box</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Every other agent asks you to trust it.
            <br />
            <span className="text-volt">Stella hands you the receipts.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-sub">
            Three mechanisms, all shipped, all local. They are the reason you can run this thing
            autonomously and still know what happened.
          </p>
        </Reveal>

        {/* 1 — inspect */}
        <Reveal delay={0.06}>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Numbered n="01" icon={<IconReceipt className="h-5 w-5" />} label="stella inspect" />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Replay the exact prompt a model was sent.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">
                Every model call records a <span className="text-ink">receipt</span> — the ordered
                list of context blocks it sent.{" "}
                <code className="mono text-ink">stella inspect</code> rebuilds the precise message
                array, system prompt included, from the receipts written at the time — then
                re-checks it against the digests taken at emission. If a byte moved, you&apos;ll
                know.
              </p>
              <p className="mono mt-4 text-xs text-chevron">
                fully offline · needs no API key · never writes
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-line-2 bg-[#070a11]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="mono text-[11px] text-sub">stella inspect</span>
                <span className="mono ml-auto text-[10px] text-chevron">
                  reconstructed from receipts
                </span>
              </div>
              <pre className="mono overflow-x-auto p-4 text-[12px] leading-relaxed">
                <code>
                  <span className="text-gold">$</span>{" "}
                  <span className="text-ink">stella inspect</span>
                  {"\n\n"}
                  <span className="text-chevron"># the message array, exactly as sent</span>
                  {"\n"}
                  <span className="text-volt-bright">[0]</span>{" "}
                  <span className="text-sub">system</span>{" "}
                  <span className="text-ink">prompt-prefix</span>{" "}
                  <span className="text-chevron">4,182 tok · cached</span>
                  {"\n"}
                  <span className="text-volt-bright">[1]</span>{" "}
                  <span className="text-sub">system</span>{" "}
                  <span className="text-ink">AGENTS.md steering</span>{" "}
                  <span className="text-chevron">918 tok</span>
                  {"\n"}
                  <span className="text-volt-bright">[2]</span>{" "}
                  <span className="text-sub">recall</span>{" "}
                  <span className="text-ink">code-graph · 6 cites</span>{" "}
                  <span className="text-chevron">1,204 tok</span>
                  {"\n"}
                  <span className="text-volt-bright">[3]</span>{" "}
                  <span className="text-sub">user</span>{" "}
                  <span className="text-ink">&quot;add rate limiting…&quot;</span>
                  {"\n"}
                  <span className="text-chevron">…</span>
                  {"\n\n"}
                  <span className="text-gold">✓</span>{" "}
                  <span className="text-ink">12 blocks · digests match</span>
                  {"\n"}
                  <span className="text-gold">✓</span>{" "}
                  <span className="text-ink">sha256:9f2c…a71</span>{" "}
                  <span className="text-chevron">verified</span>
                </code>
              </pre>
            </div>
          </div>
        </Reveal>

        {/* 2 — witness */}
        <Reveal delay={0.06}>
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                <FlipCard
                  label="shadow worktree @ git HEAD"
                  verdict="RED"
                  line="test_login_rate_limit … FAILED"
                  detail="the code before the change"
                />
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="mono rotate-90 text-xl text-volt sm:rotate-0">→</span>
                    <span className="mono text-[9px] uppercase tracking-widest text-chevron">
                      flip
                    </span>
                  </div>
                </div>
                <FlipCard
                  label="the change"
                  verdict="GREEN"
                  line="test_login_rate_limit … ok"
                  detail="same test, same command"
                  good
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Numbered n="02" icon={<IconProof className="h-5 w-5" />} label="witness protocol" />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Proof the agent can&apos;t fake.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">
                A green test suite proves nothing — it might have always been green. So an{" "}
                <span className="text-ink">independent witness</span> writes the failing test from
                a pristine snapshot, <span className="text-ink">tamper-excluded</span> from the code
                under change and never shown the implementation. The test must fail at{" "}
                <code className="mono text-ink">HEAD</code> and pass on the change. Only that{" "}
                <span className="text-ink">fail→pass flip</span> counts.
              </p>
              <p className="mono mt-4 text-xs text-chevron">
                the thing proving the work is never the thing doing the work
              </p>
            </div>
          </div>
        </Reveal>

        {/* 3 — CGP */}
        <Reveal delay={0.06}>
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Numbered
                n="03"
                icon={<IconGraph className="h-5 w-5" />}
                label="context graph protocol"
              />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                An open protocol, not a private pipe.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">
                How context gets recalled is usually the most closed part of an agent. Stella
                routes it through <span className="text-ink">CGP</span> — a versioned, open wire
                protocol. Any source (a wiki, an issue tracker, a vector store) plugs in under the
                same budget, scoring, and citation rules as the built-ins.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">
                &quot;Conformant&quot; isn&apos;t marketing — it&apos;s{" "}
                <span className="text-ink">green on the public conformance suite</span>, checked at
                CI time, and providers are run through it before they&apos;re admitted. Stella is
                the reference host.
              </p>
              <a
                href={SITE.cgp}
                target="_blank"
                rel="noreferrer"
                className="mono mt-5 inline-flex items-center gap-1.5 text-xs text-volt-bright hover:underline"
              >
                contextgraph/1.0-draft →
              </a>
            </div>

            <div className="rounded-xl border border-line-2 bg-[#070a11] p-5">
              <div className="mono mb-4 text-[10px] uppercase tracking-widest text-chevron">
                admission gate
              </div>
              <div className="space-y-2.5">
                {[
                  ["code-graph", "built-in", true],
                  ["your wiki", "external", true],
                  ["issue tracker", "external", true],
                  ["vector store", "external", true],
                  ["unverified source", "rejected", false],
                ].map(([name, kind, ok]) => (
                  <div
                    key={name as string}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                      ok
                        ? "border-line bg-white/[0.02]"
                        : "border-line/60 bg-white/[0.01] opacity-55"
                    }`}
                  >
                    <span className={`mono text-xs ${ok ? "text-gold" : "text-chevron"}`}>
                      {ok ? "✓" : "✕"}
                    </span>
                    <span className={`mono flex-1 text-xs ${ok ? "text-ink" : "text-sub"}`}>
                      {name as string}
                    </span>
                    <span className="mono text-[10px] text-chevron">{kind as string}</span>
                  </div>
                ))}
              </div>
              <p className="mono mt-4 text-[10px] leading-relaxed text-chevron">
                conformance suite runs before a provider is registered — integration failures
                surface in CI, not in production
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Numbered({
  n,
  icon,
  label,
}: {
  n: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono text-xs text-chevron">{n}</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-volt/35 bg-volt/[0.08] text-volt-bright">
        {icon}
      </span>
      <span className="mono text-xs uppercase tracking-[0.14em] text-sub">{label}</span>
    </div>
  );
}

function FlipCard({
  label,
  verdict,
  line,
  detail,
  good,
}: {
  label: string;
  verdict: string;
  line: string;
  detail: string;
  good?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-[#070a11] p-4 ${
        good ? "border-volt/40" : "border-line-2"
      }`}
    >
      {good && <div className="sweep pointer-events-none absolute inset-0 opacity-50" />}
      <div className="flex items-center justify-between gap-2">
        <span className="mono truncate text-[10px] text-sub">{label}</span>
        <span
          className={`mono shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider ${
            good ? "bg-volt/20 text-volt-bright" : "bg-white/[0.06] text-sub"
          }`}
        >
          {verdict}
        </span>
      </div>
      <p className={`mono mt-4 text-[13px] ${good ? "text-ink" : "text-sub"}`}>
        <span className={good ? "text-gold" : "text-[#ff6b57]"}>{good ? "✓" : "✗"}</span> {line}
      </p>
      <p className="mono mt-1 text-[10px] text-chevron">{detail}</p>
    </div>
  );
}
