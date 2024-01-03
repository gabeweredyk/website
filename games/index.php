<!DOCTYPE html> 
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../index.css">
        <title>Gabriel Weredyk's Portfolio</title>
        <script src="relocate.js"> </script>
    </head>
    <body>
        <div class="intro" >
            <h1 class="preliminary title"><span class="capital">T</span>HE <span class="capital">W</span>EREDYK</h1>
            <h2 class="preliminary subtitle">Toys & Games</h3>
        </div>

        <?php $home = false; include '../nav.php';?>

        <div class="projects">
            <center>
            <?php 
                $dirs = glob('*', GLOB_ONLYDIR); //array_filter(glob('*'), 'is_dir');
                for ($i = 0; $i < count($dirs); $i++){
                    echo "<div class='project' onclick='window.location=\"".$dirs[$i]."\"'> \n <div class='text'>";
                    include $dirs[$i]."/info/desc.txt";
                    echo "</div> </div> \n";
                }
            ?>
            </center>
        </div>
        <img src="gamesEdit.jpg" class="end" />
    </body>
<html>