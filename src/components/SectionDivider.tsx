/** A faint constellation hairline between sections. */
export function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-5" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-line-2" />
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute h-2 w-2 rounded-full bg-volt/80 shadow-[0_0_10px_2px_rgba(46,123,255,0.6)]" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-line-2" />
    </div>
  );
}
