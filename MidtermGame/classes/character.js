class Character {

    //
    constructor(x,y) {

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

        //meters
        this.magicLimit = 250;
        this.magicMeter = this.magicLimit;

        this.health = 100;

        //weapons

        this.projectiles = [];

        this.fireLimit = 100;
        this.fireTime = 0;
        this.fireArray = [];

        this.timeIsStopped = false;
        this.stoppedTimeLimit = 1000;
        this.timeLimit = 0;

        this.teleportLength = 150;
        this.teleportLimit  = 100;
        this.teleportTime   = 0;

        this.teleportDirection = 'N';

        this.inPresent = true;
        this.changeTimeLimit = 100;
        this.changeTimeMeter = 0;

    }

    //movement
    moveLeft()  { this.teleportDirection = 'W'; this.direction = 'W'; this.xPos -= this.xSpeed; }
    moveRight() { this.teleportDirection = 'E'; this.direction = 'E'; this.xPos += this.xSpeed; }
    moveUp()    { this.teleportDirection = 'N'; this.yPos -= this.ySpeed; }
    moveDown()  { this.teleportDirection = 'S'; this.yPos += this.ySpeed; }

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

    }

    //attacks
    fireProjectile() {

        if(this.magicMeter > 0.1) {
            if(keyIsDown(78)) {
                var temp = new Projectiles(this.xPos,this.yPos,this.direction);
                this.projectiles.push(temp);
                this.magicMeter -= 0.1;
            }
        }

    }

    createFire() {

        if(this.fireTime == 0) {
            if(this.magicMeter > 10) {

                if(keyIsDown(66)) {
                    this.fireTime = this.fireLimit;
                    this.magicMeter -= 10;
                    for(var i = 0; i < this.fireLimit; i++ ){
                        if(this.direction == 'W') { var temp = new Fire(this.xPos - 100,this.yPos,this.direction); }
                        if(this.direction == 'E') { var temp = new Fire(this.xPos + 100,this.yPos,this.direction); }

                        this.fireArray.push(temp);
                    }
                }
            }
        }
        else {
            this.fireTime--;
        }

    }

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
    useAttacks() {
        this.fireProjectile();
        this.createFire();
        this.stopTime();
        this.checkTime();
        this.teleport();
        this.changeTime();
    }

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

    displayElectricity() {
        for(var i = 0; i < this.projectiles.length; i++ ){
            this.projectiles[i].display();
            if(this.projectiles[i].inDisplay == false) {
                this.projectiles.splice(i,1);
            }
        }
    }
    displayFire() {
        for(var i = 0; i < this.fireArray.length; i++ ){
            this.fireArray[i].display();
            if(this.fireArray[i].inDisplay == false) {
                this.fireArray.splice(i,1);
            }
        }
    }

    displayAttacks() {
        this.displayFire();
        this.displayElectricity();

    }
    display() {

        if(this.direction == 'W') { this.currentImage = this.imageLeft; }
        if(this.direction == 'E') { this.currentImage = this.imageRight; }

        imageMode(CENTER)

        image(this.currentImage,this.xPos, this.yPos, this.sizeX, this.sizeY);
        this.displayMeters();
        this.movePosition();
        this.useAttacks();
        this.displayAttacks();

    }
}