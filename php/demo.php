<?php

include 'IVR/DemoCall.php';
include 'lib/call.php';
$firstInterView=new DemoCall();
// $firstInterView->setdata();
//  $i=1;
// foreach($firstInterView->questions as $k=> $q)
// {   

    
//     echo "$i . ";
//     $speech='';
//     foreach ($q['question'] as $template) {
        
//         if ($template['type'] == 'text'  ) {
//             echo  "(text)".$template['data']."<br/>";

//         } else if ($template['type'] == 'audio') {
//             echo  "(audio)".$template['text']."<br/>";
//             //$r->addPlayAudio($url . $template['data'] . $ext);
//         }
        
//     }
//     echo  $speech;
//     $i++;
    

// }
// exit();



$utterance=$pagiClient->getVariable('utterance');
$result=array();
//try{
$call=new Call();
$call->readOne($pagiClient->getVariable("callid"));
//$call->conversation='[]';
$call->save();
//}catch(Exception $e){
    //echo $e->getMessage();
//}
//$istest=true;

if(isset($istest)){
    echo '<br/>';
    //print_r($call);   
    echo '<br/>';
    } 

if($utterance=='-1' || trim($utterance)!='' || true){
    $pagiClient->setVariable("phrases", "");

    $data=array('event'=>$pagiClient->getVariable('event'),'questionid'=>$pagiClient->getVariable('questionid'),'data'=>$utterance);
    if(isset($istest)){
    print_r($data);   
    echo '<br/>';
    } 
    try{
        
        $repeatquestion=false;

        if($pagiClient->getVariable('repeat')=='1'){
            $repeatquestion=true;
        }

    $result=$firstInterView->process_talk($data,$call,$repeatquestion);
    }catch(Exception $ex){
        echo $ex->getMessage();
    }
    if(isset($istest)){
        echo '<br/>';
        var_dump($result);
        echo '<br/>';
    }
    $pagiClient->setVariable("phrases", $result['phrases']);

    $pagiClient->setVariable('questionid',$result['questionid']);
    if(isset($result['repeat'])){
        $pagiClient->setVariable('repeat',$result['repeat']);
    }else{
        $pagiClient->setVariable('repeat','0');
    }
    
    $speech='';
    $msg=$result['msg'];
    $full_response='';
    if(is_array($msg)){
        $full_response=json_encode($msg);
    // foreach ($msg as $template) {
    //      if ($template['type'] == 'audio') {
    //         $file='/root/Documents/pr/'.$template['data'];
    //         $speech.=' '.$template['data'];
    //         $pagiClient->streamFile($file);
    //         //$r->addPlayAudio($url . $template['data'] . $ext);
    //     }else if ($template['type'] == 'text'  ) {
    //          $speech.=' '.$template['data'];
    //          $file=$tts->convert_tts($template['data'],'en','1');
    //          $pagiClient->streamFile($file);
    //      } else if ($template['type'] == 'audio_s'  ) {
    //         $speech.=' '.$template['text'];
    //         $file=$tts->convert_tts($template['text'],'en','1');
    //         $pagiClient->streamFile($file);
    //     } 
    //}
    
}
else{
   // var_dump($msg);
}
   // $speech=str_replace(',',' .',$speech);
    //echo  $speech;
    if($result['is_disconnect']){

        $call->call_status='disconnected';
    $call->save();
        $pagiClient->hangUp();
    }

 
    $pagiClient->setVariable('speech',$speech);
    
    $pagiClient->setVariable('event','continue');
    

}else if(trim($utterance)=='')
{
    $pagiClient->setVariable('speech',"Please be loud and clear.");
    
}


$pagiClient->setVariable("utterance", "");
$pagiClient->setVariable("full_response", $full_response);
$pagiClient->setVariable("idx",0);






































//$result = dial("SIP/GSM/9999689919", array(60, 'rh'));
//$asteriskLogger = $pagiClient->getAsteriskLogger();
//$seconds=5;

//$pagiClient->answer();

//$result = $pagiClient->waitDigit(10000);
//$asteriskLogger->verbose($result);
//$pagiClient->saySound('max-attempts-reached');
//print $result;
//$pagiClient->sayDigits(2);
//$pagiClient->playDialTone();
//$pagiClient->playCongestionTone($seconds);
//execute_agi("SET VARIABLE ScriptResult test");
//$pagiClient->setVariable("ScriptResult", "somethinggreat");
//$pagiClient->setVariable("calltype", $pagiClient->getVariable('calltype').'anuj');


//$pagiClient->playBusyTone($seconds);
//$pagiClient->hangup();
//echo “SET VARIABLE ScriptResult narender”;

?>
