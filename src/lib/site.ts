// Single source of truth for copy that repeats across the page.
// Every claim here is grounded in the Stella repo docs (v0.6.8).

export const SITE = {
  name: "Stella",
  version: "0.6.8",
  tagline: "Free. Configurable. Fast. Rust. And damn good.",
  description:
    "Stella is a free, open-source terminal coding agent written in Rust. It does everything you expect from a modern coding agent — and unlike the rest, it is not a black box: replay the exact context any model call received, get proof it cannot fake, and route context recall over an open protocol.",
  url: "https://stella.oxagen.sh",
  install: "curl -fsSL https://raw.githubusercontent.com/macanderson/stella/main/install.sh | sh",
  brewInstall: "brew install macanderson/tap/stella",
  cargoInstall:
    "cargo install --locked --git https://github.com/macanderson/stella stella-cli",
  repo: "https://github.com/macanderson/stella",
  docs: "https://stella-docs.oxagen.sh",
  cgp: "https://github.com/macanderson/context-graph-protocol",
  license: "AGPL-3.0-only",
} as const;
