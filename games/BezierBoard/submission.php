<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script> -->
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <meta charset="utf-8" />
    
  </head>
  <body>
    
    <?php
    // $db = new mysqli("localhost", "admin", "gabrielw", "bezierBoard");
    // if ($db -> connect_errno){
    //     echo $db -> connect_error;
    //     exit();
    // }
    // $ip = $_SERVER['REMOTE_ADDR'];
    // $upload = date("G:i:s", time());
    // $temp = $_POST['points'];
    // $p = preg_split("/[s,]+/", $temp);
    // $temp = $_POST['position'];
    // $pos = preg_split("/[s,]+/", $temp);
    // // echo $temp;
    // for ($i = 0; $i < count($p); $i += 2 ){
    //     $query = "INSERT INTO points(ip, upload, i, x, y) VALUES (\"".$ip."\", \"".$upload."\", ".($i / 2).", ".$p[$i].", ".$p[$i + 1].");";
    //     // 
    //     $db -> query($query);
    // }
    // $query = "INSERT INTO positions(ip, upload, x, y) VALUES (\"".$ip."\", \"".$upload."\", ".$pos[0].", ".$pos[1].");";
    // // echo $query;
    // $db -> query($query);
    ?>

<script>
      function setup(){
        createCanvas(windowWidth, windowHeight);
      }

      function draw(){
        background(0);
        textAlign(CENTER, CENTER);
        noStroke();
        fill("white");
        textSize(windowWidth / 30);
        // text("Your curve has been uploaded!\nTry looking for it on the board!", windowWidth / 2 -5, windowHeight / 2);
        text("Unfortunately, the Bezier Board project is over,\nbut I hope you liked making your curve!\nYou can view the Bezier Boards created at this link: ", windowWidth / 2 -5, windowHeight / 2);

        return;
      }
    </script>
  </body>
</html>
