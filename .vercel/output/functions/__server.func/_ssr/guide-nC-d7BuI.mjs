import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Printer, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as BOOK, r as CARDS } from "./router-D-pdBK2n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-nC-d7BuI.js
var import_jsx_runtime = require_jsx_runtime();
function Guide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg print:bg-white print:text-stone-900",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 print:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-2 text-sm text-fg-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back to cards"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => window.print(),
				className: "inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Save as PDF"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-fg-muted uppercase print:text-stone-500",
					children: "Companion to the book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl leading-tight",
					children: BOOK.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-lg text-fg-muted",
					children: BOOK.author
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted print:text-stone-600",
					children: [
						"One image a day. See the word, sit with the key verse (",
						"ESV",
						"), then walk through the definition, reflection questions, gospel response, and prayer. Scripture quotations are from the ESV® Bible."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Days",
					className: "mt-6 flex flex-wrap gap-2 print:hidden",
					children: CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `#day-${card.day}`,
						className: "rounded-full border border-border px-3 py-1 text-sm text-fg-muted hover:text-fg",
						children: [
							card.day,
							". ",
							card.word
						]
					}, card.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-10",
					children: CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: `day-${card.day}`,
						className: "break-inside-avoid scroll-mt-6 border-t border-border pt-6 print:border-stone-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium tracking-wide text-fg-muted uppercase print:text-stone-500",
								children: ["Day ", card.day]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl",
								children: card.word
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: card.image,
								alt: card.imageAlt,
								className: "card-art mt-4 aspect-card w-full max-w-sm object-contain"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: ["Key verse · ", card.verse.ref]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-relaxed",
								children: card.verse.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Definition"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed",
								children: card.definition
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Memory Verse:"
									}),
									" ",
									card.verse.ref
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Reflection questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-1 list-decimal space-y-2 pl-5 leading-relaxed",
								children: card.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: question }, question))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Gospel response"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed",
								children: card.gospelResponse
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Prayer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-line font-display leading-relaxed",
								children: card.prayer
							})
						]
					}, card.id))
				})
			]
		})]
	});
}
//#endregion
export { Guide as component };
