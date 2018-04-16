<?php
if ($_SERVER['REQUEST_METHOD']=="POST") {
    require('constant.php');

// Присвоение данных переменным из массива $ _POST
    $name = filter_var($_POST["sender_name"], FILTER_SANITIZE_STRING);
    $surname = filter_var($_POST["sender_surname"], FILTER_SANITIZE_STRING);
    $patronymic = filter_var($_POST["sender_patronymic"], FILTER_SANITIZE_STRING);
    $country = filter_var($_POST["sender_country"], FILTER_SANITIZE_STRING);
    $count = filter_var($_POST["sender_count"], FILTER_SANITIZE_STRING);
    $from = filter_var($_POST["sender_email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["sender_phone"], FILTER_SANITIZE_NUMBER_INT);
    $assessment = $_POST['assessment_r_group'];
    $visited = nl2br(implode(', ', $_POST['visited_ch_group']));
    $msg = filter_var($_POST["sender_msg"], FILTER_SANITIZE_STRING);

    $boundary = uniqid('np');

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
    if (empty($from)) {
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
    if (empty($msg)) {
        $empty[] = "<b>Сообщение</b>";
    }
//    if (!empty($empty)) {
//        $output = json_encode(array('type' => 'error', 'text' => 'Заполните поля: ' . implode(", ", $empty)));
//        die($output);
//    }
//
//    if (!filter_var($from, FILTER_VALIDATE_EMAIL)) { //email validation
//        $output = json_encode(array('type' => 'error', 'text' => '<b>' . $from . '</b>' . ' неверный email, пожалуйста, исправьте его.'));
//        die($output);
//    }
//
//    //reCAPTCHA validation
//    if (isset($_POST['g-recaptcha-response'])) {
//
//        require('recaptcha/autoload.php');
//
//        $recaptcha = new \ReCaptcha\ReCaptcha(SECRET_KEY, new \ReCaptcha\RequestMethod\SocketPost());
//
//        $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
//
//        if (!$resp->isSuccess()) {
//            $output = json_encode(array('type' => 'error', 'text' => 'Подтвердите <b>Captcha</b>!'));
//            die($output);
//        }
//    }

// Тема письма
    $subject = 'sedona.kl.com.ua Сообщение от ' . $name;

// Стиль письма:
    $wrapper_s = '<div style="font-weight: bold; font-size: 14px; background: #63cd66; padding: 30px; border: 3px solid #74C26D; box-shadow: inset 2px 3px 5px #444, inset -2px -2px 1px #ccc;">';
    $item_s = '<div style="margin-bottom: 10px;">';
    $option_s = '<span style="text-shadow: 1px 1px 0 #156282; color: #56B6C2;">';
    $value_s = '<span style="text-shadow: 1px 1px 0 #858223; color: #fafa00; letter-spacing: 1px;">';
    $div_e = '</div>';
    $span_e = '</span>';
    $br = '<br>';
    $semicolon = ';';

//// Строим body для email
    $body = $wrapper_s . $item_s . $option_s . 'Имя: ' . $span_e . $value_s . $name . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Фамилия: ' . $span_e . $value_s . $surname . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Отчество: ' . $span_e . $value_s . $patronymic . $semicolon . $span_e . $div_e . $br .
//    $item_s . $option_s . 'E-mail: ' . $span_e . $value_s . $from . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Электронная почта: ' . $span_e . $value_s . $from . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Cтрана: ' . $span_e . $value_s . $country . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Персоны: ' . $span_e . $value_s . $count . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Тел.: ' . $span_e . $value_s . $phone . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Общее впечатление: ' . $span_e . $value_s . $assessment . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Посещенные достопримечательности: ' . $span_e . $value_s . $visited . $semicolon . $span_e . $div_e . $br .
        $item_s . $option_s . 'Сообщение: ' . $span_e . $value_s . $msg . $semicolon . $span_e . $div_e . $div_e . $br .
        $item_s . $option_s . 'Фотографии: ' . $span_e . $value_s . $photos . $semicolon . $span_e . $div_e . $div_e;

// Мой email
    $to = 'admin@sedona.kl.com.ua'; // мой email
//    $from="admin@sedona.kl.com.ua";

// Строим headers для сообщения
//  $headers = 'From: ' . $from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua, нужно указывать свой email
//    $headers = 'From: ' . $to . "Content-type: text/html; charset=\"utf-8\"\r\n"; // Content-type: text/html - для отображения html тегов в сообщении
//$headers .= 'Reply-To: ' . $from . "\r\n";


    // generate a random string to be used as the boundary marker
    $mime_boundary = "==Multipart_Boundary_x" . md5(mt_rand()) . "x";

    // now we'll build the message headers
    $headers = "From: ' . $to\r\n" .
        "MIME-Version: 1.0\r\n" .
        "Content-Type: multipart/mixed;\r\n" .
        " boundary=\"{$mime_boundary}\"";

    // here, we'll start the message body.
    // this is the text that will be displayed
    // in the e-mail
//    $body = "This is an example";

//    body .= "Name:".$_POST["sender_name"]."Message Posted:".$_POST["modlist"];

    // next, we'll build the invisible portion of the message body
    // note that we insert two dashes in front of the MIME boundary
    // when we use it
    $body .= "This is a multi-part message in MIME format.\n\n" .
        "--{$mime_boundary}\n" .
        "Content-type: text/html; charset=\"utf-8\"\n" .
        "Content-Transfer-Encoding: 7bit\n\n" .
        $body . "\n\n";

    // now we'll process our uploaded files
    foreach ($_FILES as $userfile) {
        // store the file information to variables for easier access
        $tmp_name = $userfile['tmp_name'];
        $type = $userfile['type'];
        $name = $userfile['name'];
        $size = $userfile['size'];

        // if the upload succeded, the file will exist
        if (file_exists($tmp_name)) {

            // check to make sure that it is an uploaded file and not a system file
            if (is_uploaded_file($tmp_name)) {

                // open the file for a binary read
                $file = fopen($tmp_name, 'rb');

                // read the file content into a variable
                $data = fread($file, filesize($tmp_name));

                // close the file
                fclose($file);

                // now we encode it and split it into acceptable length lines
                $data = chunk_split(base64_encode($data));
            }

            // now we'll insert a boundary to indicate we're starting the attachment
            // we have to specify the content type, file name, and disposition as
            // an attachment, then add the file content.
            // NOTE: we don't set another boundary to indicate that the end of the
            // file has been reached here. we only want one boundary between each file
            // we'll add the final one after the loop finishes.
            $body .= "--{$mime_boundary}\n" .
                "Content-Type: {$type};\n" .
                " name=\"{$name}\"\n" .
                "Content-Disposition: attachment;\n" .
                " filename=\"{$fileatt_name}\"\n" .
                "Content-Transfer-Encoding: base64\n\n" .
                $data . "\n\n";
        }
    }
    // here's our closing mime boundary that indicates the last of the message
    $body .= "--{$mime_boundary}--\n";
    // now we just send the message
    $mail_sent = @mail("$to", "$subject", "$body", "$headers");
    if ($mail_sent) {
        $output = json_encode(array('type' => 'msg', 'text' => $name . ', Спасибо за отзыв'));
        die($output);
    } else {
        $output = json_encode(array('type' => 'error', 'text' => 'Не удалось отправить письмо, пожалуйста, свяжитесь с нами: ' . '<b>' . $to . '<b>'));
        die($output);
    }

}

