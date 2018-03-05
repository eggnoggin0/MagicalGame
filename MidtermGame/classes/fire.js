class Fire {

    constructor(x,y,direction) {

        //Position
        this.xPos = x;
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

    }

    move() {

      fill(255*random(0.5,1),0,0);
      ellipse(this.xPos,this.yPos,this.size,this.size);
      //ellipse(-20,0,20,20);

      //this.angle += this.angleSpeed;
      this.xPos += this.xSpeed;
      this.yPos += this.ySpeed;

      this.surviveTime -= 1;


    }

    checkPosition() {
        if(dist(this.xPos, this.yPos, this.startX, this.startY) > 50 || this.surviveTime == 0) {
            this.inDisplay = false;
        }
    }

    display() {

        this.move();
        this.checkPosition();

    }

}
