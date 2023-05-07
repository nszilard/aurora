"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function collapse(e) {
    const dropdowns = document.querySelectorAll('#navbarDropdownItems')

    if (e.target && e.target.tagName === "A") {
      dropdowns.forEach(item => {
        item.classList.remove("show");
      })
    }
  }

  const navbar = document.querySelector(".navbar-collapse");
  navbar.addEventListener("click", collapse)
});
