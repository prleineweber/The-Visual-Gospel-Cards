import { BOOK, CARDS } from "@/lib/gospel";

export const HOME_TITLE = "The Visual Gospel — 30-Day Devotional";
export const HOME_DESCRIPTION =
  "A free companion to Philip Leineweber's Visual Gospel. Thirty pencil studies with definitions, ESV memory verses, reflection questions, and prayers.";

export const GUIDE_TITLE = "All 30 Days — The Visual Gospel";
export const GUIDE_DESCRIPTION =
  "Read every day of The Visual Gospel by Philip Leineweber: the word, ESV key verse, definition, reflection questions, gospel response, and prayer.";

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function homeJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: BOOK.title,
        url: origin || undefined,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        description: HOME_DESCRIPTION,
        author: { "@type": "Person", name: BOOK.author },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      bookNode(),
    ],
  };
}

export function guideJsonLd(origin: string) {
  const page = origin ? `${origin}/guide` : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      bookNode(),
      {
        "@type": "ItemList",
        name: "The Visual Gospel — 30 days",
        url: page,
        numberOfItems: CARDS.length,
        itemListElement: CARDS.map((card) => ({
          "@type": "ListItem",
          position: card.day,
          name: card.word,
          description: card.definition,
          url: page ? `${page}#day-${card.day}` : undefined,
        })),
      },
    ],
  };
}

function bookNode() {
  return {
    "@type": "Book",
    name: BOOK.title,
    author: { "@type": "Person", name: BOOK.author },
    isbn: BOOK.isbn,
    inLanguage: "en",
    url: BOOK.site,
    sameAs: BOOK.buy,
  };
}
