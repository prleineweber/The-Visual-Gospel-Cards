import { useEffect } from "react";
import { CARDS } from "@/lib/gospel";

const EXTRA = ["/cover.jpg", "/book-desk.jpg"];

export function PreloadArt() {
  useEffect(() => {
    const urls = [...EXTRA, ...CARDS.map((card) => card.image)];
    urls.forEach((src, index) => {
      const img = new Image();
      img.decoding = "async";
      if ("fetchPriority" in img) {
        img.fetchPriority = index < 3 ? "high" : "low";
      }
      img.src = src;
    });
  }, []);

  return null;
}
