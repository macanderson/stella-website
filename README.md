# stella-website

The one-page marketing site for **[Stella](https://github.com/macanderson/stella)** — a free,
open-source terminal coding agent written in Rust that shows you its work.

Built as a fully installable **PWA** with Next.js 16, React 19, and Tailwind CSS v4. Electric-blue
and gold on deep space, emulated terminal animations, an animated starfield, and a library of
**real recorded Stella sessions** — all on the `›stella▮` brand geometry.

Accent theme: electric blue `#2E7BFF` (primary) + gold `#F5C145` (secondary, and the block cursor
in the mark).

## Stack

- **Next.js 16** (App Router, static prerender) + **React 19**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Geist Sans / Geist Mono** (the brand typeface)
- **Motion** for progressive-enhancement scroll reveals
- **PWA**: web manifest, offline-first service worker, installable, maskable icons
- Zero external runtime dependencies — the starfield is a hand-rolled `<canvas>`, all icons and
  logos are inline SVG

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3500
```

## Build

```bash
pnpm build
pnpm start
```

## Structure

```
src/
  app/
    layout.tsx        # metadata, OG, PWA wiring, fonts
    page.tsx          # section composition
    globals.css       # brand tokens + design system
  components/
    StarfieldBackdrop.tsx   # animated deep-space canvas
    Terminal.tsx            # emulated `stella run` session
    Hero.tsx                # "Free. Configurable. Fast. Rust. And damn good."
    TransparencySection.tsx # inspect · witness protocol · CGP
    VideoLibrary.tsx        # real recorded sessions (see below)
    ParitySection.tsx       # what carries over from .claude/
    GetStartedSection.tsx / Footer.tsx / Nav.tsx
    StellaMark.tsx          # inline glyph + wordmark
    icons.tsx               # bespoke line icons
  lib/
    site.ts               # shared copy constants
    videos.ts             # the example-videos registry
public/
  manifest.webmanifest, sw.js, icons, og cards, brand assets
  videos/                 # recorded .mp4 clips
```

## The example-videos library

Every clip in `public/videos/` is an **unedited terminal recording of a real Stella run**, captured
with Stella's own recorder (asciinema → `agg` → ffmpeg) and rendered as a timelapse:

```bash
scripts/record-demo.sh -n my-demo --target 60 -- stella run "<prompt>"
```

To add one: record it, drop `<slug>.mp4` in `public/videos/`, and add a row to
`src/lib/videos.ts`. The `moneyLine` field is the line from the actual run that backs the clip's
claim — keep it verbatim.

## Accuracy

Every product claim on the page is grounded in the Stella repository (v0.6.8) and was verified
against the source before publishing: `stella inspect` and the receipts plane, the witness protocol
(independent author, tamper exclusion, the fail→pass flip oracle), and Context Graph Protocol
conformance at `contextgraph/1.0-draft`.

The parity section deliberately claims **"everything you already wrote still works"** — the
`.claude/{commands,skills,agents}` adoption that `stella init` performs — rather than blanket
feature parity, because several Claude Code features have no Stella equivalent today (no IDE
extension, no vim mode or configurable keybindings, no checkpoint/rewind, no `/compact` or
`--continue`, and `CLAUDE.md` is a `stella ingest` input rather than an auto-loaded file). Keep it
that way.

## License

Site code: MIT. Brand assets (logos, wordmark, icons, OG cards, colors) © Oxagen — used under the
Stella brand kit. Stella itself is licensed AGPL-3.0-only.
