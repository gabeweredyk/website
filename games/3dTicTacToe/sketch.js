var w;
var turn = 1;
var board = [];
var intervals = [0, 1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22];
var space = [-1, 0, 1, 2, -1, 3, 4, 5, -1, 6, 7, 8, -1];
var current = 4;
var wild;
var magic = [2, 7, 6,
             9, 5, 1,
             4, 3, 8];

var wins = [0, 0, 0,
            0, 0, 0, 
            0, 0, 0];

var xShift;
var yShift;
var winner = 0;

function setup() {
    w = min(windowHeight, windowWidth) / 15;
    createCanvas(15 * w, 13 * w);
    xShift = 2 * w;
    yShift = w;
    for (let i = 0; i < 9; i++){
      board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}
  
function draw() {
  background(16);
  translate(xShift, yShift);
  drawBoards();
  currentBoard(current);
  drawPlays();
  translate(-xShift, -yShift);
  drawScore();
  if (winner != 0){
    drawWinner();
  }

}

//BOARD HIGHLIGHT
function currentBoard(i){
  rectMode(CORNER);
  if (turn == 1){ stroke("#f23c69"); }
  else{ stroke("#22bce2"); }
  if (wild) {
    rect(w / 4, w / 4, 10.5 * w, 10.5 * w);
    return;
  }
  noFill();
  rect( (3.5 * w * (i % 3)) + (w / 4), (3.5 * w * floor(i / 3)) + (w / 4), 3.5 * w, 3.5 * w);
}
//

//DRAWING THE LINES OF THE BOARDS
function drawBoards(){
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
        drawBoard((3.5 * w * j) + (w / 2), (3.5 * w * i) + (w / 2), 3*i + j);
    }
  }
}

function drawBoard(x, y, i){
  noFill();
  switch (wins[i]){
    case 0:
      stroke("white");
      break;
    case 1:
      stroke("#f23c69");
      break;
    case -1:
      stroke("#22bce2");
      break;
  }
  
  line(x + w, y, x + w, y + (3*w));
  line(x + 2*w, y, x + 2*w, y + 3*w);
  line(x, y + w, x + 3*w, y + w);
  line(x, y + 2*w, x + 3*w, y + 2*w);
}
//

//DRAW Xs AND Os
function drawPlays(){
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      if (board[i][j] == 0) continue;
      let x = w * (3.5 * (i % 3) + (j % 3) + 1);
      let y = w * (3.5 * floor(i / 3) + floor(j / 3) + 1);
      switch (board[i][j]){
      case 1:
        stroke("#f23c69");
        drawX(x, y);
        break;
      case -1:
        stroke("#22bce2");
        drawO(x, y);
        break;
      }
    }
  }
}

function drawX(x, y){
  
  for (let i = QUARTER_PI; i < TWO_PI; i += HALF_PI){
     line(x, y, x + (0.4 * sqrt(2) * w * cos(i)), y + (0.4 * sqrt(2) * w * sin(i)));
  }
}
function drawO(x, y){
  ellipse(x, y, .8 * w, .8 * w);
}
//

//MOUSE HANDLING
function mousePressed(){
  v = mouseToVector(mouseX - xShift, mouseY - yShift);
  if (v.x == -1 || v.y == -1 || winner != 0) return; 
  updateBoard(v.x, v.y);
}


function mouseToVector(x, y) {
  var intX = (2 * x) / w;
  var intY = (2 * y) / w;
  var spaceX = -1;
  var spaceY = -1;
  for (let i = 0; i < intervals.length; i++){
    if (intX < intervals[i] && i != 0){
      spaceX = space[i - 1];
      break;
    }
  }
  for (let i = 0; i < intervals.length; i++){
    if (intY < intervals[i] && i != 0){
      spaceY = space[i - 1];
      break;
    }
  }
  return createVector(spaceX, spaceY);
}

