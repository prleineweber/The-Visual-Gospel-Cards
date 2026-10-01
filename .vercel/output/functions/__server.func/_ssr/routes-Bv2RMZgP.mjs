import { i as __toESM } from "../_runtime.mjs";
import { n as CARDS, r as LAYERS, t as BOOK } from "./gospel-DiKDTYRE.mjs";
import { R as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ExternalLink, c as Check, i as Feather, l as BookOpen, n as Printer, o as ChevronRight, r as LayoutGrid, s as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bv2RMZgP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var KEY$1 = "visual-gospel-progress-v1";
var empty = {
	seen: [],
	known: [],
	lastDay: 1
};
function loadProgress() {
	if (typeof window === "undefined") return empty;
	try {
		const raw = localStorage.getItem(KEY$1);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return {
			seen: Array.isArray(parsed.seen) ? parsed.seen : [],
			known: Array.isArray(parsed.known) ? parsed.known : [],
			lastDay: typeof parsed.lastDay === "number" ? parsed.lastDay : 1
		};
	} catch {
		return empty;
	}
}
function saveProgress(next) {
	localStorage.setItem(KEY$1, JSON.stringify(next));
}
function markSeen(day) {
	const current = loadProgress();
	const seen = current.seen.includes(day) ? current.seen : [...current.seen, day];
	saveProgress({
		...current,
		seen,
		lastDay: day
	});
}
function toggleKnown(day) {
	const current = loadProgress();
	const known = current.known.includes(day) ? current.known.filter((item) => item !== day) : [...current.known, day];
	saveProgress({
		...current,
		known
	});
	return known;
}
var useAppStore = create((set, get) => {
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
				seen: state.seen.includes(day) ? state.seen : [...state.seen, day]
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
			if (layer === 0) markSeen(day);
			set({ layer: (layer + 1) % LAYERS.length });
		},
		prevLayer: () => {
			const { layer } = get();
			set({ layer: (layer - 1 + LAYERS.length) % LAYERS.length });
		},
		setLayer: (layer) => set({ layer }),
		markKnown: () => {
			const { day } = get();
			set({ known: toggleKnown(day) });
		}
	};
});
var ITEMS = [
	{
		id: "cards",
		label: "Cards",
		icon: BookOpen
	},
	{
		id: "days",
		label: "Days",
		icon: LayoutGrid
	},
	{
		id: "book",
		label: "Visual Gospel",
		icon: Feather
	}
];
function BottomNav() {
	const tab = useAppStore((s) => s.tab);
	const setTab = useAppStore((s) => s.setTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)]",
		"aria-label": "Primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-lg grid-cols-3",
			children: ITEMS.map((item) => {
				const Icon = item.icon;
				const active = tab === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTab(item.id),
					className: cn("flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium leading-tight transition-colors duration-150", active ? "text-fg" : "text-fg-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.2 : 1.8
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center",
						children: item.label
					})]
				}, item.id);
			})
		})
	});
}
var KEY = "vg-entered";
function EnterGate({ children }) {
	const [gate, setGate] = (0, import_react.useState)("splash");
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem(KEY) === "1") setGate("app");
	}, []);
	function enter() {
		sessionStorage.setItem(KEY, "1");
		setGate("app");
	}
	if (gate === "splash") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: enter,
		className: "flex min-h-dvh w-full flex-col items-center justify-center bg-bg px-6 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/cover.jpg",
			alt: `${BOOK.title} by ${BOOK.author}`,
			className: "w-full max-w-sm rounded-sm shadow-[var(--shadow-border)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm font-medium tracking-[0.22em] text-fg-muted uppercase",
			children: "Click or tap to enter"
		})]
	});
	return children;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-bg-subtle border border-transparent",
			outline: "bg-transparent text-fg border border-border hover:border-border-strong",
			subtle: "bg-bg-subtle text-fg hover:bg-bg-elevated"
		},
		size: {
			md: "h-11 px-4 rounded-md text-sm",
			sm: "h-9 px-3 rounded-sm text-sm",
			icon: "size-11 rounded-md",
			pill: "h-10 px-4 rounded-full text-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function FlashDeck() {
	const day = useAppStore((s) => s.day);
	const layer = useAppStore((s) => s.layer);
	const known = useAppStore((s) => s.known);
	const nextLayer = useAppStore((s) => s.nextLayer);
	const prevLayer = useAppStore((s) => s.prevLayer);
	const nextDay = useAppStore((s) => s.nextDay);
	const prevDay = useAppStore((s) => s.prevDay);
	const setLayer = useAppStore((s) => s.setLayer);
	const markKnown = useAppStore((s) => s.markKnown);
	const card = CARDS[day - 1];
	const isKnown = known.includes(day);
	const touch = (0, import_react.useRef)(null);
	const moved = (0, import_react.useRef)(false);
	const direction = (0, import_react.useRef)(1);
	const scroller = (0, import_react.useRef)(null);
	const current = LAYERS[layer];
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const tag = event.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "IFRAME") return;
			if (event.key === "ArrowRight") {
				direction.current = 1;
				nextLayer();
			}
			if (event.key === "ArrowLeft") {
				direction.current = -1;
				prevLayer();
			}
			if (event.key === "ArrowUp") {
				event.preventDefault();
				direction.current = 1;
				nextDay();
			}
			if (event.key === "ArrowDown") {
				event.preventDefault();
				direction.current = -1;
				prevDay();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		nextDay,
		nextLayer,
		prevDay,
		prevLayer
	]);
	if (!card || !current) return null;
	function goNext() {
		direction.current = 1;
		nextLayer();
	}
	function goPrev() {
		direction.current = -1;
		prevLayer();
	}
	function onTouchStart(event) {
		const point = event.changedTouches[0];
		touch.current = {
			x: point.clientX,
			y: point.clientY,
			t: Date.now()
		};
		moved.current = false;
	}
	function onTouchEnd(event) {
		if (!touch.current) return;
		const point = event.changedTouches[0];
		const dx = point.clientX - touch.current.x;
		const dy = point.clientY - touch.current.y;
		const dt = Date.now() - touch.current.t;
		touch.current = null;
		const absX = Math.abs(dx);
		const absY = Math.abs(dy);
		if (absX > 10 || absY > 10) moved.current = true;
		if (dt > 700) return;
		if (absX < 40 && absY < 40) return;
		const node = scroller.current;
		const canScroll = layer !== 0 && !!node && node.scrollHeight > node.clientHeight + 8;
		if (absY > absX && absY > 56) {
			if (canScroll) return;
			if (dy < 0) {
				direction.current = 1;
				nextDay();
			} else {
				direction.current = -1;
				prevDay();
			}
			return;
		}
		if (absX > 48) {
			if (dx < 0) goNext();
			else goPrev();
		}
	}
	function onCardClick(event) {
		if (moved.current) {
			moved.current = false;
			return;
		}
		if (event.target.closest("button, a")) return;
		goNext();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col px-4 pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
					children: BOOK.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-2xl leading-tight text-fg",
					children: [
						"Day ",
						card.day,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg-muted",
							children: [" / ", CARDS.length]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-fg-muted tabular-nums",
					children: [known.length, " known"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-border)]",
				onTouchStart,
				onTouchEnd,
				onClick: onCardClick,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scroller,
					className: cn("min-h-0 flex-1 overflow-y-auto", direction.current === 1 ? "slide-next" : "slide-prev"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
						card,
						layerId: current.id,
						showHint: card.day === 1
					})
				}, `${card.id}-${layer}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-1.5 border-t border-border px-3 py-3",
					children: LAYERS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": item.label,
						"aria-current": index === layer,
						onClick: () => {
							direction.current = index >= layer ? 1 : -1;
							setLayer(index);
						},
						className: cn("h-2 rounded-full transition-[width,background-color] duration-200", index === layer ? "w-5 bg-accent" : "w-2 bg-bg-subtle hover:bg-border-strong")
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-11 px-2 text-[11px] leading-tight sm:text-xs",
						onClick: goPrev,
						"aria-label": "Previous Word",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 shrink-0" }), "Previous Word"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: isKnown ? "primary" : "subtle",
						className: "px-3",
						onClick: markKnown,
						children: [isKnown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null, isKnown ? "Known" : "Mark known"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-11 px-2 text-[11px] leading-tight sm:text-xs",
						onClick: goNext,
						"aria-label": "Next Word",
						children: ["Next Word", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0" })]
					})
				]
			})
		]
	});
}
function CardFace({ card, layerId, showHint }) {
	if (layerId === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-[52dvh] items-center justify-center bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: card.image,
			alt: card.imageAlt,
			draggable: false,
			className: "card-art h-full max-h-[70dvh] w-full object-contain"
		}), showHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pointer-events-none absolute inset-x-0 bottom-3 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-bg/90 px-3 py-1 text-xs tracking-wide text-fg-muted",
				children: "Swipe left for the word"
			})
		}) : null]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "px-5 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.16em] text-fg-muted uppercase",
				children: LAYERS.find((item) => item.id === layerId)?.label
			}),
			layerId === "word" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-5xl leading-none text-fg",
					children: card.word
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs font-medium tracking-[0.16em] text-fg-muted uppercase",
					children: "Definition"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed text-fg",
					children: card.definition
				})
			] }) : null,
			layerId === "verse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg",
						children: card.verse.ref
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-lg leading-relaxed text-fg",
						children: card.verse.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-fg-subtle",
						children: "ESV"
					})
				]
			}) : null,
			layerId === "response" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-base leading-relaxed text-fg",
				children: card.gospelResponse
			}) : null,
			layerId === "questions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 list-decimal space-y-4 pl-5 text-base leading-relaxed text-fg",
				children: card.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: question }, question))
			}) : null,
			layerId === "prayer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 whitespace-pre-line font-display text-base leading-relaxed text-fg",
				children: card.prayer
			}) : null
		]
	});
}
function Gallery() {
	const openDay = useAppStore((s) => s.openDay);
	const known = useAppStore((s) => s.known);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-3xl px-4 pt-3 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-5 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
				children: "30 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-tight text-fg",
				children: "The visual gospel"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guide",
				className: "inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print / PDF"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
			children: CARDS.map((card) => {
				const isKnown = known.includes(card.day);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openDay(card.day),
					className: "group overflow-hidden rounded-lg bg-bg-elevated text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-card overflow-hidden bg-bg-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: card.image,
								alt: "",
								className: "card-art h-full w-full object-contain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums", isKnown ? "bg-accent text-accent-fg" : "bg-bg/80 text-fg"),
								children: card.day
							}),
							isKnown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-accent text-accent-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-base leading-snug text-fg",
							children: card.word
						})
					})]
				}, card.id);
			})
		})]
	});
}
var EXTRA = ["/cover.jpg", "/book-desk.jpg"];
function PreloadArt() {
	(0, import_react.useEffect)(() => {
		[...EXTRA, ...CARDS.map((card) => card.image)].forEach((src, index) => {
			const img = new Image();
			img.decoding = "async";
			if ("fetchPriority" in img) img.fetchPriority = index < 3 ? "high" : "low";
			img.src = src;
		});
	}, []);
	return null;
}
function SitePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-3 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
						children: "The book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-tight text-fg",
						children: "Visual Gospel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 max-w-xl text-sm leading-relaxed text-fg-muted",
						children: [
							"A 30-day devotional exploring the good news of Jesus, by ",
							BOOK.author,
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/book-desk.jpg",
					alt: "The Visual Gospel paperback on a desk beside a pencil, flowers, and a glass of juice",
					className: "aspect-[4/5] w-full object-cover object-center sm:aspect-[16/10]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg",
						children: BOOK.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg-muted",
						children: BOOK.author
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: BOOK.buy,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg hover:opacity-90",
						children: ["Buy devotional", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-fg-muted uppercase",
					children: "visualgospelbook.com"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: BOOK.site,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg",
					children: ["Open site", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 min-h-[70vh] flex-1 overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Visual Gospel website",
					src: BOOK.site,
					className: "h-[70vh] w-full bg-white"
				})
			})
		]
	});
}
function AppShell() {
	const tab = useAppStore((s) => s.tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreloadArt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex min-h-0 flex-1 flex-col pb-20",
			children: [
				tab === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashDeck, {}) : null,
				tab === "days" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}) : null,
				tab === "book" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePanel, {}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	}) })] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
