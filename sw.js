//?Asignar nombre y version de la cache

const CACHE_NAME= 'v1_cache_BCH_PWA';

//?configuración de los ficheros a subir a la cache de la aplicacion.
var urlsToCache=[
    './',
    './css/styles.css',
    './balon.jpg',
    './estadio.jpg',
    './ucl1.jpg',
    './favicon/android-chrome-192x192.png',
    './favicon/android-chrome-512x512.png',
    './favicon/apple-touch-icon.png',
    '/favicon/browserconfig.xml',
    './favicon/favicon-16x16.png',
    './favicon/favicon-32x32.png',
    './favicon/favicon.ico',
    './favicon/mstile-150x150.png',
    './favicon/safari-pinned-tab.svg'
];
/**
 * Eventos
 */

self.addEventListener('install', e=>{
    //utilizamos la variable del evento

    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).then(()=>{
                self.skipWaiting();
            })
        }).catch(err=> console.log('No se ha registrado el cache', err))
    );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(cacheName.map(cacheNames => {
                if(cacheWhitelist.indexOf(cacheName) == -1){
                    //borrar elementos que no se necesitan
                    return cache.delete(cacheName);
                }
            }))
        }).then(() => {
            self.clients.claim();
        })
    );
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res;
                }
                return fetch(e.request);
            }
        )
    );
})