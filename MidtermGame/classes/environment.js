class Environment {

  //
  constructor(character, enemies) {

    //
    this.noiseValue = 0;
    this.noiseScale = 0.02;

    //
    this.character = character;
    this.enemies   = enemies;

    this.item = new MagicItems(random(0,width),random(height/3,height),this.character);
    this.itemIndex = 0;

    this.screenNum = 1;

  }

  /*reviveItems() {

    if(parseInt(random(0,2)) == 1) {
      this.item.exist = true;
    }

  }*/

  //check if hit enemy
  checkHits(enemyIndex) {

    //character hitting enemy
    for(var i = 0; i < this.character.projectiles.length; i++){
      if(this.character.projectiles[i].checkHits(this.enemies[enemyIndex])) {
        this.enemies[enemyIndex].isAlive = false;
      }
    }

    //enemy hitting character
    for(var i = 0; i < this.enemies[enemyIndex].projectiles.length; i++) {
      if(this.enemies[enemyIndex].projectiles[i].checkHits(this.character)) {
        this.character.deductHealth();
      }
    }

  }

  //check if move screen
  checkPosition() {

    if(this.character.xPos > width) {
      offset += width;
      this.character.xPos = 0;

      //change enemies
      for(var i = 0; i < this.enemies.length; i++) {

        if(i < this.screenNum) {
          if(i <= 3) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Normal',true); }
          else if(i > 3 && i <=6 ) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Strong',true); }
          else if( i > 6 ){ this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Dark',false); }
        }

      }

      this.screenNum++;

    }
  }

  //show environment in present
  displayPresentEnvironment() {

    background(173,216,230);

    fill(76,70,50)
    rect(0,height/3,width,2*height/3)
    noStroke();

    fill(0,50,0);

    beginShape();

    var x;
    for (x = 0; x < width; x++ ) {

      var noiseValue = noise( offset + x/100 );
      var noiseHeight = map( noiseValue, 0, 1, 0,height/3);

      vertex(x,noiseHeight);

    }

    vertex(width,height/3);
    vertex(0,height/3);

    endShape();

    fill(0,150,0);

    beginShape();

    var x;
    for (x = 0; x < width; x++ ) {

      var noiseValue = noise( offset + x/100 );
      var noiseHeight = map( noiseValue, 0, 1,height/5,height/3);

      vertex(x,noiseHeight);

    }

    vertex(width,height/3);
    vertex(0,height/3);

    endShape();

    stroke(0);

  }

  //change environment to past
  displayPastEnvironment() {

    background(255,248,220);

    fill(76,70,50)
    rect(0,height/3,width,2*height/3)
    noStroke();

    fill(139,69,19);

    beginShape();

    var x;
    for (x = 0; x < width; x++ ) {

      var noiseValue = noise( offset + x/100 );
      var noiseHeight = map( noiseValue, 0, 1, 0,height/3);

      vertex(x,noiseHeight);

    }

    vertex(width,height/3);
    vertex(0,height/3);

    endShape();

    fill(210,180,140);

    beginShape();

    var x;
    for (x = 0; x < width; x++ ) {

      var noiseValue = noise( offset + x/100 );
      var noiseHeight = map( noiseValue, 0, 1,height/5,height/3);

      vertex(x,noiseHeight);

    }

    vertex(width,height/3);
    vertex(0,height/3);

    endShape();

    stroke(0);

  }

  //display whole environment
  display() {

    if(this.character.inPresent) {
      if (this.character.changeTimeMeter > 90) {
        background(255);
        this.character.changeTime();
      }

      else {

        this.displayPresentEnvironment();

        this.character.display();
        this.item.display();

        this.checkPosition();

        if(this.character.timeIsStopped) {
          for(var i = 0; i < this.enemies.length; i++ ){
            this.enemies[i].stoppedAndDisplay();
            this.checkHits(i);
          }
        }
        else {
          for(var i = 0; i < this.enemies.length; i++ ){
            this.enemies[i].moveAndDisplay();
            this.checkHits(i);
          }


        }
      }

    }

    else if (this.character.changeTimeMeter > 90) {
      background(255);
      this.character.changeTime();
    }
    else {

      this.displayPastEnvironment();
      this.character.display();
      this.item.display();

      this.checkPosition();


    }
  }
}
