"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "./icons";

export function CopyButton({ value, label = "Copy command" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable or blocked — fall back to a transient textarea.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing further to try */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-edge-control p-1.5 text-text-secondary hover:border-text-secondary hover:text-text"
    >
      {copied ? (
        <IconCheck className="h-4 w-4" aria-hidden />
      ) : (
        <IconCopy className="h-4 w-4" aria-hidden />
      )}
      {/* The visible label is an icon, so the state change has to be announced. */}
      <span className="sr-only">{label}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
