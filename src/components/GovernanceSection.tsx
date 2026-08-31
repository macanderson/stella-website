import { SITE } from "@/lib/site";

/**
 * Where the engine ends and a control plane begins.
 *
 * This section exists because of Oxagen ADR-040
 * (`docs/adr/ADR-040-governance-plane-refocus.md` in macanderson/oxagen) and
 * the VISION.md amendment it carries: governance is a plane that governs any
 * agent, and Stella is an engine it governs. ADR-040 § Decision 4 is also why
 * the two tiers below are separated rather than summed — gateway-enforced
 * controls are enforcement, attested evidence is attestation, and the ADR
 * requires that they never be sold as the same thing.
 *
 * Verified against macanderson/stella at v0.9.299:
 *   the seam       docs/spec/enterprise-authority-telemetry.md:11-23 (§ Purpose)
 *   enforced tier  crates/stella-serve/README.md:1-17 — no ambient authority;
 *                  `RemoteProvider`/`RemoteToolExecutor` park on the host's
 *                  answer; `STELLA_SERVE_TOOLS` accepts only `remote`; the
 *                  crate does not depend on `stella-store`
 *   attested tier  crates/stella-store/src/enterprise_telemetry.rs:1-8 (closed
 *                  content-free schema over a finalized rollup)
 *                  crates/stella-store/src/content_free.rs:1-32 (the two
 *                  halves of the egress guard: column allowlist + sentinel
 *                  harness) · docs/spec/…-telemetry.md:41-44 (rules 8 and 9)
 *   the default    crates/stella-cli/src/enterprise_telemetry.rs:1-6 (community
 *                  construction returns before a spool path or an HTTP client;
 *                  what an enrolled deployment must supply)
 *                  README.md:25-31 · docs/spec/…-telemetry.md:27-29 (rule 1)
 *
 * Do not merge the two tiers into one claim. If a control cannot deny, this
 * page says it cannot deny.
 */
const TIERS = [
  {
    label: "Enforced by the host",
    heading: "stella-serve",
    body: [
      <>
        A host — Oxagen&apos;s platform, or your own — can drive the engine headless. The host
        assembles the turn, the engine orchestrates it, and every governed side effect, model
        completions and tool calls alike, is remoted back over a wire protocol.
      </>,
      <>
        The engine holds no ambient authority. Its provider and tool ports are satisfied by emitting
        a request frame and parking on the host&apos;s answer, so every effect re-enters the
        host&apos;s own governance before it happens. A local tool surface is not a configuration
        option: <code className="mono text-text">STELLA_SERVE_TOOLS</code> accepts only{" "}
        <code className="mono text-text">remote</code>, and any other value is refused at startup
        rather than ignored. Persistence is the host&apos;s too — the crate takes no dependency on
        the local store.
      </>,
    ],
    verdict: "This tier can deny a call before it happens.",
    link: { href: SITE.serve, label: "stella-serve" },
  },
  {
    label: "Attested by the engine",
    heading: "enrolled export",
    body: [
      <>
        An enrolled deployment exports a content-free operational record projected from a finalized
        local execution rollup. Prompts, paths, tool arguments and results, reasoning, errors, git
        state, memories, rules and local identifiers have no representable field in that schema.
      </>,
      <>
        Two checks keep it that way, and both fail the build rather than the audit. A reviewed column
        allowlist is compared against the live table, so adding a column does not compile until a
        human has answered &ldquo;is this content?&rdquo;. A sentinel harness stamps every
        content-bearing source field, serialises through every registered encoder, and reports a
        violation if a sentinel reaches the wire or an unreviewed key appears.
      </>,
    ],
    verdict:
      "This tier can prove what was reported, and show a gap. It cannot prevent one.",
    link: { href: `${SITE.docs}/telemetry`, label: "telemetry documentation" },
  },
] as const;

export function GovernanceSection() {
  return (
    <section id="governance" className="section" aria-labelledby="governance-h">
      <div className="wrap">
        <div className="prose-block">
          <p className="eyebrow">Governance</p>
          <h2 id="governance-h" className="measure">Where the engine ends.</h2>
          <p>
            Stella is a local-first, provider-neutral execution engine. Principal identity, tenant
            policy, approval, lineage, audit and retention belong to a control plane above it. The
            seam is deliberate, and it is the same seam whether the plane above is Oxagen&apos;s or
            your own.
          </p>
          <p>
            Which side of it a control sits on decides what that control can actually do, so the two
            are kept apart here rather than added together.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.heading}>
              <h3 className="mono text-2xs uppercase tracking-[0.12em] text-text-tertiary">
                {t.label}
              </h3>
              <p className="mono mt-3 text-sm text-brand-bright">{t.heading}</p>
              <div className="mt-4 space-y-4">
                {t.body.map((p, i) => (
                  <p key={i} className="text-sm text-text-secondary">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mono mt-5 text-xs text-text-tertiary">{t.verdict}</p>
              <a
                href={t.link.href}
                target="_blank"
                rel="noreferrer"
                className="link mono mt-4 inline-block text-xs"
              >
                {t.link.label}
              </a>
            </div>
          ))}
        </div>

        <div className="prose-block mt-20 border-t border-hairline pt-16">
          <h3 className="measure">A default install is on neither tier.</h3>
          <p>
            Community and default construction returns before a spool path is resolved or an HTTP
            client is built: there is nothing to turn off. An install becomes enrolled only through a
            signed managed document, a pinned verification-secret environment reference, an exact
            HTTPS endpoint allowlist and a bearer-token environment reference — all in the
            org-managed settings scope, which lives outside the repository on purpose.
          </p>
          <p>
            That last part is the rule the rest rests on: repository content is evidence, never
            authority. A checkout you have not trusted cannot enable tools, replace privileged
            prompts, register executable custom tools, approve spend, approve scope, or configure
            telemetry. Lower-precedence settings may narrow what a session may do. They never widen
            it.
          </p>
        </div>
      </div>
    </section>
  );
}
