class PauseScreen {

    constructor() {

        this.isPause = true;
        //this.environment = environment;
        this.pauseLatency = 10;
        this.pauseTime = 0;
    }

    createEnvironment() {
      this.environment = new Environment();
    }

    //check if paused
    checkPause() {

        if(this.pauseTime == 0) {
            if(keyIsDown(13)) {
                console.log(this.isPause);
                this.pauseTime = this.pauseLatency;
                if(this.isPause) { this.isPause = false; }
                else { this.isPause = true; }
                if(this.environment.restart || this.environment.character.restart) { this.createEnvironment(); }
            }
        }
        else {
            this.pauseTime--;
        }

    }

    //display pause screen
    display() {

      //check if paused
      if(this.isPause || this.environment.restart || this.environment.character.restart) {

        this.environment.displayPresentEnvironment();

        this.isPause = true;

        fill(0);
        textSize(30);
        textAlign(CENTER);

        text('Welcome to the World of Magic\nCONTROLS:\nI: stop time\nL: teleport\nJ: shoot electricity\nK: explode fire\nO: change timelines', width/2,height/2);
        this.checkPause();

      }

      else if(this.isPause == false) {

        this.isPause = false;

        this.environment.display();
        this.checkPause();

      }

    }

}
