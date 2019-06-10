<?php

class DemoCall {

    private $request = null;
    private $nodata = 'nodata';
    private $first_name = 'Arvind';
    private $clientname = 'Progress software';
    private $jobtitle = 'Software Developer';
    private $joblocation = 'Noida';
    private $about = 'Progress software one of fortune five hundered company';
    private $primaryskill1 = 'php';
    private $primaryskill2 = 'mysql';
    private $primaryskill3 = 'react native';
    private $sharejd=['share jd','send me job description', 'job description', 'share details','send email',  'email', 'mail', 'jd', 'job description'];
    private $sharejdanytime=['share jd', 'job description','send me job description', 'share details','send email',  'email', 'mail', 'jd', 'job description'];
    private $shareprofileanytime=['profile', 'designation','job title', 'job role','which role'];
    
    public $questions = [
    ];
    public $isdebug=false;
    public $call=null;
    public $question_work_flow = [
    ];
    private $templates = [
//        'dtmfrepeat' => 'please provide response',
//        'dtmfthanks' => 'thanks for your response',
//        'dtmf' => 'press 1 if you are looking for job change, press 2 if you have any reference for 33 , press 3 to disconnect.',
//        'beloudclear' => 'Please be loud and clear',
    ];

    function __construct() {




        $this->question_work_flow = [
            '1' => [
                ['answer' => ['yes', 'ya', 'this side', 'Speaking', 'Regards', 'regarding', 'who is this', 'ha', 'han', $this->first_name], 'next' => '2', 'collect_data' => false],
                ['answer' => ['wrong number', 'no', 'not'], 'next' => '3', 'collect_data' => false],
            ],
            '2' => [
                ['answer' => ['yes', 'ya', 'ha', 'han'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['not interested', 'no', 'not looking', 'not', 'recently changed'], 'next' => '24', 'collect_data' => false],
            ],
            '3' => [
                ['answer' => ['collect text'], 'next' => '18', 'collect_data' => true],
            //['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ]
            ,
            '4' => [
                ['answer' => ['yes', 'ok', 'go ahead', 'alright', 'sure', 'ha', 'han'], 'next' => '5', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ],
            '5' => [
                ['answer' => ['digits'], 'next' => '6', 'collect_data' => true]
            ],
            '6' => [
                ['answer' => ['collect text'], 'next' => '7', 'collect_data' => true]
            ],
            '7' => [
                ['answer' => ['collect Text'], 'next' => '8', 'collect_data' => true]
            ],
            '8' => [
                ['answer' => ['digits'], 'next' => '9', 'collect_data' => true]
            ],
            '9' => [
                ['answer' => ['digits'], 'next' => '10', 'collect_data' => true]
            ],
            '10' => [
                ['answer' => ['digits'], 'next' => '11', 'collect_data' => true]
            ],
            '11' => [
                ['answer' => ['Digits'], 'next' => '14', 'collect_data' => true]
            ],
            '12' => [
                ['answer' => ['callect time and schedule call'], 'next' => '19', 'collect_data' => true]
            ],
            '14' => [
                ['answer' => ['no', 'not', 'don’t'], 'next' => '20', 'collect_data' => true],
                ['answer' => ['yes', 'ya', 'ha', 'han'], 'next' => '15', 'collect_data' => false]
            ],
            '15' => [
                ['answer' => ['yes', 'ya', 'fine', 'alright', 'ok', 'ha', 'han'], 'next' => '16', 'collect_data' => false],
                ['answer' => ['no', 'not'], 'next' => '22', 'collect_data' => false]
            ],
            '16' => [
                ['answer' => [], 'next' => false, 'collect_data' => false]
            ],
            '17' => [
                ['answer' => [], 'next' => false, 'collect_data' => false]
            ],
            '18' => [
                ['answer' => [], 'next' => false, 'collect_data' => false]
            ],
            '23' => [
                ['answer' => [], 'next' => false, 'collect_data' => false,'disconnect' => true]
            ],
            '24' => [
                ['answer' => [], 'next' => false, 'collect_data' => false, 'disconnect' => true]
            ]
        ];
        
    }

    public function setdata($data=array(), $call=null) {
        
        if(count($data)>0){

        $data = json_decode($data, true);
            if(isset($data['first_name'])){
        $this->first_name = $data['first_name'];
            }
            if(isset($data['clientname'])){
        $this->clientname = $data['clientname'];
            }
            if(isset($data['jobtitle'])){
        $this->jobtitle = $data['jobtitle'];
        $this->joblocation = $data['joblocation'];
        $this->about = $data['about'];
        $this->primaryskill1 = $data['primaryskill1'];
        $this->primaryskill2 = $data['primaryskill2'];
        $this->primaryskill3 = $data['primaryskill3'];
            }
        
        }else{
        $data=array('client_id'=>'1');
        }
        $this->templates = [
            'dtmfrepeat' => 'please provide response',
            'dtmfthanks' => 'Thank you for attending this demonstration, Our team shall connect you shortly.',
            'dtmf' => 'press 1 for request callback, press 2 to send email, press 3 if you are not intersted.',
        ];
        $this->questions = [
            '0' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'Please be loud and clear']]],
            '1' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Hi am I Speaking to " . $this->first_name . " ?"]]],
            '2' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Hi $this->first_name I am bot Shreyasi from $this->clientname and called you in the Regards of a job I have for the role of $this->jobtitle at $this->joblocation. Are you looking for a job change?"]]],
            '3' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "What time i can call back to connect  $this->first_name ?"]]],
            '4' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "That is great, Before we go ahead let me give you a brief of my company, $this->about hope this is exciting? shall we start?"]]],
            '5' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  ' First, I world like to check your Fitment for this role. Alright, Please help me with you notice Period']]],
            '6' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'alright, what is your current CTC?']]],
            '7' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'ok, What is your Expected CTC']]],
            '8' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "Now lets get little technical, Rate yourself out of 10 in $this->primaryskill1"]]],
            '9' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "How much you will rate your self in $this->primaryskill2?"]]],
            '10' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "and how much in $this->primaryskill3"]]],
            '11' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'Alright! What is your overall Experience?']]],
            '12' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'I undertand Please let me know what time shall I call you? I can call your anytime in next 24 hours']]],
            '14' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "Just before I Conclude I have few last things to check from you, did you get any call or have you ever applied via any other source for $this->clientname in last 6 months "]]],
            '15' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'Thanks for giving me time over the phone and showing interest for this job, our team shall review your application and share further Process with you, also we conduct all the Interview on weekdays, Is this fine with you']]],
            '16' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "Hey $this->first_name I have a good news for you, After the call you will Receive a link in your email and sms where you can login to PassiveReferral.com and Refer friends from your network and on every successful joining you will get exciting Referral bonus"]]],
            '17' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'bye.. Have a great day ahead  ']]],
            '18' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => 'Thank you i have noted ']]],
            '19' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'Thank you i have noted bye.. Have a great day ahead ']]],
            '20' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "Thank you i have noted Hey $this->first_name I have a good news for you, After the call you will Receive a link in your email and sms where you can login to PassiveReferral.com and Refer friends from your network and on every successful joining you will get exciting Referral bonusbye.. Have a great day ahead  "]]],
            '21' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'Thank you i have noted bye.. Have a great day ahead ']]],
            '22' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  "Hey $this->first_name I have a good news for you, After the call you will Receive a link in your email and sms where you can login to PassiveReferral.com and Refer friends from your network and on every successful joining you will get exciting Referral bonusbye.. Have a great day ahead  "]]],
            '23' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'Alright, I have noted that you are interested. Thank you for attending this demonstration, Our team shall connect you shortly.']]],
            '24' =>['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' =>  'Alright, I have noted that you are not interested. Thank you for attending this demonstration, Our team shall connect you shortly.']]],
        ];
    }

