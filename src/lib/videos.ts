// The example-videos library. Every entry is a REAL terminal recording of a
// real Stella run, captured with `scripts/record-demo.sh` (asciinema → agg)
// and rendered as a timelapse. Nothing here is staged or re-enacted.
//
// Adding a clip: record it, drop <slug>.mp4 in public/videos/, add a row here.

export type Clip = {
  slug: string;
  title: string;
  /** One line on what the viewer is watching. */
  blurb: string;
  /** The command that was recorded, shown verbatim under the player. */
  command: string;
  /** Real wall-clock duration of the session, before the timelapse. */
  realTime: string;
  /** Rendered length of the clip. */
  runtime: string;
  /** The line from the run that proves what the clip claims. */
  moneyLine?: string;
  tags: string[];
  mp4?: string;
  gif?: string;
};

export const CLIPS: Clip[] = [
  {
    slug: "witness-protocol",
    title: "The witness protocol, start to finish",
    blurb:
      "A pricing bug that ignores item quantity. An independent witness writes the failing test, confirms it returns 650 instead of 1450 on the old code, then proves the fix flips it green.",
    command:
      'stella run "total_cents ignores item quantity — it must multiply price by qty. Fix the bug." --keep-witness',
    realTime: "84s real",
    runtime: "26s",
    moneyLine:
      "verify (deterministic): flip oracle: fail→pass of `cargo test --test total_cents_quantity …`",
    tags: ["witness", "flip oracle", "verify_done"],
    mp4: "/videos/witness-protocol.mp4",
  },
  {
    slug: "inspect-receipts",
    title: "stella inspect — replay what the model saw",
    blurb:
      "Twenty recorded model calls from the previous run. Drill into one and get the exact message array it was sent, re-checked against the digests taken at emission. No API key, nothing written.",
    command: "stella inspect · stella inspect 2 --step 1",
    realTime: "7s real",
    runtime: "6s",
    moneyLine: "verified: every journal-resolved block re-hashed to its recorded digest",
    tags: ["inspect", "receipts", "offline"],
    mp4: "/videos/inspect-receipts.mp4",
    gif: "/videos/inspect-receipts.gif",
  },
  {
    slug: "build-and-test",
    title: "A feature, built and tested in one turn",
    blurb:
      "Nineteen steps: index the code graph, plan, rewrite slugify() to produce real URL slugs, then write and run twelve tests. Cost and latency printed per step as it goes.",
    command:
      'stella run "Make slugify() produce real URL slugs…" --test-command "cargo test"',
    realTime: "86s real",
    runtime: "26s",
    moneyLine: "19 steps · 12 tests passing · $0.24 · every step priced in the transcript",
    tags: ["code graph", "task board", "cost receipts"],
    mp4: "/videos/build-and-test.mp4",
  },
];

export const RECORDER_COMMAND =
  'scripts/record-demo.sh -n my-demo --target 60 -- stella run "<prompt>"';
