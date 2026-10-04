import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D-pdBK2n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-wk-CN2bN.css";
var BOOK = {
	title: "The Visual Gospel",
	author: "Philip Leineweber",
	isbn: "979-8-1943079-3-7",
	site: "https://visualgospelbook.com",
	buy: "https://www.amazon.com/dp/B0HLC7QP8N"
};
var LAYERS = [
	{
		id: "image",
		label: "Image"
	},
	{
		id: "word",
		label: "Word"
	},
	{
		id: "verse",
		label: "Key verse"
	},
	{
		id: "response",
		label: "Reflection Questions"
	},
	{
		id: "prayer",
		label: "Prayer"
	}
];
var CARDS = [
	{
		id: "creation",
		day: 1,
		word: "Creation",
		image: "/cards/01.jpg",
		imageAlt: "Two hands reaching toward each other, almost touching",
		verse: {
			ref: "Genesis 1:26-27",
			text: "Then God said, “Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.” So God created man in his own image, in the image of God he created him; male and female he created them."
		},
		definition: "Creation is God making the whole world and everything in it. He made people in a special way so we could know, love, and reflect Him.",
		gospelResponse: "When you see beauty in the natural world, pause and thank God for His beautiful creation. Remember that you are His most prized handiwork, made in His image for relationship with Him.",
		questions: ["Reflect on the Augustine quote, “You have made us, O God, and our hearts are forever without rest till they find their rest in you.” How has this idea rung true in your life and experience?", "Why does the gospel begin in the garden? What were we, as God’s image and likeness, made for?"],
		prayer: "Creator God,\nThank you for making me. I worship you as the almighty Creator of heaven and earth. Awaken me to the reality that I was made for you, to glorify, know, and enjoy you forever. Thank you for undoing what the fall and sin did through Jesus. Open my eyes to the gospel of Jesus Christ, the Redeemer of the world.\nAmen."
	},
	{
		id: "love",
		day: 2,
		word: "Love",
		image: "/cards/02.jpg",
		imageAlt: "A father embracing a returning son",
		verse: {
			ref: "John 3:16",
			text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
		},
		definition: "Love is God choosing to give of Himself for our good. It is God’s faithful commitment to rescue and restore. It is seen most clearly in God sending His Son, Jesus, to save sinners.",
		gospelResponse: "If you see a parent with their child today think of the unconditional love that parents have for their children. Think about how loving parents willingly sacrifice themselves for the sake of their kids and how God has this same kind of love for us.",
		questions: ["What comes to your mind when you think about love?", "Read John 15:13. Reflect on how Jesus shows His love for us. How should this make us feel? How should this shape our hearts?"],
		prayer: "Loving Father,\nI praise you that you are loving. Thank you for demonstrating your love for me through Jesus. When I feel unwanted or unloved may I remember your great love for me. Thank you for adopting me into your family. Help me to see what kind of love the Father has given to me, that I should be called a child of God; and so I am (1 John 3:1).\nAmen."
	},
	{
		id: "mercy",
		day: 3,
		word: "Mercy",
		image: "/cards/03.jpg",
		imageAlt: "Empty stocks beside a table piled with fruit",
		verse: {
			ref: "1 Peter 1:3",
			text: "Blessed be the God and Father of our Lord Jesus Christ! According to his great mercy, he has caused us to be born again to a living hope through the resurrection of Jesus Christ from the dead"
		},
		definition: "Mercy is God’s compassionate withholding of deserved judgment and His tender action toward helpless sinners. It is God’s desire to relieve the consequences of sin in those who deserve condemnation through Christ’s sacrifice.",
		gospelResponse: "Look for a piece of fruit today and think about how you deserved punishment and shame, rotten fruit thrown in your face in the public square. But then you received mercy. Give thanks to God for this wonderful gift.",
		questions: ["Have you ever received radical mercy? How did this feel?", "Why is understanding the holiness, justice, and judgment of God essential to really seeing the beauty of God’s mercy?"],
		prayer: "Merciful God,\nThank you for the good news of mercy. Help me to remember today that because of Jesus I have it far better than I deserve. Strengthen me to extend this same mercy to others in my life who may sin against me.\nAmen."
	},
	{
		id: "grace",
		day: 4,
		word: "Grace",
		image: "/cards/04.jpg",
		imageAlt: "A surprised man before a lavish feast he did not earn",
		verse: {
			ref: "Ephesians 2:8-9",
			text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."
		},
		definition: "Grace is God’s unmerited favor freely given to sinners who deserve judgment, granting them salvation, forgiveness, and every spiritual blessing through Jesus Christ. It is not earned, deserved, or repaid; it flows from God’s sovereign goodness and love.",
		gospelResponse: "Find something in your life that was given to you as a gift. Think about how the gospel is completely a work of God’s grace, it is a gift. It is not something deserved or earned but an unmerited kindness from your Creator.",
		questions: ["What was the best gift you have ever received? What made it so meaningful?", "When was the first time you understood God’s grace? Are you still walking in the same thankfulness for it today?"],
		prayer: "Gracious God,\nYour grace is more than enough for me. Thank you for pouring your grace upon me time and time again. Thank you for sending Jesus, the expression of your grace. Help me to see every blessing in my life as a work of your grace.\nAmen."
	},
	{
		id: "sin",
		day: 5,
		word: "Sin",
		image: "/cards/05.jpg",
		imageAlt: "A target with arrows that missed the mark lying in the dirt",
		verse: {
			ref: "Romans 3:23",
			text: "For all have sinned and fall short of the glory of God."
		},
		definition: "Sin is any failure to conform to the moral law of God in act, attitude, or nature, whether by doing what God forbids or failing to do what He commands.",
		gospelResponse: "Read 1 John 1:7-10. Spend some time intentionally confessing wrongful thoughts, attitudes, words and actions. Trust God’s promise that when we confess our sin He forgives and cleanses.",
		questions: [
			"Think about when you were a young child. What were some of your first experiences of guilt and shame for your sinfulness?",
			"How can guilt and shame be a mercy from God that can point us to our need for Jesus? (See Romans 2:15)",
			"How does God respond to those who come to Him with an attitude of self-righteousness instead of remorse for their sin? (See Luke 18:9-14)"
		],
		prayer: "Father God,\nHave mercy on me, a sinner. Make me more aware of the darkness in my heart and my own sinfulness. Bring a godly sorrow that leads to repentance in my life. Forgive me for my sinful acts, attitudes, and thoughts. Forgive me for minimizing my sin, as if it is not that big of a deal. Thank you that you came to save me from my sin.\nAmen."
	},
	{
		id: "depravity",
		day: 6,
		word: "Depravity",
		image: "/cards/06.jpg",
		imageAlt: "A wrecked boat stranded on dry ground, unable to save itself",
		verse: {
			ref: "Ephesians 2:1-2",
			text: "And you were dead in the trespasses and sins in which you once walked"
		},
		definition: "Depravity refers to the deep corruption of human nature due to sin, resulting in our inability to please God, understand spiritual truth rightly, or come to Him apart from His grace.",
		gospelResponse: "Next time you see a cemetery, reflect on all the people who have been laid to rest there. Spiritually, this is who we were before Jesus raises us to new life. Give thanks that though once you were dead, now you are alive!",
		questions: ["God’s Word speaks of unbelievers being “blinded” to spiritual truth (2 Corinthians 4:4). Think back on this experience before you met Jesus . What was it like to be unable to see the things of God clearly?", "Read Romans 6:4-5. What was the state of our lives before Jesus? How does our story mirror the resurrection of Jesus?"],
		prayer: "Father of Lights,\nThank you for finding me on the ocean floor. I praise you for shining light into the darkness of my life. Help me to remember that my salvation and new life are completely a work of your Spirit who brought me to life in the midst of my sin. May I walk today in this newness of life, may I walk as a child of the light.\nAmen."
	},
	{
		id: "wrath",
		day: 7,
		word: "Wrath",
		image: "/cards/07.jpg",
		imageAlt: "A lone tree under a gathering storm and tornado",
		verse: {
			ref: "Romans 1:18",
			text: "For the wrath of God is revealed from heaven against all ungodliness and unrighteousness of men…"
		},
		definition: "The wrath of God is His holy revulsion against sin and His just judgment against sinners who rebel against His righteous standards.",
		gospelResponse: "Gaze up at the sky today and when you see a cloud reflect on the storm of God’s wrath that was approaching you before Christ. Give thanks that Jesus satisfied the wrath of God for sinners who receive Him.",
		questions: ["Why do many doubt a God who has wrath for sin? Why is a loving and forgiving God easier for many people to accept than a God who cannot tolerate the presence of sin?", "Read John 2:13-17. How does Jesus’ response to the desecration of the temple, a holy place of worship, help us see and understand in a concrete way God’s wrath toward sin?"],
		prayer: "Father God,\nThank you for sending your Son, Jesus, to satisfy your wrath for my sin. Help me to see you as holy and glorious and to understand the depths of my sin and its offense against you. Give me boldness to encourage those who are far from you to flee from the wrath to come and run to you for deliverance.\nAmen."
	},
	{
		id: "judgment",
		day: 8,
		word: "Judgment",
		image: "/cards/08.jpg",
		imageAlt: "An empty judge's bench and chair",
		verse: {
			ref: "Hebrews 9:27",
			text: "And just as it is appointed for man to die once, and after that comes judgment."
		},
		definition: "Judgment is God fairly judging every person’s life and giving what is due according to His holy and righteous standard . For those apart from Jesus the verdict is always guilty, resulting in eternal punishment.",
		gospelResponse: "Next time you sit in a chair, reflect on Christ sitting in the judge’s seat. Remember that in spite of His perfect knowledge of all of your sin, the case has been dismissed because His blood has cleansed us and the penalty has been paid.",
		questions: ["What comes to your mind when you think of the coming judgment? How does this make you feel?", "Read Hebrews 4:12-16. Contrast the reality of being exposed as guilty before God’s perfect judgment with the truth that we can have confidence to approach God’s throne of grace through Jesus, our perfect High Priest?"],
		prayer: "Father God,\nThank you that I no longer need to fear the coming judgment. I thank you that I have an Advocate, Jesus Christ the Righteous. Thank you for forgiving me for my sin and trespasses because of Jesus. Help me to live for you and stand in the righteousness of Christ.\nAmen."
	},
	{
		id: "condemnation",
		day: 9,
		word: "Condemnation",
		image: "/cards/09.jpg",
		imageAlt: "A prisoner sitting alone in a locked cell",
		verse: {
			ref: "John 3:18",
			text: "Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God."
		},
		definition: "Condemnation is God’s judicial verdict of guilt for sinners, resulting in the sentence of judgment and eternal separation from God. It is the opposite of justification.",
		gospelResponse: "When you close a door today, remember that apart from Christ the jail cell door was slammed shut. There was a closed door of separation between you and God forever. Rejoice that the door has been opened, the jail sentence has already been served by Jesus on your behalf.",
		questions: ["When was a time where you were found guilty or shown to be at fault? How did it feel?", "Read Romans 8:1. How does this truth that there is no condemnation for the believer change how you relate to God?"],
		prayer: "Father God,\nThank you for freeing me from the condemnation I deserved, for becoming forsaken on the cross so that I could be set free. Help me to walk in freedom not in condemnation. Silence the voice of the “accuser of the brethren” in my life. Though I was unrighteous, guilty, and condemned you have called me righteous. You have set me free. Thank you, my Savior!\nAmen."
	},
	{
		id: "incarnation",
		day: 10,
		word: "Incarnation",
		image: "/cards/10.jpg",
		imageAlt: "A newborn wrapped and lying in a wooden manger",
		verse: {
			ref: "John 1:14",
			text: "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth."
		},
		definition: "The incarnation is the act of the second person of the Trinity, the eternal Son of God, assuming a full and true human nature, becoming fully God and fully man in one person, Jesus Christ, to accomplish the work of redemption.",
		gospelResponse: "When you see a small child or an infant today give thanks that Jesus came into the world, that He put on human flesh, to become our perfect mediator and savior.",
		questions: ["What is your favorite thing about Christmas?", "How does the gospel start in the manger? Read Matthew 1:21. How was Jesus’ purpose made clear even before His birth?"],
		prayer: "Father God,\nThank you for coming into this world to save us. Thank you for humbling yourself to the point where you put on human flesh for a sinner such as me. Thank you for how Jesus demonstrates your love and desire to have a relationship with me, to be Immanuel, “God with me.” Help me to walk in an awareness of your nearness today.\nAmen."
	},
	{
		id: "gospel",
		day: 11,
		word: "Gospel",
		image: "/cards/11.jpg",
		imageAlt: "A town crier with a trumpet announcing news to a crowd",
		verse: {
			ref: "Luke 2:10-11",
			text: "And the angel said to them, ‘Fear not, for behold, I bring you good news of great joy that will be for all the people. For unto you is born this day in the city of David a Savior, who is Christ the Lord.’"
		},
		definition: "The gospel is the good news of what God has done in Jesus Christ to save sinners through His life, death, resurrection, and exaltation, calling all people to repent and believe for forgiveness of sins and eternal life.",
		gospelResponse: "When you see the “news” today whether on a screen, on social media, or in a newspaper, remember the best news that humanity ever received, the good news of Jesus.",
		questions: ["What is the best news you have ever received?", "How does understanding the gospel as good news bring light into the darkness of your life? Who can you share the good news of Jesus with today?"],
		prayer: "Good God Above,\nThank you for the good news of Jesus. Thank you that where sin abounded in my life and in the world, grace abounded all the more through your Son, Jesus Christ. Help me to boldly proclaim this good news in my life. Help me to not be ashamed of the gospel and remember that it is the power of God for salvation. Thank you for saving me through Jesus.\nAmen."
	},
	{
		id: "salvation",
		day: 12,
		word: "Salvation",
		image: "/cards/12.jpg",
		imageAlt: "A rescue boat cutting through heavy waves, crew searching the sea",
		verse: {
			ref: "Romans 1:16",
			text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes..."
		},
		definition: "Salvation is the gracious and sovereign act of God in which He rescues sinners from sin and judgment through faith in Jesus Christ, restores them to fellowship with Himself, and grants them eternal life by the power of His Spirit.",
		gospelResponse: "Go to a body of water today, and if you can see a boat even better! Remember your condition before you were saved, being lost at sea. Give thanks for your salvation as you gaze out at the water.",
		questions: ["What were you “drowning” in before you met Jesus? What are some of the things you were saved from?", "Read Psalm 18:1-19. In what ways does your experience of salvation mirror David’s?"],
		prayer: "My Savior,\nThank you for saving me. I was lost and you found me. I was drowning in my sin and you pulled me out. You are my Savior and I am trusting in you alone for salvation. I praise you and you alone. May I tell the story of you saving me today, boldly proclaiming the gospel of salvation to all who will listen.\nAmen."
	},
	{
		id: "atonement",
		day: 13,
		word: "Atonement",
		image: "/cards/13.jpg",
		imageAlt: "A lamb standing alone",
		verse: {
			ref: "1 Peter 2:24",
			text: "He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed."
		},
		definition: "Atonement is the once-for-all work of Christ in His life and sacrificial death in which He, as our substitute, bore the penalty of sin, satisfied God’s wrath, fulfilled the demands of divine justice, and reconciled sinners to God securing redemption for all who believe.",
		gospelResponse: "Grab a piece of paper, pencil, and an eraser. Lightly write some sins that come to your mind in your life or past on the paper then erase them completely and reflect on the power of the atonement of Christ, the Lamb of God, whose blood covers and cleanses you from all your sin.",
		questions: ["Have you ever covered up a mistake or something wrong that you did? Did anyone ever find out?", "How does Isaiah 1:18 help us understand the extent of the atonement in our lives?"],
		prayer: "Just and Righteous God,\nThank you for offering the sacrifice of your Son in my place. Thank you that his blood is enough to cover all my sins; that though my sins were as scarlet you have washed them white as snow (Isaiah 1:18). Thank you for atoning for my sin.\nAmen."
	},
	{
		id: "propitiation",
		day: 14,
		word: "Propitiation",
		image: "/cards/14.jpg",
		imageAlt: "Lightning striking a church steeple topped with a cross",
		verse: {
			ref: "1 John 2:2",
			text: "He is the propitiation for our sins, and not for ours only but also for the sins of the whole world."
		},
		definition: "Propitiation is the act by which God’s just wrath against sin is fully satisfied through a sacrificial substitute, Jesus Christ, so that God’s favor and forgiveness can be extended to sinners.",
		gospelResponse: "Next time you see a storm with lightning and thunder, remember the wrath of God that Jesus absorbed on your behalf. Praise God for the sufficiency of Jesus’ work on the cross on your behalf.",
		questions: ["Was there ever a time where you received a punishment or consequence for something you didn’t do? How did that feel?", "Read Exodus 34:6-7. How is God described? How does God’s mercy and justice find their perfect fulfillment in Jesus’ going to the cross to propitiate for our sin?"],
		prayer: "Heavenly Father,\nThank you for sending your Son as a substitute for me. I deserved that cross. I deserved your wrath. I deserved to be forsaken. Thank you, Jesus, for taking my place. Thank you for dying so that I can live. May I never forget the wondrous cross.\nAmen."
	},
	{
		id: "justification",
		day: 15,
		word: "Justification",
		image: "/cards/15.jpg",
		imageAlt: "A gavel resting on a sound block in a courtroom",
		verse: {
			ref: "Romans 3:24",
			text: "And are justified by his grace as a gift, through the redemption that is in Christ Jesus"
		},
		definition: "Justification is the judicial act of God in which he declares sinners righteous in His sight, not on the basis of their works, but solely on the basis of Christ’s righteousness imputed to them and received by faith alone.",
		gospelResponse: "Look for a courthouse or a desk today. When you see it, reflect on the legal decree of “not guilty” being made on your behalf because of Jesus. Give thanks that because of justification you can stand righteous before God.",
		questions: ["In what ways do we try to justify ourselves before God? Why does this always fail?", "Read Romans 8:31-38. How does justification affect our relationship to God?"],
		prayer: "Righteous God,\nThank you for justifying me through Jesus. Thank you that I no longer need to fear condemnation. Help me to daily walk in the confidence that nothing can separate me from the love of Christ. May the reality of my justification silence the accusations of the enemy.\nAmen."
	},
	{
		id: "mediation",
		day: 16,
		word: "Mediation",
		image: "/cards/16.jpg",
		imageAlt: "A stone bridge spanning a deep canyon between two cliffs",
		verse: {
			ref: "1 Timothy 2:5-6",
			text: "For there is one God, and there is one mediator between God and men, the man Christ Jesus, who gave himself as a ransom for all…"
		},
		definition: "Mediation is the work of Jesus Christ, the God-man, by which He stands between God and sinful humanity as the only representative who reconciles the two by His atoning death and ongoing intercession as our Great High Priest.",
		gospelResponse: "If you see a bridge today, consider the work of Christ on the cross that bridged the gap between us, undeserving sinners, and a holy God. Approach God’s throne of grace in prayer confidently, knowing that Jesus is the perfect Mediator.",
		questions: ["Can you think of a time you were in the role of mediator in your family, with friends, or in a work setting? How did you seek to represent both sides?", "What is the significance of Jesus becoming a man, taking on human flesh, in his work of mediation?"],
		prayer: "Holy God,\nI am unworthy to approach you in and of myself. Thank you for sending your one and only Son, Jesus, to make a way back to you. Thank you, Jesus, for dying on the cross for me so that I can have full communion with God. Thank you for bridging the gap, for mediating a new and better covenant with your blood.\nAmen."
	},
	{
		id: "redemption",
		day: 17,
		word: "Redemption",
		image: "/cards/17.jpg",
		imageAlt: "A man placing money into the open hands of another who kneels",
		verse: {
			ref: "Ephesians 1:7",
			text: "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace"
		},
		definition: "Redemption is God’s gracious act of purchasing and freeing His people from slavery to sin, death, and judgment through the payment of Christ’s blood, securing their release and restoration to Him.",
		gospelResponse: "Look for an opportunity to pay for someone's bill or do something that is usually another’s responsibility. Do so as anonymously as you can manage. Give thanks that Christ paid the price we owed even when we were dead in our sin.",
		questions: ["What is the greatest debt you ever owed? How would it have felt if someone else came along and paid it completely off?", "“Redemption is free, but it is not cheap.” Reflect on this truth. What was the cost of our redemption?"],
		prayer: "My Redeemer,\nThank you for paying the price that I owed. Thank you for purchasing my life with your blood. Help me to live in constant awareness of your sacrifice for me. May I never become entitled or ungrateful but rather walk in gratitude every day.\nAmen."
	},
	{
		id: "reconciliation",
		day: 18,
		word: "Reconciliation",
		image: "/cards/18.jpg",
		imageAlt: "A broken stone wall with light pouring through the opening",
		verse: {
			ref: "Colossians 1:19-20",
			text: "For in him all the fullness of God was pleased to dwell, and through him to reconcile to himself all things, whether on earth or in heaven, making peace by the blood of his cross."
		},
		definition: "Reconciliation is God ending the war and separation our sin created by the blood of His Son, Jesus Christ, and granting us lasting peace with Himself.",
		gospelResponse: "When you see a wall or a fence today remember that Jesus tore down that dividing wall between us and God the Father. Praise Him for reconciling us to our Maker.",
		questions: ["Have you ever been in conflict with someone and then had the conflict peacefully resolve? How did that feel when the tension was removed?", "Read Romans 5:10. In what ways were you an enemy of God before Christ? How are we reconciled to God?"],
		prayer: "God of peace,\nI praise you for sending your Son to reconcile me to yourself. Thank you for forsaking Jesus so I could be brought near. Thank you for sending the Prince of Peace to fix my relationship with you forever. May I continue to draw near to you every day through Jesus, the Reconciler.\nAmen."
	},
	{
		id: "forgiveness",
		day: 19,
		word: "Forgiveness",
		image: "/cards/19.jpg",
		imageAlt: "Hands tearing a debt certificate in two",
		verse: {
			ref: "Colossians 1:14",
			text: "In whom we have redemption, the forgiveness of sins."
		},
		definition: "Forgiveness is the gracious act of God by which He fully pardons sinners of their guilt, cancels their debt of sin, and no longer holds their transgressions against them because of Christ’s work on the cross.",
		gospelResponse: "Next time you make a payment or pay a bill, stop and tell God how grateful you are for His forgiving your debt of sin through the blood of Jesus.",
		questions: ["How is God’s forgiveness different then how we as fallen humans normally forgive?", "Read Psalm 103:12. When God forgives, what is the extent of His forgiveness?"],
		prayer: "Forgiving God,\nThank you for paying my debt. Thank you that I am free from the debt of sin I owed. Help me to walk in the reality of your total forgiveness of my sin through Jesus. Strengthen me to forgive others who sin against me in the same way you have forgiven me (Ephesians 4:32). Thank you for your mercy and grace.\nAmen."
	},
	{
		id: "covenant",
		day: 20,
		word: "Covenant",
		image: "/cards/20.jpg",
		imageAlt: "A bride and groom holding hands under a floral arch",
		verse: {
			ref: "Hebrews 9:15",
			text: "Therefore he is the mediator of a new covenant, so that those who are called may receive the promised eternal inheritance, since a death has occurred that redeems them from the transgressions committed under the first covenant."
		},
		definition: "A covenant is a divinely established, binding relationship in which God commits Himself to His people with promises and often confirms it with signs and blood.",
		gospelResponse: "The next time you partake in the Lord’s Supper, intentionally reflect on the new covenant. Give thanks for the blood of Christ which has washed away your sin and established your relationship with God forever through covenant.",
		questions: ["How does the unconditional nature of the new covenant, its being based entirely on the blood of Jesus shed for us, free us from guilt, shame, and dread even when we fail?", "How do the promises of God in Christ relate to wedding vows? What promises given in the new covenant can you hold tightly to today? (Example: Hebrews 13:5)"],
		prayer: "Now may the God of peace who brought again from the dead the Lord Jesus,\nthe great shepherd of the sheep, by the blood of the eternal covenant, equip me with everything good that I may do his will, working in me that which is pleasing in his sight, through Jesus Christ, to whom be glory forever and ever. (Hebrews 13:20-21)\nAmen."
	},
	{
		id: "regeneration",
		day: 21,
		word: "Regeneration",
		image: "/cards/21.jpg",
		imageAlt: "A tree split down the middle, dead on one side and living on the other",
		verse: {
			ref: "Titus 3:5",
			text: "He saved us, not because of works done by us in righteousness, but according to his own mercy, by the washing of regeneration and renewal of the Holy Spirit."
		},
		definition: "Regeneration is being born again through the Holy Spirit. It is a supernatural work of God in which a spiritually dead person is made alive.",
		gospelResponse: "Look for a dead or dying tree or plant today. When you find one, remember who you were before you were made alive through the work of the Spirit. Give thanks for the gospel that has given you new life in Christ!",
		questions: ["When you came to know Christ what was your experience of coming alive? What changed when you were regenerated?", "Read 2 Corinthians 5:17. What old things, those characteristics of the old dead man, do you need to put off? What new things, fruits of the Spirit, do you need to put on?"],
		prayer: "Awesome God,\nThank you for sending your Spirit and raising me to new life. Thank you for changing me, for opening my eyes to see Jesus. Thank you for transforming me and giving me a new nature. I thank you that I have been born again!\nAmen."
	},
	{
		id: "sealing",
		day: 22,
		word: "Sealing",
		image: "/cards/22.jpg",
		imageAlt: "A wax seal stamped on an official document with ribbons",
		verse: {
			ref: "Ephesians 1:13",
			text: "In him you also, when you heard the word of truth, the gospel of your salvation, and believed in him, were sealed with the promised Holy Spirit"
		},
		definition: "Sealing is the divine act by which the Holy Spirit marks believers as God’s own possession, guarantees their future inheritance, and secures them for salvation.",
		gospelResponse: "Next time you sign your signature on something, remember the signet ring by which you were sealed. Give thanks that God the Father sealed you with His Holy Spirit, claiming you as His forever.",
		questions: ["In what ways does the sealing of the Holy Spirit help us know that we are safe, belonging to God forever?", "Read Philippians 1:6. How does the work of the Spirit in sealing and indwelling guarantee this promise?"],
		prayer: "Father God,\nThank you for sending your Spirit into my life as a guarantee that I am yours. When the Spirit convicts me of sin, help me to confess it and by the power of the Spirit go and sin no more. I thank you that my being safe in your family does not depend on my performance, but it is safely secured and upheld by the Spirit. I thank you that I am kept and held by you.\nAmen."
	},
	{
		id: "adoption",
		day: 23,
		word: "Adoption",
		image: "/cards/23.jpg",
		imageAlt: "A smiling judge with a family receiving a child in court",
		verse: {
			ref: "Ephesians 1:4-5",
			text: "In love he predestined us for adoption to himself as sons through Jesus Christ, according to the purpose of his will"
		},
		definition: "Adoption means God welcomes believers into His family as dear children, giving us full rights and love as heirs in Christ.",
		gospelResponse: "When you pray this week make an intentional effort to pray to God as Father, remembering that He has adopted you into His family.",
		questions: [
			"How does being a child of God increase your sense of belonging?",
			"In what ways should viewing other Christians as part of your eternal family change how you respond to conflict?",
			"When you feel lonely or unwanted, how does the doctrine of adoption tell our hearts a different story?"
		],
		prayer: "Father God,\nThank you for adopting me into your family as Your child. Help me to remember who I am and what I have waiting for me as an heir in your kingdom. Help me to walk as a child of light in this world of darkness. May I see other Christians as my brothers and sisters. Would you increase my love for Your church, the family of God. Thank you for caring for me as a good, good Father.\nAmen."
	},
	{
		id: "rescue",
		day: 24,
		word: "Rescue",
		image: "/cards/24.jpg",
		imageAlt: "A firefighter carrying a person out of a burning room",
		verse: {
			ref: "Colossians 1:13",
			text: "He has rescued us from the domain of darkness and transferred us into the kingdom of the Son He loves."
		},
		definition: "Rescue (or deliverance) is God saving people from danger , freeing them from sin, evil, and judgment, both now and forever through Jesus.",
		gospelResponse: "Light a candle, firepit or fireplace today. As you look at the flames, visualize the burning house you were trapped in from which Jesus rescued you. Give thanks that though you were without hope He broke through and delivered you.",
		questions: ["Who or what were some of the threats that God rescued you from?", "Who is someone who you know who is enslaved in their sin in the domain of darkness? Pray that God would deliver them through the gospel."],
		prayer: "My Deliverer,\nThank you for pulling me out of the flames, for delivering me from the domain of darkness. You are my rescuer. Help me to rely on you even today amid temptation to deliver me from evil. Protect me and preserve me as I cling to you.\nAmen."
	},
	{
		id: "faith",
		day: 25,
		word: "Faith",
		image: "/cards/25.jpg",
		imageAlt: "An empty wooden chair in a quiet room",
		verse: {
			ref: "Romans 5:1",
			text: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ."
		},
		definition: "Faith is trusting Jesus alone to save you and relying on Him instead of yourself.",
		gospelResponse: "When you sit in a chair today, give thanks that God is holding you. Rejoice that Jesus can bear the weight of your sin as you trust in Him.",
		questions: ["In what areas of your life might you be relying on \"good works\" or religious activities instead of faith alone?", "What steps can you take today to deepen your reliance on God, especially if doubt or self-reliance creeps in?"],
		prayer: "God,\nThank you for saving me. Thank you for opening my eyes to trust in you alone for the forgiveness of sin. Help me to walk by faith. Forgive me for self-reliance and self-righteousness. Remove any doubts from my heart and mind. Help me to trust you completel y as my solid rock. May I rest confidently in you today.\nAmen."
	},
	{
		id: "repentance",
		day: 26,
		word: "Repentance",
		image: "/cards/26.jpg",
		imageAlt: "A U-turn sign beside a path through the trees",
		verse: {
			ref: "Mark 1:15",
			text: "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel."
		},
		definition: "Repentance is the turning of a sinner away from sin and toward God, involving a change of mind, heart, and direction of life.",
		gospelResponse: "As you drive or ride around today think of the U-turn that God calls everyone to make, turning from their sin and to the Savior, for the forgiveness of their sins.",
		questions: ["In what areas of your life are you experiencing a godly sorrow that leads to repentance? How can you foster godly sorrow for your sin? (See 2 Corinthians 7:10)", "How does the gospel of repentance of sin differ from the easy believism that is prominent among many Christians today?"],
		prayer: "God,\nI praise you that you are a merciful God, slow to anger and abounding in lovingkindness. Thank you for your patience with me. Convict me of sin in my life and may I, today, bear fruit in keeping with repentance. When I find myself today walking the wrong direction in my thoughts, attitudes, words, or deeds, strengthen me to turn around and to run to you. Thank you for always meeting me there on the path of repentance with love and grace in your eyes.\nAmen."
	},
	{
		id: "sanctification",
		day: 27,
		word: "Sanctification",
		image: "/cards/27.jpg",
		imageAlt: "A man putting on a clean white robe over worn clothes",
		verse: {
			ref: "1 Corinthians 6:11",
			text: "And such were some of you. But you were washed, you were sanctified, you were justified in the name of the Lord Jesus Christ and by the Spirit of our God."
		},
		definition: "Sanctification means God has set you apart as holy and His, and now He is making you more like Jesus.",
		gospelResponse: "When you put on clothes today remember the holiness of Christ in which you have already been clothed. Give thanks that your identity is not based on your performance.",
		questions: ["What is the difference between positional and progressive sanctification? How do you think understanding your identity in Christ as a saint (holy one) is instrumental in helping us become more like Jesus?", "What things in your life are unholy? Commit today to “take off” these garments of the sin and flesh and to “put on” the Lord Jesus Christ."],
		prayer: "God,\nThank you for sanctifying me. I am trusting that you, who began a good work in me, will bring it to completion. May I live out my new status as a saint, a holy child of God. May I remember that my position before you has been established through the work of Jesus and by the power of the Holy Spirit. Help me to live as who I am and who you have called me. Sanctify me today in your truth (John 17:17).\nAmen."
	},
	{
		id: "hope",
		day: 28,
		word: "Hope",
		image: "/cards/28.jpg",
		imageAlt: "An anchor set on the sea floor, chain rising toward the light",
		verse: {
			ref: "Hebrews 6:19",
			text: "We have this as a sure and steadfast anchor of the soul, a hope that enters into the inner place behind the curtain."
		},
		definition: "Hope is the confident expectation of future good, grounded in the promises of God and secured by the finished work of Jesus Christ.",
		gospelResponse: "Whenever you see a rock today think of Jesus, the solid rock to whom you are anchored. Remember that you are safe and secure, kept by God, in the storms of life.",
		questions: ["How does our response to trials and suffering reveal where our hope lies? Are you clinging to the gospel of hope?", "Read Ephesians 1:11-21. What is the role of hope in the Christian life? How are faith and hope related?"],
		prayer: "God,\nThank you for saving me and giving me a new hope. Help me to keep eternity on my mind, to remember that good is coming because of Jesus. May I cling to hope and may it abound in my soul today. May it be evident to others and may I be ready to give a reason for the hope that is in me (1 Peter 3:15). Help me to remain in you today, to be firmly anchored to Christ.\nAmen."
	},
	{
		id: "glorification",
		day: 29,
		word: "Glorification",
		image: "/cards/29.jpg",
		imageAlt: "A cut diamond shining with light",
		verse: {
			ref: "1 Corinthians 15:42-43",
			text: "So is it with the resurrection of the dead. What is sown is perishable; what is raised is imperishable. It is sown in dishonor; it is raised in glory. It is sown in weakness; it is raised in power."
		},
		definition: "Glorification is the wonderful moment when Jesus returns and God instantly makes every Christian completely perfect, like Jesus Himself, with no more sin, pain, weakness, or death, so we can live with Him forever in glory.",
		gospelResponse: "When you see jewelry today, think of the precious and flawless glorification we will experience at the coming of Christ.",
		questions: ["What are some of the hardships, temptations, and realities of living in this fallen world that you eagerly anticipate leaving behind when you enter glory?", "How should our identity as citizens of heaven change how we live in this life? (See Philippians 3:20-21)"],
		prayer: "Glorious God,\nThank you for the promise of glory. Help me to expectantly wait and anticipate this transformation into the image of Christ. When this world gets hard, may I remember the end of this story, being made like you forever. Thank you, that you will finish the work of salvation that you have begun in me on that day.\nAmen."
	},
	{
		id: "election",
		day: 30,
		word: "Election",
		image: "/cards/30.jpg",
		imageAlt: "The Lamb's Book of Life on a desk with a quill and candle",
		verse: {
			ref: "Ephesians 1:3-4",
			text: "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavenly places, even as he chose us in him before the foundation of the world, that we should be holy and blameless before him."
		},
		definition: "Election is God’s choice, made before the world began, to save people through Jesus, not because they earned it or were better than others, but because of His love and mercy.",
		gospelResponse: "When you see a book today, remember that if you have believed in Christ your name is written safe and secure as the redeemed of the Lord! Give thanks that you belong to the Lamb.",
		questions: ["How does knowing that God is in control and is the Author of our story give us peace in the midst of the storms of life?", "In Revelation 3:5, we’re told that those in Christ cannot have their names erased from the Lamb’s Book of Life. How does that truth strengthen your assurance?"],
		prayer: "Sovereign God,\nThank you that you get glory through redemption. Thank you for saving me according to your mercy and grace. May I boldly proclaim the gospel of Jesus Christ, declaring the praises of the one who called me out of darkness and into your marvelous light. You alone deserve the glory and honor and praise in my life. Thank you for the good news of Jesus, my Savior and Lord.\nAmen."
	}
];
var HOME_TITLE = "The Visual Gospel — 30-Day Devotional";
var HOME_DESCRIPTION = "A free companion to Philip Leineweber's Visual Gospel. Thirty pencil studies with definitions, ESV memory verses, reflection questions, and prayers.";
var GUIDE_TITLE = "All 30 Days — The Visual Gospel";
var GUIDE_DESCRIPTION = "Read every day of The Visual Gospel by Philip Leineweber: the word, ESV key verse, definition, reflection questions, gospel response, and prayer.";
function jsonLd(data) {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}
function homeJsonLd(origin) {
	return {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "WebApplication",
			name: BOOK.title,
			url: origin || void 0,
			applicationCategory: "EducationalApplication",
			operatingSystem: "Any",
			isAccessibleForFree: true,
			description: HOME_DESCRIPTION,
			author: {
				"@type": "Person",
				name: BOOK.author
			},
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD"
			}
		}, bookNode()]
	};
}
function guideJsonLd(origin) {
	const page = origin ? `${origin}/guide` : void 0;
	return {
		"@context": "https://schema.org",
		"@graph": [bookNode(), {
			"@type": "ItemList",
			name: "The Visual Gospel — 30 days",
			url: page,
			numberOfItems: CARDS.length,
			itemListElement: CARDS.map((card) => ({
				"@type": "ListItem",
				position: card.day,
				name: card.word,
				description: card.definition,
				url: page ? `${page}#day-${card.day}` : void 0
			}))
		}]
	};
}
function bookNode() {
	return {
		"@type": "Book",
		name: BOOK.title,
		author: {
			"@type": "Person",
			name: BOOK.author
		},
		isbn: BOOK.isbn,
		inLanguage: "en",
		url: BOOK.site,
		sameAs: BOOK.buy
	};
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSiteOrigin = createServerFn({ method: "GET" }).handler(createSsrRpc("86c95315d2ffa76375db474ce9dbff69fd295124ec4e2c89ecbfafeb009d6a5b"));
var Route$4 = createRootRoute({
	loader: () => getSiteOrigin(),
	head: ({ loaderData }) => {
		const origin = loaderData || "";
		const image = origin ? `${origin}/og.jpg` : "/og.jpg";
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: HOME_TITLE },
				{
					name: "description",
					content: HOME_DESCRIPTION
				},
				{
					name: "robots",
					content: "index, follow"
				},
				{
					name: "author",
					content: "Philip Leineweber"
				},
				{
					property: "og:title",
					content: HOME_TITLE
				},
				{
					property: "og:description",
					content: HOME_DESCRIPTION
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: image
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: HOME_TITLE
				},
				{
					name: "twitter:description",
					content: HOME_DESCRIPTION
				},
				{
					name: "twitter:image",
					content: image
				},
				{
					name: "theme-color",
					content: "#f3eee6"
				}
			],
			links: [
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "manifest",
					href: "/__grok/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/__grok/icon-180.png"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
				}
			]
		};
	},
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$1 = () => import("./routes-BYLlZ2iv.mjs");
var Route$3 = createFileRoute("/")({
	loader: () => getSiteOrigin(),
	head: ({ loaderData }) => {
		const origin = loaderData || "";
		return {
			links: origin ? [{
				rel: "canonical",
				href: `${origin}/`
			}] : [],
			meta: origin ? [{
				property: "og:url",
				content: `${origin}/`
			}] : [],
			scripts: [{
				type: "application/ld+json",
				children: jsonLd(homeJsonLd(origin))
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./guide-nC-d7BuI.mjs");
var Route$2 = createFileRoute("/guide")({
	loader: () => getSiteOrigin(),
	head: ({ loaderData }) => {
		const origin = loaderData || "";
		return {
			meta: [
				{ title: GUIDE_TITLE },
				{
					name: "description",
					content: GUIDE_DESCRIPTION
				},
				{
					property: "og:title",
					content: GUIDE_TITLE
				},
				{
					property: "og:description",
					content: GUIDE_DESCRIPTION
				},
				{
					name: "twitter:title",
					content: GUIDE_TITLE
				},
				{
					name: "twitter:description",
					content: GUIDE_DESCRIPTION
				},
				...origin ? [{
					property: "og:url",
					content: `${origin}/guide`
				}] : []
			],
			links: origin ? [{
				rel: "canonical",
				href: `${origin}/guide`
			}] : [],
			scripts: [{
				type: "application/ld+json",
				children: jsonLd(guideJsonLd(origin))
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$1 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async ({ request }) => {
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL(request.url).origin}/sitemap.xml\n`;
	return new Response(body, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=86400"
	} });
} } } });
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const origin = new URL(request.url).origin;
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/guide"].map((path) => `  <url><loc>${origin}${path}</loc><changefreq>monthly</changefreq></url>`).join("\n")}\n</urlset>\n`;
	return new Response(body, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=86400"
	} });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	GuideRoute: Route$2.update({
		id: "/guide",
		path: "/guide",
		getParentRoute: () => Route$4
	}),
	RobotsDottxtRoute: Route$1.update({
		id: "/robots.txt",
		path: "/robots.txt",
		getParentRoute: () => Route$4
	}),
	SitemapDotxmlRoute: Route.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { LAYERS as i, BOOK as n, CARDS as r, router_exports as t };
