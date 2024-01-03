var w, h;
var Xmin, Xmax, Xscl, Ymin, Ymax, Yscl;
var MouseX, MouseY;
var currentJoint, joint1, joint2;
var xStart, yStart, mxStart, myStart, xDist, yDist;
var moving, makingMember, panning;

var joints = [];
var members = [];

class Joint {
    constructor (x, y, Sx = false, Sy = false, connections = []){
        this.x = x;
        this.y = y;
        this.Sx = Sx;
        this.Sy = Sy;
        this.connections = connections;
    }
}

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);

    Xmin = -10;
    Xmax = 10;
    Xscl = 1;
    Ymin = (h * Xmin) / w;
    Ymax = (h * Xmax) / w;
    Yscl = 1;

    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
      }
}

function windowResized() {
    w = windowWidth;
    h = windowHeight;
    resizeCanvas(w, h);
}

function draw(){

    handlePanning();
    MouseX = (mouseX / w) * (Xmax - Xmin) + Xmin;
    MouseY = (-mouseY / h) * (Ymax - Ymin) - Ymin;


    applyMatrix(w/(Xmax - Xmin), 0, 0, -h/(Ymax - Ymin), w * Xmax / (Xmax - Xmin), -h * Ymax / (Ymax - Ymin) + h);

    background(8);
    grid();

    moveJoints();
    joints.forEach(drawJoint);
    drawNewMember();
    members.forEach(drawMember);

    
    
}

//drawing components:

function grid(){
    noFill();
    strokeWeight(Xscl / 100);
    stroke("cyan");
    for (let i = floor(Xmin / Xscl) * Xscl; i <= Xmax; i += Xscl){
        line(i, Ymin, i, Ymax);
    }
    strokeWeight(Yscl / 100);
    for (let i = floor(Ymin / Yscl) * Yscl; i <= Ymax; i += Yscl){
        line(Xmin, i, Xmax, i);
    }
    strokeWeight(Xscl / 75);
    stroke("#ffffff");
    line(0, Ymin, 0, Ymax);
    line(Xmin, 0, Xmax, 0);
}

function drawJoint(j, i){
    fill(8);
    stroke("white");
    if (currentJoint == j){
        stroke("yellow");
    }
    strokeWeight(Xscl / 50);
    ellipse(j.x, j.y, Xscl / 6);
}

function drawNewMember(){
    if (!makingMember) return;
    strokeWeight(Xscl / 40);
    stroke("yellow");
    line(joint1.x, joint1.y, MouseX, MouseY);
}

function drawMember(m){
    strokeWeight(Xscl / 40);
    stroke("white");
    line(m[0].x, m[0].y, m[1].x, m[1].y);
}

//input handling:

//mouse things:

function moveJoints(){
    if (!moving || currentJoint == -1) return;
    currentJoint.x = MouseX;
    currentJoint.y = MouseY;
}

function mousePressed(){
    if (mouseButton === RIGHT) {
        if (findJoint(MouseX, MouseY) != -1) return;
        joints.push(new Joint(MouseX, MouseY));
    }
    if (mouseButton === LEFT){
        currentJoint = findJoint(MouseX, MouseY);
        if (keyIsPressed === true && keyCode === 16){
            moving = true;
        }
        else {
            if (currentJoint == -1) return;
            joint1 = currentJoint;
            console.log("Membering");
            makingMember = true;
        }
    }
    if (mouseButton === CENTER){
        panning = true;
        xStart = Xmin;
        yStart = Ymin;
        mxStart = mouseX;
        myStart = mouseY;
        xDist = Xmax - Xmin;
        yDist = Ymax - Ymin;
    }
}

function mouseReleased(){
    
    moving = false;
    panning = false;
    console.log(Xmin);
    joint2 = findJoint(MouseX, MouseY);
    if (joint2 != -1 && makingMember && !members.includes([joint1, joint2]) && !members.includes([joint2, joint1])){
        joint1.connections.push(joint2);
        joint2.connections.push(joint1);
        members.push([joint1, joint2]);
    }
    joint1 = null;
    makingMember = false;
}

function mouseWheel(event){
    Xmax += event.delta * 0.01;
    Xmin -= event.delta * 0.01;
    Ymin = (h * Xmin) / w;
    Ymax = (h * Xmax) / w;

    return false;
}

//keyboard things:

function keyPressed(){
    if (keyCode === 8 || keyCode === 46){
        joints.splice(joints.indexOf(currentJoint), 1);
        let newMembers = [];
        for (let i = 0; i < members.length; i++){
            if(members[i][0] == currentJoint || members[i][1] == currentJoint) continue;
            newMembers.push(members[i]);
        }
        members = newMembers;
        for (let i = 0; i < joints.length; i++){
            if (joints[i].connections.includes(currentJoint)){
                joints[i].connections.splice(joints[i].connections.indexOf(currentJoint), 1);
            }
        }
        currentJoint = -1;
        joint1 = null;
    }
}


//calculations:

function findJoint(x, y){
    for (let i = 0; i < joints.length; i++){
        if (dist(x, y, joints[i].x, joints[i].y) < Xscl / 8) {
            return joints[i];
        }
    }
    return -1;
}

function handlePanning(){
    if (!panning) return;
    Xmin = xStart - ((mouseX - mxStart) / w) * (xDist);
    Ymin = yStart - (-(mouseY - myStart) / h) * (yDist);
    Xmax = xStart + xDist - ((mouseX - mxStart) / w) * (xDist);
    Ymax = yStart + yDist - (-(mouseY - myStart) / h) * (yDist);
}