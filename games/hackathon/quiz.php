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
        <link rel='stylesheet' type='text/css' href='style/style.css'>
        <link rel='stylesheet' type='text/css' href='style/submit.css'>
        <meta charset="utf-8" />
        <title>Calhoun Hackathons</title>
    </head>
    <body>
        <div id="title" class="center">
            <img src='img/calhounBannerDark.png' width="100%"/>
            <h1 class="forty-eight"> Submit Project </h1>
        </div>
        <center>
        <div id="error">
        <?php
            $settings = $db -> query("SELECT * FROM settings WHERE inuse") -> fetch_assoc();
            $startDate = new DateTime($settings['startTime']);
            $startDate = $startDate -> format("F jS \a\\t g:i A");
            $start = strtotime($settings['startTime']);
            $endDate = new DateTime($settings['endTime']);
            $endDate = $endDate -> format("F jS \a\\t g:i A");
            $end = strtotime($settings['endTime']);
            $now = new DateTime();
            $now = $now -> format('U');

            $team = FALSE;
            $attempt = FALSE;
            // echo print_r($_POST);
            $old_values = $_POST;
            if ($_POST['PIN']) {
                $attempt = hash('sha256', $_POST['PIN']);
            }
            if ($_POST['team']){
                $team = $db -> query("SELECT * FROM teams WHERE name='".$_POST['team']."'") -> fetch_assoc();
            }
            if ($team && $team['PIN'] == $attempt){
                $goodNodes = $db -> query("SELECT * FROM paths WHERE nodeA =".$_GET['n']);                
                $touching = false;
                while ($good = $goodNodes -> fetch_assoc()){
                    if ($good['nodeB'] == 0){
                        $touching = true;
                        break;
                    }
                    $teamNodes = $db -> query("SELECT node FROM submissions WHERE team='".$team['name']."' AND holding=true");
                    while ($tNode = $teamNodes -> fetch_assoc()){
                        if ($good['nodeB'] == $tNode['node']){
                            $touching = true;
                            break;
                        }
                    }
                }
                $q = "SELECT count(*) FROM submissions WHERE team ='".$team['name']."' AND node =".$_GET['n'];
                $uploaded = $db -> query($q) -> fetch_assoc();


                if ($touching && $end >= $now && $now >= $start){
                    $q = "INSERT INTO submissions VALUES(".$_GET['n'].", '".$team['name']."', CURRENT_TIMESTAMP, '".$_POST['description']."', '".$_POST['link']."', 0)";
                    $db -> query($q);
                    echo "<script> window.location = 'index.php' </script>";
                }
                if (!$touching) {
                    echo "<h2> You don't have a neighboring territory! </h2>";
                }
                if ($end < $now || $now < $start){
                    echo "<h2> You are trying to submit outside of the alloted timeslot! </h2>";
                }
            }
            else if ($team) {
                echo "<h2> Incorrect Password! </h2>";
            }
            $_POST = array();
            ?>
        </div>
        <div id="about">
            <?php
                $current = $db -> query('SELECT * FROM nodes WHERE id ='.$_GET['n']) -> fetch_assoc();
                echo "<h1> ".$current['title']." </h1> \n";
                echo "<h2 id='nodeDescription'> ".$current['value']." Points -- ".$current['description']." </h2>";
            ?>
        </div>
        <form method="post">
            
            

            <div class="input" id="passwordDiv">
                <label for="password">Team Password:</label>
                <br>
                <input type="password" name="PIN" id="password" required>
            </div>
            <input type="submit" id="submit" name="submit" value="Submit!"> <br>
            
        </form>
        <button class="center" onclick="window.location = 'index.php'" >Back to Map</button>
        </center>
    </body>
</html>