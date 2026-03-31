const CACHE_NAME = 'tarot-destiny-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Cache รูปหลังไพ่ไว้เลยเพื่อความเร็ว
  'https://upload.wikimedia.org/wikipedia/commons/d/d4/Rider-Waite_Tarot_Card_Backs.jpg'
];

// Install Event - Precache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Fetch Event - Network First, fallback to Cache
self.addEventListener('fetch', event => {
  // ไม่ Cache API Call
  if (event.request.url.includes('/api/')) {
      return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});