"use strict";

let navbarHandler;

document.addEventListener("DOMContentLoaded", () => {
  if (window.auroraBFCache?.isRestored()) return;

  const navbar = document.querySelector(".navbar-collapse");
  if (!navbar) return;

  navbarHandler = (e) => {
    if (e.target?.tagName === "A") {
      document.querySelectorAll("#navbarDropdownItems").forEach((item) => {
        item.classList.remove("show");
      });
    }
  };

  navbar.addEventListener("click", navbarHandler);
});

addEventListener("pagehide", () => {
  const navbar = document.querySelector(".navbar-collapse");
  if (navbar && navbarHandler) {
    navbar.removeEventListener("click", navbarHandler);
  }
});
