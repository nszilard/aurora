"use strict";

window.addEventListener('DOMContentLoaded', function () {
  const ul = document.getElementById('typing-carousel-data')?.children;
  if (ul == null || ul.length == 0) return

  const data = Array.from(ul).map($el => $el.textContent);

  ityped.init('#ityped', {
    strings: data,
    typeSpeed: 60,
    backSpeed: 30,
    startDelay: 250,
    backDelay: 1000,
    showCursor: true,
    loop: true
  });
});
