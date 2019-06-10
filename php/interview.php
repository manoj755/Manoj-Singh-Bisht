<?php


include 'lib/call.php';


include 'instance.php';

$firstInterView->setdata();

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

$firstInterView->pagiClient=$pagiClient;


$utterance=$pagiClient->getVariable('utterance');

$firstInterView->app_id=$pagiClient->getVariable('app_id');
if($utterance=='Transcription:'){
    $utterance='';
}
if($utterance=='x'){
   $utterance='yes'; 
}

$result=array();
//try{
$call=new Call();
$call->readOne($pagiClient->getVariable("callid"));
//$call->conversation='[]';
$call->save();
$disconnnect='0';
//}catch(Exception $e){
    //echo $e->getMessage();
//}
//$istest=true;


//$pagiClient->consoleLog(json_encode($firstInterView->question_work_flow));

if(isset($istest)){
    echo '<br/>';
    //print_r($call);   
    echo '<br/>';
    } 
$callansweredpr=$pagiClient->getVariable('callansweredpr');
$calledpickup=false;
if($callansweredpr=='0'){
    
    if(trim($utterance)!='-1'&& trim($utterance)!=''){
        //$pagiClient->streamFile($callansweredpr);
        $callansweredpr='1';
        
        $calledpickup=true;
        $utterance='';
        $pagiClient->setVariable('callansweredpr','1');
       
    }
}



if($callansweredpr=='1' || isset($istest) ){
    
        
    
    


    $pagiClient->setVariable("phrases", "");

    $data=array('event'=>$pagiClient->getVariable('event'),'questionid'=>$pagiClient->getVariable('questionid'),'data'=>$utterance);
    if(isset($istest)){
    print_r($data);   
    echo '<br/>';
    } 
     
        
        $repeatquestion=false;
        $goahead=true;
        if(
            (str_contains($utterance,'hold')||
            str_contains($utterance,'wait')||
            str_contains($utterance,'moment')||
            str_contains($utterance,'second')||
            str_contains($utterance,'minute')
            )
            
        ){
            
            $goahead=false;
            $result = $pagiClient->getOption(
                '/tmp/waiting', '*', 1000
            );
            if ($result->isTimeout()) {
                $result = $pagiClient->getOption(
                    '/root/Documents/pr/bot3', '*', 2000
                );
            }
            
            if ($result->isTimeout()) {
                $result = $pagiClient->getOption(
                    '/tmp/waiting', '*', 2000
                );
            }
            if ($result->isTimeout()) {
                $result = $pagiClient->getOption(
                    '/root/Documents/pr/bot3', '*', 1000
                );
            }
            if ($result->isTimeout()) {
                $result = $pagiClient->getOption(
                    '/tmp/waiting', '*', 2000
                );
            }

            if ($result->isTimeout()) {
               // $msg=$firstInterView->questions['timeout']['question'];
                $pagiClient->getOption(
                    '/tmp/timeout', '*', 1000
                );
                $result=array(
                    'is_disconnect'=>false

                );
                $goahead=true;
                $data['data']='repeat';
            }else{
                $msg=$firstInterView->questions['youareback']['question'];
                $pagiClient->getOption(
                    '/tmp/iamglad', '*', 1000
                );
                
                $goahead=true;
                $data['data']='repeat';
                
            }

            
        }

        if($pagiClient->getVariable('repeat')=='1'){
            $repeatquestion=true;
        }

      if($goahead){
try{
    $result=$firstInterView->process_talk($data,$call,$repeatquestion,false);
}catch(Exception $ex){
    $pagiClient->consoleLog('Message: ' .$e->getMessage());
}
   
    if(isset($istest)){
        echo '<br/>';
        var_dump($result);
        echo '<br/>';
    }
    
    if(!isset($firstInterView->questions[$result['questionid']])){
        $pagiClient->setVariable("speechtimeout",5000);
        $pagiClient->setVariable("silence",1500);
    }else{
    $pagiClient->setVariable("speechtimeout", intval($firstInterView->questions[$result['questionid']]['timeout'])*1000);
    $pagiClient->setVariable('questionid',$result['questionid']);
    $pagiClient->setVariable("silence", intval($firstInterView->questions[$result['questionid']]['silence'])*1000);
    }
    $pagiClient->setVariable("phrases", $result['phrases']);

    
    if(isset($result['repeat'])){
        $pagiClient->setVariable('repeat',$result['repeat']);
    }else{
        $pagiClient->setVariable('repeat','0');
    }
    
    $msg=$result['msg'];
    //$msg=$firstInterView->questions['starting']['question'];
}
    $speech='';
    
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
    //$pagiClient->consoleLog('disconnect data is'. $result['is_disconnect']);
    if($result['is_disconnect']){

        $call->call_status='disconnected';
    $call->save();
    $disconnnect='1';
        //$pagiClient->hangUp();
    }

 
    $pagiClient->setVariable('speech',$speech);
    
    $pagiClient->setVariable('event','continue');
    

}else 
{
    $full_response='[]';
   // $pagiClient->setVariable('event','continue');
    $pagiClient->setVariable("phrases", '1,hi,hello,speaking');
    $rand= rand(0,1);
    if($rand==1){
    $msg=$firstInterView->questions['starting']['question'];
    }else{
        $msg=$firstInterView->questions['starting1']['question'];
    }
    $full_response=json_encode($msg);
   // $pagiClient->setVariable('speech',"Please be loud and clear.");
    
}
if(isset($istest)){
    dd($full_response);
}
$pagiClient->setVariable("disconnnect", $disconnnect);
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
