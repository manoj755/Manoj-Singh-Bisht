<?php

 

function callapi($sender,$message){
     

     
$curl = curl_init();

 
 

curl_setopt_array($curl, array(

  CURLOPT_PORT => "5002",

  CURLOPT_URL => "http://192.168.1.15:5002/webhooks/rest/webhook",

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

  $msg=array();

     if ($err) {
     
        
         $msg= array(
             array('type'=>'text','data'=>"errorcURL Error " . $err)
         );
         
     
     } else {
     
        
     $responses=json_decode($response,true);
     
foreach($responses as $response ){
       $msg[]=array('type'=>'text','data'=>$response['text']);
}
     
     }
     
     
         return array(
         'data'=>'',
         //'questionid'=>$questionid,
         'is_disconnect'=>false,
         'is_Dtmf'=>false,
         'msg'=>$msg,
         'phrases'=>'',
         'repeat'=>0
         );
     
     }



     var_dump(callapi('Rasa','hi'));