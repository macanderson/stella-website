// Single source of truth for copy that repeats across the page.
// Every claim here is grounded in the Stella repo docs (v0.6.2).

export const SITE = {
  name: "Stella",
  version: "0.6.2",
  tagline: "Autonomous software delivery that proves its own work.",
  description:
    "Stella is a completely free, open-source autonomous software delivery system. A single deterministic loop plans, edits, and ships — and every change carries proof it actually works.",
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

export const STATS = [
  { value: "$0", label: "to run, forever", sub: "open source, AGPL-3.0" },
  { value: "9+", label: "model providers", sub: "BYOK · plus any local server" },
  { value: "58", label: "native tools", sub: "46 always-on, up to 58" },
  { value: "0", label: "telemetry egress", sub: "everything stays local" },
] as const;
