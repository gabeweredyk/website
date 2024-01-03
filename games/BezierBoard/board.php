<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script> -->
    <link rel="stylesheet" type="text/css" href="css/board.css">
    <meta charset="utf-8" />
    <?php
        $db = new mysqli("localhost", "admin", "gabrielw", "bezierBoard");
        if ($db -> connect_errno){
            echo $db -> connect_error;
            exit();
        }
    ?>
    <!-- <script src="js/board.js"></script> -->

  </head>
  <body>
    <script>
        setInterval(function(){ window.location.reload(false); }, 10000);
        var points = [
            <?php
                $query = "SELECT i, x, y FROM points ORDER BY upload, i, ip";
                $points = $db -> query($query);
                echo "[";
                while($row = $points->fetch_assoc()){
                    if ($row['i'] == 0){
                        echo "],[";
                    }
                    else {
                        echo ",";
                    }
                    echo $row['x'].",".$row['y'];
                }
                echo "]";
            ?>
        ];
        var positions = [
            <?php
                $query = "SELECT x, y FROM positions ORDER BY upload, ip";
                $positions = $db -> query($query);
                echo "[0, 0]";
                while($row = $positions->fetch_assoc()){
                    echo ",[".$row['x'].",".$row['y']."]";
                }
            ?>
        ];
        var times = [
            <?php
                echo "\"00:00:00\",";
                $query = "SELECT DISTINCT upload FROM points ORDER BY upload, ip";
                $positions = $db -> query($query);
                while($row = $positions->fetch_assoc()){
                    echo "\"".$row['upload']."\"";
                    echo ",";
                }
            ?>
        ];

        const PASCAL_CAP = 10;
        var pascal = [[1]];

        const SCALE_FACTOR = 1.3;

        const RESOLUTION = 30;

        var w;

        function setup() {
            for (let i = 1; i < PASCAL_CAP; i++){
                pascal.push([1]);
                for (let j = 1; j < i; j++){
                    pascal[i].push(pascal[i - 1][j] + pascal[i - 1][j - 1]);
                }
                pascal[i].push(1);
            }
            
            w = min(windowHeight, windowWidth);

            createCanvas(w, w);
        }

        function draw() {
            background(255);
            
            stroke("white");
            strokeWeight(4);
            noFill();
            
            for (let i = 0; i < points.length; i++){
                let arr = [];
                timeLerp(times[i]);
                translate(positions[i][0] * w, positions[i][1] * w);
                scale(pow(SCALE_FACTOR, -1));
                for (let j = 0; j < points[i].length; j += 2){
                    arr.push(createVector(points[i][j] * w, points[i][j + 1] * w));
                }
                Bezier(arr, RESOLUTION);
                scale(SCALE_FACTOR);
                translate(-positions[i][0] * w, -positions[i][1] * w);
            }
            
            
        }

        function Bezier(b, a){
            beginShape();
            var n = b.length - 1;
            for (let temp = 0; temp <= a; temp++){
                let t = temp / a;
                var sum = createVector(0, 0);
                for (let i = 0; i <= n; i++){
                sum.x += pascal[n][i] * pow(1 - t, n - i) * pow(t, i) * b[i].x;
                sum.y += pascal[n][i] * pow(1 - t, n - i) * pow(t, i) * b[i].y;
                }
                vertex(sum.x, sum.y);
            }
            endShape();
        }

        function timeLerp(time){
            colorMode(HSB);
            let c1 = color(0, 255, 255);
            let c2 = color(255, 255, 255);
            let arr = time.split(":");
            let t = parseInt(arr[1]) * 60 + parseInt(arr[2]);
            t /= 3600;
            stroke(lerpColor(c1, c2, t)); 
            colorMode(RGB);
        }
    </script>
  </body>
</html>
