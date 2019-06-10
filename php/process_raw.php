<?php
$raw_source='/var/spool/asterisk/monitor_raw/';
$raw_source_moved='/var/spool/asterisk/monitor_raw_moved/';
$raw_direction_after_conversion='/var/spool/asterisk/monitor/';

function excutewave($file)
{
    $raw_source=$GLOBALS['raw_source'];
    $raw_source_moved=$GLOBALS['raw_source_moved'];
    $raw_direction_after_conversion=$GLOBALS['raw_direction_after_conversion'];
    $file= basename($file,'.raw');
    $command = "sox -t raw -r 8000 -b 16 -c 1 -L -e signed-integer $raw_source$file.raw $raw_direction_after_conversion$file.wav";
    $output = shell_exec($command);
    rename($raw_source.$file.".raw",$raw_source_moved.$file.".raw");
    
    # code...
}
//excutewave('2817_5c6539b9aa328.raw');
$time_elapsed=1800;
if(isset($_GET['any'])){
    $time_elapsed=0;
}

$path=$raw_source;
$loop=0;
if ($handle = opendir($raw_source)) {
    
    while (false !== ($file = readdir($handle)) && $loop<25  ) {
         
         if(strpos($file,'raw')>-1){
           
           
       if ((time()-filectime($path.$file)) >  $time_elapsed ) {  
         
           $filesize=filesize($path.$file);
           
           
           $filesize=number_format($filesize / 1048576, 2);
           
           
          if (preg_match('/\.raw$/i', $file) &&$filesize<100000 ) {
           //echo $file;
excutewave($file);

}
}
}
}
}

exit();