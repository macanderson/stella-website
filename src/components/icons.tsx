/* Bespoke 24×24 line icons. Stroke = currentColor, 1.6 weight, round caps. */
import type { SVGProps } from "react";

function Base({ children, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      {children}
    </svg>
  );
}

/** Proof / deterministic verification — a shield with a fail→pass flip check. */
export const IconProof = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4.5" />
  </Base>
);

/** npx skills search — magnifier over stacked cards. */
export const IconSkills = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="4" width="12" height="8" rx="1.5" />
    <path d="M6 15.5h9M6 19h6" />
    <circle cx="17" cy="16.5" r="3.2" />
    <path d="m19.4 18.9 1.8 1.8" />
  </Base>
);

/** Natural-language creation — a wand drafting sparks. */
export const IconWand = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5 19 15 9" />
    <path d="M14 5.5 15 3l1 2.5L18.5 6.5 16 7.5 15 10l-1-2.5L11.5 6.5 14 5.5Z" />
    <path d="M19 12.5 19.7 14l1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7.7-1.5Z" />
  </Base>
);

/** Context Graph Protocol — connected nodes. */
export const IconGraph = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <circle cx="6" cy="7" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="17" cy="17" r="2.2" />
    <circle cx="7" cy="17.5" r="2.2" />
    <path d="M8 8.2 15.8 6.6M8.1 16.6l7-.9M6.4 9.1 6.8 15.3M8 7.7 16.4 15.2" />
  </Base>
);

/** stella observe — a dashboard with bars + pulse. */
export const IconObserve = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M6.5 16.5v-3M10 16.5V12M13.5 16.5v-2M17 16.5v-4" />
  </Base>
);

/** Scripting — terminal chevron. */
export const IconScript = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m7 10 2.5 2L7 14M12.5 14.5H16" />
  </Base>
);

/** Embed as engine — a chip / core. */
export const IconEngine = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10.5 11h3v3h-3zM12 3v3M12 18v3M3 12h3M18 12h3M7 5.5 8.5 7M15.5 7 17 5.5M7 18.5 8.5 17M15.5 17 17 18.5" />
  </Base>
);

/** Video generation — clapper / play. */
export const IconVideo = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="m10 9.5 5 2.5-5 2.5Z" />
  </Base>
);

/** Receipts / replay — layered ledger lines. */
export const IconReceipt = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M6 3h9l3 3v13.5l-2-1-2 1-2-1-2 1-2-1-2 1V3Z" />
    <path d="M9 8h6M9 11.5h6M9 15h3" />
  </Base>
);

export const IconCopy = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
  </Base>
);

export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m5 12.5 4 4L19 6.5" />
  </Base>
);

export const IconArrow = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconTerminal = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="m4 7 4 4-4 4M11 15h8" />
  </Base>
);

export const IconGitHub = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

export const IconLock = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Base>
);

export const IconBolt = (p: SVGProps<SVGSVGElement>) => (
  <Base {...p}>
    <path d="M13 3 5 13h6l-1 8 8-11h-6l1-7Z" />
  </Base>
);

export const IconChip = IconEngine;
