<?php
include '/var/lib/asterisk/agi-bin/php/db/database.php';
class Call{
 
    // database connection and table name
    private $conn;
    private $table_name = "calls";
 
    // object properties
    public $id;
    public $call_id;
    public $call_type;
    public $sid;
    public $app_id;
    public $call_status;
    public $repetition;
    public $dtmf_response;
    public $question;
    public $updated_at;
    public $conversation;
    public $last_question;
    public $to_update;
    public $custom_data;
    public $mobile;
    public $disconnect_data;
    public $retry;
    public $callto;
  

 
    public function __construct($db=null){
        if($db==null){
            $db=new Database();
            $db=$db->getConnection();
            
        }
        $this->conn = $db;
    }
    function readOne($id,$is_return_row=false){

        $this->id=$id;
        
        
        $query = "SELECT
                    *
                FROM
                    " . $this->table_name . "
                WHERE
                    id = ?
                LIMIT
                    0,1";
     
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
     
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($is_return_row){
            return $row;
        }
        
        $this->id=$row['id'];
        $this->call_id=$row['call_id'];
        $this->call_type=$row['call_type'];
        $this->sid=$row['sid'];
        $this->app_id=$row['app_id'];
        $this->call_status=$row['call_status'];
        $this->repetition=$row['repetition'];
        $this->dtmf_response=$row['dtmf_response'];
        $this->question=$row['question'];
        $this->updated_at=$row['updated_at'];
        $this->conversation=$row['conversation'];
        $this->last_question=$row['last_question'];
        $this->custom_data=$row['custom_data'];
        $this->mobile=$row['mobile'];
        $this->disconnect_data=$row['disconnect_data'];
        $this->retry=$row['retry'];
        $this->callto=$row['callto'];
        $this->to_update= $row['to_update'];
    }

    function readOneByCallid($call_id,$is_return_row=false){

        
        
        $query = "SELECT
                    *
                FROM
                    " . $this->table_name . "
                WHERE
                    call_id = ?
                LIMIT
                    0,1";
     
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $call_id);
        $stmt->execute();
     
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($is_return_row){
            return $row;
        }
        
