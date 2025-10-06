const BFCache = {
  restored: false,

  init() {
    addEventListener('pageshow', this.handlePageShow.bind(this));
    addEventListener('pagehide', this.handlePageHide.bind(this));
  },

  handlePageShow(e) {
    if (e.persisted) {
      this.restored = true;
      this.restoreComponents();
    }
  },

  handlePageHide(e) {
    if (e.persisted !== false) {
      this.cleanupComponents();
    }
  },

  restoreComponents() {
    if (window.aurorapwa?.imageObserver) {
      window.aurorapwa.setupLazyImages();
    }

    if (window.particlesJS && window.particlesConfig) {
      particlesJS('particles-js', window.particlesConfig);
    }

    if (window.iType && document.querySelector('.itype')) {
      document.querySelectorAll('.itype').forEach((el) => {
        if (el._itype) el._itype.restart();
      });
    }

    if (window.Splide) {
      document.querySelectorAll('.splide').forEach((el) => {
        if (el.splide) el.splide.refresh();
      });
    }
  },

  cleanupComponents() {
    if (window.aurorapwa?.imageObserver) {
      window.aurorapwa.imageObserver.disconnect();
    }
  },

  isRestored() {
    return this.restored;
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BFCache.init());
} else {
  BFCache.init();
}

window.auroraBFCache = BFCache;
