<!DOCTYPE html>
<html>
    <head>
        <title>Random AMC Problems</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <?php
            $link = "https://artofproblemsolving.com/wiki/index.php/20";
            $year;
            $letter;
            $a = array("A", "_I");
            $b = array("B", "_II");
            $mode = 0;
            if ($_GET['heat']){
                if ($_GET['heat'] == "AIME") {
                    $mode = 1;
                }
                $max = (int) date("y");
                $year = sprintf('%02s', rand(2, $max));
                $letter = (rand(0, 1) == 0) ? $a[$mode] : $b[$mode];
                $problem = rand(1, 25 - ($mode * 10));
                $link =  $link . $year . "_" . $_GET['heat'] . $letter . "_Problems#Problem_" . $problem;
            }
        ?>
    </head>
    <body>
        <center>
            <h1>Random AMC Problem</h1>
            <form action="index.php" method="get" id="buttons">
                <?php
                    $competitions = array("AMC_10", "AMC_12", "AIME");

                    foreach ($competitions as $i){
                        echo "\n <input type='submit' name='heat' value='$i' />";
                    }
                ?>
            </form>
                <div>
            <?php
                if ($_GET['heat']){
                    echo "<p>From 20" . $year . " " . $_GET['heat'] . $letter;
                    echo "</p>\n<br>\n";
                    // echo $link;
                    echo "<embed type='text/html' src='".$link."' id='embeded'>";
                }
                else {
                    echo "<p> Select a year to get started! </p>";
                }
            ?>
            </div>
        </center>
    </body>
</html>
