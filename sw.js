const CACHE_NAME = 'konekta-v2'; // Versi dinaikkan untuk memaksa browser membuang cache lama
const urlsToCache = [
    './',
    './index.html',
    './member.html',
    './gm.html',
    './logo.png',
    './manifest.json'
    // firebase-config.js telah dihapus dari antrean cache
];

// Menginstal Service Worker dan memaksa update
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Langsung aktifkan versi baru tanpa menunggu browser ditutup
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Membuka cache dan menyimpan aset V2');
                return cache.addAll(urlsToCache);
            })
    );
});

// Mengaktifkan Service Worker dan membunuh cache versi lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Membakar hantu cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Langsung terapkan ke semua halaman yang terbuka
});

// STRATEGI BARU: NETWORK FIRST, FALLBACK TO CACHE
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Jika ada internet, ambil yang paling baru dari server dan simpan ke memori
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => {
                // Jika sedang OFFLINE / Susah Sinyal, baru gunakan memori (cache)
                return caches.match(event.request);
            })
    );
});
