'use strict';
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.previousElementSibling;
      const icon = toggle.querySelector('.fas');
      const card = toggle.closest('.details');
      if (!content || !icon) return;

      slider(
        content,
        () => {
          content.classList.toggle('hidden');
          if (content.classList.contains('hidden')) {
            icon.classList.replace('fa-angle-double-up', 'fa-angle-double-down');
          } else {
            icon.classList.replace('fa-angle-double-down', 'fa-angle-double-up');
          }
        },
        card,
      );
    });
  });
});
