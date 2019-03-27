class Background {

  constructor(x, y, a, w) {
    this.bg = [];
    this.x = x;
    this.y = y;
    this.alpha = a;
    this.weight = w;
  }

  display() {
    stroke(255, this.alpha);
    fill(255);
    strokeWeight(this.weight);
    point(this.x, this.y);
    strokeWeight(2);
    noFill();
    stroke(255);
    rect(-width, -height, width * 4, height * 4);
  }

}