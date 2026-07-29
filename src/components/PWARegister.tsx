"use client";

import { useEffect, useState } from "react";
import { IconArrow } from "./icons";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<unknown> };

/** Registers the service worker and surfaces a soft "install app" chip. */
export function PWARegister() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const onLoad = () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* SW is a progressive enhancement; ignore failures */
        });
      };
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!deferred || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[300px] animate-rise rounded-xl border border-line-2 bg-panel/95 p-3 shadow-2xl backdrop-blur-xl">
      <div className="mono text-xs text-sub">Install Stella as an app</div>
      <p className="mt-1 text-sm text-ink">
        Add this page to your dock for offline access.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            await deferred.prompt();
            setDeferred(null);
          }}
          className="btn-primary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm"
        >
          Install <IconArrow className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-md px-2 py-1.5 text-sm text-sub hover:text-ink"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
