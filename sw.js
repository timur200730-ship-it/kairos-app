const CACHE_NAME = 'kairos-offline-v3';

// Все локальные файлы + внешние библиотеки React и Babel сразу кладем в кэш при установке!
const PRECACHE_URLS = [
    './icon.svg',
    './',
    './index.html',
    './styles.css',
    './themes.js',
    './app.js',
    './manifest.json',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            // Кэшируем каждый ресурс отдельно, чтобы сбой одного не отменил остальные
            for (const url of PRECACHE_URLS) {
                try {
                    const response = await fetch(url, { mode: 'cors' });
                    if (response.ok) {
                        await cache.put(url, response);
                    }
                } catch (err) {
                    // Запасной вариант для opaque-ответов
                    try {
                        const fallbackResp = await fetch(url, { mode: 'no-cors' });
                        await cache.put(url, fallbackResp);
                    } catch (e) {}
                }
            }
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Кэшируем и обычные ответы (200), и внешние шрифты/скрипты (status === 0 / opaque)
                if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(async () => {
                // ОФЛАЙН-РЕЖИМ:
                // 1. Ищем точное совпадение (игнорируя параметры типа ?v=...)
                const cachedResponse = await caches.match(event.request, { ignoreSearch: true });
                if (cachedResponse) return cachedResponse;

                // 2. Если это открытие приложения с экрана "Домой" (navigate), отдаем index.html
                if (event.request.mode === 'navigate' || event.request.destination === 'document') {
                    const indexMatch = await caches.match('./index.html') || await caches.match('./');
                    if (indexMatch) return indexMatch;
                }
            })
    );
});
