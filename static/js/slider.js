"use strict";

function slider(element, callback, scrollTarget = null) {
  if (!element) return;
  if (element.clientHeight === 0) {
    slideDown(element, callback);
  } else {
    slideUp(element, callback, scrollTarget);
  }
}

function slideDown(element, callback) {
  element.style.display = "block";
  animateElement(element, 0, element.scrollHeight, callback);
}

function slideUp(element, callback, scrollTarget) {
  const initialHeight = element.scrollHeight;
  const initialScrollY = scrollTarget ? window.pageYOffset : 0;
  animateElement(element, initialHeight, 0, callback, scrollTarget, initialScrollY);
}

function animateElement(element, startHeight, endHeight, callback, scrollTarget) {
  const duration = 500;
  const heightDiff = endHeight - startHeight;

  element.style.overflow = "hidden";
  element.style.height = startHeight + "px";

  let startTime;
  let previousHeight = startHeight;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentHeight = startHeight + heightDiff * progress;
    element.style.height = currentHeight + "px";

    if (scrollTarget && endHeight === 0) {
      const heightChange = previousHeight - currentHeight;
      if (heightChange > 0) {
        window.scrollBy(0, -heightChange);
        previousHeight = currentHeight;
      }
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.height = "";
      element.style.overflow = "";
      if (endHeight === 0) element.style.display = "none";
      callback?.();
    }
  }

  requestAnimationFrame(animate);
}

HTMLElement.prototype.slider = function (callback, scrollTarget = null) {
  slider(this, callback, scrollTarget);
};

window.slider = slider;
