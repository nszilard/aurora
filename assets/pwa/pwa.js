const PWA = {
  installPrompt: null,

  init() {
    if (window.auroraBFCache?.isRestored()) return;
    this.registerServiceWorker();
    this.setupInstall();
    this.setupLazyImages();
  },

  async registerServiceWorker() {
    if (!('serviceWorker' in navigator) || (location.protocol !== 'https:' && location.hostname !== 'localhost')) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('{{ "sw.js" | relURL }}', {
        scope: '{{ "" | relURL }}',
      });

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    } catch (error) {
      console.error('SW registration failed', error);
    }
  },

  setupInstall() {
    addEventListener('beforeinstallprompt', (e) => {
      if (document.getElementById('pwa-install-footer')) {
        e.preventDefault();
        this.installPrompt = e;
        this.showInstallButton();
      }
    });

    addEventListener('appinstalled', () => {
      this.hideInstallButton();
      this.installPrompt = null;
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.hideInstallButton();
    }
  },

  setupLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    if (this.imageObserver) this.imageObserver.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 },
    );

    document.querySelectorAll('img[data-src]').forEach((img) => {
      img.classList.add('lazy');
      observer.observe(img);
    });

    this.imageObserver = observer;
  },

  showInstallButton() {
    const btn = document.getElementById('pwa-install-footer');
    if (btn) {
      btn.classList.remove('d-none');
      btn.classList.add('show');
    }
  },

  hideInstallButton() {
    const btn = document.getElementById('pwa-install-footer');
    if (btn) {
      btn.classList.add('d-none');
      btn.classList.remove('show');
    }
  },

  async install() {
    if (!this.installPrompt) return false;

    try {
      this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;

      if (outcome === 'accepted') this.hideInstallButton();

      this.installPrompt = null;
      return outcome === 'accepted';
    } catch (error) {
      return false;
    }
  },

  isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  },

  getInstallPromptStatus() {
    return {
      available: !!this.installPrompt,
      installed: this.isInstalled(),
    };
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PWA.init());
} else {
  PWA.init();
}

window.aurorapwa = PWA;
