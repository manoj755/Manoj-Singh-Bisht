<?php
error_reporting(E_ALL);
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

// error_log_pr('ra','go');
// error_log_pr('ra','go');
// error_log_pr('ra','go');
// exit();

function callapi($sender,$message,$number1){
    $hangup=false;
    error_log_pr('rasa',"                {$message} ***1");
    if($message=="" || $message==null){
        error_log_pr('rasa',"                {$message} ***L2");
        $msg= array(
            array('type'=>'text','data'=>"Please speak loudly")
        );
        error_log_pr('rasa',"                {$message} ***3");
        $phrase_list="xyz";
        error_log_pr('rasa',"                {$message} ***4");
        //$senderid=$pagiClient->setVariable('callid',$sender);
        
        error_log_pr('rasa',"                {$message} ***5");
    }else{
     


        error_log_pr('rasa',"                {$message} ***Listened result");
        error_log_pr('rasa','@Started sending data to rasa');
     
    $curl = curl_init();
    $bot=null;
    $port=null;
    error_log_pr('rasa',"@Snumber1 inside {$number1}");
    if ($number1=='allPR1'){
    $bot="http://192.168.31.203:5005/webhooks/rest/webhook";
    $port="5005";}
    else if($number1=="allPR3"){
    $bot="http://192.168.31.203:5002/webhooks/rest/webhook";
    $port="5002";}
     
     
    
    curl_setopt_array($curl, array(
    
        // CURLOPT_PORT => $port,
        CURLOPT_URL => $bot ,
    
        CURLOPT_RETURNTRANSFER => true,
    
      CURLOPT_RETURNTRANSFER => true,
    
      CURLOPT_ENCODING => "",
    
      CURLOPT_MAXREDIRS => 10,
    
      CURLOPT_TIMEOUT => 30,
    
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    
      CURLOPT_CUSTOMREQUEST => "POST",
    
      CURLOPT_POSTFIELDS => "{\n    \"sender\": \"$sender\",\n    \"message\": \"$message\"\n}",
    
      CURLOPT_HTTPHEADER => array(
    
        "Content-Type: application/json",
     
    
      ),
    
    ));
    
     
    
    $response = curl_exec($curl);
    
    $err = curl_error($curl);
    
     
    
    curl_close($curl);
    error_log_pr('rasa','@Got Response From Rasa');
    
      $msg=array();
    
         if ($err) {
         
            
             $msg= array(
                 array('type'=>'text','data'=>"errorcURL Error " . $err)
             );
             
         
         } else {
         
            
         $responses=json_decode($response,true);
         
    foreach($responses as $response ){
        if($response['text']=='goodbye'){
            $hangup=true;
            break;
        }

        $phrase_array=array();
        if ($number1=='allPR1'){ 
        $phrase_array=array("Hey, Hi this is shreyasi from passivereferral.com. Are you looking for job change"=>"yeh,yes tell me,ok please tell me,ya I am looking for job,ya it is fine,yes it is fine,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good,fine,sure,hi,hello,hi,hey",
        "Alright,now the bot will collect desire information from you is it fine"=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Hello, "=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Before we go ahead. Let me give you a breif about company "=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Now i would like to check your fitment for this role. Please tell me what is your current ctc?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "And what is your expected ctc?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "What is your notice period?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "Now you have to rate yourself on certain technical skill. Please rate on scale from 0 to 5. Is it fine?"=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "How much would you rate yourself in "=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it",
        "And what about in "=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it",
        "And in "=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it",
        "What is your overall experience "=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "Have you ever applied for the company "=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Please note. That we only conduct interviews on weekdays. Is it fine?"=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Alright, "=>"yeh,yes it is fine,yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "Please rate yourself on scale of 0 to 5 in "=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "Thankyou "=>"yes tell me,ok please tell me,ya I am looking for job,ya I am looking for change,yaa mam looking for job change,yeah I am looking for,ok no problem,aa ya i am,no issue,yes sure,ya sure,sure,yeah,yes,ok,haa,yes,yes,ya thats fine,yes,why not,carry on,go on,proceed,alright,no problem,looks good,this looks fine,sounds good,yope,move on,this is absolutely fine,yes its absolutely fine,good",
        "hello"=>"hello,hi,hey hi,hey",
        "What was that?"=>'xyz',
        "Sorry i didn't get that"=>'xyz',
        "Please speak loudly"=>"xyz"
    );
    }
    else if ($number1=="allPR3"){
    $phrase_array=array("Hey, Hi this is shreyasi from passivereferral.com. Are you looking for job change"=>"yes,yes i am looking for job change,yes it is fine,absolutely fine,fine,yes it is fine,yes it is fine,yes i am looking for job change,yes this is fine",
        "Alright, now the bot will collect desire information from you, is it fine"=>"yes,yes i am looking for job change,yes it is fine,absolutely fine,fine,yes it is fine,yes it is fine,yes i am looking for job change,yes this fine",
        "Hello, "=>"yes,yes i am looking for job change,yes it is fine,absolutely fine,fine,yes it is fine,yes it is fine,yes i am looking for job change",
        "Before we go ahead. Let me give you a breif about company "=>"yes,yes i am looking for job change,yes it is fine,absolutely fine,fine,yes it is fine,yes it is fine,yes i am looking for job change,yes this is fine",
        "Now, i would like to check your fitment for this role. Please tell me what is your overall experience?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I think it would be 2,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,no experience,Sorry no experience,i have not worked in this,no experience in this,i have not past experience in it,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten,fresher,fresher,fresher,fresher",
        "And what is your expected ctc?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "What is your notice period?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "Tell me what is your current ctc?"=>"0,1,2,3,4,5,0,1,2,3,4,5,zero,I guess 0,Its 5,might be 4,it should be 7,around 8,7.5,5,five,six,seven,fortyseven,third,2 months,44 lakhs,90 thousands,3 days,1 weeks,its 5,zero,first,second,third,fourth,fifth,one,two,three,four,five,one,two,three,four,five,my ctc is 20 lpa,i guess its 20 lba,6,7,8,9,10,6,7,8,9,10,six,seven,eight,nine,ten,six,seven,eight,nine,ten",
        "Now, please let me know. Would you be available for a face to face interview in next 3 days?"=>"yes it is fine,yes,yeah,yep,yes,yaa,ya,yes thats fine,no",
        "Thank you for giving date and time for interview, We have noted that you wish to come for interview on "=>"yes it is fine,yes,fine,yes thats fine,yaa,yeh,yeah,ya,yep,yes its fine",                                         
        "And at what time?"=>"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,one,two,three,four,five,six,seven,eight,nine,ten,first half,second half,first half,second half",
        "Alright! please note we don't conduct any interview on Sunday and Tuesday. Now please mention, a specific day or date for your interview."=>"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,one,two,three,four,five,six,seven,eight,nine,ten",
        "hello"=>"hello,hi,hey hi,hey",
        "What was that?"=>'xyz',
        "Sorry i didn't get that"=>'xyz',
        "Please speak loudly"=>"xyz"
    );}

                            
    error_log_pr('rasa',"{$response['text']} response from rasa");
        $final_slice=explode(';;',$response['text']);

        if (array_key_exists($final_slice[0],$phrase_array))
        {
            $phrase_list=$phrase_array[$final_slice[0]];
        }
        else
        {$phrase_list='xyz';}

        
        error_log_pr('rasa',"{$response['text']} 2 response from rasa");
        
        $says=explode(';;',$response['text']);
        foreach($says as $say){
            // echo"1234";
            error_log_pr('rasa',"if else in thye given");
            if (trim($say)=='hello')
            {
                
                $msg[]=array('type'=>'audio','data'=>'hello1','text'=>$say);
               /// echo "hloo";
            }
            else if (trim($say)=='Hey, Hi this is shreyasi from passive refrral.com. Are you looking for job change')
            {
                
                $msg[]=array('type'=>'audio','data'=>'bot1','text'=>$say);
               // echo "hloo";
            }
            else if (trim($say)=='Alright, now the bot will collect desire information from you, is it fine')
            {
                
                $msg[]=array('type'=>'audio','data'=>'bot2','text'=>$say);
               // echo "hloo";
            }
            else if(trim($say)!=''){
           $msg[]=array('type'=>'text','data'=>$say);
        }}
    }
         

    error_log_pr('rasa','     Response from Rasa ===> '.json_encode($responses).'');
         }
        }

         
         
             return array(
             'data'=>'',
             //'questionid'=>$questionid,
             'is_disconnect'=>$hangup,
             'is_Dtmf'=>false,
             'msg'=>$msg,
             'phrases'=>$phrase_list,
             'repeat'=>0,
             //'callid'=>'$sender'
             );
         
         }
    
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
error_log_pr('rasa',"                {$utterance} ***uttrence");
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
    
    if(trim($utterance)!='-1'){//&& trim($utterance)!=''
        //$pagiClient->streamFile($callansweredpr);
        $callansweredpr='1';
        
        $calledpickup=true;
        //$utterance='';
        $pagiClient->setVariable('callansweredpr','1');
       
    }
}



