// Простейший Service Worker для установки приложения
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('fetch', (e) => {
  // Пока не кэшируем, просто пропускаем запросы (чтобы не мешать разработке)
});
