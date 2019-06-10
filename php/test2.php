<?php




ini_set('display_errors', 1);
error_reporting(E_ALL); 
$idx=2;
$full_response=  [
    ["type" => 'audio', 'data' => 'fi_2_1', 'text' => "OK. I have a job for the role of ,"],
    ["type" => 'text', 'data' => "amar"],
    ["type" => 'audio_s', 'data' => 'fi_2_2', 'text' => "Is this fine?"],
];
$speech='';
$tospeech='0';
$i=0;
foreach ($full_response as $k=> $template) {
    if($i>=$idx){
    $idx=$idx+1;
         if ($template['type'] == 'audio') {
            $file='/root/Documents/pr/'.$template['data'];
            //$speech=' '.$template['data'];
            echo $file;
            //$r->addPlayAudio($url . $template['data'] . $ext);
        }else if ($template['type'] == 'text'  ) {
             $speech=$template['data'];
             break;
             //$file=$tts->convert_tts($template['data'],'en','1');
             //$pagiClient->streamFile($file);
         } else if ($template['type'] == 'audio_s'  ) {
            $speech=$template['text'];
break;
            // $file=$tts->convert_tts($template['text'],'en','1');
            // $pagiClient->streamFile($file);
        } 
}

$i=$i+1;

    }

    echo $speech;
    echo $idx;