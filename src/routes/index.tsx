import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { getSiteOrigin } from "@/lib/seo.functions";
import { homeJsonLd, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: () => getSiteOrigin(),
  head: ({ loaderData }) => {
    const origin = loaderData || "";
    return {
      links: origin ? [{ rel: "canonical", href: `${origin}/` }] : [],
      meta: origin ? [{ property: "og:url", content: `${origin}/` }] : [],
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLd(homeJsonLd(origin)),
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  return <AppShell />;
}
