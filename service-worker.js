const CACHE_NAME = 'dinero05-v1';
const urlsToCache = [
  '/dinero05/',
  '/dinero05/index.html',
  '/dinero05/manifest.json',
  '/dinero05/icon-192.png',
  '/dinero05/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.warn('Falló el cacheo:', err))
  );
});

self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  if (requestURL.pathname.startsWith('/dinero05/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});