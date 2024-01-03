<?php
    //Check Password
    date_default_timezone_set('America/New_York');
    $db = new mysqli("localhost", "admin", "Gabriel7Weredyk7!", "hackathon");
    if ($db -> connect_errno){
        echo $db -> connect_error;
        exit();
    }

    session_start();
    $password = $db -> query("SELECT judgePassword FROM settings WHERE inuse") -> fetch_assoc();
    $password = $password['judgePassword'];
    if($_SESSION['password'] != $password){
        echo "<script> window.location = 'index.php' </script>";
        exit();
    }
    session_abort();


    //Actual Part
    // echo print_r($_POST);
    $defense = $db -> query("SELECT * FROM submissions WHERE holding AND node=".$_POST['node']) -> fetch_assoc();
    $offense = $db -> query( " SELECT * FROM submissions WHERE node=".$_POST['node']." AND team='".$_POST['team']."'") -> fetch_assoc();
    $points = $db -> query("SELECT value, j FROM nodes WHERE id =".$_POST['node']) -> fetch_assoc();
    $value = $points['value'];
    $j = $points['j'];
    if($_POST['nJ'] != $j) {
        echo "<script> window.location = 'panel.php'; </script>";
        exit();
    }
    if (!$defense) $defense = array('team'=>'Vacant');
    if ($_POST['win'] == 'true'){
        $db -> query("DELETE FROM submissions WHERE node=".$_POST['node']." AND team='".$defense['team']."' AND holding");
        $db -> query("UPDATE submissions SET holding=true WHERE node=".$_POST['node']." AND team='".$offense['team']."'");
        $db -> query("UPDATE teams SET holding=holding+".$value." WHERE name='".$offense['team']."'");
        $db -> query("UPDATE teams SET holding=holding-".$value." WHERE name='".$defense['team']."'");
    }
    else{
        $db -> query("DELETE FROM submissions WHERE node=".$_POST['node']." AND team='".$_POST['team']."'");
    }
    $db -> query("INSERT INTO judgments VALUES(CURRENT_TIMESTAMP, ".$_POST['node'].", '".$_POST['team']."', '".$defense['team']."', ".$_POST['win'].", '".$_POST['description']."')");
    $db -> query("UPDATE nodes SET j=j+1 WHERE id=".$_POST['node']);
    
    $_POST = array();
?>
<script> window.location = 'panel.php'; </script>
