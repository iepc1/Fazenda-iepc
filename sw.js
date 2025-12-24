const CACHE = "pwabuilder-offline-v1"; // Nome do cache

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js'); // Versão atual

const offlineFallbackPage = "offline.html"; // Nome da página offline (cria ela depois)

// Pré-cache da página offline
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

// Skip waiting pra atualizar rápido
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Estratégia StaleWhileRevalidate pra tudo
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// Fallback pra navegação (se falhar, mostra offline.html)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResponse = await cache.match(offlineFallbackPage);
          return cachedResponse || Response.error();
        }
      })()
    );
  }
});