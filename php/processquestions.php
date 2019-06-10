<?php
if(!function_exists('excutemp3')){
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

}

$filesclass=array('FirstInterviewHelperBestSeller','FirstInterviewHelper');
foreach($filesclass as $filec){
include "IVR/$filec.php";
if($filec=='FirstInterviewHelperBestSeller'){
$firstInterView=new FirstInterviewHelperBestSeller();
}else{
$firstInterView=new FirstInterviewHelper();
}
$firstInterView->setdata();
foreach ($firstInterView->questions as $key => $value) {
    $speech='';
    
    foreach ($value['question'] as $k=> $template) {

             if ($template['type'] == 'audio') {
                $file='/root/Documents/pr/'.$template['data'];
            }else if ($template['type'] == 'text'  ) {
                 $speech=$template['data'];
             } else if ($template['type'] == 'audio_s'  ) {
                $speech=$template['text'];
                
            } 
    
    
            excutemp3($speech);
    
        }

        
    
}

foreach ($firstInterView->default_fallback as $key => $value) {
    excutemp3($value);
}


}