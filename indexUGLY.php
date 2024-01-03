<!DOCTYPE html> 
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="index.css">
        <title>Gabriel Weredyk's Portfolio</title>
        <script src="relocate.js"> </script>
    </head>
    <body>
        <h1 class="preliminary title">GJW</h1>
        <h2 class="preliminary subtitle">Gabriel Weredyk's collection of noteworthy indpendent projects</h3>

        <div id="container">
            <center>
            <?php
            $file = fopen("projects.csv", "r");
            while(($row = fgetcsv($file, 0, ",")) !== FALSE ){
                echo "<div class='project' onclick=goto('".$row[4]."')>";
                echo "<img src='img/".$row[3]."'>";
                // echo "<iframe src='".$row[4]."' title='".$row[0]."'></iframe>";
                echo "<div class='text'>";
                echo "<h3>".$row[0]."</h3>";
                echo "<p>".$row[1]."</p>";
                echo "</div> </div> \n";
            }
            ?>
            </center>
        </div>
    </body>
<html>