if($callansweredpr=='1' || isset($istest) ){
    
        
    
    
    error_log_pr('rasa',"   big if1");

    $pagiClient->setVariable("phrases", "xyz");
    error_log_pr('rasa',"   big if2");
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
    

    $result=array();-
    $senderid=$pagiClient->getVariable('callid');
    
    $number1=$pagiClient->getVariable('number1');
    error_log_pr('rasa',"                {$senderid} ***callid Called");
    //call api
   // $data="hello";
   error_log_pr('rasa',"                {$utterance} ***Api Called");
//   error_log_pr('rasa',"                {$message} ***message outside Called");
   error_log_pr('rasa',"                {$number1} ***number outside Called");
   $result=callapi($senderid,$utterance,$number1);
    error_log_pr('rasa',"                {$utterance} afterrtry");
    error_log_pr('rasa',"   {$result['phrases']} phrses receive");
    //$pagiClient->setVariable('callid',$result['callid']);
    //$result=
    try{
        error_log_pr('rasa',"                {$utterance} Insidertry");
        $pagiClient->consoleLog('**************************************** 123');
        $data=array('msg'=>$result['msg'], 'event'=>$pagiClient->getVariable('event'),'questionid'=>$pagiClient->getVariable('questionid'),'data'=>$utterance);
    //$firstInterView->process_talk($data,$call,$repeatquestion,false,$result);
    $firstInterView->save_talk($data,$call);
  
    $pagiClient->consoleLog('**************************************** ');
   // $pagiClient->consoleLog('Message: ' .$e->getMessage());
    }catch(Exception $e){

       
        $pagiClient->consoleLog('**************************************** ');
        $pagiClient->consoleLog('Message: ' .$e->getMessage());
    }
    $pagiClient->consoleLog(json_encode($result));
            //$data
    //call api

}catch(Exception $ex){
    $pagiClient->consoleLog('Message: ' .$ex->getMessage());
}
   
    if(isset($istest)){
        echo '<br/>';
        var_dump($result);
        echo '<br/>';
    }
    // this is commented by me
    // if(!isset($firstInterView->questions[$result['questionid']])){
    //     $pagiClient->setVariable("speechtimeout",5000);
    //     $pagiClient->setVariable("silence",1500);
    // }else{
    // $pagiClient->setVariable("speechtimeout", intval($firstInterView->questions[$result['questionid']]['timeout'])*1000);
    // $pagiClient->setVariable('questionid',$result['questionid']);
    // $pagiClient->setVariable("silence", intval($firstInterView->questions[$result['questionid']]['silence'])*1000);
    // }
    $pagiClient->setVariable("phrases", $result['phrases']);
    /*$allPhrases=$result['phrases'];
    error_log_pr('rasa',"{$allPhrases}");
    $utt=exec("/bin/node /usr/local/node_programs/nodejs-speech/samples/recognize.js stream '/tmp/$senderid.raw' -e LINEAR16 -r 8000 -l 'en-IN' -p '$allPhrases' -c '0'");
    */
// this is commented by me   
error_log_pr('rasa',"   above comment");
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
    error_log_pr('rasa',"   big else1");
   // $pagiClient->setVariable('event','continue');
    $pagiClient->setVariable("phrases", 'ya,hi,hello,speaking,hi hello,hallo,heloo,hollo,hey');
    error_log_pr('rasa',"   big else2");
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

// $pagiClient->consoleLog(json_encode($result).'$$$$$$$$$$$$$$$$$');




































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
