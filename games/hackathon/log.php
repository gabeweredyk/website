<!DOCTYPE html>

<html lang="en">
    <head>

    <?php
        date_default_timezone_set('America/New_York');
            $db = new mysqli("localhost", "admin", "Gabriel7Weredyk7!", "hackathon");
            if ($db -> connect_errno){
                echo $db -> connect_error;
                exit();
            }
        ?>

        <meta charset="utf-8" />
        <title>Calhoun Hackathons</title>
        <link rel='stylesheet' type='text/css' href='style/style.css'>
        <!-- <link rel='stylesheet' type='text/css' href='../style/judgePanel.css'> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

        <style>
.offense, .defense {
    /* width:40%; */
}
.result {
    width: 64px;
}

.reason{
    margin-top: 5px;
    margin-left: auto;
    margin-right:auto;
    text-align:center;
    width: 50%;
    font-size: 14pt;

}

.judgment {
    vertical-align: middle;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24pt;
}
.time{
    color: gray;
    font-size: 8pt;
    font-weight: normal;
}
        </style>
        
    </head>
    <body>
        <div id="title" class="center">
            <img src='img/calhounBannerDark.png' width="100%"/>
            <h1>Battle Log:</h1>
        </div>

        <div class="center">
            <?php
$judges = $db -> query("SELECT * FROM judgments ORDER BY submitTime DESC");
while($row = $judges -> fetch_assoc()){
    $offense = $db -> query("SELECT * FROM teams WHERE name='".$row['offenseTeam']."'") -> fetch_assoc();
    $defense = $db -> query("SELECT * FROM teams WHERE name='".$row['defenseTeam']."'") -> fetch_assoc();
    if (!$defense['name']) $defense['name'] = "[Vacant]";
    echo "<div class='judgment'> \n";
    echo "<p class='time'>".$row['submitTime']."</p> ";
    echo "<span class='offense'>".$offense['name']."</span>";
    if ($row['success']) echo "🗡️";
    else echo "🛡️";
    echo "<span class='defense'>".$defense['name']."</span> <br>";
    echo "<p class='reason'> <strong>Reason: </strong>".$row['reason']."</div> <br> \n";
}
            ?>
        </div>
    </body>
</html>