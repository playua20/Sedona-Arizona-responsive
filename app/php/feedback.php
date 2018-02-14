<?php
//$email = $_REQUEST['email'] ;
$message = $_REQUEST['message'] ;
$headers = 'admin@sedona.kl.com.ua' ;

mail( "admin@sedona.kl.com.ua", "Feedback Form Results",
    $message, "From: $headers" );
header( "Location: http://www.sedona.kl.com.ua/thankyou.html" );
?>
