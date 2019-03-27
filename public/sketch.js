var socket;

let p;
let players = [];
let lasers = [];
let bg = [];
var inputName;


function setup() {
  canvas = createCanvas(1200, 750);
  //initalize socket
  socket = io.connect("http://localhost:3000");


  //initalize background
  for (let i = 0; i < 500; i++) {
    let x = random(-width, width * 3);
    let y = random(-height, height * 3);
    let w = random(1, 3);
    let a = map(w, 0.5, 3, 50, 255);
    bg[i] = new Background(x, y, a, w);
  }

  //initalize player
  p = new Player(width / 2, height / 2, null);

  //send data about player
  var data = {
    x: p.pos.x,
    y: p.pos.y,
    angle: p.angle,
    r: p.r,
    name: p.name
  };
  socket.emit("start", data);

  //recive data about players and lasers
  socket.on("player", function (data) {
    players = data;
  });

  socket.on("laser", function (data) {
    lasers = data;
  });
}

function draw() {
  //background
  translate(width / 2 - p.pos.x, height / 2 - p.pos.y);
  background(0);
  bg.forEach(bg => {
    bg.display();
  });

  //draw all players and lasers from server
  drawPlayers();
  drawLasers();

  //ship
  p.run();

  //send data about player
  sendPlayer();
}

function sendPlayer() {
  var dataPlayer = {
    x: p.pos.x,
    y: p.pos.y,
    angle: p.angle,
    r: p.r,
  };
  socket.emit("updatePlayer", dataPlayer);
}

function drawPlayers() {
  for (var i = players.length - 1; i >= 0; i--) {
    var id = players[i].id;
    if (id !== socket.id) {
      push();
      translate(players[i].x, players[i].y);
      rotate(players[i].angle);
      stroke(51);
      fill(232, 41, 44, 220);
      strokeWeight(2);
      triangle(
        -(players[i].r / 2),
        players[i].r / 2,
        players[i].r / 2,
        players[i].r / 2,
        0,
        -players[i].r / 2
      );
      pop();

      fill(255);
      strokeWeight(1);
      textAlign(CENTER);
      textSize(10);
      text(players[i].name + "", players[i].x, players[i].y);
    }
  }
}

function drawLasers() {
  for (var i = 0; i < lasers.length; i++) {
    push();
    translate(lasers[i].x, lasers[i].y);
    rotate(lasers[i].angle - PI / 2);
    stroke(232, 41, 44);
    strokeWeight(3);
    line(0, 0, 20, 0);
    pop();

  }
}

function keyPressed() {
  if (key == ' ') p.addLaser();
}