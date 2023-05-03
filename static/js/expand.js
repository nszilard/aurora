"use strict";

$(".toggle").on("click", function () {
  var $item = $(this);
  var $content = $item.prev();
  var $icon = $item.children();

  $content.slideToggle(500, function () {
    $icon.toggleClass("fa-angle-double-down fa-angle-double-up")
  });
});
