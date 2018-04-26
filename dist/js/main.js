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


$(document).ready(function (e) {

  $("#form-send").on('submit', (function (e) {
      e.preventDefault();

      var checkboxes = [];
      $('input[name="visited_ch_group[]"]').each(function () {
        if ($(this).is(":checked")) {
          checkboxes.push($(this).val());
        }
      });
      checkboxes = checkboxes.join(", ").toString();

      $("#form-send__status").hide();
      // $('#send-message').hide();
      $('#form-send__loader').show();
        $.ajax({
          url: "php/form.php",
          type: "POST",
          dataType: 'json',
          cache: false,
          // contentType: false,
          // processData: false,
          data: {
            "name": $('input[name="sender_name"]').val(),
            "surname": $('input[name="sender_surname"]').val(),
            "patronymic": $('input[name="sender_patronymic"]').val(),
            "country": $('input[name="sender_country"]').val(),
            "count": $('input[name="sender_count"]').val(),
            "email": $('input[name="sender_email"]').val(),
            "phone": $('input[name="sender_phone"]').val(),
            "message": $('textarea[name="sender_msg"]').val(),
            "visited": checkboxes,
            "assessment": $('input[name="assessment_r_group"]:checked').val(),
            "g-recaptcha-response": $('textarea[id="g-recaptcha-response"]').val()
          },
          success: function (response) {
            $("#form-send__status").fadeIn();
            $('#form-send__loader').hide();
            if (response.type == "error") {
              // $('#send-message').show();
              $("#form-send__status").attr("class", "form-send__error");
            } else if (response.type == "message") {
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

$(document).ready(function (e) {

  var allowed_file_size   = "1048576"; //Разрешен размер файла 1 МБ
  var allowed_file_types  = ['image/png', 'image/gif', 'image/jpeg', 'image/pjpeg', 'application/x-zip-compressed', 'application/pdf']; //Допустимые типы файлов

  $("#form-send").on('submit', (function (e) {
      e.preventDefault();
      proceed = true;

      //проверять размер и тип файла перед загрузкой, работает в современных браузерах
      if(window.File && window.FileReader && window.FileList && window.Blob){
        var total_files_size = 0;
        $(this.elements['file_attach[]'].files).each(function(i, ifile){
          if(ifile.value !== ""){ //продолжить, только если выбран файл(ы)
            if(allowed_file_types.indexOf(ifile.type) === -1){ //проверить неподдерживаемый файл
              alert( ifile.name + " is unsupported file type!");
              proceed = false;
            }
            total_files_size = total_files_size + ifile.size; //добавить размер файла к общему размеру
          }
        });
        if(total_files_size > allowed_file_size){
          alert( "Убедитесь, что размер файла меньше 1 МБ!");
          proceed = false;
        }
      }

      var formData = new FormData($(this)[0]);

      $("#form-send__status").hide();
      // $('#send-message').hide();
      $('#form-send__loader').show();
      $.ajax({
        url: "php/form2.php",
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

$(function () {
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
