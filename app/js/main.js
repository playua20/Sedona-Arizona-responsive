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
    shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "pocket", "vkontakte", "line", "email"]
  });
});

$(document).ready(function () {
  $("#country").countrySelect();
});

$(document).ready(function () {
  $('.count__wrapper').each(function () {
    var arrow = $(this);
    arrow.find('a.count__arrow-up').click(function () {
      var data = arrow.find('input').val();
      arrow.find('input').val(parseInt(data) + 1);
      return false
    });
    arrow.find('a.count__arrow-down').click(function () {
      var data = arrow.find('input').val();
      if (data > 0) {
        arrow.find('input').val(parseInt(data) - 1);
      }
      return false;
    });
  });

  $(".count__wrapper").keydown(function(event) {
    if ((event.keyCode > 57 || event.keyCode <48) && (event.keyCode<35 || event.keyCode>39) && event.keyCode!=8 && event.keyCode!=46)
      return false;
  });

});

$('.form-send__success--close').click(function () {
  $('.form-send__success').delay(250).fadeOut('slow');
});

// function funcBefore() {
//   $(".form-send__preloader").show();
// }
//
// function funcSuccess(data) {
//   $(".form-send__success").show();
// }
//
// $(document).ready(function () {
//   $("#form-send").submit(function () {
//     $.ajax({
//       url: "/../php/feedback.php",
//       type: "POST",
//       dataType: "html",
//       beforeSend: funcBefore,
//       success: funcSuccess
//     });
//   });
// });

// $(document).ready(function () {
//   $(".ui-selectmenu-text").attr('name', 'sender_country');
// });

// $(function () {
//
//   $('#contact-form').validator();
//
//   $('#contact-form').on('submit', function (e) {
//     if (!e.isDefaultPrevented()) {
//       var url = "../contact.php";
//
//       $.ajax({
//         type: "POST",
//         url: url,
//         data: $(this).serialize(),
//         success: function (data)
//         {
//           var messageAlert = 'alert-' + data.type;
//           var messageText = data.message;
//
//           var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
//           if (messageAlert && messageText) {
//             $('#contact-form').find('.messages').html(alertBox);
//             $('#contact-form')[0].reset();
//             grecaptcha.reset();
//           }
//         }
//       });
//       return false;
//     }
//   })
// });
