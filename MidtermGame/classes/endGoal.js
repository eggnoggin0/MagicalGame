class EndGoal {

  constructor(character) {

    this.character = character;

    //image
    this.bananaImage = bananaImage;

    //check to see if at last environment
    this.isLastEnvironment = false;

    //position
    this.xPos = width-100;
    this.yPos = height/2+50;

    //check win
    this.grabbedBananas = false;

    //screen number
    this.screenNum;

    //image sides
    this.leftSide   = this.xPos - (this.bananaImage.width / 2);
    this.rightSide  = this.xPos + (this.bananaImage.width / 2);
    this.topSide    = this.yPos - (this.bananaImage.height / 2);
    this.bottomSide = this.yPos + (this.bananaImage.height / 2);
  }

  checkEnd(screenIndex) {

    this.screenNum = screenIndex;

    //chek to see if last environment
    if (this.screenNum == 10) {
      this.isLastEnvironment = true;
    }

    //display bananas
    if (this.isLastEnvironment) {
      image(this.bananaImage, this.xPos, this.yPos, this.bananaImage.width/8, this.bananaImage.height/8);
    }

    //check win
    if(this.character.xPos > this.leftSide &&
      this.character.xPos< this.rightSide &&
      this.character.yPos > this.bottomSide &&
      this.character.yPos < this.topSide) {
      this.grabbedBananas = true;
    }

    //display win
    if (this.grabbedBananas) {
      textSize(30);
      fill(0);
      textAlign(CENTER);
      text('You win!', width / 2, height / 2);
      text('Press ENTER to play again', width / 2, height / 2 + 40);

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
