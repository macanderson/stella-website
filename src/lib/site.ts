// Single source of truth for copy that repeats across the page.
//
// Every value below is verified against macanderson/stella at v0.6.8:
//   version      Cargo.toml:23 (`[workspace.package] version = "0.6.8"`)
//   license      Cargo.toml:25 (`license = "AGPL-3.0-only"`), LICENSING.md:7
//   url          Cargo.toml:28 (`homepage`)
//   docs         README.md:21 — docs are served under /docs on the same host
//   install      README.md "Install" § — prebuilt binary
//   brewInstall  README.md "Install" § — Homebrew
//   cargoInstall README.md "Install" § — requires --git, the crates are not
//                published to crates.io (README.md "Not on crates.io")
//   providers    stella-cli/src/config.rs:152 `PROVIDERS` — nine entries;
//                cross-checked by stella-model/src/catalog.rs:607
//   cgp          LICENSING.md:104 — separate project, MIT OR Apache-2.0

export const SITE = {
  name: "Stella",
  version: "0.6.8",
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
  description:
    "Stella is a terminal coding agent written in Rust. It records a receipt for every model call, so you can replay the exact context a call was sent and check it against the digests taken at emission.",
} as const;
