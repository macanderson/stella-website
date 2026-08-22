import { CopyButton } from "./CopyButton";

export function InstallBlock({
  command,
  note,
  label,
  accent = false,
}: {
  command: string;
  note?: string;
  /** Accessible name for the copy control when several blocks share a page. */
  label?: string;
  /**
   * Tints the shell sigil gold. Gold is identity, not decoration, so exactly
   * one block per page sets this — the hero's. Everywhere else the sigil is
   * tertiary and gold appears only on the mark.
   */
  accent?: boolean;
}) {
  return (
    // `min-w-0` here is load-bearing, not defensive. The command below is
    // `whitespace-nowrap`, and a grid or flex item's default `min-width: auto`
    // refuses to shrink below its own content — so the install section's grid
    // track grew to the width of the longest command (734px) and scrolled the
    // whole page sideways on a 390px phone. The `overflow-x-auto` on the <code>
    // can only do its job once an ancestor is allowed to be narrower than the
    // text it contains.
    <div className="min-w-0">
      <div className="panel flex items-center gap-3 px-3 py-2.5">
        <span
          className={`mono select-none ${accent ? "text-gold" : "text-text-tertiary"}`}
          aria-hidden
        >
          $
        </span>
        <code className="mono min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[13px] [scrollbar-width:none]">
          {command}
        </code>
        <CopyButton value={command} label={label ? `Copy ${label} command` : "Copy command"} />
      </div>
      {note && <p className="mt-2 max-w-[66ch] text-xs text-text-tertiary">{note}</p>}
    </div>
  );
}
