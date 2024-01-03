let level = new Level( [ [0, 300, 100, 325], [100, 325, 300, 325], [300, 325, 400, 300], [0, 200, 0, 300]] );
let player = new Player(350, 200);

function setup() {
    createCanvas(400, 400);
}
  
function draw() {
    background(220);
    level.lines.forEach(drawCollisions);
    appliedForces();
    player.F['Fn'].x = 0;
    player.F['Fn'].y = 0;
    level.lines.forEach(checkCollision);

    drawPlayer(player);

    drawForces(player.F);

    stroke("red");
    line(player.s.x, player.s.y - 5, player.s.x + 10 * player.v.x, player.s.y - 5+ 10 * player.v.y);
    stroke("black");
    strokeWeight(1);
}

function drawPlayer(p){
    p.updateMotion(1 / 30);
    circle(p.s.x, p.s.y - 5, 10);
}

function drawCollisions(l){
    line(l.x1, l.y1, l.x2, l.y2);
}

function drawForces(F){
    let r = 10;
    strokeWeight(2);
    
    for (var k in F){
        line(player.s.x, player.s.y - 5, player.s.x + r * F[k].x, player.s.y - 5+ r * F[k].y);
    }
    
}

function checkCollision(l){
    if (l.pointDist(player.s.x, player.s.y) < 2.5){
        let vdot = ((player.v.x / player.v.mag()) * ((l.x2 - l.x1) / l.length)) + ((player.v.y / player.v.mag()) * ((l.y2 - l.y1) / l.length));

        player.v.x = vdot * (l.x2 - l.x1) / l.length;
        player.v.y = vdot * (l.y2 - l.y1) / l.length;

        let dot = (l.norm[0] * player.R().x) + (l.norm[1] * player.R().y);
        player.F['Fn'].x += -l.norm[0] * dot;
        player.F['Fn'].y += -l.norm[1] * dot + player.F['Fa'].y;
    }
}

var pForce = 3;

function appliedForces(){
    player.F["Fa"].x = 0;
    player.F["Fa"].y = 0;
    if (!keyIsPressed) return;
    if (keyIsDown(LEFT_ARROW)){
        player.F["Fa"].x -= pForce;
    }
    if (keyIsDown(RIGHT_ARROW)){
        player.F["Fa"].x += pForce;
    }
    if (keyIsDown(UP_ARROW) && player.F["Fn"].mag()){
        player.F["Fa"].y -= 60;
    }

    if (keyIsDown(DOWN_ARROW)){
        player.F["Fa"].x = 0;
    }
}
