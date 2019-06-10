<?php
class Database{
  
    // specify your own database credentials A42!@Passive!@!
    private $host = "localhost";
    private $db_name = "pr_calls";
    private $username = "pr111";
    private $password = "pr111@123";
    public $conn;
  
    // get the database connection
    public function getConnection(){
  
        $this->conn = null;
  
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
  
        return $this->conn;
    }
}
?>