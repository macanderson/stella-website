import { SITE } from "@/lib/site";

/**
 * The three mechanisms, each stated at the level the source supports.
 *
 * Every sentence here is traceable to macanderson/stella at v0.6.8:
 *   receipts  stella-core/src/receipts.rs:1-9 · stella-cli/src/inspect.rs:203
 *             README.md:339 (`inspect` command row)
 *   witness   stella-pipeline/src/witness.rs:1-22 · README.md:37-40
 *   CGP       stella-context/src/provider.rs:9-13
 *             stella-cli/src/contextgraph/tests.rs:888 · LICENSING.md:104-112
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
        records and re-hashes every block against the digest taken at emission. A mismatch is
        reported as tampering or a torn journal, not silently repaired.
      </>,
    ],
    footnote: "Reads the local journal. No API key, no network, no writes.",
  },
  {
    n: "02",
    name: "witness protocol",
    heading: "A test that failed before the change, and passes after it.",
    body: [
      <>
        <code className="mono text-text">verify_done</code> replays your new test files against the
        previous code in a shadow worktree at <code className="mono text-text">git HEAD</code>. The
        test must fail there and pass on the change. A green suite on its own is not accepted as
        evidence.
      </>,
      <>
        When no test command is configured, a separate model authors the witness test — the judge&apos;s
        role, not the worker&apos;s. That role can call only{" "}
        <code className="mono text-text">create_witness_test</code>: no general write, edit, process,
        or network tool is registered for it.
      </>,
      <>
        Integrity comes from tamper exclusion rather than secrecy. The witness file is visible to the
        worker, but its bytes, type, mode, link count, and path are snapshotted; if any of them
        differ at verify time the candidate hard-fails, and a model judge cannot override that.
      </>,
    ],
    footnote: "The role that proves the work is not the role that does it.",
  },
  {
    n: "03",
    name: "context graph protocol",
    heading: "Context recall runs over a published protocol.",
    body: [
      <>
        Recall is served through the Context Graph Protocol at schema version{" "}
        <code className="mono text-text">contextgraph/1.0-draft</code>. Stella is its reference host.
      </>,
      <>
        Third-party stdio and HTTP sources register on that host gated on two things: the protocol&apos;s
        conformance suite, and egress consent. CGP is a separate project under{" "}
        <code className="mono text-text">MIT OR Apache-2.0</code>, so depending on it does not put
        your project under the AGPL.
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
            Each one is a shipped code path with a name you can grep for. Each is described below at
            the level the implementation supports.
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
