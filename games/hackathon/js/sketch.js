var centroids = [];
var w = 400;
function setup() {
  var canv = createCanvas(w, w + 50);
  canv.parent('canvas');
  shapes.forEach(centroid);
  textAlign(CENTER, CENTER);
}

function centroid(points){
  let area = 0;
  for (let i = 0; i < points.length; i++){
    area += points[i][0] * points[(i + 1) % points.length][1] - points[(i + 1) % points.length][0] * points[i][1];
  }
  area /= 2;
  console.log(area);
  let cx = 0, cy = 0;
  for (let i = 0; i < points.length; i++){
    cx += (points[i][0] + points[(i + 1) % points.length][0]) * (points[i][0] * points[(i + 1) % points.length][1] - points[(i + 1) % points.length][0] * points[i][1]);
    cy += (points[i][1] + points[(i + 1) % points.length][1]) * (points[i][0] * points[(i + 1) % points.length][1] - points[(i + 1) % points.length][0] * points[i][1]);
  }
  cx /= (6 * area);
  cy /= (6 * area);
  centroids.push([cx, cy]);
  console.log(cx + " " + cy);
}


function draw() {
  background(200, 200, 255);
  stroke("black");
  rectMode(CORNERS);
  noFill();
  strokeWeight(4);
  rect(0, 0, w, w);
  strokeWeight(2);
  shapes.forEach(drawShape);
  
  displayName(getShape());

  textSize(12);
  for (let i = 0; i < centroids.length; i++){
    if(!queues[i]) continue;
    fill("red");
    stroke("black");
    ellipse(centroids[i][0] * w, (1 - centroids[i][1]) * w, 25, 25);
    fill("white");
    noStroke();
    text(queues[i], centroids[i][0] * w, (1 - centroids[i][1]) * w);
  }
}

function displayName(i){
  noStroke();
  fill("black");
  textSize(16);
  text(nodeNames[i], w/2, w + 25);
}

function getShape(){
  for (let i = 0; i < shapes.length; i++){
    if (inside([mouseX / w, 1 - (mouseY / w)], shapes[i])){
      return i;
    }
  }
  return -1;
}

function drawShape(points, i){
  if (holdings[i])
  fill(holdings[i]);
  else
  noFill();
  // colorMode(HSB);
  // stroke(255 * i / 11, 255, 255);
  // colorMode(RGB);
  beginShape();
  for(let i = 0; i < points.length; i++){
    vertex(points[i][0] * w, (1 - points[i][1]) * w);
  }
  
  endShape(CLOSE);
}

function mousePressed(){
  if (getShape()==-1) return;
  window.location = "submit.php?n=" + (getShape() + 1);
}

//stolen from MIT
function inside(point, vs) {    
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}