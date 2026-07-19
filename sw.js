const CACHE_NAME = "guru-pwa-v5";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json"
];


self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(cacheNames => {

            return Promise.all(

                cacheNames
                .filter(cacheName => cacheName !== CACHE_NAME)
                .map(cacheName => caches.delete(cacheName))

            );

        })
        .then(() => self.clients.claim())

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
        .catch(() => caches.match(event.request))

    );

});
