class PWA {
  constructor(self) {
    this.scope = self;
    this.host = `${self.location.protocol}//${self.location.host}`;
    this.CACHE_VERSION = "1.0.0";
    this.CACHE_NAME = `aurora-v${this.CACHE_VERSION}`;
    this.CACHE_ASSETS = [
      '/css/font-awesome.css',
      '/css/bootstrap.css',
      '/css/slick.css',
      '/css/aurora.css',
      '/fonts/font-awesome/fa-regular-400.ttf',
      '/fonts/font-awesome/fa-regular-400.woff2',
      '/fonts/font-awesome/fa-solid-900.ttf',
      '/fonts/font-awesome/fa-solid-900.woff2',
      '/fonts/roboto-mono/italic.ttf',
      '/fonts/roboto-mono/normal.ttf',
      '/fonts/questrial/regular.ttf',
      '/fonts/manrope/normal.ttf',
      '/js/article.js',
      '/js/expand.js',
      '/js/itype.js',
      '/js/navbar.js',
      '/js/pwa.js',
      '/js/slick.js',
      '/js/slider.js',
      '/theme/logo.png',
      '/theme/logo.svg',
      '/theme/favicon.svg',
      '/sw.js',
      '/manifest.json'
    ];
    this.CACHE_CONTENT = [
      '/portfolio/',
      '/projects/',
      '/posts/',
      '/categories/',
      '/categories/personal/',
      '/categories/professional/',
      '/topics/',
      '/offline/',
      '/index.html',
      '/404.html',
      '/'
    ];
    this.OFFLINE_PAGE = '/offline/';
    this.NOT_FOUND_PAGE = '/404.html';
    this.MAX_TTL = 86400;
    this.TTL_EXCEPTIONS = ["svg", "webp", "jpg", "jpeg", "png", "gif", "mp4"];
  }

  /**
   * canCache
   * @param {string} url
   * @returns {boolean}
  **/
  canCache(url) {
    if (url.startsWith("http://localhost")) {
      return false;
    }

    return url.toString().startsWith(this.host);
  }

  /**
   * getFileExtension
   * @param {string} url
   * @returns {string}
  **/
  getFileExtension(url) {
    const extension = url.split('.').reverse()[0].split('?')[0];
    return (extension.endsWith('/')) ? '/' : extension;
  }

  /**
   * getTTL
   * @param {string} url
   * @returns {number}
  **/
  getTTL(url) {
    if (typeof url === 'string') {
      const extension = this.getFileExtension(url);
      return ~this.TTL_EXCEPTIONS.indexOf(extension) ? null : this.MAX_TTL;
    }

    return null;
  }

  /**
   * installServiceWorker
   * @returns {Promise}
  **/
  async installServiceWorker() {
    try {
      await caches.open(this.CACHE_NAME)
        .then((cache) => {
          cache.addAll(this.CACHE_ASSETS);
          cache.addAll(this.CACHE_CONTENT);
          return cache
        })

      return this.scope.skipWaiting();
    }
    catch (err) {
      return console.error("unexpected error during service-worker installation: ", {err});
    }
  }

  /**
   * cleanupLegacyCache
   * @returns {Promise}
  **/
  cleanupLegacyCache() {
    const currentCaches = [this.CACHE_NAME];

    return new Promise((resolve, reject) => {
      caches.keys()
        .then((keys) => keys.filter((key) => !~currentCaches.indexOf(key)))
        .then((legacy) => {
          if (legacy.length) {
            Promise.all(legacy.map((legacyKey) => caches.delete(legacyKey)))
              .then(() => resolve())
              .catch((err) => {
                console.error("unexpected error while cleaning up legacy cache: ", {err});
                reject(err);
              });
          } else {
            resolve();
          }})
        .catch((err) => {
          console.error("unexpected error while cleaning up legacy cache: ", { err });
          reject(err);
        });
    });
  }

  /**
   * loadFromCache
   * @returns {Promise}
  **/
  async loadFromCache(request) {
    const cache = await caches.open(this.CACHE_NAME);
    const response = await cache.match(request);

    if (response) {
      const headers = response.headers.entries();
      let date = null;
      for (let pair of headers) {
        if (pair[0] === 'date') {
          date = new Date(pair[1]);
          break;
        }
      }

      if (!date) {
        return response;
      }
      const age = parseInt(((new Date().getTime() - date.getTime()) / 1000).toString());
      const ttl = this.getTTL(request.url);
      if (ttl === null || (ttl && age < ttl)) {
        return response;
      }
    }
  }

  register() {
    this.scope.addEventListener('install', event => {
      event.waitUntil(
        Promise.all([
          this.installServiceWorker(),
          this.scope.skipWaiting(),
        ])
        .catch((err) => {
          console.error("service worker: installation error: ", err);
          event.skipWaiting();
        })
      );
    });

    this.scope.addEventListener('activate', event => {
      event.waitUntil(
        Promise.all([
          this.cleanupLegacyCache(),
          this.scope.clients.claim(),
          this.scope.skipWaiting(),
        ])
        .catch((err) => {
          console.error("service worker: activation error: ", err);
          event.skipWaiting();
        })
      );
    });

    this.scope.addEventListener('fetch', event => {
      const { request } = event;

      event.respondWith(
        caches.open(this.CACHE_NAME)
          .then(async cache => {
            if (!this.canCache(request.url)) {
              return fetch(request);
            }

            const cachedResponse = await this.loadFromCache(request)
            return fetch(request.clone())
              .then(resp => {
                if (resp.status < 400) {
                  if (this.canCache(request.url)) {
                    cache.put(request, resp.clone());
                  }
                  return resp;
                }
                else {
                  return cachedResponse ? cachedResponse : cache.match(this.NOT_FOUND_PAGE);
                }
              })
              .catch(err => {
                return cachedResponse ? cachedResponse : cache.match(this.OFFLINE_PAGE);
              })
          })
      );
    });
  }
}

const pwa = new PWA(self);
pwa.register();
