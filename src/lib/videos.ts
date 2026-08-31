// Terminal recordings of real Stella runs.
//
// Captured with `scripts/record-demo.sh` in macanderson/stella: asciinema
// records the session to an asciicast file, `agg` renders it, and playback
// speed is computed from the real duration to hit a target length
// (scripts/record-demo.sh:15, :30-35, :66).
//
// `moneyLine` is a line that appears in the recording itself, so the claim is
// checkable by pressing play. Do not add a line here that is not on screen.
//
// A recording is a historical capture, not a spec. When a mechanism moves, the
// prose on the page moves first and the clip has to be re-recorded or dropped —
// a clip that demonstrates a code path the current binary no longer takes is a
// claim, and it fails the same accuracy rule as a sentence would. The blurbs
// below are therefore written to what is on screen, and describe no host
// behaviour the recording does not itself show.

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
  /** A line from the recording that carries what the clip demonstrates. */
  moneyLine: string;
  src: string;
};

export const CLIPS: Clip[] = [
  {
    slug: "witness-protocol",
    title: "The witness protocol, end to end",
    blurb:
      "A pricing bug that ignores item quantity. The verification oracle writes the failing test, it fails on the old code, and the fix flips it green.",
    command:
      'stella run "total_cents ignores item quantity — it must multiply price by qty. Fix the bug." --keep-witness',
    realTime: "84s",
    runtime: "26s",
    moneyLine:
      "verify (deterministic): flip oracle: fail→pass of `cargo test --test total_cents_quantity …`",
    src: "/videos/witness-protocol.mp4",
  },
  {
    slug: "inspect-receipts",
    title: "stella inspect, over a previous run",
    blurb:
      "Recorded model calls from the run before. Drill into one and get the message array it was sent, re-checked against the digests taken at emission.",
    command: "stella inspect · stella inspect 2 --step 1",
    realTime: "7s",
    runtime: "6s",
    moneyLine: "verified: every journal-resolved block re-hashed to its recorded digest",
    src: "/videos/inspect-receipts.mp4",
  },
  {
    slug: "build-and-test",
    title: "A change, planned and verified in one turn",
    blurb:
      "Index the code graph, plan, rewrite slugify() to produce real URL slugs, then write and run its tests. Cost and latency are printed per step.",
    command: 'stella run "Make slugify() produce real URL slugs…" --test-command "cargo test"',
    realTime: "86s",
    runtime: "26s",
    moneyLine: "every step priced in the transcript",
    src: "/videos/build-and-test.mp4",
  },
];

export const RECORDER_COMMAND =
  'scripts/record-demo.sh -n my-demo --target 60 -- stella run "<prompt>"';
