<div class="nav navbar">
    <h3 class="nav">
    |
    <?php
    $names = ["Home", "Toys & Games", "Papers", "Tools"];
    $links = ["", "games", "papers", "tools"];
    $insert = "";
    if (!$home) $insert = "../";

    for ($i = 0; $i < count($names); $i++){
        echo " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a class='nav' href='$insert".$links[$i]."'>".$names[$i]."</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | ";
    }

    ?>
    </h3>
</div>