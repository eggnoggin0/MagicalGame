class DarkProjectile {

  constructor() {

    //Position
    this.xPos = 0;
    this.yPos = 0;

    this.startX = 0;
    this.startY = 0;

    this.direction = 'E';

    this.ySpeed = random(-1,1);
    this.angleSpeed = 5;
    this.angle = random(0,2*PI);

    //size
    this.size = 10;
    this.grow = false;

    this.surviveTime = 100;

    this.inDisplay = false;

    this.projectileTimeLimit = 50;
    this.projectileTime = 0;

  }

  setProjectile(x,y,direction) {

    if(this.inDisplay == false) {

      this.projectileTime = this.projectileTimeLimit;

      this.xPos = x;
      this.yPos = y;

      this.direction = direction;

      //Movement

      if(this.direction == 'W') { this.xSpeed = -3; }
      if(this.direction == 'E') { this.xSpeed = 3; }

      console.log(this.xSpeed);

      this.inDisplay = true;

    }

  }

  changeSize() {

    if(this.size < 50 && this.grow) { this.size++; }
    else if(this.size == 50) { this.grow = false; this.size--; }
    else if(this.size > 10 && this.grow == false ) { this.size--; }
    else if(this.size == 10) { this.grow = true; this.size++; }

  }

  move() {

    fill(0);

    this.changeSize();

    ellipse(this.xPos,this.yPos,this.size,this.size);

    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

  }

  checkPosition() {
    if(this.xPos < 0 || this.xPos > width) {
      this.inDisplay = false;
    }
  }

  checkHits(object) {

    return (dist(object.xPos,object.yPos,this.xPos,this.yPos) < object.size);

  }

  display() {

    if(this.inDisplay) {
      this.move();
      this.checkPosition();
    }
  }
}
