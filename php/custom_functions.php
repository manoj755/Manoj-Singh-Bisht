<?php 

date_default_timezone_set('Asia/Calcutta'); 
 require '/var/lib/asterisk/agi-bin/phplib/googletts.php';
// require '/var/lib/asterisk/agi-bin/phplib/phpagi-2.20/phpagi.php';

 $tts = new GoogleTTS(array('speed' => 1.2, 'lang' => 'en-IN'));
// 	$agi = new AGI();
//     $tts->setAGI($agi);
    
  function str_contains($string,$find )
  {
      if(trim($find)==""){
          return false;
      }
      $pos = strpos($string,  $find);
      if($pos !== false){
          return true;
      }else{
          return  false;

      }
  }

   function dd($var,$name='')
    {
        echo '<hr/> <br/>************************</br>begin '.$name.'<br/>';
        var_dump($var);
        echo $name.' end<br/>************************</br>';

        
    }

?>