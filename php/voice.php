<?php
if(!function_exists('excutemp3')){
function excutemp3($text,$name)
{
    $text=strtolower(trim($text));
    $dir="/tmp";
    $filename= $name.".mp3";
    
    
    $command = "/var/lib/asterisk/agi-bin/ttsadvancedtemp.py \"$dir/$filename\" \"$text\"";
    
    $output = shell_exec($command);
    
    # code...
}

}



$text="Bestseller is a denmark based fast 
fashion retailer with 20 plus brand across globe. We have brands like jack and jones only, Junarose and only & sons";
$filename="voice8";
 
    excutemp3($text,$filename);

echo excutemp3;