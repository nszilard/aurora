"use strict";

const updateNavBar = () => {
  if ($(document).scrollTop() > 10) {
    $('#top-navbar').removeClass('initial-navbar');
    $('#top-navbar').addClass('final-navbar shadow');
  } else {
    $('#top-navbar').removeClass('final-navbar shadow');
    $('#top-navbar').addClass('initial-navbar');
  }
};

$(function () {
  $(document).scroll(function () {
    updateNavBar();
  });

  var navMain = $(".navbar-collapse");
  if (navMain) {
    navMain.on("click", "a", null, function (e) {
      $('.navbar-collapse').collapse('hide');
    });
  }

  updateNavBar();
});
