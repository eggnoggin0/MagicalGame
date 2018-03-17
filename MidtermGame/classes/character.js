class Character {

  //instantiate
  constructor(x,y) {

    //object image
    this.imageLeft = monkeyLeft;
    this.imageRight = monkeyRight;

    this.currentImage = this.imageLeft;

    //Alive
    this.isAlive = true;

    //Position
    this.xPos = x;
    this.yPos = y;

    //Movement
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.direction = 'W';

    //size
    this.sizeX = this.currentImage.width * 0.2;
    this.sizeY = this.currentImage.height * 0.2;

    this.leftSide   = this.xPos - (this.sizeX / 2);
    this.rightSide  = this.xPos + (this.sizeX / 2);
    this.topSide    = this.yPos - (this.sizeY / 2);
    this.bottomSide = this.yPos + (this.sizeY / 2);

    //meters
    this.magicLimit = 250;
    this.magicMeter = this.magicLimit;

    this.health = 100;

    //weapons

    //electricity
    this.projectiles = [];

    //fire
    this.fireLimit = 100;
    this.fireTime = 0;
    this.fireArray = [];

    //time
    this.timeIsStopped = false;
    this.stoppedTimeLimit = 1000;
    this.timeLimit = 0;

    //teleportation
    this.teleportLength = 150;
    this.teleportLimit  = 100;
    this.teleportTime   = 0;

    this.teleportDirection = 'N';

    //time change
    this.inPresent = true;
    this.changeTimeLimit = 100;
    this.changeTimeMeter = 0;

  }

  //movement

  //move direction
  moveLeft()  { this.teleportDirection = 'W'; this.direction = 'W'; this.xPos -= this.xSpeed; }
  moveRight() { this.teleportDirection = 'E'; this.direction = 'E'; this.xPos += this.xSpeed; }
  moveUp()    { this.teleportDirection = 'N'; this.yPos -= this.ySpeed; }
  moveDown()  { this.teleportDirection = 'S'; this.yPos += this.ySpeed; }

  //change position
  movePosition() {

    if (this.yPos > height/3) {
      if (keyIsDown(87)) { this.moveUp(); }
    }
    if (this.yPos < height) {
      if (keyIsDown(83)) { this.moveDown(); }
    }
    if (this.xPos > 0) {
      if (keyIsDown(65)) { this.moveLeft(); }
    }

    if (keyIsDown(68)) { this.moveRight(); }

    this.leftSide   = this.xPos - (this.sizeX / 2);
    this.rightSide  = this.xPos + (this.sizeX / 2);
    this.topSide    = this.yPos - (this.sizeY / 2);
    this.bottomSide = this.yPos + (this.sizeY / 2);

  }

  //attacks

  createProjectiles() {

    //electricity
    if(this.magicMeter > 0.1) {
      if(keyIsDown(78)) {
        var temp = new Projectiles(this.xPos,this.yPos,this.direction);
        this.projectiles.push(temp);
        this.magicMeter -= 0.1;
      }
    }

    //fire
    if(this.fireTime == 0) {
      if(this.magicMeter > 10) {

        if(keyIsDown(66)) {
          this.fireTime = this.fireLimit;
          this.magicMeter -= 10;
          for(var i = 0; i < this.fireLimit; i++ ){
            var temp = new Fire(this.xPos,this.yPos,this.direction);
            this.projectiles.push(temp);
          }
        }
      }
    }
    else {
      this.fireTime--;
    }
  }

  //stop time
  stopTime() {

    if(this.timeIsStopped == false) {
      if(this.magicMeter > 10) {
        if(keyIsDown(77)) {
          this.timeLimit = this.stoppedTimeLimit;
          this.magicMeter -= 10;
        }
      }
    }

  }


  checkTime() {

    if(this.timeLimit > 0) {
      this.timeIsStopped = true;
      fill(255);
      textSize(50);
      text(parseInt(this.timeLimit / 100), width - 50,50);
      this.timeLimit--;
    }
    else {
      this.timeIsStopped = false;
    }
  }

  //teleportation
  teleport() {

    if(this.magicMeter > 5) {
      if(this.teleportTime == 0) {
        if(keyIsDown(75)) {
          if( this.teleportDirection == 'N' ) {
            if( this.yPos - this.teleportLength > height / 3) {
              this.yPos -= this.teleportLength;
            }
            else {
              this.yPos = height / 3;
            }
          }
          if( this.teleportDirection == 'S' ) { this.yPos += this.teleportLength; }
          if( this.teleportDirection == 'W' ) { this.xPos -= this.teleportLength; }
          if( this.teleportDirection == 'E' ) { this.xPos += this.teleportLength; }
          this.magicMeter -= 5;
          this.teleportTime = this.teleportLimit;

        }
      }
      else {
        this.teleportTime--;
      }

    }
  }

  //change time periods
  changeTime() {
    if(this.changeTimeMeter == 0) {
      if(keyIsDown(84)) {
        this.changeTimeMeter = this.changeTimeLimit;
        if(this.inPresent) {
          this.inPresent = false;
        }
        else {
          this.inPresent = true;
        }
      }
    }
    else {
      this.changeTimeMeter--;
    }

  }

  //attack function
  useAttacks() {
    this.createProjectiles();
    this.stopTime();
    this.checkTime();
    this.teleport();
    this.changeTime();
  }

  //health
  deductHealth() {
    this.health -= 10;
  }

  checkHealth() {
    if(this.health == 0) {
      this.isAlive = false;
    }
  }

  //display function
  displayMeters() {

    textAlign(LEFT);

    fill('green');
    rect(50,50,this.magicMeter,20);
    fill(255);
    textSize(10)
    text('Magic Meter', 55, 65);

    fill('blue');
    rect(50,75,this.health,20);
    fill(255);
    textSize(10)
    text('Health Meter', 55, 90);

  }

  //show projectiles
  displayProjectiles() {
    for(var i = 0; i < this.projectiles.length; i++ ){
      this.projectiles[i].display();
      if(this.projectiles[i].inDisplay == false) {
        this.projectiles.splice(i,1);
      }
    }
  }

  //full display
  display() {

    this.checkHealth();

    //check if alive
    if(this.isAlive) {
      line(this.leftSide,this.topSide,this.rightSide,this.topSide)
      line(this.leftSide,this.bottomSide,this.rightSide,this.bottomSide)
      line(this.leftSide,this.bottomSide,this.leftSide,this.topSide)
      line(this.rightSide,this.bottomSide,this.rightSide,this.topSide)

      if(this.direction == 'W') { this.currentImage = this.imageLeft; }
      if(this.direction == 'E') { this.currentImage = this.imageRight; }

      imageMode(CENTER)

      image(this.currentImage,this.xPos, this.yPos, this.sizeX, this.sizeY);
      this.displayMeters();
      this.movePosition();
      this.useAttacks();
      this.displayProjectiles();
    }

    else {

      textSize(30);
      fill(0);
      textAlign(CENTER);
      text('You died!', width / 2, height / 2);
      text('Press ENTER to try again', width / 2, height / 2 + 40);

      if(keyIsDown(13)) {
        //Alive
        this.isAlive = true;

        //Position
        this.xPos = width/2;
        this.yPos = height/2;

        this.magicMeter = this.magicLimit;

        this.health = 100;

      }
    }


  }
}
