import { create } from "zustand";
import { CARDS, LAYERS } from "./gospel";
import { loadProgress, markSeen, toggleKnown } from "./progress";

export type Tab = "cards" | "days" | "book";

type AppState = {
  tab: Tab;
  day: number;
  layer: number;
  known: number[];
  seen: number[];
  setTab: (tab: Tab) => void;
  openDay: (day: number) => void;
  nextDay: () => void;
  prevDay: () => void;
  nextLayer: () => void;
  prevLayer: () => void;
  setLayer: (layer: number) => void;
  markKnown: () => void;
};

export const useAppStore = create<AppState>((set, get) => {
  const progress = loadProgress();
  return {
    tab: "cards",
    day: progress.lastDay || 1,
    layer: 0,
    known: progress.known,
    seen: progress.seen,
    setTab: (tab) => set({ tab }),
    openDay: (day) => {
      markSeen(day);
      set((state) => ({
        day,
        layer: 0,
        tab: "cards",
        seen: state.seen.includes(day) ? state.seen : [...state.seen, day],
      }));
    },
    nextDay: () => {
      const { day } = get();
      get().openDay(day >= CARDS.length ? 1 : day + 1);
    },
    prevDay: () => {
      const { day } = get();
      get().openDay(day <= 1 ? CARDS.length : day - 1);
    },
    nextLayer: () => {
      const { layer, day } = get();
      if (layer < LAYERS.length - 1) {
        if (layer === 0) markSeen(day);
        set({ layer: layer + 1 });
        return;
      }
      const next = day >= CARDS.length ? 1 : day + 1;
      get().openDay(next);
    },
    prevLayer: () => {
      const { layer, day } = get();
      if (layer > 0) {
        set({ layer: layer - 1 });
        return;
      }
      const prev = day <= 1 ? CARDS.length : day - 1;
      get().openDay(prev);
    },
    setLayer: (layer) => set({ layer }),
    markKnown: () => {
      const { day } = get();
      const known = toggleKnown(day);
      set({ known });
    },
  };
});
