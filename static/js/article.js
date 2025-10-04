"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const postContent = document.getElementById("content");
  if (postContent) {
    postContent.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((element) => {
      if (!element.querySelector(".anchor")) {
        element.innerHTML = `<a href="#${element.id}" class="anchor">${element.innerHTML}</a>`;
      }
    });
  }

  document.querySelectorAll("table").forEach((table) => {
    if (table.parentNode && !table.parentNode.classList.contains("table-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("table-wrapper");
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
});
