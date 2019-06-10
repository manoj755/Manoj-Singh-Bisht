<?php

class FirstInterviewHelper {
    public $pagiClient=null;

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
                ['answer' => ['hello'], 'next' => '111', 'collect_data' => false],
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'sure','alright',
                 'this side', 'Speaking', 'Regards', 'regarding', 
                  $this->first_name], 'next' => '2', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                111
                

            ],
            '111' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'
                 ], 'next' => '2', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '112' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead']
                , 'next' => '2', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '113' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'],
                 'next' => '2', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '114' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'], 'next' => '4', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            

            '111.1' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'
                 ], 'next' => '4', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '112.1' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead']
                , 'next' => '4', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '113.1' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'],
                 'next' => '4', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],
            '114.1' => [
                ['answer' => ['company','client'], 'next' => '112', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'yeah', 'ok','sure','alright','go ahead'], 
                'next' => '4', 'collect_data' => false],
                ['answer' => $this->sharejd, 'next' => '24', 'collect_data' => false],
                ['answer' => [ 'no', 'not'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'

            ],
            ]],

            '24' => [
                ['answer' => ['sure','yes','ok','go ahead','alright','start','fine', 'ya', 'ha', 'han', 'yeah', 'fine'], 'next' => '2', 'collect_data' => false],
                ['answer' => ['not interested', 'no', 'not looking', 'not', 'recently changed'], 'next' => '16', 'collect_data' => false],
                
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ],
             
            '2' => [
                ['answer' => ['hello'], 'next' => '111.1', 'collect_data' => false],
                ['answer' => ['company','client'], 'next' => '112.1', 'collect_data' => false],
                ['answer' => ['profile'], 'next' => '113.1', 'collect_data' => false],
                ['answer' => ['location'], 'next' => '114.1', 'collect_data' => false],
               ['answer' => ['sure','ha','ok','yes', 'ya','yaa',  'han', 'yeah','alright', 'fine'], 'next' => '4', 'collect_data' => false],
               ['answer' => ['not interested', 'no', 'not looking', 'not', 'recently changed'], 'next' => '16', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
               ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ],
            '3' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['collect text'], 'next' => '18', 'collect_data' => true],
            //['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ]
            ,
            '4' => [
                ['answer' => ['yes', 'ok', 'go ahead', 'alright', 'sure', 'ha', 'han', 'yeah'], 'next' => '5', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office', 'no', 'not',], 'next' => '12', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
            ],
            '5' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['digits','months','days','day','fresher'], 'next' => '6', 'collect_data' => true],
            ],
            '6' => [
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['collect text','lac','lpa','lakh','0','fresher'], 'next' => '7', 'collect_data' => true],
            ],
            '7' => [
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['collect Text','lac','lpa','lakh','0','fresher'], 'next' => '8', 'collect_data' => true],
            ],
            '8' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['digits','1','2','3','4','5','6','7','8','9','10'], 'next' => '9', 'collect_data' => true],
            ],
            '9' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['digits','1','2','3','4','5','6','7','8','9','10'], 'next' => '10', 'collect_data' => true],
            ],
            '10' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['digits','1','2','3','4','5','6','7','8','9','10'], 'next' => '11', 'collect_data' => true],
            ],
            '11' => [
                
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => ['Digits','1','2','3','4','5','6','7','8','9','10','month','fresher','year','years'], 'next' => '14', 'collect_data' => true],
            ],
            '12' => [

                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => ['callect time and schedule call'], 'next' => '19', 'collect_data' => true],
            ],
            '14' => [
                ['answer' => ['no', 'not', 'don’t'], 'next' => '15', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => ['yes', 'ya', 'ha', 'han', 'yeah'], 'next' => '28', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
            ],
            '15' => [
                ['answer' => ['yes', 'ya', 'fine', 'alright', 'ok', 'ha', 'han'], 'next' => '16', 'collect_data' => false],
                ['answer' => ['no', 'not'], 'next' => '22', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                ['answer' => ['call me', 'call back', 'busy', 'meeting', 'in office'], 'next' => '12', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
            ],
            '30' => [
                ['answer' => ['yes', 'ya', 'fine', 'alright', 'ok', 'ha', 'han'], 'next' => '16', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => ['no', 'not'], 'next' => '22', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                
            ],
            '31' => [
                ['answer' => ['yes', 'ya', 'fine', 'alright', 'ok', 'ha', 'han'], 'next' => '16', 'collect_data' => false],
                ['answer' => ['no', 'not'], 'next' => '22', 'collect_data' => false],
                ['answer' => [ 'already in process','already received call','already interviewed','interview'], 'next' => '27', 'collect_data' => false],
                ['answer' => [ 'wrong number'], 'next' => '23', 'collect_data' => false],
                
            ],
            '16' => [
                ['answer' => [], 'next' => false, 'collect_data' => false],
            ],
            '17' => [
                ['answer' => [], 'next' => false, 'collect_data' => false],
            ], '18' => [
                ['answer' => [], 'next' => false, 'collect_data' => false]
            ], '23' => [
                ['answer' => [], 'next' => false, 'collect_data' => false]
            ]
        ];
        
    }

    public function setdata($data=array(), $call=null) {
        
        if(count($data)>0){

        $data = json_decode($data, true);

        foreach($data as $key => $val){
            
             $data[$key]=trim(strtolower($val));
          }

            if(isset($data['first_name'])){
        $this->first_name = strtolower($data['first_name']);
            }
            if(isset($data['clientname'])){
        $this->clientname = $data['clientname'];
            }
            if(isset($data['jobtitle'])){
        $this->jobtitle = $data['jobtitle'];
            }
        $this->joblocation = $data['joblocation'];
        $this->about = $data['about'];
        $this->primaryskill1 = $data['primaryskill1'];
        $this->primaryskill2 = $data['primaryskill2'];
        $this->primaryskill3 = $data['primaryskill3'];
        }else{
        $data=array('client_id'=>'1');
        }
        $this->templates = [
            'dtmfrepeat' => 'please provide response',
            'dtmfthanks' => 'thanks for your response',
            'dtmf' => 'press 1 if you are looking for job change, press 2 if you have any reference for ' . $this->jobtitle . ' , press 3 to disconnect.',
            'beloudclear' => 'Please be loud and clear'
            
        ];
        $this->default_fallback=[
            "I didn't get that. Can you say it again?",
            "I missed what you said. What was that?",
            "Sorry, could you say that again?",
            "Sorry, can you say that again?",
            "Can you say that again?",
            "Sorry, I didn't get that. Can you rephrase?",
            "Sorry, what was that?",
            "One more time?",
           // "What was that?",
            "Say that one more time?",
            "I didn't get that. Can you repeat?",
            "I missed that, say that again?",
            "I didn't get any input. Please speak again",

        ];
        $this->questions = [
        
            // 'helloanswer' => ['timeout' => 3, 'silence' => 2, 'question' =>
            //     [
            //         ["type" => 'audio_s', 'data' => "helloanswer", 'text' => "yes i can listen to you"],
            //     ]
            // ],

            'didnotgetanyinput' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => 'audio_s', 'data' => "helloanswer", 'text' => "I didn't get any input. Please speak again"],
                ]
            ],
            
            'didnotgetanyinputwithrepeat' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => 'audio_s', 'data' => "helloanswer", 'text' => "I didn't get any input."],
                    ["type" => 'audio_s', 'data' => "d", 'text' => "Hey "],
                    ["type" => 'audio_s', 'data' => "d", 'text' => "$this->first_name"],
                    ["type" => 'audio_s', 'data' => "d", 'text' => ", to listen again"],
                    ["type" => 'audio_s', 'data' => "d", 'text' => "ask me to repeat anytime"],
                ]
            ],
            'beloudandclear' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => 'audio_s', 'data' => "beloudandclear", 'text' => "I am unable to understand your input."],
                    ["type" => 'audio_s', 'data' => "beloudandclear", 'text' => "Please speak loud and clear."],
                    
                ]
            ],
            'beloudandclearwithrepeat' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => 'audio_s', 'data' => "beloudandclear", 'text' => "I am unable to understand your input."],
                    ["type" => 'audio_s', 'data' => "beloudandclear", 'text' => "Please speak loud and clear."],                    
                    ["type" => 'audio_s', 'data' => "d", 'text' => "Hey "],
                    ["type" => 'audio_s', 'data' => "d", 'text' => "$this->first_name"],
                    ["type" => 'audio_s', 'data' => "d", 'text' => ", to listen again"],
                    ["type" => 'audio_s', 'data' => "d", 'text' => "ask me to repeat anytime"],
                ]
            ],

            '1' => ['timeout' => 4, 'silence' => 2, 'question' =>
                [
                    //["type" => 'text', 'data' => "Hi $this->first_name."],
                    //["type" => 'audio', 'data' => "fi_1_1", 'text' => "I am a robot and my name is Shreyasi, I called you to check, If you are looking for a job change. can you please allow me 3 minutes?"],
                    ["type" => 'audio', 'data' => "bot1", 'text' => "I am a robot and my name is Shreyasi, I called you to check, If you are looking for a job change. can you please allow me 3 minutes?"],
                ]
            ],
        '111' => ['timeout' => 4, 'silence' => 2, 'question' =>
        [
            ["type" => 'audio_s', 'data' => "bot1", 'text' => "Yes i am listening to you."],
                ["type" => 'audio_s', 'data' => "bot1", 'text' => "Please let me know , Are you looking for job change?"],
        ]
        ],
        
  '112' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "name of the company is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->clientname"],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
],
'113' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "profile is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->jobtitle"],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
],
'114' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "job location is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->joblocation"],
        ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
]
,
        '111.1' => ['timeout' => 4, 'silence' => 2, 'question' =>
        [
            ["type" => 'audio_s', 'data' => "bot1", 'text' => "Yes i am listening to you."],
                ["type" => 'audio_s', 'data' => "bot1", 'text' => "Please let me know , Are you looking for job change?"],
        ]
        ],
        
  '112.1' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "name of the company is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->clientname"],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
],
'113.1' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "profile is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->jobtitle"],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
],
'114.1' => ['timeout' => 4, 'silence' => 2, 'question' =>
[
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "job location is "],
    ["type" => 'audio_s', 'data' => "bot1", 'text' => "$this->joblocation"],
        ["type" => 'audio_s', 'data' => "bot1", 'text' => "is this fine?"],
]
],

            '2' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio", "data" => 'bot2', 'text' => ""],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "Hi "],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "$this->first_name"],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "I have a job for the role of , "],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "$this->jobtitle"],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "at"],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "$this->clientname"],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => " for "],
                    ["type" => 'audio_s', 'data' => 'fi_2_1', 'text' => "$this->joblocation"],
                    //["type" => 'text', 'data' => "$this->jobtitle at $this->clientname for $this->joblocation."],
                    ["type" => 'audio_s', 'data' => 'fi_2_2', 'text' => "Is this fine?"],
                ]
            ],
            '2a' => ['timeout' => 3, 'silence' => 2, 'question' => [
                    ["type" => "text", "data" => "job location is "],
                    ["type" => "text", "data" => "$this->joblocation"]
                ]
            ],
            '2b' => ['timeout' => 3, 'silence' => 2, 'question' => [
                    ["type" => "text", "data" => "company is "],
                    ["type" => "text", "data" => "$this->clientname"]
                ]
            ],
            '2c' => ['timeout' => 3, 'silence' => 2, 'question' => [
                ["type" => "text", "data" => "client is "],
                ["type" => "text", "data" => "$this->clientname"]
            ]
        ],
        '2d' => ['timeout' => 3, 'silence' => 2, 'question' => [
            ["type" => "text", "data" => "Profile is "],
            ["type" => "text", "data" => "$this->jobtitle"]
        ]
    ], '2e' => ['timeout' => 3, 'silence' => 2, 'question' => [
        ["type" => "text", "data" => "My name is Shreyasi."]
    ]
],
            '3' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_3_1', 'text' => "Please suggest me, time to callback?"]
                ]
            ],
            '4' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    
                    ["type" => "audio_s", "data" => 'fi_4_1', 'text' => "Alright, Before we go ahead, let me give you a brief of my company"],
                    //["type" => "audio_s", "data" => "/about/" . $data['client_id'], 'text' => "$this->about"],
                    ["type" => "audio_s", "data" => "/about/" , 'text' => "$this->about"],
                    ["type" => 'text', 'data' => ", OK. Shall we start?"],
                //Smartly Built is the creative agency for a connected world. Beyond marketing and communications, we help businesses evolve and grow in the new digital landscape. The key to mass consumption of new and good ideas; they need a very broad and multidisciplinary teams to connect the dots., OK. Shall we start?
                ]
            //"Alright, Before we go ahead, let me give you a brief of my company, $this->about, OK. Shall we start?"
            ],
            '5' => ['timeout' => 3, 'silence' => 2,
                'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_5_1', 'text' => "I would like to check your Fitment for this role. Alright, Please help me with your notice Period'"]
                ]
            //'question' => ' First, I world like to check your Fitment for this role. Alright, Please help me with you notice Period'
            ],
            '6' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_6_1', 'text' => "Alright, what is your current CTC?"]
                ]
            //'question' => 'Alright, what is your current CTC?'
            ],
            '7' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_7_1', 'text' => "OK, What is your Expected CTC."]
                ]
            //'question' => 'OK, What is your Expected CTC'
            ],
            '8' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_8_1', 'text' => "Now lets get little technical, Rate yourself on the scale of 5 in "],
                    ["type" => "text", "data" => "$this->primaryskill1"]
                ]
            //'question' => "Now lets get little technical, Rate yourself out of 10 in $this->primaryskill1"
            ],
            '9' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_9_1', 'text' => "How much you will rate your self in"],
                    ["type" => "text", "data" => "$this->primaryskill2"],
                ]
            //'question' => "How much you will rate your self in $this->primaryskill2?"
            ],
            '10' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_10_1', 'text' => "and how much in "],
                    ["type" => "text", "data" => "$this->primaryskill3"]
                ]
            //'question' => "and how much in $this->primaryskill3"
            ],
            '11' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_11_1', 'text' => "Alright! What is your overall Experience?"],
                ]
            //'question' => 'Alright! What is your overall Experience?'
            ],
            '12' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_12_1', 'text' => "I understand. Please let me know what time shall I call you in next 24 hours?"]
                ]
            //'question' => 'I understand. Please let me know what time shall I call you in next 24 hours?'
            ],
            '14' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_14_1', 'text' => "Now please let me know have you ever applied via any other source for "],
                    ["type" => "text", "data" => "$this->clientname"],
                    ["type" => "audio_s", "data" => 'fi_14_2', 'text' => "in last 6 months?"],
                ]
            //'question' => "Now please let me know have you ever applied via any other source for $this->clientname, in last 6 months?"
            ],
            '15' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_15_1', 'text' => "Thank you for showing interest. Our team shall review your application and share further interview Process, Please note, we conduct all the Interview on weekdays, Is this fine with you?"]
                ]
            //'question' => 'Thank you for showing interest. Our team shall review your application and share further interview Process, Please note, we conduct all the Interview on weekdays, Is this fine with you?'
            ],
            '16' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "text", "data" => "Hey "],
                    ["type" => "text", "data" => "$this->first_name"],
                    ["type" => 'audio', 'data' => "bot3", 'text' => ", There is good news, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus."],
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                ]
            //'question' => "Hey $this->first_name, There is good news, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus."
            , 'disconnect' => true
            ],
            '28' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    
                    ["type" => "text", "data" => "Alright, "],
                    ["type" => "text", "data" => "$this->first_name"],
                    ["type" => "text", "data" => ", I shall check in job pipeline and keep you posted"],
                    ["type" => 'audio', 'data' => "bot3", 'text' => ""],
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                ]
            //'question' => "Hey $this->first_name, There is good news, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus."
            , 'disconnect' => true
                ],
            '17' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                ]
                //'question' => 'bye.. Have a great day ahead.'
                , 'disconnect' => true
            ],
            '18' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Thank you i have noted."],
                ]
                //'question' => 'Thank you i have noted.'
                , 'disconnect' => true
            ],
            '19' => ['timeout' => 3, 'silence' => 2,
                'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Thank you i have noted."],
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                //["type" => "text", "data" => 'fi_19_1', 'text' => "Thank you i have noted. bye.. Have a great day ahead."]
                ]
                //'question' => 'Thank you i have noted. bye.. Have a great day ahead.'
                , 'disconnect' => true
            ],
            '20' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Thank you i have noted."],
                   // ["type" => "audio_s", "data" => 'fi_16_1', 'text' => "There is good news, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus."],
                   ["type" => 'audio', 'data' => "bot3",'text'=>''],
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                //["type" => "text", "data" => 'fi_20_1', 'text' => "Thank you i have noted.There is good news for you, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus.. bye.. Have a great day ahead."]
                ]
                //'question' => "Thank you i have noted. Hey $this->first_name, There is good news for you, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus.. bye.. Have a great day ahead."
                , 'disconnect' => true
            ],
            '27' => ['timeout' => 3, 'silence' => 2, 'question' =>
            [
                ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Thank you i have noted."],
               // ["type" => "audio_s", "data" => 'fi_16_1', 'text' => "There is good news, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus."],
               ["type" => 'audio', 'data' => "bot3",'text'=>''],
                ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
            //["type" => "text", "data" => 'fi_20_1', 'text' => "Thank you i have noted.There is good news for you, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus.. bye.. Have a great day ahead."]
            ]
            //'question' => "Thank you i have noted. Hey $this->first_name, There is good news for you, After this call you will Receive a link in your email and sms, where you can login to PassiveReferral dot com and Refer friends from your network. On every successful joining you will get exciting Referral bonus.. bye.. Have a great day ahead."
            , 'disconnect' => true
        ],
            '21' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "audio_s", "data" => 'fi_18_1', 'text' => "Thank you i have noted."],
                    ["type" => "audio_s", "data" => 'fi_17_1', 'text' => "bye.. Have a great day ahead."],
                //["type" => "text", "data" => 'fi_21_1', 'text' => "Thank you i have noted bye.. Have a great day ahead."]
                ]
                //'question' => 'Thank you i have noted bye.. Have a great day ahead.'
                , 'disconnect' => true
            ],
            '22' => ['timeout' => 3, 'silence' => 2, 'question' =>
                [
                    ["type" => "text", "data" => "Hey "],
                    ["type" => "text", "data" => "$this->first_name"],
                    ["type" => "text", "data" => 'fi_22_1', 'text' => ", I have a good news for you, After the call you will Receive a link in your email and sms where you can login to PassiveReferral.com and Refer friends from your network and on every successful joining you will get exciting Referral bonus.bye.. Have a great day ahead."]
                ]
                //'question' => "Hey $this->first_name I have a good news for you, After the call you will Receive a link in your email and sms where you can login to PassiveReferral.com and Refer friends from your network and on every successful joining you will get exciting Referral bonus.bye.. Have a great day ahead."
                , 'disconnect' => true
            ],
            '23' => ['timeout' => 0, 'silence' => 0,
                'question' =>
                [
                    ["type" => "text", "data" => 'fi_23_1', 'text' => "Oops sorry, Have a good day."]
                ]
                //'question' => "Oops sorry, Have a good day."
                , 'disconnect' => true
            ],

            '24' => ['timeout' => 0, 'silence' => 0,
                'question' =>
                [
                    ["type" => "text", "data" => "Sure, I will sare the job description with you but before that i need to know few more details from you."],
                    ["type" => "text", "data" =>  "Shall we go ahead."],
                    

                ]
                //'question' => "Oops sorry, Have a good day."
                , 'disconnect' => false
            ],

            '25' => ['timeout' => 0, 'silence' => 0,
                'question' =>
                [
                    ["type" => "text", "data" => "Alright, You will recieve the job description in your inbox, after we complete this call"],
                    ["type" => "text", "data" => "Please help me in complating this call."],
                ]
                //'question' => "Oops sorry, Have a good day."
                , 'disconnect' => false
            ],
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

        $break=false;
        //  dd($data);
        //dd($question);
        $data = rawurldecode($data);
        // dd($data);
        foreach ($questionlist as $question) {

            if ($question['next'] == false) {
                $next = false;
                break;
            } else {
                $this->pagiClient->consoleLog('data is '.$data);
                $this->pagiClient->consoleLog('answer is  '.json_encode($question['answer']));
                foreach ($question['answer'] as $k=> $answer) {
                    
                    
                    if ( $question['collect_data']  ==true ||  
                            ( $data == $answer  || 
                                ( $data!='hello' && 
                                    ( str_contains($answer, $data) || str_contains($data, $answer))
                                )
                            )
                        ) {
                        $next = $question['next'];

                        $this->pagiClient->consoleLog('######## data is '.$data);
                $this->pagiClient->consoleLog('######## answer is  '.json_encode($question['answer']));
                        $this->pagiClient->consoleLog('######## next question  '.$next);
                        $this->pagiClient->consoleLog('######## next is  '.json_encode($this->questions[$next]));

                        $break=true;
                        break;

                    }
                }
                if($break){
                    break;
                }
            }
        }
        
        $is_disconnect = false;
        
        if ($next !== false && $next == $this->nodata) {
            
            if (isset($this->question_work_flow[$next])) {
                $questionlist = $this->question_work_flow[$next];
                if (count($questionlist) > 0) {
                    $is_disconnect = $questionlist[0]['next'];
                }
            }
        }
    
        
        
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
        $repeats = array('pardon', 'repeat', 'sorry', 'come again','speak again', 'get it', 'get you');
        $is_repeat = false;
        $is_location = FALSE;
        $is_name=false;

        $is_company = FALSE;
       // $is_hello=false;

        // if ('hello' == $data ||  str_contains('hello', $data) || str_contains($data, 'hello')) {
        //     $msg = $this->questions['helloanswer']['question'];
        //     $is_disconnect = false;
        //     $is_Dtmf = FALSE;
        //     $is_hello = true;
            
        // }else
        if ('location' == $data ||  str_contains('location', $data) || str_contains($data, 'location')) {
            $msg = $this->questions['2a']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_location = true;
            
        }else
        if ('company' == $data ||  str_contains($data, 'company')) {
            $msg = $this->questions['2b']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_company = true;
            
        }else
        if ('name' == $data ||  str_contains($data, 'name')) {
            $msg = $this->questions['2e']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_name = true;
            
        }else
        if ('client' == $data ||  str_contains($data, 'client')) {
            $msg = $this->questions['2c']['question'];
            $is_disconnect = false;
            $is_Dtmf = FALSE;
            $is_company = true;
            
        }
        $is_share_jd =false;
        
        if($questionid!='1'){
            
            foreach($this->sharejdanytime as $datasd){
                if($datasd == $data ||  str_contains($data, $datasd)){
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
                if($datasd == $data ||  str_contains($data, $datasd)){
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
        if ( $questionid!='1' && ($is_location|| $is_company||$is_share_jd||$is_job_title||$is_name)) {
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
                $questionid = $answer;
                $question = $answer;
            }
            $this->pagiClient->consoleLog($question);
            //  dd($question);




            if ($answer ===  $this->nodata||$answer==false) {
                if(false && $this->pagiClient->getVariable('repeatinfogiven')=='2'){
                $msg = $this->questions['beloudandclearwithrepeat']['question'];
                
                }else{
                    
                    $msg = $this->questions['beloudandclear']['question'];
                }
                $call->repetition = (int) $call->repetition + 1;

                $is_disconnect = FALSE;
            } 
            // else if (false === $question&&false) {
            //     $is_disconnect = true;
            // } 
            else {

                //$all['replytime'] = $call->updated_at;
//                $question = $result;
//var_dump($call);
                if ($call->question == $questionid) {
                    $call->repetition = (int) $call->repetition + 1;
                } else {
                    $call->repetition = 0;
                    $call->question = $questionid;
                }
                //dd($call->last_question);





               //$call->save();
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
            if(false&&$this->pagiClient->getVariable('repeatinfogiven')=='2'){
                $msg = $this->questions['didnotgetanyinputwithrepeat']['question'];
                
                }else{

                    

                    
                    
                    //$msg = $this->questions['didnotgetanyinput']['question'];

                    $msg= [
                        ["type" => "audio_s", "data" => 'fi_18_1', 'text' => $this->default_fallback[mt_rand(0, count($this->default_fallback) - 1)]],
                    ] ;  
                }
            $call->repetition = (int) $call->repetition + 1;

            $is_disconnect = FALSE;
            if($this->isdebug){

                //var_dump($originalquestionid);
               // dd('it is at last');
                //print_r(get_defined_vars());
            }
        }
        }


        $this->pagiClient->setVariable('repeatinfogiven',(intval($this->pagiClient->getVariable('repeatinfogiven'))+1));
       
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

        //$this->pagiClient->consoleLog('repitation is'.$call->repetition);
        //$this->pagiClient->consoleLog('conversatoin is'.$call->conversation);
        //$this->pagiClient->consoleLog('data is'.$all['data']);
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
            //dd($resultarr);
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
            if(isset($this->questions[$questionid])){
            $timeout = $this->questions[$questionid]['timeout'];
            $silence = $this->questions[$questionid]['silence'];
            }
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
    }
    else{
        $is_disconnect=isset($this->questions[$originalquestionid]['disconnect'])?$this->questions[$originalquestionid]['disconnect']:false;
    }
        $phrases=implode($phrases,',');
        $speech= $call->getspeechstr($msg);
        //echo 'narender';
        //dd($speech);

        if ($is_new_call) {

            if (strlen($speech) > 0) {
                $call->last_question = $speech;
                $call->save();
            }
        } else {

            
            $last_question = $call->getspeechstr($call->last_question);
            //$this->pagiClient->consoleLog('last question is **************  '.$last_question.'**************');
            //$this->pagiClient->consoleLog('last question  is ******************** '.$data.'**************');
            $conversation = json_decode($call->conversation, true);


            $conversation[$last_question . '__' . $call->repetition.$questionid] = $data;
            //dd(json_encode($conversation));
            //dd($conversation);
            $call->conversation = json_encode($conversation);
            $call->last_question = $speech;
            //$this->pagiClient->consoleLog('current question  ********************'.$speech.'**************');
            

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
