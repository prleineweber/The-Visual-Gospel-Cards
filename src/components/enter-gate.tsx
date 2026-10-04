import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BOOK } from "@/lib/gospel";

const KEY = "vg-entered";

export function EnterGate({ children }: { children: ReactNode }) {
  const [gate, setGate] = useState<"splash" | "app">("splash");

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setGate("app");
  }, []);

  function enter() {
    sessionStorage.setItem(KEY, "1");
    setGate("app");
  }

  if (gate === "splash") {
    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-bg px-6 py-10 text-center">
        <button type="button" onClick={enter} className="w-full max-w-sm">
          <img
            src="/cover.jpg"
            alt={`${BOOK.title} by ${BOOK.author}`}
            className="w-full rounded-sm shadow-[var(--shadow-border)]"
          />
          <p className="mt-6 text-sm font-medium tracking-[0.22em] text-fg-muted uppercase">
            Click or tap to enter
          </p>
        </button>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
          A free 30-day companion to {BOOK.title} by {BOOK.author}.
        </p>
        <Link
          to="/guide"
          className="mt-2 text-sm font-medium text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
        >
          Read all 30 days
        </Link>
      </div>
    );
  }

  return children;
}
