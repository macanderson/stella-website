"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

type Line = {
  tag?: string;
  tone?: "run" | "ok" | "muted" | "cmd";
  text: string;
  // rendered as key: value with tag column
};

const COMMAND = 'stella run "add rate limiting to /login and prove it works"';

const LINES: Line[] = [
  { tag: "triage", tone: "run", text: "classified · feature · 1 route · tests required" },
  { tag: "plan", tone: "run", text: "4 steps · limiter → middleware → config → witness" },
  { tag: "witness", tone: "muted", text: "drafting an independent failing test (tamper-excluded)…" },
  { tag: "witness", tone: "ok", text: "test_login_rate_limit  →  RED at git HEAD · evidence pinned" },
  { tag: "execute", tone: "run", text: "src/middleware/rate_limit.rs      +38  −2" },
  { tag: "execute", tone: "run", text: "src/routes/login.rs               +6   −1" },
  { tag: "verify", tone: "muted", text: "replaying the witness on a shadow worktree @ HEAD…" },
  { tag: "verify", tone: "ok", text: "RED → GREEN · fail→pass flip confirmed (deterministic)" },
  { tag: "judge", tone: "run", text: "evidence = DeterministicPass · submitting" },
  { tag: "receipt", tone: "ok", text: "sha256:9f2c…a71 · 12 context blocks · replayable" },
  { tag: "done", tone: "ok", text: "branch stella/login-rate-limit → PR #128 opened" },
];

function toneClass(tone?: Line["tone"]) {
  switch (tone) {
    case "ok":
      return "text-ink";
    case "muted":
      return "text-sub";
    case "run":
      return "text-ink/85";
    default:
      return "text-ink";
  }
}

export function Terminal() {
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(COMMAND.length);
      setShown(LINES.length);
      setDone(true);
      return;
    }

    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    const run = () => {
      // reset
      setTyped(0);
      setShown(0);
      setDone(false);
      let clock = 500;

      // type the command
      for (let i = 1; i <= COMMAND.length; i++) {
        push(() => setTyped(i), clock);
        clock += 26 + (COMMAND[i - 1] === " " ? 24 : 0);
      }
      clock += 380;

      // reveal output lines with cadence that mimics real work
      LINES.forEach((l, idx) => {
        const gap = l.tone === "muted" ? 620 : l.tag === "execute" ? 340 : 460;
        clock += gap;
        push(() => setShown(idx + 1), clock);
      });

      clock += 700;
      push(() => setDone(true), clock);
      // loop
      clock += 5200;
      push(run, clock);
    };

    run();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const cmd = COMMAND.slice(0, typed);

  return (
    <div className="relative">
      <div className="halo absolute inset-0" />
      <div className="relative overflow-hidden rounded-xl border border-line-2 bg-[#070a11]/92 shadow-[0_40px_120px_-40px_rgba(46,123,255,0.4)] backdrop-blur-sm">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="mono ml-3 text-xs text-sub">stella — zsh — 96×28</span>
          <span className="mono ml-auto hidden text-[10px] text-chevron sm:inline">
            v{SITE.version}
          </span>
        </div>

        {/*
          Body — LAYOUT-STABLE BY CONSTRUCTION.

          Every element is always in the flow at its final size; the animation
          only ever changes `opacity` (and `transform`, which is also
          layout-free). Nothing is conditionally mounted, so the terminal's
          height is constant from first paint and never jumps — including when
          the demo loops back to the start.
        */}
        <div className="mono px-4 py-4 text-[13px] leading-relaxed sm:px-5 sm:text-sm">
          {/* prompt line — the whole command is always present so the wrap
              point (and therefore the line count) never changes; the untyped
              tail is simply transparent. */}
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-cursor">›</span>
            <span className="text-sub">~/acme/api</span>
            <span className="whitespace-pre-wrap break-words text-ink">
              {cmd}
              <span className="cursor-block" />
              <span className="opacity-0" aria-hidden>
                {COMMAND.slice(typed)}
              </span>
            </span>
          </div>

          {/* output */}
          <div className="mt-3 space-y-[3px]">
            {LINES.map((l, i) => {
              const ok = l.tone === "ok";
              const visible = i < shown;
              return (
                <div
                  key={i}
                  className="flex items-start gap-2.5 transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(6px)",
                  }}
                  aria-hidden={!visible}
                >
                  <span
                    className={
                      ok
                        ? "mt-[3px] shrink-0 text-gold"
                        : l.tone === "muted"
                          ? "mt-[3px] shrink-0 text-chevron"
                          : "mt-[3px] shrink-0 text-volt-bright"
                    }
                    aria-hidden
                  >
                    {ok ? "✓" : l.tone === "muted" ? "…" : "●"}
                  </span>
                  <span className="w-[68px] shrink-0 text-sub">{l.tag}</span>
                  <span className={`min-w-0 flex-1 break-words ${toneClass(l.tone)}`}>
                    {l.text}
                  </span>
                </div>
              );
            })}

            <div
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-volt/30 bg-volt/[0.07] px-3 py-2 transition-opacity duration-500"
              style={{ opacity: done ? 1 : 0 }}
              aria-hidden={!done}
            >
              <span className="mono text-xs text-volt-bright">◆ stella inspect</span>
              <span className="mono text-xs text-sub">
                replay every step above from its receipt — digest-verified.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
