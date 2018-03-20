class Environment {

    //
    constructor() {

        //
        this.noiseValue = 0;
        this.noiseScale = 0.02;

        //
        this.item = new MagicItems(random(0,width),random(height/3,height),this.character);
        this.itemIndex = 0;

        //character object
        this.character = new Character(width/2,height/2);

        //soldiers

        this.nightEnemy = new Soldier(width/2,height/2,'Dark',this.character);
        this.nightEnemy.isAlive = true;

        this.enemies = [];
        for(var i = 0; i < numEnemies; i++ ) {
            this.enemies[i] = new Soldier(random(0,width),random(height/3 + 100,height - 100),'Normal',this.character);
            if(i > 0) { this.enemies[i].isAlive = false; }
        }

        this.screenNum = 9;

        this.endGoal = new EndGoal(this.character);

    }

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

    checkNightHits() {

        //enemy hitting character, enemy is invincible
        for(var i = 0; i < this.nightEnemy.projectiles.length; i++) {
            if(this.nightEnemy.projectiles[i].checkHits(this.character)) {
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
                    if( i <= 3 ) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Normal',true); }
                    else if( i > 3 && i <=6 ) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Strong',true); }
                    else if( i > 6 ) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Dark',true); }
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

        this.endGoal.checkEnd(this.screenNum);

    }

    //change environment to past
    displayPastEnvironment() {

        background(19,24,98);

        fill(135,136,156)
        rect(0,height/3,width,2*height/3)
        noStroke();

        fill(46,68,130);

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

        fill(190,169,222);

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

            this.nightEnemy.moveAndDisplay();
            this.checkNightHits();

            this.checkPosition();

        }

        //display controls
        fill(0);
        textSize(20);
        textAlign(LEFT);

        text('I: stop time  L: teleport  J: shoot electricity  K: explode fire  O: change timelines', 10, 20);
    }
}
