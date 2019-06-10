#!/usr/bin/php
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL); 
//include 'custom_function.php';


//echo "SAY NUMBER 192837465 \"\"\n";
require 'custom_functions.php';
require_once 'vendor/autoload.php';
$pagiClientOptions = array();
//execute_agi("SET VARIABLE ScriptResult test");
use PAGI\Client\Impl\ClientImpl as PagiClient;
$pagiClient = PagiClient::getInstance($pagiClientOptions);
//$result = $pagiClient->waitDigit(5000);
//$pagiClient->setVariable('speech',$result->getDigits());
// $file=$tts->convert_tts('hi narender this is test  is converted by me','en','1');
// $pagiClient->streamFile($file);
// $file=$tts->convert_tts('hi narender this is second','en','1');
// $pagiClient->streamFile($file);
//$num=2;
//echo "VERBOSE \"$num\" \n";
//include  'interview.php';
include  'botinterview.php';
  // if($pagiClient->getVariable('calltype')=='interview'){
  //     include  $pagiClient->getVariable('calltype').'.php';

  // }else{

  // }

 $pagiClient->setVariable('t_u_id',$pagiClient->getVariable('callid').'_'.uniqid());
 $pagiClient->setVariable('start_speaking',0);
 $pagiClient->setVariable('start_transcribe',0);
 
 







































//$result = dial("SIP/GSM/9999689919", array(60, 'rh'));
//$asteriskLogger = $pagiClient->getAsteriskLogger();
//$seconds=5;

//$pagiClient->answer();

//$result = $pagiClient->waitDigit(10000);
//$asteriskLogger->verbose($result);
//$pagiClient->saySound('max-attempts-reached');
//print $result;
//$pagiClient->sayDigits(2);
//$pagiClient->playDialTone();
//$pagiClient->playCongestionTone($seconds);
//execute_agi("SET VARIABLE ScriptResult test");
//$pagiClient->setVariable("ScriptResult", "somethinggreat");
//$pagiClient->setVariable("calltype", $pagiClient->getVariable('calltype').'anuj');


//$pagiClient->playBusyTone($seconds);
//$pagiClient->hangup();
//echo “SET VARIABLE ScriptResult narender”;

?>
