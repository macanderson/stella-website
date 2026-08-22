"use client";

import { useState } from "react";
import { CLIPS, RECORDER_COMMAND } from "@/lib/videos";

/**
 * Terminal recordings, click to play.
 *
 * Nothing about the video is fetched until the visitor asks for it:
 * `preload="none"` and no `src` on the element until first play. Three
 * autoplaying clips would otherwise cost about 2.4 MB on a page whose whole
 * point is that it does not spend your resources without telling you.
 *
 * The player box holds the recorder's own aspect ratio (100x30 cells renders
 * to 978x694), so it is reserved before any metadata loads and the page does
 * not shift on first play or on a clip swap.
 */
export function Recordings() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const clip = CLIPS[active];

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <section id="recordings" className="section" aria-labelledby="recordings-h">
      <div className="wrap">
        <div className="prose-block">
          <p className="eyebrow">Recordings</p>
          <h2 id="recordings-h" className="measure">Watch a run instead of reading about one.</h2>
          <p>
            Each clip is a terminal session captured with asciinema and rendered with agg, then sped
            up to a target length. The real duration is printed next to the rendered one.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <figure className="panel overflow-hidden">
            <div className="relative aspect-[978/694] w-full bg-void">
              {playing ? (
                <video
                  key={clip.src}
                  className="absolute inset-0 block h-full w-full"
                  src={clip.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="none"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-secondary hover:text-text"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-edge-control">
                    <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                  <span className="mono text-xs">
                    Play — {clip.realTime} of work, {clip.runtime} of video
                  </span>
                </button>
              )}
            </div>

            <figcaption className="border-t border-hairline px-4 py-3">
              <code className="mono block overflow-x-auto whitespace-nowrap text-xs text-text-secondary [scrollbar-width:none]">
                $ {clip.command}
              </code>
              <p className="mono mt-2 min-h-[2.5rem] text-2xs leading-relaxed text-text-tertiary">
                {clip.moneyLine}
              </p>
            </figcaption>
          </figure>

          <ul className="flex flex-col gap-2">
            {CLIPS.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={on ? "true" : undefined}
                    className={`w-full rounded-md border p-4 text-left ${
                      on
                        ? "border-edge-control bg-surface"
                        : "border-hairline hover:border-edge-control"
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className={`text-sm ${on ? "text-text" : "text-text-secondary"}`}>
                        {c.title}
                      </span>
                      <span className="mono shrink-0 text-2xs text-text-tertiary">{c.runtime}</span>
                    </span>
                    <span className="mt-2 block text-xs leading-relaxed text-text-tertiary">
                      {c.blurb}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mono mt-8 text-xs text-text-tertiary">
          Recorded with{" "}
          <code className="text-text-secondary">{RECORDER_COMMAND}</code>
        </p>
      </div>
    </section>
  );
}
