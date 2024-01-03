<!DOCTYPE html>
<html>
    <head> 
        <title>Guess the word of the day!</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script src="script.js"></script>
    </head>
    <body>
        <center>
        <div id="guesses">
            <?php
                for($i = 0; $i < 6; $i++){
                    echo "<div class='guess'>";
                    for ($j = 0; $j < 5; $j++){
                        echo "<div class='letter'> </div>";
                    }
                    echo "</div> <br>";
                }
            ?>
        </div>
            </center>
    </body>
</html>