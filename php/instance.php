<?php
if(!function_exists('error_log_pr')){
    function error_log_pr($append,$text){
        $current_date = date('Y-m-j');
        $myfile = fopen('/var/lib/asterisk/agi-bin/php/log/'.$current_date . "$append.txt", "a") or die("Unable to open file!");
    
        $txt = $text. '\n';
        fwrite($myfile, $txt);
        fclose($myfile);
    }
    }
try{
$ivrpath='/var/lib/asterisk/agi-bin/php/IVR/';
//error_log_pr('test',$ivrpath);
$app_id=$pagiClient->getVariable('app_id');
//error_log_pr('test',$app_id);
if($app_id=='6'||$app_id==''){
include $ivrpath.'FirstInterviewHelper.php';
//error_log_pr('test','6');
$firstInterView=new FirstInterviewHelper();
}else if($app_id=='70'){
    include $ivrpath.'FirstInterviewHelperBestSeller.php';
$firstInterView=new FirstInterviewHelperBestSeller();
}else{
    include $ivrpath.'FirstInterviewHelper.php';
//error_log_pr('test','6');
$firstInterView=new FirstInterviewHelper();
}

}catch(Exception $e ){
    error_log_pr('test',$e->getMessage());
}