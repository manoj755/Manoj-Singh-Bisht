#!/usr/bin/php
<?php
//include 'custom_function.php';
//error_reporting(E_ALL);
require_once 'vendor/autoload.php';
$pagiClientOptions = array();
//execute_agi("SET VARIABLE ScriptResult test");
use PAGI\Client\Impl\ClientImpl as PagiClient;
$pagiClient = PagiClient::getInstance($pagiClientOptions);

$idx=(int)$pagiClient->getVariable("idx");
$pagiClient->consoleLog($pagiClient->getVariable("full_response"));
$full_response=json_decode($pagiClient->getVariable("full_response"),true);

$speech='';
$tospeech='0';
$pagiClient->consoleLog($idx.'idx');
$pagiClient->consoleLog(gettype($full_response) .' type of $full response');
foreach ($full_response as $k=> $template) {

    $k=(int)$k;
    
   // $pagiClient->consoleLog(gettype($k) .' type of k'.$k);
  //  $pagiClient->consoleLog(gettype($idx) .' type of idx'.$idx);
    if($k>=$idx){

        
       
    $idx=$idx+1;
         if ($template['type'] == 'audio') {
            $file='/root/Documents/pr/'.$template['data'];
            //$speech=' '.$template['data'];
            $pagiClient->streamFile($file);
            //$r->addPlayAudio($url . $template['data'] . $ext);
        }else if ($template['type'] == 'text'  ) {
             $speech=$template['data'];
             $tospeech=1;
             break;
             //$file=$tts->convert_tts($template['data'],'en','1');
             //$pagiClient->streamFile($file);
         } else if ($template['type'] == 'audio_s'  ) {
            $speech=$template['text'];
            $tospeech=1;
break;
            // $file=$tts->convert_tts($template['text'],'en','1');
            // $pagiClient->streamFile($file);
        } 
}else{
    $tospeech=0;
}



    }

$pagiClient->setVariable("tospeech", $tospeech);
$pagiClient->setVariable("speech", trim(strtolower($speech)));
$pagiClient->setVariable("idx",$idx);







?>