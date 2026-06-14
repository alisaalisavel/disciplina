const CACHE = 'disciplina-v20';
const ASSETS = ['/', '/index.html', '/style.css', '/app.js', '/manifest.json', '/icon.svg', '/icons/event.png', '/icons/сон.png', '/icons/тренировки.png', '/icons/финансы.png', '/icons/menu.png', '/icons/award.png', '/icons/chocolate-cake.png', '/icons/flowers.png', '/icons/heartbeat.png', '/icons/movie-clapper-open.png', '/icons/music.png', '/icons/open-book.png', '/icons/trolley.png', '/icons/writing-tool.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
