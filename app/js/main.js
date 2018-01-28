
$(window).scroll(function() {
  if ($(this).scrollTop() > $(this).height()) {
    $('.top').addClass('active');
  } else {
    $('.top').removeClass('active');
  }
});
$('.top').click(function() {
  $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});

$(window).on('load', function() {
  $('.preloader').delay(500).fadeOut('slow');
});

// $(function() {
//   $(".animated").on("mouseover", function() {
//     $(this).addClass("hinge");
//   }).on("mouseleave", function() {
//     $(this).removeClass("hinge");
//   })
// })

$(document).ready(function () {
  $('.main-nav__hamb--up, .main-nav__hamb--down').click(function () {
    $('.main-nav__item:not(.main-nav__item--logo)').slideToggle();
  });
});

$(document).ready(function() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#view').setZoomPicture({
      thumbsContainer: '#pics-thumbs',
      prevContainer: '#nav-left-thumbs',
      nextContainer: '#nav-right-thumbs',
      loadMsg: 'Loading...'
    });
  }
  // else  if (window.matchMedia("(min-width: 768px)").matches) {
  //   $('#view').setZoomPicture({
  //     thumbsContainer: '#pics-thumbs',
  //     prevContainer: '#nav-left-thumbs',
  //     nextContainer: '#nav-right-thumbs',
  //     zoomContainer: '#zoom',
  //     loadMsg: 'Loading...'
  //   });
  // };
});

// $(document).ready(function() {
//   $('#view').setZoomPicture({
//     if (window.matchMedia("(min-width: 768px)").matches) {
//     zoomContainer: '#zoom'
//   }
//   });
// });
// ||  - оператор или