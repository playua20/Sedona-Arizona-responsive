<?php
$mail_to = 'admin@sedona.kl.com.ua'; // мой email

// Присвоение данных переменным из массива $ _POST
$name = $_POST['sender_name'];
$surname = $_POST['sender_surname'];
$patronymic = $_POST['sender_patronymic'];
$country = $_POST['sender_country'];
$count = $_POST['sender_count'];
$mail_from = $_POST['sender_mail'];
$phone = $_POST['sender_tel'];
$message = $_POST['sender_msg'];
$assessment = $_POST['assessment_r_group'];
$visited = implode($_POST['visited_ch_group']);
$response = $_POST["g-recaptcha-response"];
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => '6Ldrd0UUAAAAAGKPMhcxwud0OZigUQldbYM7s6mU',
    'response' => $_POST["g-recaptcha-response"]
);
$options = array(
    'http' => array(
        'method' => 'POST',
        'content' => http_build_query($data)
    )
);
$context = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success = json_decode($verify);
if ($captcha_success->success == false) {
    echo "<p>You are a bot! Go away!</p>";
} else if ($captcha_success->success == true) {
    echo "<p>You are not not a bot!</p>";
}

// Тема письма
$subject = 'sedona.kl.com.ua Сообщение от ' . $name;

//// html-контент для письма
//$content = '';

// Оформление письма:
$wrapper_s = '<div style="font-weight: bold; font-size: 14px; background: #63cd66; padding: 15px 30px; border: 3px solid #74C26D; box-shadow: inset 2px 3px 5px #444, inset -2px -2px 1px #ccc;">';
$item_s = '<div style="margin-bottom: 10px;">';
$option_s = '<span style="text-shadow: 1px 1px 0 #156282; color: #56B6C2;">';
$value_s = '<span style="text-shadow: 1px 1px 0 #858223; color: #fafa00; letter-spacing: 1px;">';
$div_e = '</div>';
$span_e = '</span>';
$br = '<br>';

// Строим body для email
$body_message = $wrapper_s . $item_s . $option_s . 'Имя: ' . $span_e . $value_s . $name . $span_e . $div_e . $br .
    $item_s . $option_s . 'Фамилия: ' . $span_e . $value_s . $surname . $span_e . $div_e . $br .
    $item_s . $option_s . 'Отчество: ' . $span_e . $value_s . $patronymic . $span_e . $div_e . $br .
    $item_s . $option_s . 'E-mail: ' . $span_e . $value_s . $mail_from . $span_e . $div_e . $br .
    $item_s . $option_s . 'Cтрана: ' . $span_e . $value_s . $country . $span_e . $div_e . $br .
    $item_s . $option_s . 'Персоны: ' . $span_e . $value_s . $count . $span_e . $div_e . $br .
    $item_s . $option_s . 'Тел.: ' . $span_e . $value_s . $phone . $span_e . $div_e . $br .
    $item_s . $option_s . 'Общее впечатление: ' . $span_e . $value_s . $assessment . $span_e . $div_e . $br .
    $item_s . $option_s . 'Посещенные достопримечательности: ' . $span_e . $value_s . $visited . $span_e . $div_e . $br .
    $item_s . $option_s . 'Сообщение: ' . $span_e . $value_s . $message . $span_e . $div_e . $div_e;

// Строим headers для сообщения
//	$headers = 'From: ' . $mail_from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua
$headers = 'From: ' . $mail_to . "\r\nContent-type: text/html; charset=\"utf-8\"\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
$headers .= 'Reply-To: ' . $mail_from . "\r\n";

$mail_sent = mail("$mail_to", "$subject", "$body_message", "$headers");

if ($mail_sent == true) { ?>
  <script language="javascript" type="text/javascript">
    alert('Спасибо за Ваше сообщение. Мы свяжемся с Вами в ближайшее время.');
    window.location = '/../feedback.html';
  </script>
<?php } else { ?>
  <script language="javascript" type="text/javascript">
    alert('Сообщение не отправлено. Пожалуйста, сообщите администратору сайта admin@sedona.kl.com.ua');
    window.location = '/../feedback.html';
  </script>
    <?php
} ?>

