<?php
/*


asterisk -r
agi set debug on
core set verbose 4



Your issue it is on the PHP script but the commands you listed above are Asterisk debug commands, 
so they are practically useless in your case. Instead you should add error_reporting(E_ALL) to your PHP script.

Also you should use oci_error() function it will Returns the last error found.


#!/usr/local/bin/php -q

*/
echo md5('hi how are you.en.1');

error_reporting(E_ALL);
include 'IVR/FirstInterviewHelper.php';
$firstInterView=new FirstInterviewHelper();
$firstInterView->setdata();
foreach ($firstInterView->questions as $key => $value) {
    
    foreach ($value['question'] as $k=> $template) {

    //var_dump($template);
    
            
           
        
             if ($template['type'] == 'audio') {
                $file='/root/Documents/pr/'.$template['data'];
            }else if ($template['type'] == 'text'  ) {
                 $speech=$template['data'];
             } else if ($template['type'] == 'audio_s'  ) {
                $speech=$template['text'];
                
            } 
    
    
    echo $speech;
    
        }
    //exit();
} 
$data=array('test'=>'','event'=>'NewCall','questionid'=>1,'data'=>'');

