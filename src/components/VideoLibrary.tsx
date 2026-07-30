"use client";

import { useState } from "react";
import { CLIPS, RECORDER_COMMAND, type Clip } from "@/lib/videos";
import { Reveal } from "./Reveal";

/**
 * The example-videos library. Real asciinema recordings of Stella working,
 * rendered to timelapse video. The list on the left drives one player.
 */
export function VideoLibrary() {
  const [active, setActive] = useState(0);
  if (CLIPS.length === 0) return null;
  const clip = CLIPS[active] ?? CLIPS[0];

  return (
    <section id="videos" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="chip text-gold">Watch it work</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Real sessions. Real terminals. No cuts.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub">
            Every clip is an unedited terminal recording of an actual Stella run, captured with
            asciinema and replayed as a timelapse. Nothing is staged.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <Player clip={clip} />

            {/* clip list */}
            <div className="flex flex-col gap-2">
              {CLIPS.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={`group rounded-xl border p-3.5 text-left transition-colors ${
                      on
                        ? "border-volt/50 bg-volt/[0.07]"
                        : "border-line bg-white/[0.015] hover:border-line-2 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`text-sm font-medium leading-snug ${
                          on ? "text-ink" : "text-ink/85"
                        }`}
                      >
                        {c.title}
                      </span>
                      <span className="mono shrink-0 pt-0.5 text-[10px] text-chevron">
                        {c.runtime}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-sub">{c.blurb}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className={`mono rounded px-1.5 py-0.5 text-[10px] ${
                            on ? "bg-volt/15 text-volt-bright" : "bg-white/[0.04] text-chevron"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mono mt-6 text-xs leading-relaxed text-chevron">
            Recorded with Stella&apos;s own tool — asciinema in, timelapse out:{" "}
            <code className="text-sub">{RECORDER_COMMAND}</code>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Player({ clip }: { clip: Clip }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line-2 bg-[#070a11]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mono ml-3 truncate text-[11px] text-sub">{clip.title}</span>
        <span className="mono ml-auto shrink-0 text-[10px] text-chevron">
          {clip.realTime} → {clip.runtime}
        </span>
      </div>

      {/*
        The recording. The aspect ratio is pinned to the recorder's output
        (100×30 cols/rows renders to 978×694) so the box is reserved before
        any metadata loads — a bare <video> reports 300×150 until then, which
        would jump the page on first paint and again on every clip swap.
      */}
      <div className="relative aspect-[978/694] w-full bg-black">
        {clip.mp4 ? (
          <video
            key={clip.mp4}
            className="absolute inset-0 block h-full w-full"
            src={clip.mp4}
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={clip.gif}
            src={clip.gif}
            alt={clip.title}
            className="absolute inset-0 block h-full w-full object-contain"
          />
        )}
      </div>

      {/* the command that produced it, and the line that proves the claim */}
      <figcaption className="border-t border-line px-4 py-3">
        <code className="mono block overflow-x-auto whitespace-nowrap text-[12px] text-sub [scrollbar-width:none]">
          <span className="text-gold">$</span> {clip.command}
        </code>
        {/* Two lines are reserved so a shorter money-line on another clip
            cannot shrink the caption and shift the page on swap. */}
        <p className="mono mt-2 flex min-h-[2.25rem] items-start gap-2 text-[11px] leading-relaxed text-volt-bright">
          {clip.moneyLine && (
            <>
              <span aria-hidden>✓</span>
              <span className="min-w-0">{clip.moneyLine}</span>
            </>
          )}
        </p>
      </figcaption>
    </figure>
  );
}
