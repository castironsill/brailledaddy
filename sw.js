// sw.js — BrailleDaddy service worker.
//
// Makes the installed PWA genuinely usable with no network: the app shell and
// the ~2 MB liblouis engine are pre-cached on install, so the translator loads
// and runs offline. Translation itself never touched the network — but until
// now the page still had to be fetched to start.
//
// The app has no third-party requests at all (the brand font is self-hosted),
// so everything it needs is same-origin and precacheable.
//
// Strategies:
//   navigations      -> network-first, fall back to the cached page (offline)
//   same-origin GET  -> stale-while-revalidate (instant, self-healing on deploy)
//
// Bump CACHE_VERSION to force a clean re-precache. Note that
// stale-while-revalidate already picks up changed assets on the next visit, so
// a bump is only needed when the precache LIST itself changes.

const CACHE_VERSION = 'v2';
const PRECACHE = `brailledaddy-precache-${CACHE_VERSION}`;
const RUNTIME = `brailledaddy-runtime-${CACHE_VERSION}`;

// Every URL here must exist — cache.addAll() rejects wholesale on a single 404.
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/vendor/liblouis/build-no-tables-utf16.js',
  '/vendor/liblouis/easy-api.js',
  '/vendor/liblouis/tables.js',
  '/vendor/liblouis/braille-engine.js',
  '/fonts/hanken-grotesk-800-latin.woff2',
  '/accessibility.html',
  '/site.webmanifest',
  '/favicon.svg',
  '/favicon-192.png',
  '/apple-touch-icon.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const keep = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => !keep.includes(n)).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // nothing third-party to handle

  // Page loads: prefer the network so deploys land immediately, but fall back
  // to the cached shell when there is no connection.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PRECACHE).then((cache) => cache.put('/index.html', copy));
          return response;
        })
        .catch(() => caches.match('/index.html').then((c) => c || caches.match('/')))
    );
    return;
  }

  // Static assets: answer from cache instantly, refresh it in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
