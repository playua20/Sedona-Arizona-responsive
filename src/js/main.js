jQuery(function ($) {
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()) {
      $('.scroll-top').addClass('scroll-top--active');
    } else {
      $('.scroll-top').removeClass('scroll-top--active');
    }
  });
  $('.scroll-top').click(function () {
    $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
  });
});

// $(window).on('load', function () {
//   $('.preloader').delay(200).fadeOut('slow');
// });

jQuery(function ($) {
  $(window).on('load', function () {
    $('.preloader').fadeOut('fast');
  });
});

jQuery(function ($) {
  $('.main-nav__hamb--up, .main-nav__hamb--down').click(function () {
    $('.main-nav__item:not(.main-nav__item--logo)').slideToggle();
  });
});

jQuery(function ($) {
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

jQuery(function ($) {
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

jQuery(function ($) {
  $(function (e) {
    $("#form-send").on('submit', (function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);

        $("#form-send__status").hide();
        // $('#send-message').hide();
        $('#form-send__loader').show();
        $.ajax({
          url: "php/form.php",
          type: "POST",
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function (response) {
            $("#form-send__status").fadeIn();
            $('#form-send__loader').hide();
            if (response.type == "error") {
              // $('#send-message').show();
              $("#form-send__status").attr("class", "form-send__error");
            } else if (response.type == "msg") {
              // $('#send-message').hide();
              $("#form-send__status").attr("class", "form-send__success");
            }
            $("#form-send__status").html(response.text);
          },
          error: function () {
          }
        });
      }
    ));
  });
});

jQuery(function ($) {
  var dateFormat = "mm/dd/yy",
    from = $("#from")
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        showOtherMonths: true,
        selectOtherMonths: true
      })
      .on("change", function () {
        to.datepicker("option", "minDate", getDate(this));
      }),
    to = $("#to").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      showOtherMonths: true,
      selectOtherMonths: true
    })
      .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
      });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
});

jQuery(function ($) {
  $("#form-send__self").on("change", function () {
    if ($(this).val().length > 0) {
      $('.ch-indicator__self').addClass('ch-indicator--active');
      $('#form-send__self').addClass('form-send__self--active');
      $("#form-send__self").css("background", "transparent");
    } else {
      $('.ch-indicator__self').removeClass('ch-indicator--active');
      $('#form-send__self').removeClass('form-send__self--active');
      $("#form-send__self").css("background", "#f2f2f2");
    }
  });
});

jQuery(function ($) {
  $('a[href="#hash-footer"]').click(function () {
    $("#hash-footer").effect("highlight", 1000);
  });
});

jQuery(function ($) {
  $('.form-send__add-files label').click(function (e) {
    e.preventDefault();

    var file = $('.form-send__files-item').eq(0).clone();
    var n = $('.form-send__files-item').length;

    file.find('label').attr('for', 'file' + (n + 1)).text('Фото ' + (n + 1));
    file.find('input').attr('id', 'file' + (n + 1)).val('');

    $('.form-send__add-files').before(file);

    if ($('.form-send__files-item').length > 2) {
      $('.form-send__add-files').hide();
    } else {
      $('.form-send__add-files').show();
    }
    ;
  });
});
