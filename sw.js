const CACHE_NAME = 'kairos-mentor-v2';

// Основные файлы приложения, которые нужны для работы без интернета
const CORE_ASSETS = [
    './',
    './index.html',
    './styles.css',
    './themes.js',
    './app.js',
    './manifest.json'
];

// 1. Установка: кэшируем базовые файлы и сразу активируем новую версию
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CORE_ASSETS).catch(() => {
                // Если какой-то необязательный файл еще не загружен, не прерываем установку
            });
        })
    );
});

// 2. Активация: удаляем старые кэши при обновлении версии и берем управление страницей
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

// 3. Перехват запросов: сначала пробуем сеть (чтобы всегда были свежие обновления),
// а если интернета нет — отдаем сохраненную копию из кэша
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Если ответ успешный, сохраняем свежую копию в кэш (включая CDN React/Babel и шрифты)
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Если сети нет (офлайн), ищем файл в кэше
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Если запрашивается страница навигации, возвращаем index.html
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

