class PauseScreen {

  constructor(environment) {

    this.isPause = true;
    this.environment = environment;
    this.pauseLatency = 10;
    this.pauseTime = 0;
  }

  //check if paused
  checkPause() {

    if(this.pauseTime == 0) {
      if(keyIsDown(13)) {
        this.pauseTime = this.pauseLatency;
        if(this.isPause) { this.isPause = false; }
        else { this.isPause = true; }
      }
    }
    else {
      this.pauseTime--;
    }

  }

  //display pause screen
  display() {

    this.environment.displayPresentEnvironment();
    fill(0);
    textSize(30);
    textAlign(CENTER);

    text('Welcome to the World of Magic', width/2,height/2);

  }

}
