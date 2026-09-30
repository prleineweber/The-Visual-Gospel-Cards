import { BookOpen, LayoutGrid, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore, type Tab } from "@/lib/store";

const ITEMS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "cards", label: "Cards", icon: BookOpen },
  { id: "days", label: "Days", icon: LayoutGrid },
  { id: "watch", label: "Watch", icon: Play },
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
                "flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150",
                active ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              <Icon
                className={cn("size-5", item.id === "watch" && "ml-0.5")}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
