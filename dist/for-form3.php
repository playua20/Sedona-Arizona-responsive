<?php
require('php/phpmailer/src/PHPMailer.php');
require('php/phpmailer/src/SMTP.php');
//require('php/phpmailer/src/OAuth.php');
//require('php/phpmailer/src/Exception.php');
//require('php/phpmailer/src/POP3.php');

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port     = 587;
$mail->Username = "admin@sedona.kl.com.ua";
$mail->Password = "Dk086818";
$mail->Host     = "mail.zzz.com.ua";
$mail->Mailer   = "smtp";
$mail->SetFrom($_POST["userEmail"], $_POST["userName"]);
$mail->AddReplyTo($_POST["userEmail"], $_POST["userName"]);
$mail->AddAddress("admin@sedona.kl.com.ua");
$mail->Subject = $_POST["subject"];
$mail->WordWrap   = 80;
$mail->MsgHTML($_POST["content"]);

//для нескольких файлов
for ($ct = 0; $ct < count($_FILES['attachment']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['attachment']['name'][$ct]));
        $filename = $_FILES['attachment']['name'][$ct];
        if (move_uploaded_file($_FILES['attachment']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Failed to move file to ' . $uploadfile;
        }
    }

//// для одного файла
//if(is_array($_FILES['attachment'])) {
//        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['attachment']['name']));
//        $filename = $_FILES['attachment']['name'];
//        if (move_uploaded_file($_FILES['attachment']['tmp_name'], $uploadfile)) {
//            $mail->addAttachment($uploadfile, $filename);
//        } else {
//            $msg .= 'Failed to move file to ' . $uploadfile;
//        }
//    }

$mail->IsHTML(true);

if(!$mail->Send()) {
	echo "<p class='error'>Problem in Sending Mail.</p>";
} else {
	echo "<p class='success'>Contact Mail Sent.</p>";
}
?>
