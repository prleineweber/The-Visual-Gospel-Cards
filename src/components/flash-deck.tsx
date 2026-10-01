import { useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { BOOK, CARDS, LAYERS, TRANSLATION, type GospelCard } from "@/lib/gospel";
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
  const moved = useRef(false);
  const direction = useRef<1 | -1>(1);
  const scroller = useRef<HTMLDivElement>(null);
  const current = LAYERS[layer];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "IFRAME") return;
      if (event.key === "ArrowRight") {
        direction.current = 1;
        nextLayer();
      }
      if (event.key === "ArrowLeft") {
        direction.current = -1;
        prevLayer();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        direction.current = 1;
        nextDay();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        direction.current = -1;
        prevDay();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextDay, nextLayer, prevDay, prevLayer]);

  if (!card || !current) return null;

  function goNext() {
    direction.current = 1;
    if (layer >= LAYERS.length - 1) nextDay();
    else nextLayer();
  }

  function goPrev() {
    direction.current = -1;
    if (layer <= 0) prevDay();
    else prevLayer();
  }

  function onTouchStart(event: TouchEvent) {
    const point = event.changedTouches[0];
    touch.current = { x: point.clientX, y: point.clientY, t: Date.now() };
    moved.current = false;
  }

  function onTouchEnd(event: TouchEvent) {
    if (!touch.current) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    const dt = Date.now() - touch.current.t;
    touch.current = null;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX > 10 || absY > 10) moved.current = true;
    if (dt > 700) return;
    if (absX < 40 && absY < 40) return;

    const node = scroller.current;
    const canScroll =
      layer !== 0 &&
      !!node &&
      node.scrollHeight > node.clientHeight + 8;

    if (absY > absX && absY > 56) {
      if (canScroll) return;
      if (dy < 0) {
        direction.current = 1;
        nextDay();
      } else {
        direction.current = -1;
        prevDay();
      }
      return;
    }
    if (absX > 48) {
      if (dx > 0) goNext();
      else goPrev();
    }
  }

  function onCardClick(event: MouseEvent) {
    if (moved.current) {
      moved.current = false;
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("button, a")) return;
    goNext();
  }

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col px-4 pt-3">
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
        <p className="text-xs text-fg-muted tabular-nums">{known.length} known</p>
      </header>

      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-border)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onCardClick}
      >
        <div
          key={`${card.id}-${layer}`}
          ref={scroller}
          className={cn(
            "min-h-0 flex-1 overflow-y-auto",
            direction.current === 1 ? "slide-next" : "slide-prev",
          )}
        >
          <CardFace card={card} layerId={current.id} onNextDay={nextDay} />
        </div>
        <div className="flex items-center justify-center gap-1.5 border-t border-border px-3 py-3">
          {LAYERS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={index === layer}
              onClick={() => {
                direction.current = index >= layer ? 1 : -1;
                setLayer(index);
              }}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-200",
                index === layer ? "w-5 bg-accent" : "w-2 bg-bg-subtle hover:bg-border-strong",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 mb-2 flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={goPrev} aria-label="Previous">
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
        <Button variant="outline" size="icon" onClick={goNext} aria-label="Next">
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

function CardFace({
  card,
  layerId,
  onNextDay,
}: {
  card: GospelCard;
  layerId: (typeof LAYERS)[number]["id"];
  onNextDay: () => void;
}) {
  if (layerId === "image") {
    return (
      <div className="relative flex h-full min-h-[52dvh] items-center justify-center bg-white">
        <img
          src={card.image}
          alt={card.imageAlt}
          draggable={false}
          className="card-art h-full max-h-[70dvh] w-full object-contain"
        />
        <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center">
          <span className="rounded-full bg-bg/90 px-3 py-1 text-xs tracking-wide text-fg-muted">
            Swipe right for the word
          </span>
        </p>
      </div>
    );
  }

  return (
    <article className="px-5 py-5">
      <p className="text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
        {LAYERS.find((item) => item.id === layerId)?.label}
      </p>
      {layerId === "word" ? (
        <>
          <h2 className="mt-2 font-display text-5xl leading-none text-fg">{card.word}</h2>
          <p className="mt-6 text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
            Definition
          </p>
          <p className="mt-2 text-base leading-relaxed text-fg">{card.definition}</p>
        </>
      ) : null}
      {layerId === "verse" ? (
        <div className="mt-2">
          <p className="font-display text-xl text-fg">{card.verse.ref}</p>
          <p className="mt-3 font-display text-lg leading-relaxed text-fg">{card.verse.text}</p>
          <p className="mt-3 text-xs text-fg-subtle">{TRANSLATION}</p>
        </div>
      ) : null}
      {layerId === "response" ? (
        <p className="mt-2 text-base leading-relaxed text-fg">{card.gospelResponse}</p>
      ) : null}
      {layerId === "questions" ? (
        <ol className="mt-3 list-decimal space-y-4 pl-5 text-base leading-relaxed text-fg">
          {card.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      ) : null}
      {layerId === "prayer" ? (
        <>
          <p className="mt-2 whitespace-pre-line font-display text-base leading-relaxed text-fg">
            {card.prayer}
          </p>
          <button
            type="button"
            onClick={onNextDay}
            className="mt-6 text-sm font-medium tracking-wide text-fg-muted uppercase hover:text-fg"
          >
            Next day
          </button>
        </>
      ) : null}
    </article>
  );
}
