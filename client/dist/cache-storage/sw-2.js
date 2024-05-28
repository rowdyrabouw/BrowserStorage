const STATIC_CACHE = "static";
const STATIC_FILES = [
	"index-3.html",
	"script-3.js",
	"../assets/svg/floppy.svg",
	"../assets/css/style.css",
];

self.addEventListener("install", async () => {
	console.info("[2] Service Worker installed");
	const cache = await caches.keys();
	console.info('cache length', cache.length);
	if (!cache.length) {
		caches.open(STATIC_CACHE).then((cache) => {
			cache.addAll(STATIC_FILES).then(() => {
				console.log("[2] Service Worker added files to static cache");
			});
		}
		);
	}
	self.skipWaiting();
});

self.addEventListener("activate", () => {
	console.info("[2] Service Worker activated");
});

const getFromNetworkOrCache = async (request) => {
	const cacheResponse = await caches.match(request);
	console.info('cacheResponse', cacheResponse);
	if (cacheResponse) {
		console.info(`[2] Service Worker returned from cache: ${request.url}`);
		return cacheResponse;
	}
	else {
		const networkResponse = await fetch(request);
		console.info(`[2] Service Worker returned from network: ${request.url}`);
		return networkResponse;
	}
}

self.addEventListener("fetch", (event) => {
	event.respondWith(getFromNetworkOrCache(event.request));
});
