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
    this.futureTimeLimit = 1000;
    this.futureTime = 0;
    this.changeTimeMeter = 0;

    //sounds
    this.teleportSound = teleport;
    this.changeTimelinesSound = changeTimelines;
    this.stopTimeSound = stopTime;
    this.explodeFireSound = explodeFire;
    this.shootElectricitySound = shootElectricity;

    //electricity envelope flag allows a "press and hold effect" for the sound
    this.electricityEnvelopeFlag = 0;

    this.restart = false;
  }

  //movement

  //move direction, this has NSEW to track where to teleport
  moveLeft()  { this.teleportDirection = 'W'; this.direction = 'W'; this.xPos -= this.xSpeed; }
  moveRight() { this.teleportDirection = 'E'; this.direction = 'E'; this.xPos += this.xSpeed; }
  moveUp()    { this.teleportDirection = 'N'; this.yPos -= this.ySpeed; }
  moveDown()  { this.teleportDirection = 'S'; this.yPos += this.ySpeed; }

  //change position
  movePosition() {

    //move and check position
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

    //change position
    this.leftSide   = this.xPos - (this.sizeX / 2);
    this.rightSide  = this.xPos + (this.sizeX / 2);
    this.topSide    = this.yPos - (this.sizeY / 2);
    this.bottomSide = this.yPos + (this.sizeY / 2);

  }

  //attacks

  //projectile attacks
  createProjectiles() {

    //electricity
    if(this.magicMeter > 0.1) {
      //shoot electricity
      if(keyIsDown(74)) {
        if (this.electricityEnvelopeFlag == 0) {
          this.shootElectricitySound.play();
        }
        this.electricityEnvelopeFlag++;
        var temp = new Projectiles(this.xPos,this.yPos,this.direction);
        this.projectiles.push(temp);
        this.magicMeter -= 0.1;
      }
      else {
        this.electricityEnvelopeFlag = 0;
        this.shootElectricitySound.stop();
      }
    }

    //fire
    if(this.fireTime == 0) {
      if(this.magicMeter > 10) {
        //shoot fire
        if(keyIsDown(75)) {
          if(keyIsPressed) { //stops sound when key is lifted
            this.explodeFireSound.play();
          }
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

  //play electricity sounds
  playElectricitySound() {
    this.electricityEnv.play();
  }

  //stop time
  stopTime() {

    if(this.timeIsStopped == false) {
      if(this.magicMeter > 10) {
        if(keyIsDown(73)) {
          this.stopTimeSound.play();
          this.timeLimit = this.stoppedTimeLimit;
          this.magicMeter -= 10;
        }
      }
    }

  }

  //check if time is stopped
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
        if(keyIsDown(76)) {
          this.teleportSound.play();
          //for teleporting north, make sure not teleporting over to background
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
      if(keyIsDown(79)) {
        this.changeTimelinesSound.play();
        this.changeTimeMeter = this.changeTimeLimit;
        if(this.inPresent) {
          this.futureTime = this.futureTimeLimit;
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

  //check if time is changed periods
  checkChangedTime() {

    if(this.futureTime > 0) {
      fill(255);
      textSize(50);
      text(parseInt(this.futureTime / 100), width - 100,50);
      this.futureTime--;
      if(this.futureTime == 1){ this.changeTimelinesSound.play(); }
    }
    else {
      this.inPresent = true;
    }
  }

  //attack function
  useAttacks() {
    this.createProjectiles();
    this.stopTime();
    this.checkTime();
    this.teleport();
    this.changeTime();
    this.checkChangedTime();
  }

  //health
  deductHealth() {
    this.health -= 10;
  }

  checkHealth() {
    if(this.health <= 0) {
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

      //hit box debugging code

      /*line(this.leftSide,this.topSide,this.rightSide,this.topSide)
      line(this.leftSide,this.bottomSide,this.rightSide,this.bottomSide)
      line(this.leftSide,this.bottomSide,this.leftSide,this.topSide)
      line(this.rightSide,this.bottomSide,this.rightSide,this.topSide)*/

      //change image
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
        this.restart = true;

      }
    }


  }
}
