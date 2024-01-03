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
        <link rel='stylesheet' type='text/css' href='style/index.css'>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        <script>
            <?php
            echo 'const shapes = [';
                $nodes = $db -> query("SELECT DISTINCT node FROM points ORDER BY node ASC");
                $first = true;
                while($i = $nodes -> fetch_assoc()){
                    if (!$first) echo ",\n";
                    echo "[";
                    $points = $db -> query("SELECT x, y FROM points WHERE node = ".$i['node']." ORDER BY i ASC");
                    $first = true;
                    while ($j = $points -> fetch_assoc()){
                        if (!$first) echo ", ";
                        echo "[".$j['x'].", ".$j['y']."]";
                        $first = false;
                    }
                    echo "]";
                }
            echo "]; \n";
            echo 'const holdings = {';
                $holdings = $db -> query("SELECT node, team FROM submissions WHERE holding ORDER BY node ASC");
                $first = true;
                while ($row = $holdings -> fetch_assoc()){
                    $team = $db -> query("SELECT color FROM teams WHERE name = '".$row['team']."'") -> fetch_assoc();
                    if(!$first) echo ", \n";
                    echo ($row['node'] - 1).": '#".$team['color']."'";
                    $first = false;
                }
            echo "};\n";
            echo 'const queues = [';
                $nodes = $db -> query("SELECT id FROM nodes ORDER BY id ASC");
                $first = true;
                while($i = $nodes -> fetch_assoc()){
                    $count = $db -> query("SELECT count(*) FROM submissions WHERE node=".$i['id']." AND NOT holding") -> fetch_assoc();
                    if (!$first) echo ", ";
                    echo $count['count(*)'];
                    $first = false;
                }
            echo "];\n";
            echo 'const nodeNames =[';
                $names = $db -> query("SELECT title FROM nodes ORDER BY id ASC");
                $first = true;
                while($i = $names -> fetch_assoc()){
                    if (!$first) echo ", ";
                    echo '"'.$i['title'].'"';
                    $first = false;
                }
            echo "];\n";
            include 'js/sketch.js';
            ?>
        </script>

        
    </head>
    <body>
        <div id="title" class="center">
            <img src="img/calhounBannerDark.png" width="100%"> 
            <!-- <strong><h1>Iris</h1></strong>
            <h5>Work your way into the eye from the outside!</h5> -->
        </div>
        
        <div id="timer" class="center">
        <?php 
            echo '<h2><span id="descriptor">';
            
            //Takes unix time and returns array of readable time values
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

            //
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
            echo "<script type='text/javascript'>\nvar interval = [".implode(", ", unixToInterval($target))."];\n"; include "js/updateTime.js"; echo "</script>\n"; 
        ?>

        </div>  

        <div id="dashboard">
            <div id="battleLog">
                <h2><a href='log.php'>Battle Log</a></h2>
                <div id="judgments">
                    <?php 
                        $judges = $db -> query("SELECT * FROM judgments ORDER BY submitTime DESC LIMIT 5");
                        while($row = $judges -> fetch_assoc()){
                            $offense = $db -> query("SELECT * FROM teams WHERE name='".$row['offenseTeam']."'") -> fetch_assoc();
                            $defense = $db -> query("SELECT * FROM teams WHERE name='".$row['defenseTeam']."'") -> fetch_assoc();
                            if (!$defense['name']) $defense['name'] = "[Vacant]";
                            echo "<div class='judgment'> \n";
                            echo "<span class='offense'>".$offense['name']."</span>";
                            if ($row['success']) echo "🗡️";
                            else echo "🛡️";
                            echo "<span class='defense'>".$defense['name']."</span>";
                            echo "</div> <br> \n";
                        }
                    ?>
                </div>
            </div>
            <div id="canvas">
            </div>
            <div id="scoreboard">
                <h2>Scoreboard</h2>
                <ol>
                <?php
                    $query = "SELECT * FROM teams ORDER BY holding DESC";
                    $teams = $db -> query($query);
                    while($row = $teams -> fetch_assoc()){
                        if ($row['name'] == "Vacant") continue;
                        echo "<li><h3 style='color:#".$row['color']."'>";
                        echo $row['name'].": ".$row['holding'];
                        echo "</h3></li> \n";
                    }
                ?>
                </ol>
            </div>
        </div><br>
        <p class="center"> Start by capturing territories along the perimeter, then work your way inwards towards the center.<br> Territories on the perimeter are worth 2 points, territories in the middle are worth 3 points, and the middle territory is worth 4 points.</p>
    </body>
</html>