function updateBoard(x, y){
  let i = 3 * floor(y / 3) + floor(x / 3);
  let j = 3 * (y % 3) + (x % 3);
  if ((i != current && !wild) || board[i][j] != 0) return;
  board[i][j] = turn;
  if (wins[i] == 0) wins[i] = checkWin(board[i]);
  turn *= -1;
  current = j;
  wild = false;
  if (!board[current].includes(0)){
    wild = true;
    for (let i = 0; i < 9; i++){
      if (board[i].includes(0)) return;
    }
    try {
      winner = abs(x - o) / (x - o);
    }
    catch (err){
      winner = 2;
    }
  }
}
//

//WIN CONDITION
function checkWin(game){
  var x = [];
  var o = [];
  for (let i = 0; i < game.length; i++){
    switch (game[i]){
      case 1:
        x.push(magic[i]);
        break;
      case -1:
        o.push(magic[i]);
        break;
    }
  }

  console.log(x);
  console.log(o);

  var xSum = x.reduce(function (a, b) {return a + b;}, 0);

  switch (x.length){
    case 3:
      if (xSum == 15) return 1;
      break;
    case 4:
      for (let i = 0; i < 4; i++){
        if (xSum - x[i] == 15) return 1;
      }
      break;
    case 5:
      for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
          if (i == j) continue;
          if (xSum - x[i] - x[j] == 15) return 1;
        }
      }
      break;
    case 6:
      if (!x.includes(2) && !x.includes(5) && !x.includes(8)) break;
      if (!x.includes(6) && !x.includes(5) && !x.includes(4)) break;
    case 7:
    case 8:
    case 9:
      return 1;
  }

  var oSum = o.reduce(function (a, b) {return a + b;}, 0);

  switch (o.length){
    case 3:
      if (oSum == 15) return -1;
      break;
    case 4:
      for (let i = 0; i < 4; i++){
        if (oSum - o[i] == 15) return -1;
      }
      break;
    case 5:
      for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
          if (i == j) continue;
          if (oSum - o[i] - o[j] == 15) return -1;
        }
      }
      break;
    case 6:
      if (!o.includes(2) && !o.includes(5) && !o.includes(8)) break;
      if (!o.includes(6) && !o.includes(5) && !o.includes(4)) break;
    case 7:
    case 8:
    case 9:
      return -1;
  }

  

  return 0;
}
//

// DRAW SCORES
function drawScore(){
  textAlign(CENTER, CENTER);
  let x = 0;
  let o = 0;
  for (let i =0; i < wins.length; i++){
    switch (wins[i]){
      case 1:
        x++;
        break;
      case -1:
        o++;
        break;
    }
  }
  if (x > 4 || o > 4){
    winner = abs(x - o) / (x - o);
  }
  noStroke();
  textSize(w / 2);
  fill("#f23c69");
  text("X score:\n " + x, 1.5 * w, 1.25 * w);
  fill("#22bce2");
  text("O score:\n " + o, 13.5 * w, 1.25 * w);
}
//

//DRAW WINNER WINNER CHICKEN DINNER
function drawWinner(){
  rectMode(CENTER);
  switch (winner){
    case 1: 
      stroke("#f23c69"); 
      break;
    case -1: 
      stroke("#22bce2"); 
      break;
    case 2:
      stroke("white");
      break;
  }
  strokeWeight(5);
  fill(16);
  rect(7.5 * w, 6.5 * w, 7.5 * w, 5.5 * w);
  textSize(w);
  strokeWeight(1);
  noStroke();
  switch (winner){
    case 1: 
      fill("#f23c69"); 
      text("X wins!", 7.5 * w, 6.5 * w);
      break;
    case -1: 
      fill("#22bce2"); 
      text("O wins!", 7.5 * w, 6.5 * w);
      break;
    case 2:
      fill("white");
      text("Draw!", 7.5 * w, 6.5 * w);
      break;
  }
}