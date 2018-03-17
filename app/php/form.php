<?php
if ($_POST) {
  require('constant.php');

// Присвоение данных переменным из массива $ _POST
  $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
  $surname = filter_var($_POST["surname"], FILTER_SANITIZE_STRING);
  $patronymic = filter_var($_POST["patronymic"], FILTER_SANITIZE_STRING);
  $country = filter_var($_POST["country"], FILTER_SANITIZE_STRING);
  $count = filter_var($_POST["count"], FILTER_SANITIZE_STRING);
  $mail_from = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $phone = filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
  $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
  $assessment = filter_var($_POST["assessment"], FILTER_SANITIZE_STRING);
  $visited = $_POST["visited"];

  if (empty($name)) {
    $empty[] = "<b>Имя</b>";
  }
  if (empty($surname)) {
    $empty[] = "<b>Фамилия</b>";
  }
  if (empty($patronymic)) {
    $empty[] = "<b>Отчество</b>";
  }
  if (empty($country)) {
    $empty[] = "<b>Выберите свою страну</b>";
  }
  if (empty($count)) {
    $empty[] = "<b>Количество персон</b>";
  }
  if (empty($mail_from)) {
    $empty[] = "<b>Электронная почта</b>";
  }
  if (empty($phone)) {
    $empty[] = "<b>Контактный телефон</b>";
  }
  if (empty($assessment)) {
    $empty[] = "<b>Ваше общее впечатление</b>";
  }
  if (empty($visited)) {
    $empty[] = "<b>Посещенные достопримечательности</b>";
  }
  if (empty($message)) {
    $empty[] = "<b>Сообщение</b>";
  }
  if (!empty($empty)) {
    $output = json_encode(array('type' => 'error', 'text' => 'Заполните поля: ' . implode(", ", $empty)));
    die($output);
  }

  if (!filter_var($mail_from, FILTER_VALIDATE_EMAIL)) { //email validation
    $output = json_encode(array('type' => 'error', 'text' => '<b>' . $mail_from . '</b> Неверный email, пожалуйста, исправьте его.'));
    die($output);
  }

  //reCAPTCHA validation
  if (isset($_POST['g-recaptcha-response'])) {

    require('recaptcha/autoload.php');

    $recaptcha = new \ReCaptcha\ReCaptcha(SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());

    $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

    if (!$resp->isSuccess()) {
      $output = json_encode(array('type' => 'error', 'text' => 'Подтвердите <b>Captcha</b>!'));
      die($output);
    }
  }

// Тема письма
  $subject = 'sedona.kl.com.ua Сообщение от ' . $name;

//// html-контент для письма
//$content = '';

// Стиль письма:
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
  $mail_to = 'admin@sedona.kl.com.ua'; // мой email

// Строим headers для сообщения
//  $headers = 'From: ' . $mail_from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua, нужно указывать свой email
$headers = 'From: ' . $mail_to . "\r\nContent-type: text/html; charset=\"utf-8\"\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
//$headers .= 'Reply-To: ' . $mail_from . "\r\n";


$mail_sent = mail("$mail_to", "$subject", "$body_message", "$headers");
//  $headers = "From: " . $name . "<" . $mail_to . ">\r\nContent-type: text/html; charset=\"utf-8\"\r\n";
  if ($mail_sent) {
    $output = json_encode(array('type' => 'message', 'text' => $name . ', Спасибо за отзыв.'));
    die($output);
  } else {
    $output = json_encode(array('type' => 'error', 'text' => 'Unable to send email, please contact' . SENDER_EMAIL));
    die($output);
  }
}
?>
