import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { CHANNEL, WATCH_VIDEOS } from "@/lib/gospel";
import { cn } from "@/lib/utils";

export function WatchPanel() {
  const [active, setActive] = useState(WATCH_VIDEOS[0].id);
  const [mode, setMode] = useState<"video" | "channel">("video");
  const current = WATCH_VIDEOS.find((video) => video.id === active) ?? WATCH_VIDEOS[0];

  const src =
    mode === "channel"
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${CHANNEL.uploadsList}`
      : `https://www.youtube-nocookie.com/embed/${current.id}`;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-3 pb-4">
      <header className="mb-4">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          Watch
        </p>
        <h1 className="font-display text-3xl leading-tight text-fg">
          {CHANNEL.name}
        </h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-muted">
          Visual teaching on the gospel, the kingdom, and the story of Scripture.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
        <div className="aspect-video bg-bg-subtle">
          <iframe
            key={src}
            title={mode === "channel" ? `${CHANNEL.name} channel` : current.title}
            src={src}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="flex gap-2 border-t border-border p-3">
          <button
            type="button"
            onClick={() => setMode("video")}
            className={cn(
              "h-10 rounded-full px-4 text-sm font-medium",
              mode === "video"
                ? "bg-accent text-accent-fg"
                : "bg-bg-subtle text-fg-muted",
            )}
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => setMode("channel")}
            className={cn(
              "h-10 rounded-full px-4 text-sm font-medium",
              mode === "channel"
                ? "bg-accent text-accent-fg"
                : "bg-bg-subtle text-fg-muted",
            )}
          >
            Channel
          </button>
          <a
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex h-10 items-center gap-1.5 px-2 text-sm text-fg-muted hover:text-fg"
          >
            Open YouTube
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {WATCH_VIDEOS.map((video) => {
          const selected = mode === "video" && video.id === active;
          return (
            <li key={video.id}>
              <button
                type="button"
                onClick={() => {
                  setMode("video");
                  setActive(video.id);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150",
                  selected ? "bg-bg-elevated" : "hover:bg-bg-subtle",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 size-2 shrink-0 rounded-full",
                    selected ? "bg-accent" : "bg-border-strong",
                  )}
                />
                <span>
                  <span className="block font-medium text-fg">{video.title}</span>
                  <span className="mt-0.5 block text-sm text-fg-muted">
                    {video.blurb}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={() => setMode("channel")}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left hover:bg-bg-subtle"
          >
            <span className="mt-0.5 size-2 shrink-0 rounded-full bg-border-strong" />
            <span>
              <span className="block font-medium text-fg">
                Full {CHANNEL.name} channel
              </span>
              <span className="mt-0.5 block text-sm text-fg-muted">
                Browse the embedded channel feed without leaving the app.
              </span>
            </span>
          </button>
        </li>
      </ul>
    </section>
  );
}
