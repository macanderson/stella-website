import { Reveal } from "./Reveal";
import { IconVideo } from "./icons";

export function VideoSection() {
  return (
    <section id="video" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* render frame */}
          <Reveal>
            <div className="relative">
              <div className="halo absolute inset-0" />
              <div className="relative overflow-hidden rounded-xl border border-line-2 bg-[#0a0a0c]/90 shadow-2xl">
                {/* filmstrip top */}
                <div className="flex items-center gap-1 border-b border-line bg-void/60 px-2 py-1.5">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span key={i} className="h-2 w-2.5 rounded-[2px] bg-white/[0.06]" />
                  ))}
                </div>

                {/* scene */}
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 30% 20%, rgba(255,138,61,0.35), transparent 55%), radial-gradient(120% 90% at 80% 80%, rgba(255,75,42,0.4), transparent 55%), linear-gradient(160deg, #12060b, #05060a)",
                    }}
                  />
                  <div className="absolute inset-0 dotgrid opacity-30" />
                  {/* orbiting body */}
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
                    <div className="spin-slow absolute inset-0">
                      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-ember shadow-[0_0_16px_4px_rgba(255,138,61,0.7)]" />
                    </div>
                    <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cursor to-[#7a1f12] shadow-[0_0_60px_-10px_rgba(255,75,42,0.9)]" />
                  </div>

                  {/* play button */}
                  <button
                    type="button"
                    aria-label="Preview"
                    className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-transform hover:scale-105"
                  >
                    <span className="ml-1 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
                  </button>

                  {/* caption */}
                  <div className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
                    <span className="mono text-[11px] text-white/80">
                      rendered by stella · generate_video
                    </span>
                  </div>
                </div>

                {/* scrubber */}
                <div className="border-t border-line px-3 py-2.5">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/5 rounded-full bg-cursor" />
                  </div>
                  <div className="mono mt-1.5 flex justify-between text-[10px] text-chevron">
                    <span>00:02</span>
                    <span>cogvideox · 6s · 720p</span>
                    <span>00:06</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={0.08}>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cursor/40 bg-cursor/[0.06] text-cursor">
                <IconVideo className="h-5.5 w-5.5" />
              </div>
              <p className="chip mt-5 text-cursor">Yes, videos too</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A coding agent that can also direct a scene.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-sub">
                SVGs are always on. Add a media key and Stella can generate images and{" "}
                <span className="text-ink">real text-to-video</span> — straight from a run,
                behind your own provider. Because video costs real money, any job with a positive
                estimate is denied unless you confirm the spend. No surprise invoices.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {[
                  ["generate_svg", "diagrams & assets — always available, no key"],
                  ["generate_image", "cogview / gpt-image, BYOK"],
                  ["generate_video", "text → video via CogVideoX · cost-gated"],
                  ["poll_video", "async job, reconciled live"],
                ].map(([t, d]) => (
                  <li key={t} className="flex items-baseline gap-3">
                    <code className="mono w-32 shrink-0 text-cursor">{t}</code>
                    <span className="text-sub">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mono mt-6 text-xs text-chevron">
                artifacts land in .stella/artifacts/ · client-side · your key, your bill
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
