"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "./icons";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked — fall back to a transient textarea
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line-2 bg-white/[0.02] px-2.5 py-1.5 text-xs text-sub transition-colors hover:border-cursor/50 hover:text-ink"
    >
      {copied ? (
        <IconCheck className="h-3.5 w-3.5 text-cursor" />
      ) : (
        <IconCopy className="h-3.5 w-3.5" />
      )}
      {/* Fixed width so the label swap never reflows the row. */}
      <span className="mono w-[3.1rem] text-left">{copied ? "copied" : label}</span>
    </button>
  );
}
