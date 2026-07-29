# stella-website

The one-page marketing site for **[Stella](https://github.com/macanderson/stella)** — the
completely free, open-source autonomous software delivery system with built-in proof
verification.

Built as a fully installable **PWA** with Next.js 16, React 19, and Tailwind CSS v4. Deep-space
theme, emulated terminal animations, an animated starfield, a mock `stella observe` Observatory,
and pixel-perfect inline brand SVGs — all on the shipped `›stella▮` brand system.

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
    Hero.tsx / ProofSection.tsx / CapabilitiesGrid.tsx
    ObserveSection.tsx / EmbedSection.tsx / VideoSection.tsx
    GetStartedSection.tsx / Footer.tsx / Nav.tsx
    StellaMark.tsx          # inline glyph + wordmark
    icons.tsx               # bespoke line icons
public/
  manifest.webmanifest, sw.js, icons, og cards, brand assets
```

Every product claim on the page is grounded in the Stella repository docs (v0.6.2): the
deterministic fail→pass verification ladder, the independent witness author, replayable receipts,
`npx skills` search, LLM-drafted skills, Context Graph Protocol conformance, the loopback
Observatory, `stella-core` / `stella-serve` embedding, and text-to-video media generation.

## License

Site code: MIT. Brand assets (logos, wordmark, icons, OG cards, colors) © Oxagen — used under the
Stella brand kit. Stella itself is licensed AGPL-3.0-only.
