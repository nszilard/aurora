'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (window.auroraBFCache?.isRestored()) return;

  if (typeof Splide === 'undefined') {
    console.error('SplideJS is not loaded.');
    return;
  }

  const commonConfig = {
    type: 'loop',
    focus: 'center',
    autoplay: true,
    interval: 3000,
    pagination: true,
    arrows: true,
    autoWidth: true,
    gap: '1rem',
    ariaRoledescription: 'carousel',
    classes: {
      slide: 'splide__slide',
    },
  };

  // Skills Slider
  if (document.querySelector('.skills .slider')) {
    try {
      const skillsSlider = new Splide('.skills .slider', {
        ...commonConfig,
        perPage: 3,
        ariaLabel: 'Skills carousel',
        breakpoints: {
          767: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          },
        },
      }).mount();
      document.querySelector('.skills .slider').splide = skillsSlider;
    } catch (error) {
      console.error('Error initializing Skills slider:', error);
    }
  }

  // Languages Slider
  if (document.querySelector('.languages .slider')) {
    try {
      const languagesSlider = new Splide('.languages .slider', {
        ...commonConfig,
        perPage: 2,
        ariaLabel: 'Languages carousel',
        breakpoints: {
          767: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          },
        },
      }).mount();
      document.querySelector('.languages .slider').splide = languagesSlider;
    } catch (error) {
      console.error('Error initializing Languages slider:', error);
    }
  }

  // Achievements Slider
  if (document.querySelector('.achievements .slider')) {
    try {
      const achievementsSlider = new Splide('.achievements .slider', {
        ...commonConfig,
        perPage: 2,
        ariaLabel: 'Achievements carousel',
        breakpoints: {
          767: {
            perPage: 2,
          },
          575: {
            perPage: 1,
          },
        },
      }).mount();
      document.querySelector('.achievements .slider').splide = achievementsSlider;
    } catch (error) {
      console.error('Error initializing Achievements slider:', error);
    }
  }
});
