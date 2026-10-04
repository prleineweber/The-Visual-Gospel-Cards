import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/seo.functions";

export const Route = createRootRoute({
  loader: () => getSiteOrigin(),
  head: ({ loaderData }) => {
    const origin = loaderData || "";
    const image = origin ? `${origin}/og.jpg` : "/og.jpg";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: HOME_TITLE },
        { name: "description", content: HOME_DESCRIPTION },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Philip Leineweber" },
        { property: "og:title", content: HOME_TITLE },
        { property: "og:description", content: HOME_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: HOME_TITLE },
        { name: "twitter:description", content: HOME_DESCRIPTION },
        { name: "twitter:image", content: image },
        { name: "theme-color", content: "#f3eee6" },
      ],
      links: [
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap",
        },
      ],
    };
  },
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
