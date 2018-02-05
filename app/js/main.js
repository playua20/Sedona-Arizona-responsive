$(window).scroll(function () {
  if ($(this).scrollTop() > $(this).height()) {
    $('.top').addClass('active');
  } else {
    $('.top').removeClass('active');
  }
});

$('.top').click(function () {
  $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});

$(window).on('load', function () {
  $('.preloader').delay(500).fadeOut('slow');
});

$(document).ready(function () {
  $('.main-nav__hamb--up, .main-nav__hamb--down').click(function () {
    $('.main-nav__item:not(.main-nav__item--logo)').slideToggle();
  });
});

$(document).ready(function () {
  $('.parent-container').magnificPopup({
    delegate: '.photo__item > a', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery: {enabled: true},
    image: {
      cursor: 'mfp-zoom-out-cur',
    },
  });
  // $('.mfp-content .mfp-figure figure').append('.photo__item-caption');
});

$(document).ready(function () {
  $("#share").jsSocials({
    shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
  });
});
