{{- $baseURL := .Site.BaseURL -}}
{{- $parsed := urls.Parse $baseURL -}}
{{- $path := $parsed.Path | default "/" -}}
{{- if not (strings.HasSuffix $path "/") -}}
  {{- $path = printf "%s/" $path -}}
{{- end -}}

const VERSION = '0.6.2';
const CACHE_NAME = `{{ $baseURL | replaceRE "https?://" "" | replaceRE ":[0-9]+" "" | strings.TrimSuffix "/" | urlize }}-${VERSION}`;
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const BASE_PATH = '{{ $path }}';
const SCOPE_URL = '{{ $baseURL }}';

const resolveURL = (path) => {
  if (BASE_PATH === '/' || !path.startsWith('/')) return path;
  return BASE_PATH.replace(/\/$/, '') + path;
};

const ASSETS = {
  critical: ['/css/aurora.css', '/css/bootstrap.css', '/js/pwa.js', '/manifest.json'],
  home: [
    '/',
    '/plugins/itype/itype.min.js',
    '/plugins/itype/config.js',
    '/plugins/particles/particles.min.js',
    '/plugins/particles/config.js',
  ],
  portfolio: [
    '/portfolio/',
    '/js/navbar.js',
    '/plugins/itype/itype.min.js',
    '/plugins/itype/config.js',
    '/plugins/splide/splide.min.js',
    '/plugins/splide/config.js',
    '/css/splide.css',
    '/js/slider.js',
    '/js/expand.js',
    '/js/bfCache.js',
  ],
  posts: ['/posts/', '/js/navbar.js'],
  projects: ['/projects/', '/js/navbar.js'],
  single: ['/js/navbar.js', '/js/article.js'],
  background: [
    '/css/font-awesome.css',
    '/plugins/bootstrap/bootstrap.min.js',
    '/css/splide.css',
    '/theme/logo.svg',
    '/theme/favicon.svg',
    '/fonts/font-awesome/fa-solid-900.woff2',
    '/fonts/font-awesome/fa-brands-400.woff2',
    '/fonts/roboto-mono/normal.ttf',
    '/fonts/questrial/regular.ttf',
    '/fonts/manrope/normal.ttf',
  ],
};

const getPageType = (url) => {
  const path = new URL(url).pathname;
  const relativePath = path.startsWith(BASE_PATH.replace(/\/$/, ''))
    ? path.slice(BASE_PATH.replace(/\/$/, '').length)
    : path;
  let pageType;
  if (relativePath === '/' || relativePath === '/index.html' || relativePath === '') pageType = 'home';
  else if (relativePath === '/portfolio' || relativePath === '/portfolio/') pageType = 'portfolio';
  else if (relativePath === '/projects' || relativePath === '/projects/') pageType = 'projects';
  else if (relativePath === '/posts' || relativePath === '/posts/') pageType = 'posts';
  else pageType = 'single';

  return pageType;
};

const isExpired = (response) => {
  const cachedTime = response.headers.get('sw-cached-time');
  if (!cachedTime) return true;
  return Date.now() - parseInt(cachedTime) > CACHE_TTL;
};

const addCacheHeaders = (response, url) => {
  const headers = new Headers(response.headers);
  headers.set('sw-cached-time', Date.now().toString());

  if (url.match(/\.(css|js|json|woff2?|ttf|svg|png|jpg|jpeg|webp)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    headers.set('Cache-Control', 'public, max-age=604800');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const isInScope = (url) => {
  try {
    return url.startsWith(SCOPE_URL);
  } catch {
    return false;
  }
};

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        const clients = await self.clients.matchAll();
        const currentUrl = clients.length > 0 ? clients[0].url : SCOPE_URL;
        const pageType = getPageType(currentUrl);
        const assetsToCache = [...ASSETS.critical, ...ASSETS[pageType]].map(resolveURL);

        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
      .then(() => setTimeout(() => cacheBackground(), 1000))
      .catch((error) => {
        console.error(`[ServiceWorker] Install failed`, error);
      }),
  );
});

async function cacheBackground() {
  const cache = await caches.open(CACHE_NAME);
  const clients = await self.clients.matchAll();
  const currentUrl = clients.length > 0 ? clients[0].url : SCOPE_URL;
  const currentPageType = getPageType(currentUrl);

  const assetGroups = Object.keys(ASSETS).filter((group) => group !== 'critical' && group !== currentPageType);
  for (const group of assetGroups) {
    for (const url of ASSETS[group]) {
      try {
        const resolvedURL = resolveURL(url);
        const response = await fetch(resolvedURL);
        if (response.ok) await cache.put(resolvedURL, addCacheHeaders(response, resolvedURL));
      } catch (e) {}
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
      .catch((error) => {
        console.error(`[ServiceWorker] Activation failed`, error);
      }),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith('http')) return;
  if (!isInScope(e.request.url)) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(handleNavigationFetch(e.request));
  } else {
    e.respondWith(handleFetch(e.request));
  }
});

async function handleNavigationFetch(request) {
  try {
    const cached = await caches.match(request);
    if (cached && !isExpired(cached)) {
      return cached;
    }

    const response = await fetch(request);
    if (response.ok && isInScope(request.url)) {
      const responseClone = addCacheHeaders(response.clone(), request.url);
      caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const offlinePage = await caches.match(resolveURL('/offline/'));
    if (offlinePage) return offlinePage;

    return new Response('Offline', { status: 503 });
  }
}

async function handleFetch(request) {
  try {
    const cached = await caches.match(request);
    if (cached && !isExpired(cached)) {
      updateInBackground(request);
      return cached;
    }

    const response = await fetch(request);
    if (response.ok && isInScope(request.url)) {
      const responseClone = addCacheHeaders(response.clone(), request.url);
      caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    return new Response('Offline', { status: 503 });
  }
}

async function updateInBackground(request) {
  try {
    const response = await fetch(request);
    if (response.ok && isInScope(request.url)) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, addCacheHeaders(response.clone(), request.url));
    }
  } catch (error) {
    console.warn(`[ServiceWorker] Background update failed: ${request.url}`, error.message);
  }
}

self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
