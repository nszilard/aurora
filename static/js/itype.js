"use strict";

$(function () {
  if (document.getElementById('typing-carousel-data') != undefined) {
    var ul = document.getElementById('typing-carousel-data').children;

    if (ul.length != 0) {
      var data = [];
      Array.from(ul).forEach(el => {
        data.push(el.textContent);
      })

      ityped.init('#ityped', {
        strings: data,
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 250,
        backDelay: 1000,
        showCursor: true,
        loop: true
      });
    }
  }
});
