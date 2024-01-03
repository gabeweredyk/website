//currently selected point
var currentP = -1;

// Array of the points
var p = Array(4);

// width;
var w;

//radius of a point
const r = 40;

//Pascal array, and how many iterations (How many points will the curve have?) 
const PASCAL_CAP = 10;
var pascal = [[1]];

//displace of curve canvas
var curveCanvas;

//percision of lines and line colors
const RESOLUTION = 30;

var stage = 0;

var cnv;
var cnvVector;

var instructions = "Make a curve by dragging the points!";
var buttonText = "Next";

const SCALE_FACTOR = 1.3;

var touchingCurve = false;

function setup() {
  // Generate pascal triangle
  for (let i = 1; i < PASCAL_CAP; i++){
    pascal.push([1]);
    for (let j = 1; j < i; j++){
      pascal[i].push(pascal[i - 1][j] + pascal[i - 1][j - 1]);
    }
    pascal[i].push(1);
  }

  w = min(windowHeight, windowWidth) * 11 / 15;

  //Generate starting position for points, places them in circle
  for (let i = 0; i < p.length; i++){
    p[i] = createVector((w/2) + (w/4) * cos((i * TWO_PI) / p.length), (w/2) - (w/4) * sin((i * TWO_PI) / p.length),);
  }

  cnv = createCanvas(windowWidth, windowHeight);
  curveCanvas = createVector((windowWidth - w)  / 2, (windowHeight - w) / 2);
  cnvVector = createVector(100, 50);
//   cnv.parent('edit-curve');
}



function draw() {
    background(0);

    //Background for curve box BOUNDS: w, w
    noStroke();
    fill(24);
    rectMode(CORNER);
    translate(curveCanvas.x, curveCanvas.y);
    rect(0, 0, w, w);
    //

    
    strokeWeight(4);
    
    if (stage == 1){
        if (mouseIsPressed){
            moveCurve();
        }
        translate(cnvVector.x, cnvVector.y);
        scale(pow(SCALE_FACTOR, -1));
        stroke(128);
        noFill();
        rect(0, 0, w, w);
    }

    stroke("white");
    noFill();
    Bezier(p, RESOLUTION);
    
    switch (stage){
        case 0:
            drawPoints();
            break;
        case 1:
            scale(SCALE_FACTOR);
            translate(-cnvVector.x, -cnvVector.y);
            break;
    }
    

    // registerPoints();

    ui();
}

//Control values of mouseX and mouseY
function tMouse(){
    let x = mouseX - curveCanvas.x;
    let y = mouseY -curveCanvas.y;
    // x = min(w, max(0, x));
    // y = min(w, max(0, y));
    return createVector(x, y);
}


//CONTROL POINTS
function drawPoints(){

    //POINTS
    if (mouseIsPressed){
        movePoints();
    }
    colorMode(HSB);
    ellipseMode(RADIUS);
    noFill();
    for (let i = 0; i < p.length; i++){
        stroke(255 * i / p.length, 255, 255);
        strokeWeight(2);
        ellipse(p[i].x, p[i].y, r / 2, r / 2);
        // strokeWeight(4);
        point(p[i].x, p[i].y);
    }

    //LINES
    for (let i = 0; i < p.length; i += 2){
        let c1 = color(255 * i / p.length, 255, 255);
        let c2 = color(255 * (i + 1) / p.length, 255, 255);
        for (let j = 0; j < RESOLUTION; j++){
            stroke(lerpColor(c1, c2, j / RESOLUTION));
            let v1 = p5.Vector.lerp(p[i], p[i + 1], j / RESOLUTION);
            let v2 = p5.Vector.lerp(p[i], p[i + 1], (j + 1) / RESOLUTION);
            
            line(v1.x, v1.y, v2.x, v2.y);
        }
    }

    colorMode(RGB);
}

function mousePressed(){
    // fullscreen(true);
    //     rect(w / 5, w * 1.05,  3 * w / 5, w / 8);
    //max(min((4 * w / 5), tMouse().x), w / 5) == tMouse().x && max(min(w * 1.175, tMouse().y), 1.05 * w) == tMouse().y
    switch (stage){
        case 0:
            currentP = -1;
            if (inRect(tMouse(), w/5, w * 1.05, 3 * w / 5, w / 8)){
                stage++;
                console.log(stage);
                instructions = "Position your curve and upload it!";
                buttonText = "Upload";
                return;
            }
            for (let i = 0; i < p.length; i++){
                if (dist(p[i].x, p[i].y, tMouse().x, tMouse().y) < r){
                    console.log(i);
                    currentP = i;
                    return;
                }
            }
            break;
        case 1:
            touchingCurve = false;
            if (inRect(tMouse(), w/5, w * 1.05, 3 * w / 5, w / 8)){
                // stage++;
                registerPoints();
                
                return;
            }
            if (inRect(tMouse(), cnvVector.x, cnvVector.y, w / SCALE_FACTOR, w / SCALE_FACTOR)){
                touchingCurve = true;
            }
            break;
    }
    
}


function movePoints(){
    if (currentP < 0) return;
    p[currentP] = tMouse();
    p[currentP].x = min(max(0, p[currentP].x), w);
    p[currentP].y = min(max(0, p[currentP].y), w);
}

function moveCurve(){
    if (!touchingCurve) return;
    cnvVector = tMouse();
    cnvVector.x -= ((w / SCALE_FACTOR) * 0.5);
    cnvVector.y -= ((w / SCALE_FACTOR) * 0.5);

    cnvVector.x = min(max(-((w / SCALE_FACTOR) * 0.5), cnvVector.x), w - ((w / SCALE_FACTOR) * 0.5));
    cnvVector.y = min(max(-((w / SCALE_FACTOR) * 0.5), cnvVector.y), w - ((w / SCALE_FACTOR) * 0.5));
    
}
//



//ACTUAL CURVE
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

// function factorial(x){
//     if (x <= 1) return 1;
//     return x * factorial(x - 1);
// }
//

//Put points in php form
function registerPoints(){
    let points = document.getElementById("points");
    let string = [];
    for (let i = 0; i < p.length; i++){
        string.push(parseFloat((p[i].x / w).toFixed(5)));
        string.push(parseFloat((p[i].y / w).toFixed(5)));
    }
    points.setAttribute("value", string);
    let position = document.getElementById("position");
    position.setAttribute("value", (cnvVector.x / w).toFixed(5) + "," + (cnvVector.y / w).toFixed(5));

    document.getElementById("submit").click();
}
//

//UI
function ui(){
    stroke(40);
    fill(8);
    rectMode(CORNER);
    rect(w / 5, w * 1.05,  3 * w / 5, w / 8);

    noStroke();
    fill("white");
    textSize(w / 20);
    textAlign(LEFT, BOTTOM);
    text(instructions, 10, -w / 20);
    textAlign(CENTER, CENTER);
    text(buttonText, w / 2, w * 1.115);

}

function inRect(v, x, y, w, h){
    return (min(max(v.x, x), x + w) == v.x) && (min(max(v.y, y), y + h) == v.y)
}