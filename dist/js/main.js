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

// $(window).on('load', function () {
//   $('.preloader').delay(200).fadeOut('slow');
// });

$(window).on('load', function () {
  $('.preloader').fadeOut('fast');
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
      if (data > 1) {
        arrow.find('input').val(parseInt(data) - 1);
      }
      return false;
    });
    arrow.keydown(function (event) {
      if ((event.keyCode > 57 || event.keyCode < 49) && (event.keyCode < 35 || event.keyCode > 39) && event.keyCode != 8 && event.keyCode != 46)
        return false;
    });
  });
});


$(document).ready(function (e){
  $("#form-send").on('submit',(function(e){
    e.preventDefault();
    var checkboxes = new Array();
    $('input[name="visited_ch_group[]"]:checked').each(function() {
      checkboxes.push(this.value);
    });

    // var checkboxes = new Array();
    // $('input:checked').each(function() {
    //   data['visited_ch_group[]'].push($(this).val());
    // });
    // var myCheckboxes = new Array();
    // $("input:checked").each(function() {
    //   data['myCheckboxes[]'].push($(this).val());
    // });
    $("#form-send__status").hide();
    // $('#send-message').hide();
    $('#form-send__loader').show();
    $.ajax({
      url: "php/form.php",
      type: "POST",
      dataType:'json',
      cache: false, //на время разработки
      data: {
        "name" :$('input[name="sender_name"]').val(),
        "surname" :$('input[name="sender_surname"]').val(),
        "patronymic" :$('input[name="sender_patronymic"]').val(),
        "country" :$('input[name="sender_country"]').val(),
        "count" :$('input[name="sender_count"]').val(),
        "email" :$('input[name="sender_email"]').val(),
        "phone" :$('input[name="sender_phone"]').val(),
        "message" :$('textarea[name="sender_msg"]').val(),
        // "visited":checkboxes,
        "visited":checkboxes,
        "assessment" :$('input[name="assessment_r_group"]:checked').val(),
        "g-recaptcha-response":$('textarea[id="g-recaptcha-response"]').val()},
      success: function(response){
        $("#form-send__status").fadeIn();
        $('#form-send__loader').hide();
        if(response.type == "error") {
          // $('#send-message').show();
          $("#form-send__status").attr("class","form-send__error");
        } else if(response.type == "message"){
          // $('#send-message').hide();
          $("#form-send__status").attr("class","form-send__success");
        }
        $("#form-send__status").html(response.text);
      },
      error: function(){}
    });
  }));
});

// $(document).ready(function () {
//   if ('.recaptcha-checkbox[aria-checked="true"]') {
//     $('.form-send__btn').prop('disabled', false);
//   } else if ('.recaptcha-checkbox[aria-checked="false"]') {
//     $('.form-send__btn').prop('disabled', true);
//   }
// });

// $(document).ready(function () {
//     $('.form-send__btn').prop('disabled', true);
// });

// $('.form-send__success--close').click(function () {
//   $('.form-send__success').fadeOut();
// });
//


// $(document).ready(function () {
//
// function sendBefore() {
//   $('.preloader').show().css('opacity', 0.5);
// }
//
// function sendSuccess() {
//   // $('.form-send__success').show();
//   alert("Ваш отзыв отправлен");
//   $('#form-send')[0].reset();
//   grecaptcha.reset();
//   $('.preloader').fadeOut('slow');
// }
//
//   $("#form-send").submit(function () {
//     $.ajax({
//       type: "POST",
//       url: "../php/send-form.html",
//       data : $(this).serialize(),
//       dataType: "html",
//       // sitekey : '6Ldrd0UUAAAAAGKPMhcxwud0OZigUQldbYM7s6mU',
//       // beforeSend: sendBefore,
//       beforeSend: "../recaptcha.php",
//       success: sendSuccess
//     });
//     return false;
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
