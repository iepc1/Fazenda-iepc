const CACHE_NAME = 'iepc-app-v10'; // mude o número (v10, v11...) toda vez que quiser forçar atualização

const FILES_TO_CACHE = [
  '/',
  'index.html',
  'midia.html',
  'sobre.html',
  'cultos.html',
  'biblia.html',
  'style.css',
  'script.js',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});