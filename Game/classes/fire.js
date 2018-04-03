class Fire {

  constructor(x,y,direction) {

    //Position
    if(direction == 'W') { this.xPos = x - 100; }
    if(direction == 'E') { this.xPos = x + 100; }

    this.yPos = y;

    this.startX = x;
    this.startY = y;

    this.direction = direction;

    //Movement
    this.xSpeed = random(-1,1);
    this.ySpeed = random(-1,1);
    this.angleSpeed = 5;
    this.angle = random(0,2*PI);

    //size
    this.size = 10;
    this.surviveTime = 100;
    this.inDisplay = true;
    this.fireRadius = 100;

  }

  //move fire
  move() {

    fill(255*random(0.5,1),0,0);
    ellipse(this.xPos,this.yPos,this.size,this.size);

    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    this.surviveTime -= 1;

  }

  //check if in fire radius
  checkPosition() {
    if(dist(this.xPos, this.yPos, this.startX, this.startY) > this.fireRadius || this.surviveTime == 0) {
      this.inDisplay = false;
    }
  }

  //check if it hits object
  checkHits(object) {

    if(this.inDisplay) {
      if(this.xPos + (this.size / 2) > object.leftSide &&
        this.xPos - (this.size / 2) < object.rightSide &&
        this.yPos + (this.size / 2) > object.topSide &&
        this.yPos - (this.size / 2) < object.bottomSide) { this.inDisplay = false; return true; }
    }

  }

  //display
  display() {

    this.move();
    this.checkPosition();

  }

}
