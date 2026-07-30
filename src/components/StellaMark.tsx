/* Inline Stella marks, geometry taken from docs/brand and fixed.
   Ink uses currentColor; the block cursor is gold (`cur`, #F5C145 on dark
   ground) per docs/brand/BRAND.md § Logo. Do not alter the paths, the
   viewBox, or the cursor rect — only the surrounding layout changes. */

const S_PATH =
  "M30.5 1.2Q22.8 1.2 17.6 -1.25Q12.4 -3.7 9.65 -7.75Q6.9 -11.8 6.4 -16.8L19.8 -17.4Q20.7 -14.1 23.2 -12.15Q25.7 -10.2 30.6 -10.2Q35.3 -10.2 37.5 -11.3Q39.7 -12.4 39.7 -14.6Q39.7 -16.2 38.9 -17.15Q38.1 -18.1 35.9 -18.95Q33.7 -19.8 29.3 -20.6Q21.2 -22.3 16.45 -24.45Q11.7 -26.6 9.65 -29.85Q7.6 -33.1 7.6 -38.0Q7.6 -42.6 10.0 -46.4Q12.4 -50.2 17.3 -52.5Q22.2 -54.8 29.6 -54.8Q37.6 -54.8 42.55 -52.2Q47.5 -49.6 50.0 -45.5Q52.5 -41.4 53.2 -36.8L39.7 -36.2Q39.3 -38.4 38.0 -40.0Q36.7 -41.6 34.6 -42.5Q32.5 -43.4 29.6 -43.4Q25.3 -43.4 23.4 -41.75Q21.5 -40.1 21.5 -38.0Q21.5 -36.1 22.5 -34.9Q23.5 -33.7 26.15 -32.8Q28.8 -31.9 33.6 -30.9Q41.4 -29.4 45.7 -27.35Q50.0 -25.3 51.8 -22.35Q53.6 -19.4 53.6 -14.9Q53.6 -9.9 50.85 -6.3Q48.1 -2.7 42.95 -0.75Q37.8 1.2 30.5 1.2Z";

type Props = { className?: string; title?: string };

/** The `s` glyph + block cursor. */
export function StellaGlyph({ className, title = "Stella" }: Props) {
  return (
    <svg
      viewBox="-2.6 -80 141.6 90.2"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      <path d={S_PATH} fill="currentColor" />
      <rect x="74" y="-71" width="56" height="71" rx="3.4" fill="var(--color-gold)" />
    </svg>
  );
}
