const STATIC_CACHE = "static";
const STATIC_FILES = [
	"index-3.html",
	"script-3.js",
	"../assets/svg/floppy.svg",
	"../assets/css/style.css",
];

const DYNAMIC_CACHE = "dynamic";

self.addEventListener("install", async () => {
	console.info("[3] Service Worker installed");
	const cache = await caches.keys();
	if (!cache.length) {
		caches.open(STATIC_CACHE).then((cache) => {
			cache.addAll(STATIC_FILES).then(() => {
				console.log("[3] Service Worker added files to static cache");
			});
		}
		);
	}
	self.skipWaiting();
});

self.addEventListener("activate", () => {
	console.info("[3] Service Worker activated");
});

const getFromNetworkOrCache = async (request) => {
	const cacheResponse = await caches.match(request);
	console.info('cacheResponse', cacheResponse);
	if (cacheResponse) {
		console.info(`[3] Service Worker returned from cache: ${request.url}`);
		return cacheResponse;
	}
	else {
		const networkResponse = await fetch(request);
		const cache = await caches.open(DYNAMIC_CACHE);
		cache.put(request, networkResponse.clone());
		console.info(`[3] Service Worker saved to cache: ${request.url}`);
		console.info(`[3] Service Worker returned from network: ${request.url}`);
		return networkResponse;
	}
}

self.addEventListener("fetch", (event) => {
	event.respondWith(getFromNetworkOrCache(event.request));
});
