/* Hidaya performance cache — bump CACHE_VERSION when releasing changes. */
const CACHE_VERSION = "hidaya-cache-v2";
const STATIC_CACHE = CACHE_VERSION + "-static";
const PAGE_CACHE = CACHE_VERSION + "-pages";
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(PAGE_CACHE);
    try { await cache.add(new URL("./index.html", self.registration.scope).href); } catch (_) {}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("hidaya-cache-") && !key.startsWith(CACHE_VERSION)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate" || /\.html$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(PAGE_CACHE);
      try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      } catch (_) {
        return (await cache.match(request)) || (await cache.match(new URL("./index.html", self.registration.scope).href)) || Response.error();
      }
    })());
    return;
  }
  if (/\.(?:avif|webp|png|jpe?g|gif|svg|css|js|woff2?)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(request);
      if (cached) {
        fetch(request).then(response => { if (response && response.ok) cache.put(request, response); }).catch(() => {});
        return cached;
      }
      try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      } catch (_) { return Response.error(); }
    })());
  }
});