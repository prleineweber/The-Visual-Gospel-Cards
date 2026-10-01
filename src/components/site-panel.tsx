import { ExternalLink } from "lucide-react";
import { BOOK } from "@/lib/gospel";

export function SitePanel() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-3 pb-4">
      <header className="mb-4">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          The book
        </p>
        <h1 className="font-display text-3xl leading-tight text-fg">
          Visual Gospel
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-muted">
          A 30-day devotional exploring the good news of Jesus, by {BOOK.author}.
        </p>
      </header>

      <article className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <img
          src="/book-desk.jpg"
          alt="The Visual Gospel paperback on a desk beside a pencil, flowers, and a glass of juice"
          className="aspect-[4/5] w-full object-cover object-center sm:aspect-[16/10]"
        />
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl text-fg">{BOOK.title}</p>
            <p className="text-sm text-fg-muted">{BOOK.author}</p>
          </div>
          <a
            href={BOOK.buy}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg hover:opacity-90"
          >
            Buy devotional
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </article>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.16em] text-fg-muted uppercase">
          visualgospelbook.com
        </p>
        <a
          href={BOOK.site}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
        >
          Open site
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <div className="mt-2 min-h-[70vh] flex-1 overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <iframe
          title="Visual Gospel website"
          src={BOOK.site}
          className="h-[70vh] w-full bg-white"
        />
      </div>
    </section>
  );
}
