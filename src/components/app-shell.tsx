import { BottomNav } from "@/components/bottom-nav";
import { FlashDeck } from "@/components/flash-deck";
import { Gallery } from "@/components/gallery";
import { WatchPanel } from "@/components/watch-panel";
import { useAppStore } from "@/lib/store";

export function AppShell() {
  const tab = useAppStore((s) => s.tab);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <main className="flex flex-1 flex-col pb-20">
        {tab === "cards" ? <FlashDeck /> : null}
        {tab === "days" ? <Gallery /> : null}
        {tab === "watch" ? <WatchPanel /> : null}
      </main>
      <BottomNav />
    </div>
  );
}