//  ['answer' => ['yes', 'ha'], 'next' => '2a'],
//            ['answer' => ['no', 'na'], 'next' => '2b'],
//            ['answer' => ['repeat', 'pardon'], 'next' => '2c']
    

    private function process_question($data, $question) {
        $next = $this->nodata;

        //var_dump(get_defined_vars);
        if ($data == '') {
            return $next;
        }
        $questionlist = [];
//        dd($this->question_work_flow[$question]);
//        dd($question);
        if (isset($this->question_work_flow[$question])) {
            $questionlist = $this->question_work_flow[$question];
        }
        //dd($questionlist);
        if (count($questionlist) == 0) {
            return false;
        }


        //  dd($data);
        //dd($question);
        $data = rawurldecode($data);
        // dd($data);
        foreach ($questionlist as $question) {

            if ($question['next'] == false) {
                $next = false;
                break;
            } else {
                foreach ($question['answer'] as $answer) {


                    if ($question['collect_data']  ==true || $data == $answer || str_contains($answer, $data) || str_contains($data, $answer)) {
                        $next = $question['next'];
                        break;
                    }
                }
            }
        }
        // dd($next);
        $is_disconnect = false;
        if ($next !== false && $next == $this->nodata) {

            if (isset($this->question_work_flow[$next])) {
                $questionlist = $this->question_work_flow[$next];
                if (count($questionlist) > 0) {
                    $is_disconnect = $questionlist[0]['next'];
                }
            }
        }

        // dd($next);

        return array('next' => $next, 'disconnect' => $is_disconnect);
    }
    

    private function process_normal($call, $data, $questionid, $is_disconnect, $is_Dtmf, $msg) {

        
        if($this->repeatquestion){
            
            return array('data' => $data,
            'questionid' => $questionid,
            'is_disconnect' => false,
            "is_Dtmf" => $is_Dtmf,
            'msg' => $this->questions[$questionid]['question'],
        );
        }


        $originalquestionid=$questionid;
        if($this->isdebug){

            //var_dump($originalquestionid);
            dd($questionid);
            //print_r(get_defined_vars());
        }
        $repeats = array('pardon', 'repeat', 'sorry', 'come again');
        $is_repeat = false;
        $is_location = FALSE;
        $is_name=false;

        $is_company = FALSE;
        
        if ('location' == $data ||  str_contains('location', $data) || str_contains($data, 'location')) {
            $msg = $this->questions['2a']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_location = true;
            
        }

        if ('name' == $data ||  str_contains('name', $data) || str_contains($data, 'name')) {
            $msg = $this->questions['2e']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_name = true;
            
        }

        if ('company' == $data ||  str_contains('company', $data) || str_contains($data, 'company')) {
            $msg = $this->questions['2b']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_company = true;
            
        }
        if ('client' == $data ||  str_contains('client', $data) || str_contains($data, 'client')) {
            $msg = $this->questions['2c']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_company = true;
            
        }
        $is_share_jd =false;
        
        if($questionid!='1'){
            
            foreach($this->sharejdanytime as $datasd){
                if($datasd == $data ||  str_contains($datasd, $data) || str_contains($data, $datasd)){
                    $is_share_jd=true;
                    break;
                }
            }
            
            
        }
        if ($is_share_jd) {
            
            $msg = $this->questions['25']['question'];
            
            $is_Dtmf = FALSE;
         
        }

        $is_job_title =false;
        
        
            
            foreach($this->shareprofileanytime as $datasd){
                if($datasd == $data ||  str_contains($datasd, $data) || str_contains($data, $datasd)){
                    $is_job_title=true;
                    break;
                }
            }
            
            
        
        if ($is_job_title) {
            
            $msg = $this->questions['2d']['question'];
            
            $is_Dtmf = FALSE;
         
        }
        if($this->isdebug){
         
        }
        //var_dump($questionid);
        if ($is_location|| $is_company||$is_share_jd||$is_job_title||$is_name) {
            $this->repeat='1';
            return array('data' => $data,
                'questionid' => $questionid,
                'is_disconnect' => $is_disconnect,
                "is_Dtmf" => $is_Dtmf,
                'msg' => $msg,
            );
        }
        if($this->isdebug){

            //var_dump($originalquestionid);
         //   dd($questionid);
            //print_r(get_defined_vars());
        }
        foreach ($repeats as $repeat) {
            if ($repeat == $data || str_contains($repeat, $data) || str_contains($data, $repeat)) {
                $msg = $this->questions[$questionid]['question'];
                $is_disconnect = false;
                $is_Dtmf = FALSE;
                $is_repeat = true;
                break;
            }
        }
     
        if ($is_repeat) {
            
            return array('data' => $data,
                'questionid' => $questionid,
                'is_disconnect' => $is_disconnect,
                "is_Dtmf" => $is_Dtmf,
                'msg' => $msg,
            );
        }
        
        if (strlen($data) > 0) {

            if($this->isdebug){

                //var_dump($originalquestionid);
                dd('data length was greater than zero');
                //print_r(get_defined_vars());
            }
            
            //$answer = $this->process_question($data, $questionid);

            $response = $this->process_question($data, $questionid);
            
            $answer = $response['next'];
            $is_disconnect = $response['disconnect'];
            if (false == $answer) {
                $question = false;
            } else {
                if (strlen($answer) < 3) {
                    $questionid = $answer;
                }
                $question = $answer;
            }
            //  dd($question);




            if ($answer == $this->nodata) {
                $msg = $this->questions['beloudandclear']['question'];
                $call->repetition = (int) $call->repetition + 1;
                $call->save();

                $is_disconnect = FALSE;
            } else if (false === $question) {
                $is_disconnect = true;
            } else {

                //$all['replytime'] = $call->updated_at;
//                $question = $result;
//var_dump($call);
                if ($call->question == $questionid) {
                    $call->repetition = (int) $call->repetition + 1;
                } else {
                    $call->repetition = 0;
                    $call->question = $questionid;
                }






               $call->save();
                //dd($answer);    
                $msg = $this->questions[$questionid]['question'];

                //dd($msg);
                //$is_disconnect = FALSE;
            }

        
         }
        else if ((int) $call->repetition > 0&&false) {
            
            // $call->question = $questionid;
           // $is_Dtmf = true;
            $msg = $this->templates['dtmf'];
            if ($call->repetition > 1) {
                $msg = $this->templates['dtmfrepeat'] . ' ' . $msg;
            }
            $msg="please provide response";
            $call->repetition = (int) $call->repetition + 1;
            $call->save();

            $is_disconnect = FALSE;
            
        } 
        else if ((int) $call->repetition == 0 || true) {
             if(isset($this->questions[$questionid]) && isset($this->questions[$questionid]['disconnect'])&&$this->questions[$questionid]['disconnect']==true){
                $is_disconnect=true;
             }else{
            //if(isset($this->questions[$questionid]))
            if($this->isdebug){

                //var_dump($originalquestionid);
                dd('data length was greater than zero');
                //
            }
            if($this->isdebug){

                //var_dump($originalquestionid);
                dd('it is at last');
                //print_r(get_defined_vars());
            }
            $call->question = $questionid;
            $msg = $this->questions['beloudandclear']['question'];
            $call->repetition = (int) $call->repetition + 1;
            $call->save();

            $is_disconnect = FALSE;
            if($this->isdebug){

                //var_dump($originalquestionid);
               // dd('it is at last');
                //print_r(get_defined_vars());
            }
        }
        }
       
          //  var_dump($msg);
        return array('data' => $data,
            'questionid' => $questionid,
            'is_disconnect' => $is_disconnect,
            "is_Dtmf" => $is_Dtmf,
            'msg' => $msg,
        );
    }
    public $repeat='0';
    public $repeatquestion=false;

    public function process_talk($all,$call,$repeatquestion=false) {


$this->repeatquestion=$repeatquestion;
        
        $originalquestionid=$all['questionid'];
        $this->call=$call;
        //sleep(3);
        //$session = $request->session();

        
        if (!isset($all['event'])) {
            if($this->isdebug){
                var_dump($all['event']);
            }
            //$call = Call::where('sid', '=', $all['sid'])->firstOrFail();
             $call->disconnect_data = json_encode($all);
             $call->save();
            // Log::error(json_encode($all));
                
            exit();
        }
        //dd($all['test']);
        if (isset($all['test'])) {
            if($this->isdebug){
                var_dump($all['event']);
            }
            //$all['call_id'] = 17;
            $all['sid'] = '9849153363535431';
        }
        //dd($all);
        if (isset($all['call_id'])) {
            if($this->isdebug){
                var_dump($all['event']);
            }
           // $call = Call::find($all['call_id']);
        } else {
            //$call = Call::where('sid', '=', $all['sid'])->firstOrFail();
        }
        if (isset($all['test']) && $all['event'] == "NewCall") {
            //$call->mobile = $mobileno;
             $call->conversation = '[]';
            $call->question = 0;
             $call->repetition = 0;
             $call->save();
             if($this->isdebug){
                var_dump($all['event']);
            }
        }

        
       $this->setdata($call->custom_data, 1);
        //dd($session);
        //var_dump($call);
        // Log::error(json_encode($all));
        //$this->request = $request;
//process
if($this->isdebug){
    var_dump($all);
}
        $data = '';
        if (isset($all['data'])) {
            $data = strtolower($all['data']);
        }
         
        $is_disconnect = false;
        $msg = '';
        $question = '';
        $is_Dtmf = FALSE;
        $is_new_call = false;
        if($this->isdebug){
            
            print_r($all);
        }
        if ($all['event'] == "NewCall") {
            $is_new_call = true;
            //$call=new Call();
            $questionid = 1;
            $msg = $this->questions[$questionid]['question'];

            //var_dump($msg);
            
//            session(['questionid' => 1]);
//
//            session(['caller_number' => $all['cid']]);
//            session(['kookoo_number' => $all['called_number']]);
////called_number is register phone number on kookoo
////
//            session(['session_id' => $all['sid']]);
            //$call = new Call();
            // $call = Call::find($all['call_id']);
            // $call->sid = $all['sid'];
            // $call->question = $questionid;
            // $call->call_status = 'connected';
            // $call->save();
        } else if ($all['event'] == "Disconnect" || $all['event'] == "Hangup") {
//when users hangs up at any time in call  event=Disconnect 
// when applicatoin sends hangup event event=Disconnect  
//if users hang up the call in dial event you will get data ans status params also
//$_SESSION['dial_record_url']=$_REQUEST['data'];
//$_SESSION['dial_status']=$_REQUEST['status'];
            //$call->sid = $all['sid'];
            $last_question = $call->last_question;

             $conversation = json_decode($call->conversation, true);


            $conversation[$last_question . '__' . $call->repetition] = $data;
            // //dd(json_encode($conversation));
            // //dd($conversation);
             $call->conversation = json_encode($conversation);
            $call->call_status = 'disconnected';
             $call->save();
            exit;
        } else if ($all['event'] == 'GotDTMF') {
            // $call = Call::where('sid', '=', $all['sid'])->firstOrFail();

            if ($all['data'] == '') {
                $is_Dtmf = TRUE;
                // dd($msg);
                $msg = $this->templates['dtmf'];

                $msg = $this->templates['dtmfrepeat'] . '. ' . $msg;
            } else {

                //$call->dtmf_response = $all['data'];
                if ($all['data'] == '1') {
                    //$call->call_status = 'requestcallback';
                } else
                if ($all['data'] == '2') {
                    //$call->call_status = 'sendjd';
                }
                //$call->save();
                $is_disconnect = true;
                $is_Dtmf = false;
                $msg = $this->templates['dtmfthanks'];
            }
        } else {
            //dd(Call::all()->count());
            // dd($all['sid']);



            //$questionid = $call->question;
            $questionid=$all['questionid'];
            if($this->isdebug){
            
                print_r($questionid."sdfsdf");
            }
//             return array('data' => $data,
//            'questionid' => $questionid,
//            'is_disconnect' => $is_disconnect,
//            "is_Dtmf" => $is_Dtmf
//        );
            //var_dump($all['questionid']);
           // $call  =array();
            $resultarr = $this->process_normal($call, $data, $questionid, $is_disconnect, $is_Dtmf, $msg);
            if($this->isdebug){
                var_dump($resultarr);
            }
            //var_dump($resultarr);
            $data = $resultarr['data'];
            $questionid = $resultarr['questionid'];
            $is_disconnect = $resultarr['is_disconnect'];
            $is_Dtmf = $resultarr['is_Dtmf'];
            $msg = $resultarr['msg'];
            
        }
//        else{
//              $r->addPlayText('Sorry, session and events not maintained properly, Thank you for calling, have nice day');
//            $r->addHangup();
//        }
//  $r->addPlayText('Sorry, session and events not maintained properly, Thank you for calling, have nice day');
//$r->addHangup();
//process
        if (isset($questionid)) {
            $timeout = $this->questions[$questionid]['timeout'];
            $silence = $this->questions[$questionid]['silence'];
        } else {
            $timeout = 4;
            $silence = 2;
        }
        $phrases=array();
        if(isset($this->question_work_flow[$questionid])){
        foreach($this->question_work_flow[$questionid] as $optresponse){
            if(is_array($optresponse)){
            $phrases =array_merge($phrases,$optresponse['answer']) ;
            }
        }
    }else{
        $is_disconnect=isset($this->questions[$originalquestionid]['disconnect'])?$this->questions[$originalquestionid]['disconnect']:false;
    }
        $phrases=implode($phrases,',');
        
        if(false){
            if ($is_new_call) {

                if (strlen($msg) > 0) {
                    $call->last_question = $msg;
                    $call->save();
                }
            } else {
                $last_question = $call->last_question;
    
                $conversation = json_decode($call->conversation, true);
    
    
                $conversation[$last_question . '__' . $call->repetition] = $data;
                //dd(json_encode($conversation));
                //dd($conversation);
                $call->conversation = json_encode($conversation);
                $call->last_question = $msg;
                $call->save();
            }
        }


        $speech='';        
        if(is_array($msg)){
            foreach ($msg as $template) {
                if ($template['type'] == 'text'  ) {
                    $speech.=' '.$template['data'];
                } else if ($template['type'] == 'audio') {
                    $speech.=' '.$template['text'];
                    //$r->addPlayAudio($url . $template['data'] . $ext);
                }
            }
        }
        if ($is_new_call) {

            if (strlen($speech) > 0) {
                $call->last_question = $speech;
                $call->save();
            }
        } else {
            $last_question = $call->last_question;

            $conversation = json_decode($call->conversation, true);


            $conversation[$last_question . '__' . $call->repetition] = $data;
            //dd(json_encode($conversation));
            //dd($conversation);
            $call->conversation = json_encode($conversation);
            $call->last_question = $speech;
            $call->save();
        }
        return array(
            'data'=>$data,
            'questionid'=>$questionid,
            'is_disconnect'=>$is_disconnect,
            'is_Dtmf'=>$is_Dtmf,
            'msg'=>$msg,
            'phrases'=>$phrases,
            'repeat'=>$this->repeat
            );
 
       

    }

}
