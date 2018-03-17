class Soldier {

  //
  constructor(x,y,version,character) {

    this.version = version;

    if(this.version == 'Normal') { this.imageLeft = normalBatLeft; this.imageRight = normalBatRight; }
    if(this.version == 'Strong') { this.imageLeft = strongBatLeft; this.imageRight = strongBatRight; }

    this.currentImage = this.imageLeft;

    //Alive
    this.isAlive = true;

    //Position
    this.xPos = x;
    this.yPos = y;

    //Movement
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.direction = 'W';
    this.numMoves = 100;
    this.moveRound = this.numMoves;
    this.moveChoice = parseInt(random(0,4));

    //size
    this.sizeX = this.currentImage.width * 0.2;
    this.sizeY = this.currentImage.height * 0.2;

    this.leftSide   = this.xPos - (this.sizeX / 2);
    this.rightSide  = this.xPos + (this.sizeX / 2);
    this.topSide    = this.yPos - (this.sizeY / 2);
    this.bottomSide = this.yPos + (this.sizeY / 2);

    this.size = this.sizeX;

    //weapons
    this.projectiles = [];

    this.projectiles[0] = new DarkProjectile();
    this.projectiles[1] = new DarkProjectile();
    this.projectiles[2] = new DarkProjectile();

    //target
    this.character = character;
    this.engagePlayer = false;

  }

  setSoldier(x,y,version,isAlive) {

    this.isAlive = isAlive;
    this.xPos = x;
    this.yPos = y;

    this.version = version;

    if(this.version == 'Normal') { this.imageLeft = normalBatLeft; this.imageRight = normalBatRight; }
    if(this.version == 'Strong') { this.imageLeft = strongBatLeft; this.imageRight = strongBatRight; }
    if(this.version == 'Dark') { this.imageLeft = darkBatLeft; this.imageRight = darkBatRight; }

    this.currentImage = this.imageLeft;

    this.sizeX = this.currentImage.width * 0.2;
    this.sizeY = this.currentImage.height * 0.2;

    for(var i = 0; i < this.projectiles.length; i++ ) {
      this.projectiles[i].inDisplay = false;
    }

  }

  //movement
  moveLeft()  { this.direction = 'W'; this.xPos -= this.xSpeed; }
  moveRight() { this.direction = 'E'; this.xPos += this.xSpeed; }
  moveUp()    { this.yPos -= this.ySpeed; }
  moveDown()  { this.yPos += this.ySpeed; }

  manuever() {

    switch(this.moveChoice) {
      case 0:
        this.moveLeft();
        break;
      case 1:
        this.moveDown();
        break;
      case 2:
        this.moveRight();
        break;
      case 3:
        this.moveUp();
        break;
      case 4: this.moveChoice = 0;
    }

    this.moveRound--;

    if( this.moveRound == 0 ) {
      this.moveChoice += 1;
      this.moveRound = this.numMoves;
    }

  }

  movePosition() {

    if(this.engagePlayer) {
      if (this.xPos > this.character.xPos) { this.moveLeft(); }
      if (this.xPos < this.character.xPos) { this.moveRight(); }
      if (this.yPos < this.character.yPos) { this.moveUp(); }
      if (this.yPos > this.character.yPos) { this.moveDown(); }
    }
    else {
      this.manuever();
    }

    this.leftSide   = this.xPos - (this.sizeX / 2);
    this.rightSide  = this.xPos + (this.sizeX / 2);
    this.topSide    = this.yPos - (this.sizeY / 2);
    this.bottomSide = this.yPos + (this.sizeY / 2);

    line(this.leftSide,this.topSide,this.rightSide,this.topSide)
    line(this.leftSide,this.bottomSide,this.rightSide,this.bottomSide)
    line(this.leftSide,this.bottomSide,this.leftSide,this.topSide)
    line(this.rightSide,this.bottomSide,this.rightSide,this.topSide)

  }


  //attacks

  fireProjectile() {

    if(this.version == 'Normal') {

      if( this.yPos > this.character.topSide  && this.yPos < this.character.bottomSide ) {
        if( this.character.xPos < this.xPos && this.direction == 'W' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);


        }
        if( this.character.xPos > this.xPos && this.direction == 'E' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);

        }
      }
    }

    if(this.version == 'Strong') {

      if( this.yPos > this.character.topSide  && this.yPos < this.character.bottomSide ) {
        if( this.character.xPos < this.xPos && this.direction == 'W' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);


        }
        if( this.character.xPos > this.xPos && this.direction == 'E' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);

        }
      }
    }

    if(this.version == 'Dark') {

      if( this.yPos > this.character.topSide  && this.yPos < this.character.bottomSide ) {
        if( this.character.xPos < this.xPos && this.direction == 'W' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);

        }

        if( this.character.xPos > this.xPos && this.direction == 'E' ) {

          this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
          this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);

        }
      }
    }
  }

  displayAttacks() {

    for(var i = 0; i < this.projectiles.length; i++ ) {
      this.projectiles[i].display();
    }

  }

  moveAndDisplay() {

    if(this.isAlive) {

      imageMode(CENTER);

      if(this.direction == 'W') { this.currentImage = this.imageLeft; }
      if(this.direction == 'E') { this.currentImage = this.imageRight; }

      image(this.currentImage, this.xPos, this.yPos, this.sizeX,this.sizeY);
      this.movePosition();
      this.fireProjectile();
      this.displayAttacks();

    }

  }

  stoppedAndDisplay() {

    if(this.isAlive) {

      imageMode(CENTER)
      image(this.currentImage, this.xPos, this.yPos, this.sizeX,this.sizeY);

    }
  }
}
