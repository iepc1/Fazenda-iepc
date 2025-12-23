const CACHE_NAME = 'iepc-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/midia.html',
  '/sobre.html',
  '/cultos.html',
  '/biblia.html',
  '/contato.html',
  '/style.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});