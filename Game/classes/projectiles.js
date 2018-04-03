class Projectiles {

  constructor(x,y,direction) {

    //Position
    this.xPos = x;
    this.yPos = y;

    this.direction = direction;

    //Movement
    this.xSpeed = 7;
    this.ySpeed = 7;

    //size
    this.size = 5;

    this.inDisplay = true;

  }

  //move projectile
  move() {

    if(this.direction == 'N') { this.yPos -= this.ySpeed; this.xPos += random(-1,1); }
    if(this.direction == 'S') { this.yPos += this.ySpeed; this.xPos += random(-1,1); }
    if(this.direction == 'E') { this.xPos += this.xSpeed; this.yPos += random(-1,1); }
    if(this.direction == 'W') { this.xPos -= this.xSpeed; this.yPos += random(-1,1); }

  }

  //check if on screen
  checkPosition() {
    if(this.xPos < 0 || this.xPos > width || this.yPos < 0 || this.yPos > height) {
      this.inDisplay = false;
    }
  }

  //check if hits object
  checkHits(object) {

    if(this.xPos > object.leftSide &&
      this.xPos < object.rightSide &&
      this.yPos > object.topSide &&
      this.yPos < object.bottomSide) { return true; }

  }

  //display object
  display() {

    fill(random(0.5,1)*255,random(0.5,1)*255,0);
    ellipse(this.xPos,this.yPos,this.size,this.size);

    this.move();
    this.checkPosition();

  }

}
