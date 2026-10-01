import { BottomNav } from "@/components/bottom-nav";
import { EnterGate } from "@/components/enter-gate";
import { FlashDeck } from "@/components/flash-deck";
import { Gallery } from "@/components/gallery";
import { PreloadArt } from "@/components/preload-art";
import { SitePanel } from "@/components/site-panel";
import { useAppStore } from "@/lib/store";

export function AppShell() {
  const tab = useAppStore((s) => s.tab);

  return (
    <>
      <PreloadArt />
      <EnterGate>
        <div className="flex min-h-dvh flex-col bg-bg text-fg">
          <main className="flex min-h-0 flex-1 flex-col pb-20">
            {tab === "cards" ? <FlashDeck /> : null}
            {tab === "days" ? <Gallery /> : null}
            {tab === "book" ? <SitePanel /> : null}
          </main>
          <BottomNav />
        </div>
      </EnterGate>
    </>
  );
}
