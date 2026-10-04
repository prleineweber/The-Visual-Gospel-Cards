import { i as getRequestUrl, n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo.functions-Ce51rgjf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSiteOrigin_createServerFn_handler = createServerRpc({
	id: "86c95315d2ffa76375db474ce9dbff69fd295124ec4e2c89ecbfafeb009d6a5b",
	name: "getSiteOrigin",
	filename: "src/lib/seo.functions.ts"
}, (opts) => getSiteOrigin.__executeServer(opts));
var getSiteOrigin = createServerFn({ method: "GET" }).handler(getSiteOrigin_createServerFn_handler, () => {
	try {
		return new URL(getRequestUrl()).origin;
	} catch {
		return "";
	}
});
//#endregion
export { getSiteOrigin_createServerFn_handler };
