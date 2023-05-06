"use strict";

const toggleIcons = document.querySelectorAll('.toggle')
toggleIcons.forEach(toggle => {
  toggle.addEventListener('click', function () {
    var content = this.previousElementSibling;
    var icon = this.querySelector('.fas');
    const card = this.closest('.details')

    content.slider(() => {
      content.classList.toggle('hidden');

      if (content.classList.contains('hidden')) {
        icon.classList.replace('fa-angle-double-up', 'fa-angle-double-down');
        card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      } else {
        icon.classList.replace('fa-angle-double-down', 'fa-angle-double-up');
      }
    });
  });
})
