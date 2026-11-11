const CACHE_NAME = 'kairos-offline-v5';

const PRECACHE_URLS = [
    './',
    './index.html',
    './styles.css',
    './themes.js',
    './app.js',
    './manifest.json',
    './icon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js'
];

// 1. Установка: скачиваем и жестко сохраняем все файлы без редиректов
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (const url of PRECACHE_URLS) {
                try {
                    const req = new Request(url, { mode: 'cors', credentials: 'omit' });
                    const res = await fetch(req);
                    if (res.ok) {
                        await cache.put(req, res);
                    }
                } catch (e) {}
            }
        })
    );
});

// 2. Активация: очищаем старые кэши v1-v3
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
        ).then(() => self.clients.claim())
    );
});

// 3. Обработка запросов: Сеть -> если нет интернета, то Умный поиск в Кэше
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return networkResponse;
            })
            .catch(async () => {
                const cache = await caches.open(CACHE_NAME);

                // А. Сначала ищем точное совпадение URL
                const exactMatch = await cache.match(event.request, { ignoreSearch: true });
                if (exactMatch) return exactMatch;

                // Б. Если iOS или Babel изменил формат пути, ищем по конечному имени файла
                const reqUrl = new URL(event.request.url);
                const fileName = reqUrl.pathname.split('/').pop();

                if (fileName) {
                    const keys = await cache.keys();
                    for (const keyReq of keys) {
                        if (keyReq.url.endsWith('/' + fileName) || keyReq.url.endsWith(fileName)) {
                            return await cache.match(keyReq);
                        }
                    }
                }

                // В. Если это запуск самого приложения с иконки на экране
                if (event.request.mode === 'navigate' || event.request.destination === 'document') {
                    return (await cache.match('./index.html')) || (await cache.match('./'));
                }
            })
    );
});
