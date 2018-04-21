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

// Строим body для email
$body_message = 'Имя: ' . $name . $br .
    'Фамилия: ' . $surname . $br .
    'Отчество: ' . $patronymic . $br .
    'E-mail: ' . $mail_from . $br .
    'Cтрана: ' . $country . $br .
    'Персоны: ' . $count . $br .
    'Тел.: ' . $phone . $br .
    'Общее впечатление: ' . $assessment . $br .
    'Посещенные достопримечательности: ' . $visited . $br .
    'Сообщение: ' . $message . $br;

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

