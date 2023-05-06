"use strict";

window.addEventListener('DOMContentLoaded', () => {
  function addAnchor(element) {
    element.innerHTML = `<a href="#${element.id}" class="anchor">${element.innerHTML}</a>`
  }

  function wrap(table) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('table-wrapper');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }


  const postContent = document.getElementById('content');
  if (postContent != null) {
    const headerTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    for (let i = 0; i < headerTypes.length; i++) {
      const headers = postContent.querySelectorAll(headerTypes[i])
      if (headers) {
        headers.forEach(addAnchor)
      }
    }
  }

  const tables = document.querySelectorAll('table');
  tables.forEach(wrap);
});
