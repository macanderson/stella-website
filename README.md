# stella-website

The one-page marketing site for **[Stella](https://github.com/macanderson/stella)**, a terminal
coding agent written in Rust.

Next.js 16 (App Router, fully static), React 19, Tailwind CSS v4. Electric blue and gold on deep
space, on the `›stella▮` brand geometry.

## Design rules

These are the constraints the page is held to. Changing one is a design decision, not a tweak.

1. **One signature motion.** The gold block cursor of the mark blinks. Nothing else animates.
   `prefers-reduced-motion` stops even that.
2. **Gold is identity, never status,** and appears at most twice in a viewport: the mark, and the
   `$` sigil on an install block. Blue is the interactive signal — links, focus, primary action.
3. **Structure is carried by space and type scale,** not by gradients, glows, shadows, backdrops,
   or borders. The scales live in `globals.css` and every gap on the page is one of them.
4. **No decoration that carries no information.** If an element does not tell the reader something,
   it does not ship.
5. **Every colour pair is computed, not eyeballed.** Body text is 6.9:1 or better; the lowest
   contrast anywhere is the tertiary annotation at 4.9:1.

## Brand tokens

Token names and values in `src/app/globals.css` are normative from
[`docs/brand/BRAND.md`](https://github.com/macanderson/stella/blob/main/docs/brand/BRAND.md) in the
product repo. Do not rename or re-value a token here without changing it there first.

One token is local: `--color-edge-control` (`#5A6780`). BRAND's `hairline` and `hairline-strong`
measure 1.2:1 and 1.5:1 on `void` and are documented there as decorative, so neither can bound an
interactive control under WCAG 1.4.11. This is the one value chosen for that job (3.5:1 on void).

## Develop

```bash
pnpm install --frozen-lockfile
pnpm dev          # http://localhost:3500
pnpm build
pnpm typecheck
```

## Structure

```
src/
  app/
    layout.tsx              # metadata, OG, JSON-LD, fonts
    page.tsx                # section composition
    globals.css             # brand tokens, type scale, rhythm, controls
    sitemap.ts robots.ts    # generated from SITE.url
  components/
    Nav.tsx                 # server component; no scroll listener
    Hero.tsx                # what it is, where it ends, how to install it
    MechanismsSection.tsx   # inspect · verification plugins · CGP
    Recordings.tsx          # recorded sessions, click to play
    GovernanceSection.tsx   # the engine/control-plane seam, and its two tiers
    SwitchingSection.tsx    # what carries over, and what is missing
    InstallSection.tsx      # install, licence, telemetry
    Footer.tsx StellaMark.tsx InstallBlock.tsx CopyButton.tsx icons.tsx
  lib/
    site.ts                 # copy constants, each annotated with its source
    videos.ts               # the recordings registry
public/
  manifest.webmanifest, icons, og card, brand assets, videos/
```

Only `Recordings.tsx` and `CopyButton.tsx` are client components. Everything else renders on the
server.

## The recordings

Each clip in `public/videos/` is a terminal recording of a Stella run, captured with
`scripts/record-demo.sh` in the product repo: asciinema records, `agg` renders, and playback speed
is computed from the real duration to hit a target length.

```bash
scripts/record-demo.sh -n my-demo --target 60 -- stella run "<prompt>"
```

To add one: record it, drop `<slug>.mp4` in `public/videos/`, and add a row to `src/lib/videos.ts`.
`moneyLine` must be a line that appears **on screen in that recording**, so a reader can check it by
pressing play. Nothing loads until they do — the player carries `preload="none"` and gets no `src`
until first click.

## Positioning

The page is written around Oxagen **ADR-040** (`docs/adr/ADR-040-governance-plane-refocus.md` in
macanderson/oxagen) and the `docs/VISION.md` amendment it carries: Oxagen is a governance plane for
*any* agent, and Stella is an engine that plane governs — not a platform of its own. On this site
that means two things, and neither is decoration:

- **The seam is stated, not implied.** Stella is an execution engine; identity, policy, approval,
  lineage, audit and retention live above it. `GovernanceSection.tsx` is that seam, and the hero
  names it in its second paragraph.
- **Enforcement and attestation are never summed.** ADR-040 § Decision 4 requires that a control
  which can only observe is never sold as one that can prevent. So the governance section keeps the
  two tiers in separate columns with a separate verdict line each, and `MechanismsSection.tsx`
  names who vouches for every record — the engine, or something the engine is only relaying. If a
  control cannot deny, this site says it cannot deny.

The product-side statement of the same split is `docs/spec/enterprise-authority-telemetry.md`
§ Purpose in macanderson/stella.

## Accuracy

Every product claim is traceable to macanderson/stella at **v0.9.299**, and the trace is recorded in
a comment above the copy it supports (`src/lib/site.ts`, `MechanismsSection.tsx`,
`GovernanceSection.tsx`, `SwitchingSection.tsx`). Verify against code, not against the README.

Four rules for anyone editing copy:

- **No benchmark numbers, pass rates, leaderboard placements, or head-to-head comparisons.** The
  Terminal-Bench 2.1 run has not been executed: `bench/READINESS.md` freezes a system under test at
  v0.5.1 pending the paid run, and there is no `bench/evidence/` directory in the tree. Nothing on
  this site may imply otherwise.
- **Licensing and telemetry copy is legally load-bearing.** It mirrors `LICENSING.md` and
  `README.md § Telemetry`. Do not soften it, sharpen it, or summarise a condition away. If a
  statement cannot be traced, delete it rather than rephrase it.
- **State the gaps.** The switching section names what is not implemented (no IDE extension, no
  vim mode, no checkpoint/rewind, no `/compact` or `--continue`, not on crates.io, no Windows
  support). That honesty is the point of the section; do not trim it to balance the columns.
- **Name the author of every piece of evidence.** Verification-plugin results are the plugin's own
  report — Stella evaluates the declared rule against them and does not re-run the oracle — while
  the tamper finding is the host's and has no field on the wire a plugin speaks. Copy that blurs
  those two fails ADR-040 § Decision 4 even when every individual word is true.

## License

Site code: MIT. Brand assets (logos, wordmark, icons, OG card, colours) © Oxagen, Inc. — used under
the Stella brand kit. Stella itself is dual-licensed: AGPL-3.0-only, or a commercial licence.
