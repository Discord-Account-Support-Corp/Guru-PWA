const CACHE_NAME = "guru-pwa-v99";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];


self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES))

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
        .then(cacheNames => {

            return Promise.all(

                cacheNames
                .filter(name => name !== CACHE_NAME)
                .map(name => caches.delete(name))

            );

        })
        .then(() => self.clients.claim())

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});
