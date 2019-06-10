#!/usr/bin/php
<?php
// $callid=2086;
// $utterance= exec("/bin/node /usr/local/node_programs/nodejs-speech/samples/recognize.js stream '/tmp/$callid.raw' -e LINEAR16 -r 8000 -l 'en-IN' -p '' -c '0'");
// echo "</br>";
// echo $utterance;
// exit();


$test='';
require_once 'vendor/autoload.php';
$pagiClientOptions = array();
//execute_agi("SET VARIABLE ScriptResult test");
use PAGI\Client\Impl\ClientImpl as PagiClient;
$pagiClient = PagiClient::getInstance($pagiClientOptions);

$current_date = date('Y-m-j');
if(!function_exists('error_log_pr')){
    function error_log_pr($append,$text){
        $current_date = date('Y-m-j');
        $myfile = fopen('/var/lib/asterisk/agi-bin/php/log/'.$current_date . "$append.txt", "a") or die("Unable to open file!");
    
        $txt = $text. '\n';
        fwrite($myfile, $txt);
        fclose($myfile);
    }
    }


function getfinalresponse($id,$number1){
     $curl = curl_init();
     $bot=null;
     if ($number1=='allPR1'){
     $bot="http://192.168.31.203:5005/webhooks/rest/webhook".$id;
     $port="5010";}
     else if($number1=="allPR3"){
     $bot="http://192.168.31.203:5002/webhooks/rest/webhook".$id;
     $port="5008";}
     curl_setopt_array($curl, array(
     
       CURLOPT_PORT => $port,
     
       CURLOPT_URL => $bot ,
    
      CURLOPT_RETURNTRANSFER => true,
    
      CURLOPT_ENCODING => "",
    
      CURLOPT_MAXREDIRS => 2,
    
      CURLOPT_TIMEOUT => 5,
    
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    
     // CURLOPT_CUSTOMREQUEST => "GET",
    
     // CURLOPT_POSTFIELDS => "{\n    \"sender\": \"$sender\",\n    \"message\": \"$message\"\n}",
    
      CURLOPT_HTTPHEADER => array(
    
        "Content-Type: application/json",
     
    
      ) 
    ));
    
     
    
    $response = curl_exec($curl);
    
    $err = curl_error($curl);
    
     
    
    curl_close($curl);
    $response=json_decode($response,true);
    return $response;
         }
         
function callapi($sender,$message,$number1){
    $hangup=false;
    if($message=="" || $message==null){
        $msg= array(
            array('type'=>'text','data'=>"Please speak loudly")
        );
        
    }else{
     


        error_log_pr('rasa',"                {$message} ***Listened result");
        error_log_pr('rasa','@Started sending data to rasa');
     
    $curl = curl_init();

    $bot=null;
    if ($number1=='allPR1'){
    $bot="http://192.168.31.203:5005/webhooks/rest/webhook";
    $port="5005";}
    else if($number1=="allPR3"){
    $bot="http://192.168.31.203:5002/webhooks/rest/webhook";
    $port="5002";}
    curl_setopt_array($curl, array(
    
      CURLOPT_PORT => $port,
    
      CURLOPT_URL => $bot ,
    
      CURLOPT_RETURNTRANSFER => true,
    
      CURLOPT_ENCODING => "",
    
      CURLOPT_MAXREDIRS => 10,
    
      CURLOPT_TIMEOUT => 30,
    
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    
      CURLOPT_CUSTOMREQUEST => "POST",
    
      CURLOPT_POSTFIELDS => "{\n    \"sender\": \"$sender\",\n    \"message\": \"$message\"\n}",
    
      CURLOPT_HTTPHEADER => array(
    
        "Content-Type: application/json",
     
    
      ) 
    ));
    
     
    
    $response = curl_exec($curl);
    
    $err = curl_error($curl);
    
     
    
    curl_close($curl);
    error_log_pr('rasa','@Got Response From Rasa');
    
      $msg=array();
    
         if ($err) {
         
            
             $msg= array(
                 array('type'=>'text','data'=>"errorcURL Error " . $err)
             );
             
         
         } else {
         
            
         $responses=json_decode($response,true);
         error_log_pr('rasa',"$responses");
         
    foreach($responses as $response ){
        if($response['text']=='goodbye'){
            $hangup=true;
            break;
        }

        $says=explode(';;',$response['text']);
        foreach($says as $say){
            if(trim($say)!=''){
           $msg[]=array('type'=>'text','data'=>$say);
        }}
    }
         

    error_log_pr('rasa','     Response from Rasa ===> '.json_encode($responses).'');
         }
        }

        
         
             return array(
             'data'=>'',
             //'questionid'=>$questionid,
             'is_disconnect'=>$hangup,
             'is_Dtmf'=>false,
             'msg'=>$msg,
             'phrases'=>'',
             'repeat'=>0
             );
         
         }
    

    //error_log_pr('test',"afeter use");
