<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL); 
set_time_limit(0);
// connect and login to FTP server

function has_the_files( $dir, $extensions = array() ) { 
  $found=array();
  if ( empty( $extensions ) || ! is_array( $extensions ) || ! is_dir( $dir ) ) return false;
  foreach ( $extensions as $ext ) if ( count( glob( $dir . '/*.' . $ext ) ) > 0 ) $found[$ext] = 1;
  return ( count( $found ) == count( $extensions ) ) ? true : false;
}

// use it like
//$dir = dirname(__FILE__) . '/images'; //absolute path to the directory you wanna test
$extensions = array('wav'); // an array containing the file extensions you seek for
// // outputs: bool(false)  
$loop=0;
$path = '/var/spool/asterisk/monitor/';
$monitor_moved_path = '/var/spool/asterisk/monitor_moved/';


if(has_the_files( $path, $extensions ) ){
  $ftp_server = "13.126.189.244";
$ftp_conn = ftp_connect($ftp_server,21,5) or die("Could not connect to $ftp_server");
$ftp_username='admin_recording';
$ftp_userpass='037bFmm0bs';
//ftp_set_option($ftp_conn, 2, true);
$login = ftp_login($ftp_conn, $ftp_username, $ftp_userpass);

  if ($handle = opendir($path)) {
    
     while (false !== ($file = readdir($handle)) && $loop<10 ) {
          
          if(strpos($file,'wav')>-1){
            
            
        if ((time()-filectime($path.$file)) > 1800 ) {  
          
            $filesize=filesize($path.$file);
            
            
            $filesize=number_format($filesize / 1048576, 2);
            
            
           if (preg_match('/\.wav$/i', $file) &&$filesize<100000 ) {
            echo 'done';
            
            ftp_pasv($ftp_conn,false);
//$file = "localfile.txt";
$loop=$loop+1;
// upload file
if (ftp_put($ftp_conn, $file, $path.$file, FTP_BINARY))
  {
    rename($path.$file,$monitor_moved_path.$file);
  echo "Successfully uploaded $file.";
  
  }
else
  {

  //echo "Error uploading $file.";
  }

}
}}
}
}

// close connection
ftp_close($ftp_conn);
}else{
  echo 'no file';
}

?>