import { BookOpen, Feather, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore, type Tab } from "@/lib/store";

const ITEMS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "cards", label: "Cards", icon: BookOpen },
  { id: "days", label: "Days", icon: LayoutGrid },
  { id: "book", label: "Visual Gospel", icon: Feather },
];

export function BottomNav() {
  const tab = useAppStore((s) => s.tab);
  const setTab = useAppStore((s) => s.setTab);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium leading-tight transition-colors duration-150",
                active ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
