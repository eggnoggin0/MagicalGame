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

  move() {

    fill(255*random(0.5,1),0,0);
    ellipse(this.xPos,this.yPos,this.size,this.size);

    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    this.surviveTime -= 1;

  }

  checkPosition() {
    if(dist(this.xPos, this.yPos, this.startX, this.startY) > this.fireRadius || this.surviveTime == 0) {
      this.inDisplay = false;
    }
  }

  checkHits(object) {

    return (dist(object.xPos,object.yPos,this.xPos,this.yPos) < object.size);

  }

  display() {

    this.move();
    this.checkPosition();

  }

}
