const CACHE = "iepc-offline-v1";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js');

const offlineFallbackPage = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
          return await fetch(event.request);
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResponse = await cache.match(offlineFallbackPage);
          return cachedResponse;
        }
      })()
    );
  }
});