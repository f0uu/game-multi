class Player {

  constructor(x, y, nick) {
    this.pos = createVector(x, y);
    this.acc = createVector();
    this.vel = createVector();

    this.r = 32;
    this.angle = 0;
    this.name = nick;

    this.ammo = [];
    this.index = 0;
  }

  run() {
    this.keyEvents();
    this.update();
    this.show();

  }


  update() {
    this.edges();
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(0.95);
  }

  edges() {

    this.pos.x = constrain(this.pos.x, -width + (this.r / 2), (width * 3) - this.r / 2);
    this.pos.y = constrain(this.pos.y, -height + (this.r / 2), (height * 3) - this.r / 2);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(51);
    fill(66, 134, 244, 220);
    strokeWeight(2);
    triangle(-(this.r / 2), this.r / 2, this.r / 2, this.r / 2, 0, -this.r / 2);
    pop();
  }

  keyEvents() {
    if (keyIsDown(LEFT_ARROW)) this.angle -= 0.1;

    if (keyIsDown(RIGHT_ARROW)) this.angle += 0.1;

    if (keyIsDown(UP_ARROW)) {
      this.acc.add(p5.Vector.fromAngle(this.angle - PI / 2));
      this.acc.mult(0.8);
    }

  }

  addLaser() {
    //p.ammo.push(new Laser(p.pos.x, p.pos.y, p.angle));
    this.speed = p5.Vector.fromAngle(this.angle - PI / 2).mult(5);
    var data = {
      x: this.pos.x,
      y: this.pos.y,
      velX: this.speed.x,
      velY: this.speed.y,
      angle: this.angle
    };
    socket.emit("laserRecive", data);

  }


  // laser() {
  //   for (var i = 0; i < this.ammo.length; i++) {
  //     this.ammo[i].update();
  //     this.ammo[i].show();
  //     if (this.ammo[i].offScreen()) this.ammo.splice(i, 1);
  //   }

  // }
}