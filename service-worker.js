const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/Gsterz300/',
  '/Gsterz300/index.html',
  '/Gsterz300/script.js',
  '/Gsterz300/manifest.json',
  '/Gsterz300/icon-192.jpg',
  '/Gsterz300/icon-512.jpg'
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