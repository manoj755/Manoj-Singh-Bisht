<?php 
$destination_pr="/var/spool/asterisk/outgoing_done_moved/";
$source_pr="/var/spool/asterisk/outgoing_done/";
$outgoing_pr="/var/spool/asterisk/outgoing/";
$callfiles_pr="/var/lib/asterisk/agi-bin/php/calls_files/";
if (is_dir($source_pr)&&false){
    if ($dh = opendir($source_pr)){
      while (($file = readdir($dh)) !== false){
          if(strpos($file, '.call') !== false){
            

            $file_lines = file($source_pr.$file);
            $isExpired=false;
            foreach ($file_lines as $line) {
                if(strpos($line, 'Status: Expired') !== false){
                    $isExpired=true;
                    break;
                }
            }
            $call_id=explode('.', explode('_',$file)[1])[0];
            
            $call->readOne($call_id);
            
            if($call->call_status!='callrequestsent'){
                $isExpired=false;
            }else{
            //    $call->retry=$call->retry+1;;
              //  $call->save();
            }
            

            if($isExpired){
                $newfile='new'.$file;
                $filename=$source_pr.$newfile;
            $myfile = fopen("$filename", "w");
                foreach ($file_lines as $line) {
                    if(strpos($line, 'Status: Expired') !== false){
                       
                        break;
                    }else{
                    if(strpos($line, 'Archive:Yes') !== false){
                       fwrite($myfile, $line);
                       break;
                    }else{
                        fwrite($myfile, $line);
                    }
                        
                    }
                }
                fclose($myfile);

                rename($filename,$callfiles_pr.$file);
                unlink($source_pr.$file);
            }else{

                rename($source_pr.$file,$destination_pr.$file);
            }



          }
        
      }
      closedir($dh);
    }
  }

?>