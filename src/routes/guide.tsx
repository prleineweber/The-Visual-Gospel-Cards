import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { BOOK, CARDS, TRANSLATION } from "@/lib/gospel";
import { getSiteOrigin } from "@/lib/seo.functions";
import { GUIDE_DESCRIPTION, GUIDE_TITLE, guideJsonLd, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/guide")({
  loader: () => getSiteOrigin(),
  head: ({ loaderData }) => {
    const origin = loaderData || "";
    return {
      meta: [
        { title: GUIDE_TITLE },
        { name: "description", content: GUIDE_DESCRIPTION },
        { property: "og:title", content: GUIDE_TITLE },
        { property: "og:description", content: GUIDE_DESCRIPTION },
        { name: "twitter:title", content: GUIDE_TITLE },
        { name: "twitter:description", content: GUIDE_DESCRIPTION },
        ...(origin ? [{ property: "og:url", content: `${origin}/guide` }] : []),
      ],
      links: origin ? [{ rel: "canonical", href: `${origin}/guide` }] : [],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd(guideJsonLd(origin)),
        },
      ],
    };
  },
  component: Guide,
});

function Guide() {
  return (
    <div className="min-h-dvh bg-bg text-fg print:bg-white print:text-stone-900">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 print:hidden">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Back to cards
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
        >
          <Printer className="size-4" />
          Save as PDF
        </button>
      </header>

      <article className="mx-auto max-w-3xl px-4 pb-16">
        <p className="text-xs tracking-[0.18em] text-fg-muted uppercase print:text-stone-500">
          Companion to the book
        </p>
        <h1 className="mt-1 font-display text-4xl leading-tight">{BOOK.title}</h1>
        <p className="mt-1 font-display text-lg text-fg-muted">{BOOK.author}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted print:text-stone-600">
          One image a day. See the word, sit with the key verse ({TRANSLATION}),
          then walk through the definition, reflection questions, gospel
          response, and prayer. Scripture quotations are from the ESV® Bible.
        </p>
        <nav aria-label="Days" className="mt-6 flex flex-wrap gap-2 print:hidden">
          {CARDS.map((card) => (
            <a
              key={card.id}
              href={`#day-${card.day}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-fg-muted hover:text-fg"
            >
              {card.day}. {card.word}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-10">
          {CARDS.map((card) => (
            <section
              key={card.id}
              id={`day-${card.day}`}
              className="break-inside-avoid scroll-mt-6 border-t border-border pt-6 print:border-stone-200"
            >
              <p className="text-xs font-medium tracking-wide text-fg-muted uppercase print:text-stone-500">
                Day {card.day}
              </p>
              <h2 className="font-display text-3xl">{card.word}</h2>
              <img
                src={card.image}
                alt={card.imageAlt}
                className="card-art mt-4 aspect-card w-full max-w-sm object-contain"
              />
              <p className="mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase">
                Key verse · {card.verse.ref}
              </p>
              <p className="font-display text-lg leading-relaxed">
                {card.verse.text}
              </p>
              <p className="mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase">
                Definition
              </p>
              <p className="leading-relaxed">{card.definition}</p>
              <p className="mt-3 leading-relaxed">
                <span className="font-medium">Memory Verse:</span> {card.verse.ref}
              </p>
              <p className="mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase">
                Reflection questions
              </p>
              <ol className="mt-1 list-decimal space-y-2 pl-5 leading-relaxed">
                {card.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
              <p className="mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase">
                Gospel response
              </p>
              <p className="leading-relaxed">{card.gospelResponse}</p>
              <p className="mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase">
                Prayer
              </p>
              <p className="whitespace-pre-line font-display leading-relaxed">
                {card.prayer}
              </p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
