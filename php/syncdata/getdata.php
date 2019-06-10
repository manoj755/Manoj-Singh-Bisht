<?php
ini_set('display_errors', 1);
error_reporting(E_ALL); 


function error_log_pr($append,$text){
    $current_date = date('Y-m-j');
    $myfile = fopen('log/'.$current_date . "$append.txt", "w") or die("Unable to open file!");

    $txt = $text. '\n';
    fwrite($myfile, $txt);
    fclose($myfile);
}
$token = '';
//var_dump($token);
#include file
include '../lib/call.php';
$call=new Call();

$root = 'http://api.passivereferral.com/index.php/api/';
//phpinfo();

$url = $root . 'authenticate/?employer=1';
$fetchcall = $root . 'fetchcall/';

//$url="http://www.passivereferral.com";


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
echo $error;
if ($error == '0') {
    echo $error;
    //$result=str_replace("ï»¿","",$result);
    $result = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $result);
   // echo $result;
    $result = json_decode($result, true);
   // echo $result;
    if (isset($result['token'])) {
        $token = $result['token'];
       // echo $token;
    } else {
        $error = $result['error'];
    }
}

if ($error == '0') {

    $max = $call->getMaxID();
    
   // echo $token;
    $url="$fetchcall?token=$token&max=$max";
    $ch = curl_init($url);

# Setup request to send json via POST.
    
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
        $result = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $result);
    //echo $result;
        $fetchcalldata=  json_decode($result,true);
    
        if($fetchcalldata==null){
            $fetchcalldata=array();
        }
       foreach($fetchcalldata as  $calldata){
      //  var_dump($calldata['id']);
        $call->call_id=$calldata['id'];
        $call->app_id=$calldata['app_id'];
        $call->call_type=$calldata['call_type'];
        $call->sid =$calldata['sid'];
        $call->call_status  =$calldata['call_status'];
        $call->repetition=0;
        $call->dtmf_response=0;
        $call->question='';
        $call->conversation='[]';
        $call->last_question=0;
        $call->mobile=$calldata['mobile'];
        $call->candidate_id=$calldata['candidate_id'];
        $call->custom_data=$calldata['custom_data'];
        $call->job_id=$calldata['job_id'];
        $call->callto=$calldata['callto'];
        echo($calldata['callto']);
  
        if($call->insert()){

        }else{
            error_log_pr('insert','unable to insert');
            var_dump($calldata);
            break;
            
        }

       }

       
        
        # loop and insert data 
    } else {

        $myfile = fopen($current_date . "_fetchall.txt", "w") or die("Unable to open file!");

        $txt = $error . '\n';
        fwrite($myfile, $txt);
        fclose($myfile);
    }
} else {


    $myfile = fopen($current_date . "_token.txt", "w") or die("Unable to open file!");

    $txt = $error . '\n';
    fwrite($myfile, $txt);
    fclose($myfile);
    #log here
}




# Print response.
# echo "<pre>$result</pre>";
        