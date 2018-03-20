class EndGoal {

    constructor(character) {

        this.character = character;

        //image
        this.bananaImage = bananaImage;

        //check to see if at last environment
        this.isLastEnvironment = false;

        //position
        this.xPos = width-50;
        this.yPos = height/2;

        //check win
        this.grabbedBananas = false;
    }

    checkEnd(screenIndex) {

      //chek to see if last environment
      if (this.screenNum == 10) {
          this.isLastEnvironment = true;
      }

      //display bananas
      if(screenIndex == this.isLastEnvironment) {
          image(this.bananaImage, this.xPos, this.yPos);
      }

      //check win
      if (this.character.xPos == this.xPos && this.character.yPos == this.yPos) {
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
