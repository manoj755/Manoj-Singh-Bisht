<?php

$current_date = date('Y-m-j');
if(!function_exists('error_log_pr')){
function error_log_pr($append,$text){
    $current_date = date('Y-m-j');
    $myfile = fopen('log/'.$current_date . "$append.txt", "w") or die("Unable to open file!");

    $txt = $text. '\n';
    fwrite($myfile, $txt);
    fclose($myfile);
}
}

$token = '';
echo $token;
//var_dump ($token);
#include file
//include '../lib/call.php';
$call=new Call();
//var_dump($call);
//echo $call;
error_reporting(E_ALL);
$root = 'http://api.passivereferral.com/index.php/api/';
//phpinfo();
//echo 'hi';
$url = $root . 'authenticate/?employer=1';
$updatecall= $root . 'updatecall/';
//echo $updatecall;
//$url="http://www.passivereferral.com";

if($token==''){
$email = 'riya@passivereferral.com';
$password = 'arvind1234';
$ch = curl_init($url);

# Setup request to send json via POST.
$payload = json_encode(array("email" => $email,
    'password' => $password));
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
# Return response instead of printing.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_PROXY, '');
# Send request.
$result = curl_exec($ch);

$error = curl_errno($ch);
curl_close($ch);
if ($error == '0') {
    $result = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $result);
    $result = json_decode($result, true);
    if (isset($result['token'])) {
        $token = $result['token'];
    } else {
        $error = $result['error'];
    }
}
}
if ($error == '0') {
    
    $stmt= $call->readToUpdate(0,10);
   //echo $token;
   while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

//var_dump($row);
    
       $url="$updatecall?token=$token";

           $ch = curl_init($url);
           //echo $ch;
# Setup request to send json via POST.
$payload = json_encode($row);
echo $payload;
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
# Return response instead of printing.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)');
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_PROXY, '');
# Send request.
$result = curl_exec($ch);

$error = curl_errno($ch);
if ($error == '0') {

#update here back
if($call->setUpdated($row['id'])){
   echo $row['id'];
}else{

    error_log_pr('erroronupdate',$error);
    
}
         
     
    } else {

        $myfile = fopen($current_date . "_singleupdate_onupdate_error.txt", "w") or die("Unable to open file!");

        $txt = $error . '\n';
        fwrite($myfile, $txt);
        fclose($myfile);
    }
   }

    
} else {


    $myfile = fopen($current_date . "_tokenonupdate.txt", "w") or die("Unable to open file!");

    $txt = $error . '\n';
    fwrite($myfile, $txt);
    fclose($myfile);
    #log here
}




# Print response.
# echo "<pre>$result</pre>";
        