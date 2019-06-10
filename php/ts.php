#!/usr/bin/php
<?php


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

error_log_pr('rasa','               ****Start Listening');