try{

    //error_log_pr('hangup','error log');   
//include 'custom_function.php';
include '/var/lib/asterisk/agi-bin/php/lib/call.php';

#include '/var/lib/asterisk/agi-bin/php/IVR/FirstInterviewHelper.php';
//error_log_pr('test',"after call");

//error_log_pr('test',"instance call");



$call=new Call();
$calllength=0;
//error_reporting(E_ALL);
if(!isset($istest)){
$pagiClient = PagiClient::getInstance($pagiClientOptions);
include '/var/lib/asterisk/agi-bin/php/instance.php';
error_log_pr('test',$app_id);
$cdr = $pagiClient->getCDR();


 $calllength=(int) $cdr->getAnswerLength();
 
}


$reasoncode=$pagiClient->getVariable('reason');
$reason='error';

// 0 - Failed (not busy or congested)
// 1 - Hung up
// 3 - Ring timeout
// 5 - Busy
// 8 - Congestion

switch($reasoncode){
    case "0":
    $reason='Failed';
    break;
    case "1":
    $reason='Hung up';
    break;
    case "3":
    $reason='Ring timeout';
    break;
    case "5":
    $reason='Busy';
    break;
    case "8":
    $reason='Congestion';
    break;
    default:
    $reason=$reasoncode;
    
    

}
//error_log_pr('test',"$reason");

$number1=$pagiClient->getVariable('number1');

$callid=$pagiClient->getVariable('callid');
error_log_pr('rasa',"   {$number1}");
$utterance= $pagiClient->getVariable("utterance");
callapi($callid,'end',$number1);
$result=getfinalresponse($callid,$number1);
$call->readOne($callid);
if($calllength>0){
$call->duration_ms=$calllength;
}
//$call->duration_ms =$cdr->getAnswerLength();
if(trim($reason)!=''){
$call->call_status=$reason;
$call->to_update=8;



}
if(file_exists("/tmp/$callid.raw")){


    error_log_pr('rasa',"   why are we in bothangup");
    $utterance= exec("/bin/node /usr/local/node_programs/nodejs-speech/samples/recognize.js stream '/tmp/$callid.raw' -e LINEAR16 -r 8000 -l 'en-IN' -p '' -c '0'");
    $utterance=$utterance;
    $conversation = json_decode($call->conversation, true);
    if(is_array($conversation) && count($conversation)>0){

    end($conversation);         // move the internal pointer to the end of the array
    $key = key($conversation);  // fetches the key of the element pointed to by the internal pointer
    
    

        $conversation[$key] = $utterance;
        //dd(json_encode($conversation));
        //dd($conversation);
        $call->conversation = json_encode($conversation);
        //$this->pagiClient->consoleLog('current question  ********************'.$speech.'**************');
         
          //  $firstInterView=new FirstInterviewHelper();
            //
            $firstInterView->setdata();
             
            
            $firstInterView->pagiClient=$pagiClient;
            $firstInterView->app_id=$pagiClient->getVariable('app_id');
            $data=array('event'=>$pagiClient->getVariable('event'),'questionid'=>$pagiClient->getVariable('questionid'),'data'=>$utterance);
            
            $result= $firstInterView->process_talk($data,$call,false,true);
           $pagiClient->setVariable('dddddddd',json_encode($result));


            $resultgetfinalresponse=getfinalresponse($callid,$number1);
           $call->disposition=$resultgetfinalresponse['interest'];   
           $call->save();         //
            
            
            
}

//unlink("/tmp/$callid.raw");

}
//error_log_pr('test','save before');
$call->save();

//error_log_pr('test','save called');






//update 



$token = '';
    #include file
    //include '../lib/call.php';
    $call=new Call();
    error_reporting(E_ALL);
    $root = 'http://api.passivereferral.com/index.php/api/';
    //phpinfo();
    
    $url = $root . 'authenticate/?employer=1';
    $updatecall= $root . 'updatecall/';
    
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
    //var_dump($result);
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
        
        $stmt= $call->readToUpdate(0,10,$callid);
       // echo $token;
       while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
       
           $url="$updatecall?token=$token";
        $ch = curl_init($url);
    
    # Setup request to send json via POST.
    $payload = json_encode($row);
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
    //    if(true){
    
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
        
//update


}catch(Exception  $e){
  //  $pagiClient->consoleLog($e->getMessage());
  error_log_pr('abcdd',$e->getMessage());
}


error_log_pr('test',$test);






?>