import { useEffect, useRef, type TouchEvent } from "react";
import { Check, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { BOOK, CARDS, LAYERS, TRANSLATION } from "@/lib/gospel";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FlashDeck() {
  const day = useAppStore((s) => s.day);
  const layer = useAppStore((s) => s.layer);
  const known = useAppStore((s) => s.known);
  const nextLayer = useAppStore((s) => s.nextLayer);
  const prevLayer = useAppStore((s) => s.prevLayer);
  const nextDay = useAppStore((s) => s.nextDay);
  const prevDay = useAppStore((s) => s.prevDay);
  const setLayer = useAppStore((s) => s.setLayer);
  const markKnown = useAppStore((s) => s.markKnown);
  const card = CARDS[day - 1];
  const isKnown = known.includes(day);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const current = LAYERS[layer];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") nextLayer();
      if (event.key === "ArrowLeft") prevLayer();
      if (event.key === "ArrowUp") {
        event.preventDefault();
        nextDay();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        prevDay();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextDay, nextLayer, prevDay, prevLayer]);

  if (!card) return null;

  function onTouchStart(event: TouchEvent) {
    const point = event.changedTouches[0];
    touch.current = { x: point.clientX, y: point.clientY, t: Date.now() };
  }

  function onTouchEnd(event: TouchEvent) {
    if (!touch.current) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    const dt = Date.now() - touch.current.t;
    touch.current = null;
    if (dt > 700) return;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX < 40 && absY < 40) return;
    if (absY > absX && absY > 48) {
      if (dy < 0) nextDay();
      else prevDay();
      return;
    }
    if (absX > 48) {
      if (dx > 0) nextLayer();
      else prevLayer();
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-3">
      <header className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
            {BOOK.title}
          </p>
          <h1 className="font-display text-2xl leading-tight text-fg">
            Day {card.day}
            <span className="text-fg-muted"> / {CARDS.length}</span>
          </h1>
        </div>
        <p className="text-xs text-fg-muted tabular-nums">
          {known.length} known
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <button
          type="button"
          onClick={nextLayer}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative aspect-card w-full overflow-hidden rounded-lg bg-bg-elevated shadow-[var(--shadow-border)]"
          aria-label={
            layer === 0
              ? `Reveal the word for day ${card.day}`
              : `Next: ${LAYERS[Math.min(layer + 1, LAYERS.length - 1)].label}`
          }
        >
          <img
            src={card.image}
            alt={card.imageAlt}
            className="card-art h-full w-full object-contain"
          />
        </button>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          {LAYERS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={index === layer}
              onClick={() => setLayer(index)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-200",
                index === layer
                  ? "w-5 bg-accent"
                  : "w-2 bg-bg-subtle hover:bg-border-strong",
              )}
            />
          ))}
        </div>

        <div
          key={`${card.id}-${layer}`}
          className="rise-in mt-3 min-h-32 flex-1 overflow-y-auto rounded-lg bg-bg-elevated px-4 py-4 shadow-[var(--shadow-border)]"
        >
          <p className="text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
            {current.label}
          </p>
          {layer === 0 ? (
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Tap or swipe right for the word, verse, definition, gospel
              response, questions, and prayer.
            </p>
          ) : null}
          {layer === 1 ? (
            <h2 className="mt-1 font-display text-4xl leading-tight text-fg">
              {card.word}
            </h2>
          ) : null}
          {layer === 2 ? (
            <div className="mt-1">
              <p className="font-display text-xl text-fg">{card.verse.ref}</p>
              <p className="mt-2 font-display text-lg leading-relaxed text-fg">
                {card.verse.text}
              </p>
              <p className="mt-2 text-xs text-fg-subtle">{TRANSLATION}</p>
            </div>
          ) : null}
          {layer === 3 ? (
            <p className="mt-2 text-base leading-relaxed text-fg">
              {card.definition}
            </p>
          ) : null}
          {layer === 4 ? (
            <p className="mt-2 text-base leading-relaxed text-fg">
              {card.gospelResponse}
            </p>
          ) : null}
          {layer === 5 ? (
            <ol className="mt-2 list-decimal space-y-3 pl-5 text-base leading-relaxed text-fg">
              {card.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          ) : null}
          {layer === 6 ? (
            <p className="mt-2 whitespace-pre-line font-display text-base leading-relaxed text-fg">
              {card.prayer}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-3 mb-2 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevLayer}
          aria-label="Previous step"
          disabled={layer === 0}
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          variant={isKnown ? "primary" : "subtle"}
          className="flex-1"
          onClick={markKnown}
        >
          {isKnown ? <Check className="size-4" /> : null}
          {isKnown ? "Known" : "Mark known"}
        </Button>
        <Button variant="outline" size="icon" onClick={nextDay} aria-label="Next day">
          <ChevronUp className="size-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextLayer}
          aria-label="Next step"
          disabled={layer === LAYERS.length - 1}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <p className="mb-2 text-center text-xs text-fg-subtle">
        From {BOOK.title} · {BOOK.author}
      </p>
    </section>
  );
}
