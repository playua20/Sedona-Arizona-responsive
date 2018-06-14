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
  var dateFormat = "mm/dd/yy";
  $("#from").datepicker({
    changeMonth: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    maxDate: 0,
    onSelect: function (selectedDate) {
      $('#to').datepicker("option", "minDate", selectedDate);
    }
  });
  $("#to").datepicker({
    changeMonth: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    maxDate: 0,
    onSelect: function (selectedDate) {
      $('#from').datepicker("option", "maxDate", selectedDate);
    }
  });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  };
});

jQuery(function ($) {
  if ($('#ui-datepicker-div').is(':visible')) {
    $('#ui-datepicker-div').width($('.form-send__item-date-from input').outerWidth());
  }
});

jQuery(function ($) {
  $("#form-send__self").keydown(function () {
    if ($(this).val().length >= 2) {
      $(this).attr("name", "visited_ch_group[]");
      $('.ch-indicator__self').addClass('ch-indicator--active');
      $(this).addClass('form-send__self--active');
      $(this).css("background", "transparent");
    } else if ($(this).val().length <= 1) {
      $(this).removeAttr('name', 'visited_ch_group[]');
      $('.ch-indicator__self').removeClass('ch-indicator--active');
      $(this).removeClass('form-send__self--active');
      $(this).css("background", "#f2f2f2");
    }
  });
});

jQuery(function ($) {
  $('a[href="#hash-footer"]').click(function () {
    $("#hash-footer").effect("highlight", 1000);
  });
});

jQuery(function ($) {

  $('.form-send__add-files label').click('rm', function (e) {
    e.preventDefault();

    var file = $('.form-send__files-item').eq(0).clone();
    var n = $('.form-send__files-item').length;

    file.find('input').val('');

    $('.form-send__add-files').before(file);
    addBtn();
    counter();
  });

  function counter() {
    var i = 1;
    $('.form-send__files-item').each(function () {
      $(this).find('label').attr('for', 'file' + i).text('Фото ' + i++);
      $(this).find('input').attr('id', 'file' + (i -1));
    });
  }
  counter();

  function rm() {
    $('.form-send__userfiles').on("click", ".del-file", function () {
      if ($('.form-send__files-item').length > 1) {
        $(this).closest('.form-send__files-item').remove();
      } else if ($('.form-send__files-item').length <= 1) {
        $(this).prev('.form-send__files-item input').val('');
      }
      counter();
      addBtn();
    });
  };
  rm();

  function addBtn() {
    if ($('.form-send__files-item').length > 2) {
      $('.form-send__add-files').hide();
    } else if ($('.form-send__files-item').length < 3) {
      $('.form-send__add-files').show();
    };
  };
});
