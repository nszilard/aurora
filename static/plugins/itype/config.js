"use strict";

window.addEventListener("DOMContentLoaded", () => {
  if (window.auroraBFCache?.isRestored()) return;

  const data = document.getElementById("typing-carousel-data")?.children;
  if (data == null || data.length == 0) return;

  const element = document.querySelector("#ityped");
  if (element) {
    element._itype = ityped.init("#ityped", {
      strings: Array.from(data).map(($el) => $el.textContent),
      typeSpeed: 60,
      backSpeed: 30,
      startDelay: 250,
      backDelay: 1000,
      showCursor: true,
      loop: true,
    });
  }
});
