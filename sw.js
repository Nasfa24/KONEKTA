const CACHE_NAME = 'konekta-v1';
const urlsToCache = [
    './',
    './index.html',
    './member.html',
    './gm.html',
    './logo.png',
    './manifest.json',
    './firebase-config.js'
];

// Menginstal Service Worker dan menyimpan cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Membuka cache dan menyimpan aset');
                return cache.addAll(urlsToCache);
            })
    );
});

// Mengaktifkan Service Worker dan menghapus cache lama jika ada update
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Mengambil data dari cache saat offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Jika file ada di cache, gunakan itu. Jika tidak, ambil dari internet.
                return response || fetch(event.request);
            })
    );
});