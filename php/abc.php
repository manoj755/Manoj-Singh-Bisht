<?php
//exit();

ini_set('display_errors', 1);
error_reporting(E_ALL); 

date_default_timezone_set('Asia/Calcutta'); 
//$current_date = date('Y-m-j HH:mm');
$current_date = date('h:i:sa');


$hour=(int) date("G", strtotime($current_date));
if($hour>21||$hour<9 ){
  echo "Not Excuting as hour is $hour";
  //exit();
}else{
  echo "Excuting as hour is $hour";
}

function excutemp3($text)
{
  $text=strtolower(trim($text));
    $dir="/tmp";
    $filename= md5($text.'.en.1');
    
    if(!file_exists("$dir/$filename")){
    $command = "/var/lib/asterisk/agi-bin/ttsadvanced.py \"$dir/$filename\" \"$text\"";
    
    $output = shell_exec($command);
    }
    # code...
}

//include_once 'ftprecording.php';
include_once 'processquestions.php';
$destination="/var/spool/asterisk/outgoing/";
$source="/var/lib/asterisk/agi-bin/php/calls_files/";
$noofcallfile=0;
if (is_dir($destination)){
  if ($dh = opendir($destination)){
    while (($file = readdir($dh)) !== false){
        if(strpos($file, '.call') !== false){
          $noofcallfile=$noofcallfile+1;
        }
      
    }
    closedir($dh);
  }
}
//error_log_pr('rasa',"                 ***abc.php");
$noofport=4;
$noofcallfile=$noofport-$noofcallfile;
include '/var/lib/asterisk/agi-bin/php/lib/call.php';
$call=new Call();
include 'process_call.php';


function SendCall($called_number,$callid,$callid_main,$app_id=6,$job_id,$nodefine){


 
    // $called_number='9999689919';
    // $callid='328';
    
    //shell_exec('sudo asterisk -rx " originate SIP/'.$mobilenumber.'@GSM extension s@allPR"');
    
    //$fullpath='';
    $filename="/var/lib/asterisk/agi-bin/php/calls_files/{$called_number}_$callid.call";
    $myfile = fopen("$filename", "w");
    if($myfile==false){
      exit();
    }
    if($job_id==5179){
      $app_id=70;
    }
    $txt =
"Channel: SIP/GSM/$called_number
Context: $nodefine
RetryTime: 600
MaxRetries: 0
Extension:s
Set: called_number=$called_number
Set: callid=$callid
Set: callid_main=$callid_main
Set: app_id=$app_id
Set: job_id=$job_id
Set: failed=0
Priority:1
Archive:Yes";
    fwrite($myfile, $txt);
    fclose($myfile);

    
    }
    
    
$stmt= $call->readToCall(0,$noofcallfile);
var_dump($stmt);
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
  
    $custom_data=json_decode($row['custom_data'],true);
  //var_dump($custom_data);
    foreach($custom_data as $key => $val){
      if($key!='client_id'){
        
      excutemp3($val);
      }
    }
  SendCall($row['mobile'],$row['id'],$row['call_id'],$row['app_id'],$row['job_id'],$row['callto']);

//

//echo $row['callto'];
    

    $call->readOne($row['id']);
    $call->call_status='callrequestsent';
    $call->save();


}

// Get array of all source files
$files = scandir($source);
//var_dump($files);
// Identify directories
$delete=[];
// Cycle through all source files
foreach ($files as $file) {
  if (in_array($file, array(".",".."))) continue;
  // If we copied this successfully, mark it for deletion
  if (copy($source.$file, $destination.$file)) {
    $delete[] = $source.$file;
  }
}
// Delete all successfully-copied files
foreach ($delete as $file) {
  unlink($file);
}
//var_dump($call->job_id);
    

include_once 'syncdata/getdata.php';
include_once 'syncdata/updatedata.php';

//include_once 'ftprecording.php';
include_once 'process_raw.php';

?>
