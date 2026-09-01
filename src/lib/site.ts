// Single source of truth for copy that repeats across the page.
//
// Every value below is verified against macanderson/stella at v0.9.299:
//   version      Cargo.toml:48 (`[workspace.package] version = "0.9.299"`)
//   license      Cargo.toml:51 (`license = "AGPL-3.0-only"`), LICENSING.md:3
//   url          Cargo.toml:53 (`homepage`)
//   docs         README.md:21 — docs are served under /docs on the same host
//   install      README.md:78-85 — prebuilt binary
//   brewInstall  README.md:87-92 — Homebrew
//   cargoInstall README.md:94-98 — requires --git; `publish = false` at
//                Cargo.toml:54 keeps the crates off crates.io (README.md:108)
//   providers    stella-cli/src/config/providers.rs:93 `PROVIDERS` — nine
//                hosted rows, plus the `local` row at :278 that fronts any
//                OpenAI-compatible server
//   cgp          LICENSING.md:102-112 — separate project, MIT OR Apache-2.0
//   serve        crates/stella-serve/README.md:1-17 — the headless sidecar a
//                governing host drives; ADR-033 Option B
//
// The engine/control-plane split this page is written around is Oxagen
// ADR-040 (`docs/adr/ADR-040-governance-plane-refocus.md` in macanderson/oxagen)
// and the VISION.md amendment it carries: Oxagen is a governance plane for any
// agent, and Stella is an engine it governs — not a platform of its own. The
// product-side statement of the same seam is
// `docs/spec/enterprise-authority-telemetry.md` § Purpose.

export const SITE = {
  name: "Stella",
  version: "0.9.299",
  license: "AGPL-3.0-only",
  /** Hosted model providers selectable by id. Plus any local OpenAI-compatible server. */
  providerCount: 9,
  url: "https://stella.oxagen.sh",
  install: "curl -fsSL https://raw.githubusercontent.com/macanderson/stella/main/install.sh | sh",
  brewInstall: "brew install macanderson/tap/stella",
  cargoInstall: "cargo install --locked --git https://github.com/macanderson/stella stella-cli",
  repo: "https://github.com/macanderson/stella",
  docs: "https://stella.oxagen.sh/docs",
  licensing: "https://github.com/macanderson/stella/blob/main/LICENSING.md",
  cgp: "https://github.com/macanderson/context-graph-protocol",
  serve: "https://github.com/macanderson/stella/blob/main/crates/stella-serve/README.md",
  description:
    "Stella is a terminal coding agent written in Rust. It records a receipt for every model call, so you can replay the exact context a call was sent and check it against the digests taken at emission. The engine is local-first; governance is a separate plane, and it is opt-in.",
} as const;
