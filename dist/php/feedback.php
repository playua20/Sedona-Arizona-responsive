<?php
$mail_to = 'admin@sedona.kl.com.ua'; // мой email

// Присвоение данных переменным из массива $ _POST
$name = $_POST['sender_name'];
$surname = $_POST['sender_surname'];
$patronymic = $_POST['sender_patronymic'];
$mail_from = $_POST['sender_mail'];
$phone = $_POST['sender_tel'];
$message = $_POST['sender_msg'];
$assessment = $_POST['assessment_r_group_1'];
$visited = implode(', ', $_POST['visited_ch_group_1']);

// Construct subject of the email
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
    $item_s . $option_s . 'Тел.: ' . $span_e . $value_s . $phone . $span_e . $div_e . $br .
    $item_s . $option_s . 'Сообщение: ' . $span_e . $value_s . $message . $span_e . $div_e . $br .
    $item_s . $option_s . 'Общие впечатления: ' . $span_e . $value_s . $assessment . $span_e . $div_e . $br .
    $item_s . $option_s . 'Посещенные достопримечательности: ' . $span_e . $value_s . $visited . $span_e . $div_e . $div_e;

// Строим headers для сообщения
//	$headers = 'From: ' . $mail_from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua
$headers = 'From: ' . $mail_to . "\r\nContent-type: text/html; charset=utf-8\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
$headers .= 'Reply-To: ' . $mail_from . "\r\n";

$mail_sent = mail("$mail_to", "$subject", "$body_message", "$headers");

if ($mail_sent == true) { ?>
  <script language="javascript" type="text/javascript">
    alert('Спасибо за Ваше сообщение. Мы свяжемся с Вами в ближайшее время.');
    window.location = '/../feedback.html';
  </script>
<?php } else { ?>
  <script language="javascript" type="text/javascript">
    alert('Сообщение не от. Please, notify site administrator admin@sedona.kl.com.ua');
    window.location = '/../feedback.html';
  </script>
    <?php
}
?>