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
    shares: [ "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "pocket", "vkontakte", "line", "email"]
  });
});

$(function () {

  $('#contact-form').validator();

  $('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "../contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data)
        {
          var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
          if (messageAlert && messageText) {
            $('#contact-form').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
            grecaptcha.reset();
          }
        }
      });
      return false;
    }
  })
});
