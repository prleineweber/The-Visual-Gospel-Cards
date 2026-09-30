import { i as __toESM } from "../_runtime.mjs";
import { i as WATCH_VIDEOS, n as CHANNEL, r as LAYERS, t as CARDS } from "./gospel-K_HqSit3.mjs";
import { R as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ExternalLink, c as ChevronLeft, i as LayoutGrid, l as Check, n as Printer, o as ChevronUp, r as Play, s as ChevronRight, u as BookOpen } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Du_diLFA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var KEY = "visual-gospel-progress-v1";
var empty = {
	seen: [],
	known: [],
	lastDay: 1
};
function loadProgress() {
	if (typeof window === "undefined") return empty;
	try {
		const raw = localStorage.getItem(KEY);
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
	localStorage.setItem(KEY, JSON.stringify(next));
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
			if (layer < LAYERS.length - 1) {
				if (layer === 0) markSeen(day);
				set({ layer: layer + 1 });
			}
		},
		prevLayer: () => {
			const { layer } = get();
			if (layer > 0) set({ layer: layer - 1 });
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
		id: "watch",
		label: "Watch",
		icon: Play
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
					className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150", active ? "text-fg" : "text-fg-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: cn("size-5", item.id === "watch" && "ml-0.5"),
						strokeWidth: active ? 2.2 : 1.8
					}), item.label]
				}, item.id);
			})
		})
	});
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
	const current = LAYERS[layer];
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if (event.key === "ArrowRight") nextLayer();
			if (event.key === "ArrowLeft") prevLayer();
			if (event.key === "ArrowUp") {
				event.preventDefault();
				nextDay();
			}
			if (event.key === "ArrowDown") {
				event.preventDefault();
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
	if (!card) return null;
	function onTouchStart(event) {
		const point = event.changedTouches[0];
		touch.current = {
			x: point.clientX,
			y: point.clientY,
			t: Date.now()
		};
	}
	function onTouchEnd(event) {
		if (!touch.current) return;
		const point = event.changedTouches[0];
		const dx = point.clientX - touch.current.x;
		const dy = point.clientY - touch.current.y;
		const dt = Date.now() - touch.current.t;
		touch.current = null;
		if (dt > 700) return;
		const absX = Math.abs(dx);
		const absY = Math.abs(dy);
		if (absX < 40 && absY < 40) return;
		if (absY > absX && absY > 48) {
			if (dy < 0) nextDay();
			else prevDay();
			return;
		}
		if (absX > 48) {
			if (dx > 0) nextLayer();
			else prevLayer();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
					children: "Visual Gospel"
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
				className: "flex min-h-0 flex-1 flex-col",
				onTouchStart,
				onTouchEnd,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: nextLayer,
						className: "relative aspect-card w-full overflow-hidden rounded-lg bg-bg-elevated shadow-[var(--shadow-border)]",
						"aria-label": layer === 0 ? `Reveal the word for day ${card.day}` : `Next: ${LAYERS[Math.min(layer + 1, LAYERS.length - 1)].label}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: card.image,
							alt: card.imageAlt,
							className: "card-art h-full w-full object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex items-center justify-center gap-1.5",
						children: LAYERS.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": item.label,
							"aria-current": index === layer,
							onClick: () => setLayer(index),
							className: cn("h-2 rounded-full transition-[width,background-color] duration-200", index === layer ? "w-5 bg-accent" : "w-2 bg-bg-subtle hover:bg-border-strong")
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rise-in mt-3 min-h-32 rounded-lg bg-bg-elevated px-4 py-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-[0.16em] text-fg-muted uppercase",
								children: current.label
							}),
							layer === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-fg-muted",
								children: "Tap the image or swipe right to see the word."
							}) : null,
							layer === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-4xl leading-tight text-fg",
								children: card.word
							}) : null,
							layer === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl text-fg",
										children: card.verse.ref
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-lg leading-relaxed text-fg",
										children: card.verse.text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-fg-subtle",
										children: "KJV"
									})
								]
							}) : null,
							layer === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-base leading-relaxed text-fg",
								children: card.definition
							}) : null,
							layer === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-base leading-relaxed text-fg",
								children: card.gospelTruth
							}) : null,
							layer === 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-base leading-relaxed text-fg",
								children: card.gospelResponse
							}) : null
						]
					}, `${card.id}-${layer}`)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 mb-2 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: prevLayer,
						"aria-label": "Previous step",
						disabled: layer === 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: isKnown ? "primary" : "subtle",
						className: "flex-1",
						onClick: markKnown,
						children: [isKnown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null, isKnown ? "Known" : "Mark known"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: nextDay,
						"aria-label": "Next day",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: nextLayer,
						"aria-label": "Next step",
						disabled: layer === LAYERS.length - 1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-center text-xs text-fg-subtle",
				children: "Swipe right for the next step · swipe up for the next day"
			})
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
function WatchPanel() {
	const [active, setActive] = (0, import_react.useState)(WATCH_VIDEOS[0].id);
	const [mode, setMode] = (0, import_react.useState)("video");
	const current = WATCH_VIDEOS.find((video) => video.id === active) ?? WATCH_VIDEOS[0];
	const src = mode === "channel" ? `https://www.youtube-nocookie.com/embed/videoseries?list=${CHANNEL.uploadsList}` : `https://www.youtube-nocookie.com/embed/${current.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-3xl px-4 pt-3 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
						children: "Watch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-tight text-fg",
						children: CHANNEL.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm leading-relaxed text-fg-muted",
						children: "Visual teaching on the gospel, the kingdom, and the story of Scripture."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video bg-bg-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: mode === "channel" ? `${CHANNEL.name} channel` : current.title,
						src,
						className: "h-full w-full",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
						allowFullScreen: true
					}, src)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 border-t border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("video"),
							className: cn("h-10 rounded-full px-4 text-sm font-medium", mode === "video" ? "bg-accent text-accent-fg" : "bg-bg-subtle text-fg-muted"),
							children: "Featured"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("channel"),
							className: cn("h-10 rounded-full px-4 text-sm font-medium", mode === "channel" ? "bg-accent text-accent-fg" : "bg-bg-subtle text-fg-muted"),
							children: "Channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: CHANNEL.url,
							target: "_blank",
							rel: "noreferrer",
							className: "ml-auto inline-flex h-10 items-center gap-1.5 px-2 text-sm text-fg-muted hover:text-fg",
							children: ["Open YouTube", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-5 space-y-2",
				children: [WATCH_VIDEOS.map((video) => {
					const selected = mode === "video" && video.id === active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setMode("video");
							setActive(video.id);
						},
						className: cn("flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150", selected ? "bg-bg-elevated" : "hover:bg-bg-subtle"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-2 shrink-0 rounded-full", selected ? "bg-accent" : "bg-border-strong") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-fg",
							children: video.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-sm text-fg-muted",
							children: video.blurb
						})] })]
					}) }, video.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode("channel"),
					className: "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left hover:bg-bg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 size-2 shrink-0 rounded-full bg-border-strong" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block font-medium text-fg",
						children: [
							"Full ",
							CHANNEL.name,
							" channel"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm text-fg-muted",
						children: "Browse the embedded channel feed without leaving the app."
					})] })]
				}) })]
			})
		]
	});
}
function AppShell() {
	const tab = useAppStore((s) => s.tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex flex-1 flex-col pb-20",
			children: [
				tab === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashDeck, {}) : null,
				tab === "days" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}) : null,
				tab === "watch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchPanel, {}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