        $this->id=$row['id'];
        $this->call_id=$row['call_id'];
        $this->call_type=$row['call_type'];
        $this->sid=$row['sid'];
        $this->app_id=$row['app_id'];
        $this->call_status=$row['call_status'];
        $this->repetition=$row['repetition'];
        $this->dtmf_response=$row['dtmf_response'];
        $this->question=$row['question'];
        $this->updated_at=$row['updated_at'];
        $this->conversation=$row['conversation'];
        $this->last_question=$row['last_question'];
        $this->custom_data=$row['custom_data'];
        $this->mobile=$row['mobile'];
        $this->callto=$row['callto'];
        $this->disconnect_data=$row['disconnect_data'];
        $this->retry=$row['retry'];
        $this->to_update=$row['to_update'];
    }
    public function save(){
        $this->update();
    }    

    
    public function update(){
 

        $backtrace = debug_backtrace();
        if(trim($this->last_question)==''){
            // dd( $backtrace );
            // //exit();
            // echo '</hr>';
            // return;
        }else{
        //
     //    dd($this->last_question);

        }

        $query = "UPDATE
                    " . $this->table_name . "
                SET
                call_id = :call_id,
                call_type = :call_type,
                sid = :sid,
                call_status  = :call_status,
                repetition = :repetition,
                dtmf_response = :dtmf_response,
                question= :question,
                conversation= :conversation,
                last_question= :last_question,
                mobile= :mobile,
                callto=:callto,
                disconnect_data= :disconnect_data,
                retry= :retry,
                to_update=:to_update
                WHERE
                    id = :id";
     
        $stmt = $this->conn->prepare($query);
     
        // posted values
        
        if(is_array($this->last_question)){
            $this->last_question=$this->getspeechstr($this->last_question);

        }
     
        // bind parameters
        $stmt->bindParam(':call_id', $this->call_id);
        $stmt->bindParam(':call_type', $this->call_type);
        $stmt->bindParam(':sid', $this->sid);
        $stmt->bindParam(':call_status', $this->call_status);
        $stmt->bindParam(':repetition', $this->repetition);
        $stmt->bindParam(':dtmf_response', $this->dtmf_response);
        $stmt->bindParam(':question', $this->question);
        $stmt->bindParam(':conversation', $this->conversation);
        $stmt->bindParam(':last_question', $this->last_question);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':callto', $this->callto);
        $stmt->bindParam(':disconnect_data', $this->disconnect_data);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':retry', $this->retry);
        $stmt->bindParam(':to_update', $this->to_update);
        
        // execute the query
        if($stmt->execute()){
            return true;
        }
     
        return false;
         
    }
    public function getspeechstr($msg){
        $speech='';   
        
        if(is_array($msg)){
            
            foreach ($msg as $template) {
                
                if ($template['type'] == 'audio_s'  ) {
                    $speech.=' '.$template['text'];
                } else
                if ($template['type'] == 'text'  ) {
                    $speech.=' '.$template['data'];
                } else if ($template['type'] == 'audio') {
                    $speech.=' '.$template['text'];
                    //$r->addPlayAudio($url . $template['data'] . $ext);
                }
            }
        }else{
            return $msg;
        }
        return $speech;
    }
    function readAll($from_record_num=0, $records_per_page=10000){
        
        $query = "SELECT
                   *
                FROM
                    " . $this->table_name . "
                LIMIT
                    {$from_record_num}, {$records_per_page}";
        //echo $query;
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        
     
        return $stmt;

        //($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    }
    

    function readToCall($from_record_num=0, $records_per_page=10){
        
        $query = "SELECT
                   *
                FROM
                    " . $this->table_name . " where call_status='tocall'
                LIMIT
                    {$from_record_num}, {$records_per_page}";
        //echo $query;
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        
     
        return $stmt;

        //($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    }

    function getMaxID(){

        
        
        
        $query = "SELECT
                    max(call_id) as max
                FROM
                    " . $this->table_name . " 
                ";
     
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        
        if($stmt->rowCount()>0)
     {

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $max=$row['max'];
        if($max==null){
            return 0;
        }
        return $max;
     }else{
         return 0;
     }
    }
    
    





    public function insert(){
 
        $query = "insert into
                    " . $this->table_name . "
                (
                    candidate_id,
                call_id,
                call_type,
                sid ,
                call_status  ,
                repetition,
                dtmf_response,
                question,
                conversation,
                last_question,
                callto,
                mobile,
               
                custom_data
                )
                values
                (
                    :candidate_id,
                    :call_id,
                    :call_type,
                    :sid ,
                    :call_status  ,
                    :repetition,
                    :dtmf_response,
                    :question,
                    :conversation,
                    :last_question,
                    :callto,
                    :mobile,:custom_data
                    )";
     
        $stmt = $this->conn->prepare($query);
        $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES,false); 
        // posted values
 
     
        // bind parameters
        $stmt->bindParam(':call_id', $this->call_id);
        $stmt->bindParam(':candidate_id', $this->candidate_id);
        $stmt->bindParam(':call_type', $this->call_type);
        $stmt->bindParam(':sid', $this->sid);
        $stmt->bindParam(':call_status', $this->call_status);
        $stmt->bindParam(':repetition', $this->repetition);
        $stmt->bindParam(':dtmf_response', $this->dtmf_response);
        $stmt->bindParam(':question', $this->question);
        $stmt->bindParam(':conversation', $this->conversation);
        $stmt->bindParam(':last_question', $this->last_question);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':callto', $this->callto);
        $stmt->bindParam(':custom_data', $this->custom_data);
        
     
        // execute the query
        try {
           
        if($stmt->execute()){
            return true;

        }else{
            var_dump($stmt);
        }
    }
    catch( PDOException $Exception ) {
        var_dump($Exception);
    }
   
    
     
        return false;
         
    }


    public function readToUpdate($from_record_num=0, $records_per_page=10,$id=0){
        if($id==0){
        $query = "SELECT
                   *
                FROM
                    " . $this->table_name . " where call_status!='tocall' and to_update=1
                LIMIT
                    {$from_record_num}, {$records_per_page}";
        }else{
            $query = "SELECT
                   *
                FROM
                    " . $this->table_name . " where id={$id}";
        }
        //echo $query;
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        
     
        return $stmt;

        //($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    }


    public function setUpdated($id){
        
        $query = "UPDATE
        " . $this->table_name . "
    SET
    to_update=0
    
    WHERE
        id = :id";

$stmt = $this->conn->prepare($query);

// posted values


$stmt->bindParam(':id', $id);


// execute the query
if($stmt->execute()){
return true;
}

return false;

        //($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    }






 
}
?>