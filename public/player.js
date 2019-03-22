class Player {
	  
	constructor(x, y, nick) {
  	this.pos = createVector(x,y);
    this.acc = createVector();
    this.vel = createVector();
    
		this.r = 32;
    this.angle = 0;
    this.name = nick;

    this.ammo = [];
  }
  
  run() {
  	this.moving();
  	this.update();
    this.show();
    
    this.laser();
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
  	if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.x < 0) this.pos.x = width;  
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
  }

	show() {
    	push();
    	translate(this.pos.x,this.pos.y);
    	rotate(this.angle);
    	stroke(51);
    	fill(66,134,244,220);
    	strokeWeight(2);
			triangle(-(this.r/2), this.r/2,  this.r/2, this.r/2,  0, -this.r/2); 		
    	pop();
  }
  
  moving() {
  	if(keyIsDown(LEFT_ARROW)) this.angle -= 0.1;
    	
    if(keyIsDown(RIGHT_ARROW)) this.angle += 0.1;
    
    if(keyIsDown(UP_ARROW)) {
    	this.acc.add(p5.Vector.fromAngle(this.angle-PI/2));
      this.acc.mult(0.7);
    }  
  }


  laser() {
    for(var i = 0; i < this.ammo.length; i++) {
      this.ammo[i].update();
      this.ammo[i].show();
      if(this.ammo[i].offScreen()) this.ammo.slice(i,1);
    }

  }
}