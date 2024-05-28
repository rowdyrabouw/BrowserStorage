self.addEventListener("install", (event) => {
	console.info("[1] Service Worker installed");
	self.skipWaiting();
});

self.addEventListener("activate", async () => {
	await caches.delete("static");
	await caches.delete("dynamic");
	console.info("[1] Service Worker activated");
});
