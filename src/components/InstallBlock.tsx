import { CopyButton } from "./CopyButton";

export function InstallBlock({
  command,
  note,
}: {
  command: string;
  note?: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 rounded-lg border border-line-2 bg-[#0a0a0c]/80 px-3.5 py-3 backdrop-blur-sm">
        <span className="mono select-none text-cursor">$</span>
        <code className="mono min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[13px] text-ink [scrollbar-width:none]">
          {command}
        </code>
        <CopyButton value={command} />
      </div>
      {note && <p className="mt-2 text-xs text-sub">{note}</p>}
    </div>
  );
}
