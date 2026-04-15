// Nome da nossa memória cache (onde guardamos os ficheiros)
const CACHE_NAME = 'libraslingo-v1';

// O que queremos guardar para funcionar offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar o Service Worker e guardar os ficheiros
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Ficheiros guardados na cache!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Quando a app pedir algo (como uma imagem ou o index), verifica se tem guardado
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se tiver guardado, usa. Se não, vai buscar à internet.
        return response || fetch(event.request);
      })
  );
});