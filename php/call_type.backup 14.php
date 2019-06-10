#!/usr/bin/php
<?php
//include 'custom_function.php';
include '/var/lib/asterisk/agi-bin/php/lib/call.php';
$call=new Call();

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
$pagiClient->setVariable('t_u_id',$pagiClient->getVariable('callid'));
//$pagiClient->setVariable('speech','');





?>