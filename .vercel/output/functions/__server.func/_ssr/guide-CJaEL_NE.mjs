import { t as CARDS } from "./gospel-K_HqSit3.mjs";
import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ArrowLeft, n as Printer } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-CJaEL_NE.js
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
					children: "30-day visual gospel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl leading-tight",
					children: "A guide through the images"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted print:text-stone-600",
					children: [
						"One image a day. See the word, sit with the verse (",
						"KJV",
						"), then walk through the definition, gospel truth, and gospel response. Use Save as PDF in the print dialog to keep a copy. Swap in your own wording anytime."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-10",
					children: CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "break-inside-avoid border-t border-border pt-6 print:border-stone-200",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Gospel truth"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed",
								children: card.gospelTruth
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs font-medium tracking-wide text-fg-muted uppercase",
								children: "Gospel response"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed",
								children: card.gospelResponse
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
