<!DOCTYPE html>

<html lang="en">
    <head>

        <?php
            $db = new mysqli("localhost", "admin", "Gabriel7Weredyk7!", "hackathon");
            if ($db -> connect_errno){
                echo $db -> connect_error;
                exit();
            }
            

        ?>

        <meta charset="utf-8" />
        <title>Judgment Panel</title>
        <link rel='stylesheet' type='text/css' href='../style/style.css'>
        <link rel='stylesheet' type='text/css' href='../style/judgePass.css'>        
    </head>
    <body>

        <div id="title" class="center">
            <img src='../img/calhounBannerDark.png' width="100%"/>
            <h1>Input the judge's password:</h1>
        </div>

        <div class="center">
            <form method="post">
                <input type="password" name="password" id="password" />
                <br />
                <input type="submit" name="submit" id="submit" value="Submit!" />
            </form>
        </div>
        <div id="error" class="center">
            <?php
                if (isset($_POST['password'])){
                    $password = $db -> query("SELECT judgePassword FROM settings WHERE inuse") -> fetch_assoc();
                    $password = $password['judgePassword'];
    
                    $attempt = hash('sha256', $_POST['password']);
    
                    if ($attempt != $password){
                        echo "<h2>Incorrect Password!</h2>";
                    }
                    else {
                        session_start();
                        $_SESSION['password'] = $attempt;
                        echo "<script> window.location = 'panel.php' </script>";
                    }
                }
            ?>
        </div>
    </body>
</html>