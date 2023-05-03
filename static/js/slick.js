"use strict";

$(function () {
  $(".skills .slider .wrapper").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    dots: true,
    dotsClass: "indicator",
    arrows: true,
    nextArrow: $(".skills .slider .next"),
    prevArrow: $(".skills .slider .previous"),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".languages .slider .wrapper").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    dots: true,
    dotsClass: "indicator",
    arrows: true,
    nextArrow: $(".languages .slider .next"),
    prevArrow: $(".languages .slider .previous"),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".achievements .slider .wrapper").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    variableWidth: true,
    adaptiveHeight: true,
    dots: true,
    dotsClass: "indicator",
    arrows: true,
    nextArrow: $(".achievements .slider .next"),
    prevArrow: $(".achievements .slider .previous"),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
