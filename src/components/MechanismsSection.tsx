import { SITE } from "@/lib/site";

/**
 * The three mechanisms, each stated at the level the source supports — and
 * each naming who vouches for what it produces.
 *
 * That last clause is ADR-040's honesty rule applied at the mechanism level:
 * an engine's records are evidence, and evidence is only worth what its
 * author is worth. Where Stella observes something itself, this section says
 * so; where a plugin reports it, this section says that instead. Nothing here
 * claims prevention on the strength of observation.
 *
 * Every sentence is traceable to macanderson/stella at v0.9.299:
 *   receipts   stella-core/src/receipts.rs:1-9 (content-free by construction)
 *              stella-cli/src/inspect.rs:1-11 (reads only, no API key)
 *              stella-cli/src/inspect.rs:19-33 (what "verified" means, and
 *              what a mismatch does and does not say) · README.md:331
 *   pipeline   README.md:39-44 (opt-in, self-reported, Vera not shipped)
 *              stella-plugin/src/consent.rs:715-760 (`oracle_self_report` —
 *              the install prompt's own wording)
 *              stella-plugin/src/observed.rs:1-37 (the host owns tamper;
 *              `ObservedEvidence` has no tamper field on the wire)
 *              stella-plugin/src/evidence.rs:1-35 (flip policy and checks)
 *   CGP        stella-context/src/provider.rs:1-17
 *              stella-cli/src/contextgraph/tests.rs:1003-1018 (the pinned
 *              wire version is conformance-verified) · Cargo.toml:74-77
 *              (pinned to the released `=0.1.2` crates) · LICENSING.md:102-112
 */
const MECHANISMS = [
  {
    n: "01",
    name: "stella inspect",
    heading: "Replay the context a model call was sent.",
    body: [
      <>
        Each step emits one event per context block the model has not seen before, then a manifest
        naming the blocks it saw this step in wire order. Blocks carry a{" "}
        <code className="mono text-text">content_digest</code>, never the payload bytes.
      </>,
      <>
        <code className="mono text-text">stella inspect</code> rebuilds the message array from those
        records and re-hashes every block against the digest taken at emission. Two blocks — the
        system prefix and the assembled user/recall message — are stored as local bytes, so their
        check is tautological and is deliberately not counted as evidence. The banner reports both
        numbers rather than flattening them into one word.
      </>,
      <>
        A mismatch says the recovered bytes are not that block&rsquo;s. It does not say anyone
        altered anything: the ordinary cause is a compaction pass rewriting a tool result in place.
        The tool reports the discrepancy and declines to interpret it.
      </>,
    ],
    footnote: "Reads the local journal. No API key, no provider, no writes.",
  },
  {
    n: "02",
    name: "verification plugins",
    heading: "A test that failed before the change, and passes after it.",
    body: [
      <>
        <code className="mono text-text">stella run --pipeline &lt;plugin-id&gt;</code> hands the turn
        to an installed verification plugin. Its oracle authors a test that fails on the old code and
        passes on the new, and reports that flip. A green suite on its own is not credited, and
        Stella will not credit a requirement the report leaves undecided.
      </>,
      <>
        The evidence is the plugin&apos;s own. Stella evaluates the plugin&apos;s declared rule
        against what came back; it does not run the oracle and does not re-run what it reports. The
        install prompt says so in those words — it cannot tell an earned result from a typed one, so
        installing a plugin means trusting it to report honestly about its own work. Oxagen&apos;s
        Vera is the reference plugin; it is private and not shipped in this repository.
      </>,
      <>
        One finding is not the plugin&apos;s to give. The host snapshots the candidate worktree and
        owns the tamper comparison, and{" "}
        <code className="mono text-text">ObservedEvidence</code> — the wire type a plugin returns —
        carries no tamper field in any language. A plugin that sends one anyway is refused rather
        than believed.
      </>,
    ],
    footnote: "The plugin says what happened. The host says whether the artefacts were touched.",
  },
  {
    n: "03",
    name: "context graph protocol",
    heading: "Context recall runs over a published protocol.",
    body: [
      <>
        Recall is served through the Context Graph Protocol at wire version{" "}
        <code className="mono text-text">contextgraph/1.0-draft</code>, pinned to the released{" "}
        <code className="mono text-text">0.1.2</code> crates. A test fails the build if the pin moves
        off a version the conformance suite has been run against.
      </>,
      <>
        Third-party stdio and HTTP sources register on that host gated on two things: the
        protocol&apos;s conformance suite, and egress consent. CGP is a separate project under{" "}
        <code className="mono text-text">MIT OR Apache-2.0</code>, so depending on it does not put
        your project under the AGPL. Stella is the reference implementation, and that is where the
        reciprocity applies.
      </>,
    ],
    footnote: null,
    link: { href: SITE.cgp, label: "context-graph-protocol" },
  },
] as const;

export function MechanismsSection() {
  return (
    <section id="receipts" className="section" aria-labelledby="receipts-h">
      <div className="wrap">
        <div className="prose-block">
          <p className="eyebrow">How it works</p>
          <h2 id="receipts-h" className="measure">Three mechanisms, not three adjectives.</h2>
          <p>
            Each one is a shipped code path with a name you can grep for, and each leaves a record
            that outlives the run. Each also names who vouches for that record — the engine, or
            something the engine is only relaying.
          </p>
        </div>

        <ol className="mt-16 space-y-16">
          {MECHANISMS.map((m) => (
            <li key={m.n} className="grid gap-x-12 gap-y-4 md:grid-cols-[10rem_1fr]">
              <div className="md:pt-1">
                <p className="mono text-2xs text-text-tertiary">{m.n}</p>
                <p className="mono mt-1 text-sm text-brand-bright">{m.name}</p>
              </div>

              <div>
                <h3 className="measure">{m.heading}</h3>
                <div className="mt-4 space-y-4">
                  {m.body.map((p, i) => (
                    <p key={i} className="measure text-text-secondary">
                      {p}
                    </p>
                  ))}
                </div>
                {m.footnote && (
                  <p className="mono mt-5 text-xs text-text-tertiary">{m.footnote}</p>
                )}
                {"link" in m && m.link && (
                  <a
                    href={m.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link mono mt-5 inline-block text-xs"
                  >
                    {m.link.label}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
