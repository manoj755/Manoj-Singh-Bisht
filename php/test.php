#!/usr/bin/php
<?php
 //echo exec("/bin/node /usr/local/node_programs/nodejs-speech/samples/recognize.js stream '/tmp/2134.raw' -e LINEAR16 -r 8000 -l 'en-IN' -p '' -c '0'");
//exit();
ini_set('display_errors', 1);
error_reporting(E_ALL); 


 


// include 'lib/call.php';
// $call=new Call();
// $call->readOne(328);
// var_dump(json_decode($call->custom_data)->first_name);
// exit();
// $stmt=$call->readAll();
// $num = $stmt->rowCount();
// echo $num;

// while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
 
//     extract($row);
    
//     echo $custom_data;
// }




// exit();
 require 'custom_functions.php';

//  echo  "_".$tts->convert_tts('hi howd are you friends','en','1')."_";
//  exit();

class pagiClient{

    

    public function getVariable($type){

        if($type=='utterance'){
       return 'yes';
        }else if($type== 'event'){
            return 'continue';
        }else if($type== 'questionid'){
            return "0";
        }else if($type== 'reason'){
            return "";
        }else if($type== 'callid'){
            return "8611";
        }else if($type== 'callid_main'){
            return "8911";
        }else if($type=='lastquestion'){
            return 'last';
        }

    }

    public function getCDR(){
        return null;
    }

    public function setVariable($t,$ts){

    }

    public function hangUp()
    {
        
    }

    public function consoleLog($var){
        
        
        echo '<br/>';
        var_dump($var);
        echo '<br/>';
    }


}
$istest=true;


$pagiClient=new pagiClient();

//include 'interview.php';
include 'botinterview.php';

//include 'hangup.php';

//include 'processspeech.php';




// [allPR]
// exten => s,1,agi(php/call_type.php)
// exten => s,n(processanswer),agi(php/app.php)
// exten => s,n,eagi(googletts.agi,${speech},en)
// exten => s,n(record),eagi(speech-recog.agi,en,2,#,NOBEEP)
// exten => s,n,Verbose(1,Script returned: ${confidence} , ${utterance})
// exten => s,n,Goto(s,processanswer)
// exten => s,n,Hangup()