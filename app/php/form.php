<?php
$mail_to = 'admin@sedona.kl.com.ua'; // мой email

// Присвоение данных переменным из массива $ _POST
$name = $_POST['sender_name'];
$surname = $_POST['sender_surname'];
$mail_from = $_POST['sender_mail'];
$phone = $_POST['sender_tel'];
$message = $_POST['sender_msg'];
$host_plan = $_POST['assessment__r-group'];
$additional_options = implode(' | ', $_POST['visited__ch-group']);

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

//// Строим body для email
//$body_message = $item_s . $option_s . 'Имя: ' . $span_e .  $value_s . $name . $span_e . $div_e . $br;
//$body_message .= $item_s . $option_s . 'E-mail: ' . $span_e .  $value_s . $mail_from . $span_e . $div_e . $br;
//$body_message .= $item_s . $option_s . 'Тел.: ' . $span_e .  $value_s . $phone . $span_e . $div_e . $br;
//$body_message .= $item_s . $option_s . 'Сообщение: ' . $span_e .  $value_s . $message . $span_e . $div_e . $br;
//$body_message .= $item_s . $option_s . 'Пользователь выбрал ' . $span_e  . $value_s . $host_plan . $span_e . $option_s . ' хостинг план' . $span_e . $div_e . $br;
//$body_message .= $item_s . $option_s . 'Выбраны дополнительные опции: ' . $span_e  . $value_s . $additional_options . $span_e . $div_e;
// Строим body для email
$body_message = $wrapper_s . $item_s . $option_s . 'Имя: ' . $span_e . $value_s . $name . $span_e . $div_e . $br .
    $item_s . $option_s . 'E-mail: ' . $span_e . $value_s . $mail_from . $span_e . $div_e . $br .
    $item_s . $option_s . 'Тел.: ' . $span_e . $value_s . $phone . $span_e . $div_e . $br .
    $item_s . $option_s . 'Сообщение: ' . $span_e . $value_s . $message . $span_e . $div_e . $br .
    $item_s . $option_s . 'Пользователь выбрал ' . $span_e . $value_s . $host_plan . $span_e . $option_s . ' хостинг план' . $span_e . $div_e . $br .
    $item_s . $option_s . 'Выбраны дополнительные опции: ' . $span_e . $value_s . $additional_options . $span_e . $div_e . $div_e;


// Строим headers для сообщения
//	$headers = 'From: ' . $mail_from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua
$headers = 'From: ' . $mail_to . "\r\nContent-type: text/html; charset=utf-8\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
$headers .= 'Reply-To: ' . $mail_from . "\r\n";

$mail_sent = mail("$mail_to", "$subject", $span_e . "$body_message", "$headers");

if ($mail_sent == true) { ?>
  <script language="javascript" type="text/javascript">
    alert('Thank you for the message. We will contact you shortly.');
    window.location = '/../contact-form.html';
  </script>
<?php } else { ?>
  <script language="javascript" type="text/javascript">
    alert('Message not sent. Please, notify site administrator admin@sedona.kl.com.ua');
    window.location = '/../contact-form.html';
  </script>
    <?php
}
?>