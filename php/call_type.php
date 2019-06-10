#!/usr/bin/php
<?php
//include 'custom_function.php';
include '/var/lib/asterisk/agi-bin/php/lib/call.php';
$call=new Call();

date_default_timezone_set('Asia/Calcutta'); 

if(!function_exists('error_log_pr')){
    function error_log_pr($append,$txt){
        $current_date = date('Y-m-j');
        $txt=date('Y-m-d H:i:s.') . gettimeofday()['usec'].'   '.$txt.PHP_EOL;
        //$myfile = file_put_contents('/var/lib/asterisk/agi-bin/php/log/'.$filename.'_'.$current_date . "$append.txt", $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
        $myfile = fopen('/root/Documents/log/'.$append.'_'.$current_date . ".txt", "awr") or die("Unable to open file!");
    
        fwrite($myfile, $txt);
        fclose($myfile);
    }
}


//error_reporting(E_ALL);
require_once 'vendor/autoload.php';
$pagiClientOptions = array();
//execute_agi("SET VARIABLE ScriptResult test");
use PAGI\Client\Impl\ClientImpl as PagiClient;
$pagiClient = PagiClient::getInstance($pagiClientOptions);

$call->readOne($pagiClient->getVariable('callid'));
$call->call_status='connected';
$call->save();
$pagiClient->setVariable("calltype", $call->call_type);
//$pagiClient->setVariable("callid", "1");
$pagiClient->setVariable("utterance", "-1");
$pagiClient->setVariable("questionid", "1");
$pagiClient->setVariable('event','NewCall');
$pagiClient->setVariable('repeat','0');
$pagiClient->setVariable('speechtimeout','3000');
$pagiClient->setVariable('silence','1500');

$pagiClient->setVariable('repeatinfogiven','0');
$pagiClient->setVariable('callansweredpr','0');
$pagiClient->setVariable('t_u_id',$pagiClient->getVariable('callid').uniqid());
//$pagiClient->setVariable('speech','');
error_log_pr('rasa',"********************".$pagiClient->getVariable('called_number')."_____Call ID ".$pagiClient->getVariable('callid')."***********************");




?>