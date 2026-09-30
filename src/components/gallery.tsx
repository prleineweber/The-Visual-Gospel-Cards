import { Link } from "@tanstack/react-router";
import { Check, Printer } from "lucide-react";
import { CARDS } from "@/lib/gospel";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Gallery() {
  const openDay = useAppStore((s) => s.openDay);
  const known = useAppStore((s) => s.known);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-3 pb-4">
      <header className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
            30 days
          </p>
          <h1 className="font-display text-3xl leading-tight text-fg">
            The visual gospel
          </h1>
        </div>
        <Link
          to="/guide"
          className="inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm text-fg-muted hover:text-fg"
        >
          <Printer className="size-4" />
          Print / PDF
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CARDS.map((card) => {
          const isKnown = known.includes(card.day);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => openDay(card.day)}
              className="group overflow-hidden rounded-lg bg-bg-elevated text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.98]"
            >
              <div className="relative aspect-card overflow-hidden bg-bg-elevated">
                <img
                  src={card.image}
                  alt=""
                  className="card-art h-full w-full object-contain"
                />
                <span
                  className={cn(
                    "absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
                    isKnown ? "bg-accent text-accent-fg" : "bg-bg/80 text-fg",
                  )}
                >
                  {card.day}
                </span>
                {isKnown ? (
                  <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <Check className="size-3.5" />
                  </span>
                ) : null}
              </div>
              <div className="px-3 py-2.5">
                <p className="truncate font-display text-base leading-snug text-fg">
                  {card.word}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
