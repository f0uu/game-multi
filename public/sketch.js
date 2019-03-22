var socket;

let p;
let players = [];
let lasers = [];
let bg = [];
var inputName;

function setup() {
  canvas = createCanvas(840, 620);
  //initalize socket
  socket = io.connect('http://localhost:3000');
 

  //initalize background
  for(let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(1,3);
    let a = map(w, 0.5, 3, 50, 255);
  	bg[i] = new Background(x,y,a,w);
  }
  
  //initalize players
  p = new Player(width/2, height/2, null);

  var data = {
    x: p.pos.x,
    y: p.pos.y,
    angle: p.angle,
    r: p.r,
    name: p.name
  }
  socket.emit('start', data);

  socket.on('player', function(data) {
    players = data;
  });

  socket.on('laser', function(data) {
    lasers = data;
  });
  
} 


function draw() {
  //background
  
  background(0); 
	bg.forEach(bg => {
   bg.display();
  });
  
  //ship
  drawPlayers();
  drawLasers();
  p.run();

  sendPlayer();
  sendLaser();

}


function drawPlayers() {
  for(var i = players.length-1; i >= 0; i--) {
    var id = players[i].id;
    if(id !== socket.id) {
      push();
    	translate(players[i].x,players[i].y);
    	rotate(players[i].angle);
    	stroke(51);
    	fill(232,41,44,220);
    	strokeWeight(2);
      triangle(-(players[i].r/2), players[i].r/2,  players[i].r/2, players[i].r/2,  0, -players[i].r/2); 
      pop();

      fill(255);
      strokeWeight(1);
      textAlign(CENTER);
      textSize(10);
      text(players[i].name+'', players[i].x, players[i].y);
    }
  }
}

function drawLasers() {
    for(var i = 0; i < lasers.length; i++) {
      var id = lasers[i].id;
      if(id !== socket.id) {
        push();
        translate(lasers[i].x,lasers[i].y);
        rotate(lasers[i].angle);
        stroke(232,41,44);
        strokeWeight(3);
        line(0,0,lasers[i].len,0);
        pop();
      }
    }
}

function sendPlayer() {
  var dataPlayer = {
    x: p.pos.x,
    y: p.pos.y,
    angle: p.angle,
    r: p.r,
    name: p.name
  }
  socket.emit('updatePlayer', dataPlayer);
}

function sendLaser() {
  for(var i = 0; i < p.ammo.length; i++) {
    var dataLaser = {
      x: p.ammo[i].pos.x,
      y: p.ammo[i].pos.y,
      angle: p.ammo[i].angle
    }
    socket.emit('updateLaser', dataLaser);
  }
}


function keyPressed() {
  if(key == ' ')  {
    p.ammo.push(new Laser(p.pos.x, p.pos.y, p.angle));
    var data = {
      x: p.pos.x,
      y: p.pos.y,
      angle: p.angle,
      len: 20
    }
    socket.emit('laserRecive', data);
  }
}
