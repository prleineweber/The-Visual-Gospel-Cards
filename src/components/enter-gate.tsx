import { useEffect, useState, type ReactNode } from "react";
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
      <button
        type="button"
        onClick={enter}
        className="flex min-h-dvh w-full flex-col items-center justify-center bg-bg px-6 py-10 text-center"
      >
        <img
          src="/cover.jpg"
          alt={`${BOOK.title} by ${BOOK.author}`}
          className="w-full max-w-sm rounded-sm shadow-[var(--shadow-border)]"
        />
        <p className="mt-6 text-sm font-medium tracking-[0.22em] text-fg-muted uppercase">
          Click or tap to enter
        </p>
      </button>
    );
  }

  return children;
}
