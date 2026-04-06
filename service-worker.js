const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/Gsterz400/',
  '/Gsterz400/index.html',
  '/Gsterz400/script.js',
  '/Gsterz400/manifest.json',
  '/Gsterz400/icon-192.jpg',
  '/Gsterz400/icon-512.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});