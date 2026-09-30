const KEY = "visual-gospel-progress-v1";

export type Progress = {
  seen: number[];
  known: number[];
  lastDay: number;
};

const empty: Progress = { seen: [], known: [], lastDay: 1 };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Progress;
    return {
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
      known: Array.isArray(parsed.known) ? parsed.known : [],
      lastDay: typeof parsed.lastDay === "number" ? parsed.lastDay : 1,
    };
  } catch {
    return empty;
  }
}

export function saveProgress(next: Progress) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function markSeen(day: number) {
  const current = loadProgress();
  const seen = current.seen.includes(day) ? current.seen : [...current.seen, day];
  saveProgress({ ...current, seen, lastDay: day });
}

export function toggleKnown(day: number) {
  const current = loadProgress();
  const known = current.known.includes(day)
    ? current.known.filter((item) => item !== day)
    : [...current.known, day];
  saveProgress({ ...current, known });
  return known;
}
