#!/usr/bin/php
<?php
include '/var/lib/asterisk/agi-bin/php/db/database.php';
/*ini_set('display_errors', 1);
error_reporting(E_ALL); 
//include 'custom_function.php';


//echo "SAY NUMBER 192837465 \"\"\n";*/
require 'custom_functions.php';
require_once 'vendor/autoload.php';
$db1=new Database();
$pagiClientOptions = array();
//execute_agi("SET VARIABLE ScriptResult test");
use PAGI\Client\Impl\ClientImpl as PagiClient;
$pagiClient = PagiClient::getInstance($pagiClientOptions);
// include 'process_call.php';
$callid=$pagiClient->getVariable('callid');
$bot= null;
$conn1=$db1->getConnection();
$sql = 'select callto from pr_calls.calls where id='.$callid;
foreach ($conn1->query($sql) as $row) {
  $bot=$row['callto'];
}
 //echo $bot;
     $pagiClient->setVariable('number1',$bot);
     //error_log_pr('rasa',"   {$pagiClient->getVariable('number1')} ncontext");
?>