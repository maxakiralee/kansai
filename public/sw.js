self.addEventListener('install', (event) => {
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
	// Network-first for same-origin GETs
	const req = event.request
	if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
	event.respondWith(
		fetch(req).catch(() => caches.match(req))
	)
})


