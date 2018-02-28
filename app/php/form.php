<?php
$mail_to = 'admin@sedona.kl.com.ua'; // specify your email here

// Assigning data from $_POST array to variables
$name = $_POST['sender_name'];
$mail_from = $_POST['sender_email'];
$phone = $_POST['sender_phone'];
$message = $_POST['sender_message'];
$host_plan = $_POST['radio_group_1'];
$additional_options = implode(' | ', $_POST['checkbox_group_1']);

// Construct subject of the email
$subject = 'http://sedona.kl.com.ua/ Message from visitor ' . $name;

// Construct email body
$body_message = 'Имя: ' . $name . 'echo "<hr>"' . "\r\n";
$body_message .= 'email: ' . $mail_from . "\r\n";
$body_message .= 'Моб: ' . $phone . "\r\n";
$body_message .= 'Сообщение: ' . $message . "\r\n";
$body_message .= 'User selected the ' . $host_plan . ' hosting plan' . "\r\n";
$body_message .= 'Additional options selected: ' . $additional_options;

// Construct headers of the message
//	$headers = 'From: ' . $mail_from . "\r\n"; // не работает на бесплатном хостинге zzz.com.ua
$headers = 'From: ' . $mail_to . "\r\n";  // для бесплатного хостинга zzz.com.ua
$headers .= 'Reply-To: ' . $mail_from . "\r\n";

$mail_sent = mail($mail_to, $subject, $body_message, $headers);

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