<?php
//$post_data = "secret=6Ldrd0UUAAAAAGKPMhcxwud0OZigUQldbYM7s6mU&response=".
//  $_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR'] ;
//
//$ch = curl_init();
//curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
//curl_setopt($ch, CURLOPT_POST, true);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_HTTPHEADER,
//  array('Content-Type: application/x-www-form-urlencoded; charset=utf-8',
//    'Content-Length: ' . strlen($post_data)));
//curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
//$googresp = curl_exec($ch);
//$decgoogresp = json_decode($googresp);
//curl_close($ch);
//
//if ($decgoogresp->success == true)
//{
//  // Success
//}


if(isset($_POST['form-send__btn'])){
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $privatekey = "6Ldrd0UUAAAAAGKPMhcxwud0OZigUQldbYM7s6mU";
  $response = file_get_contents($url."?secret=".$privatekey."&response=".$_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR']);
  $data = json_decode($response);
  if(isset($data->success) AND $data->success==true){
    header('location: ExampleCaptcha.php?CaptchaPass=True');
  }else{
    header('location: ExampleCaptcha.php?CaptchaFail=True');
  }
}
