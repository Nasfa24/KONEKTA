self.addEventListener('install', (event) => {
    console.log('[Service Worker] Terinstal');
});

self.addEventListener('fetch', (event) => {
    // Logika offline/caching bisa ditambahkan di sini nanti.
    // Untuk sekadar memunculkan tombol install PWA, mendengarkan event fetch saja sudah cukup.
});