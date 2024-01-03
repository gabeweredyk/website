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

            session_start();
            $password = $db -> query("SELECT judgePassword FROM settings WHERE inuse") -> fetch_assoc();
            $password = $password['judgePassword'];
            if($_SESSION['password'] != $password){
                echo "<script> window.location = 'index.php' </script>";
                exit();
            }
            session_abort();
        ?>

        <meta charset="utf-8" />
        <title>Calhoun Hackathons</title>
        <link rel='stylesheet' type='text/css' href='../style/style.css'>
        <link rel='stylesheet' type='text/css' href='../style/judgePanel.css'>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        
    </head>
    <body>
        <div id="title" class="center">
            <img src='../img/calhounBannerDark.png' width="100%"/>
            <h1>Unjudged Submissions:</h1>
        </div>

        <div id="submissions" class="center">
            <?php
                // echo print_r($_POST);*/
                $submissions = $db -> query("SELECT * FROM submissions WHERE NOT holding ORDER BY submitTime");
                while ($contest = $submissions -> fetch_assoc()){
                    echo "<div class='submission'>\n";
                    echo "<div class='leftSide'>";
                    echo "<div class='info'>\n";
                    echo "<p class='timestamp'>".$contest['submitTime']."</p>\n";
                    $nodeName = $db -> query("SELECT title, j FROM nodes WHERE id=".$contest['node']) -> fetch_assoc();
                    echo "<h2 class='node'><a href='../submit.php?n=".$contest['node']."'>".$nodeName['title']."</a></h2>\n";
                    echo "</div>\n";

                    echo "<div class='content'>";
                    echo "<div class='offense project'>\n";
                    echo "<h3 class='link'><a href='".$contest['link']."'>Offense</a></h3>\n";
                    echo "<p class='description'>".$contest['description']."</p>\n";
                    echo "</div>\n";

                    echo "<div class='defense project'>\n";
                    $holding = $db -> query("SELECT link, description FROM submissions WHERE holding AND node=".$contest['node']) -> fetch_assoc();
                    if (isset($holding)){
                        echo "<h3 class='link'><a href='".$holding['link']."'>Defense</a></h3>\n";
                        echo "<p class='description'>".$holding['description']."</p>\n";
                    }
                    else {
                        echo "<h3 class='link'>VACANT</h3>\n";
                    }
                    echo "</div>\n";
                    echo "</div>\n";
                    echo "</div>\n";

                    echo '<div class="rightSide">
                    <form id="win" method="post" action="submit.php">';
                    echo '<input type="hidden" name="node" value='.$contest['node'].'>';
                    echo '<input type="hidden" name="team" value="'.$contest['team'].'">';

                    include "judgement.php";
                    echo '<input type="hidden" name="nJ" value="'.$nodeName['j'].'" />';
                    echo "</form></div>";
                    echo "</div>\n";
                    $_POST = array();
                }
            ?>
        </div>
        <br style="clear: both;" />
        
        <div id="timer" class="center">
        <?php 

            echo '<h2><span id="descriptor">';

            function unixToInterval($unix){
                $seconds = [86400, 3600, 60, 1];
                $interval = [0, 0, 0, 0];
                for ($i = 0; $i < 4; $i++){
                    $diff = 0;
                    for ($j = 0; $j < 4; $j++){
                        $diff += $interval[$j] * $seconds[$j];
                    }
                    $interval[$i] = floor(($unix - $diff) / $seconds[$i]);
                }
                return $interval;
            }
            $settings = $db -> query("SELECT * FROM settings WHERE inuse") -> fetch_assoc();
            $startDate = new DateTime($settings['startTime']);
            $startDate = $startDate -> format("F jS \a\\t g:i A");
            $start = strtotime($settings['startTime']);
            $endDate = new DateTime($settings['endTime']);
            $endDate = $endDate -> format("F jS \a\\t g:i A");
            $end = strtotime($settings['endTime']);
            
            $now = new DateTime();
            $now = $now -> format('U');
            $target;
            if ($now < $start) {
                echo "Starting in: ";
                $target = $start - $now;
            }
            else if ($now < $end) {
                echo "Ending in: ";
                $target = $end - $now;
            }
            else {
                echo "Ended for:";
                $target = $now - $end;
            }

            echo '</span><span id="days" class="number"></span> days, <span id="hours" class="number"></span> hours, <span id="minutes" class="number"></span> minutes, and <span id="seconds" class="number"></span> seconds.</h2>';
            echo "<script type='text/javascript'>\nvar interval = [".implode(", ", unixToInterval($target))."];\n"; include "../js/updateTime.js"; echo "</script>\n"; 
        ?>

        </div>
    </body>
</html>