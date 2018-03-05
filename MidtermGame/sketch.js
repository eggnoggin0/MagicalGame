//Variables
var enemies = [];
var numEnemies = 10;
var offset = 0;
var randomRects = [];
var rectColors = [];

//images
var monkeyLeft;
var monkeyRight;

var normalBatLeft;
var normalBatRight;

var strongBatLeft;
var strongBatRight;

var darkBatLeft;
var darkBatRight;

function preload() {

    monkeyLeft = loadImage('images/monkeyLeft.png');
    monkeyRight = loadImage('images/monkeyRight.png');

    normalBatLeft = loadImage('images/normalBatLeft.png');
    normalBatRight = loadImage('images/normalBatRight.png');

    strongBatLeft = loadImage('images/strongBatLeft.png');
    strongBatRight = loadImage('images/strongBatRight.png');

    darkBatLeft = loadImage('images/darkBatLeft.png');
    darkBatRight = loadImage('images/darkBatRight.png');

}

function setup() {
    createCanvas(1000,500);

    noStroke();

    character = new Character(width/2,height/2);

    for(var i = 0; i < numEnemies; i++ ) {
        enemy = new Soldier(random(0,width),random(height/3 + 100,height - 100),'Normal',character);
        if(i > 1) { enemy.isAlive = false; }
        enemies[i] = enemy;
    }

    environment = new Environment(character,enemies);

    for(var j = 0; j < 20; j++) {
        rectColors[j] = [random(0.9,1.1),random(0.9,1.1),random(0.9,1.1)];
        randomRects[j] = [random(0,width),random(height/3,height),random(10,width/2),random(10,height/2)];
    }

    pauseScreen = new PauseScreen(environment);
}

function draw() {

    if(pauseScreen.isPause) {
        pauseScreen.display();
        pauseScreen.checkPause();
    }
    else {
        environment.display();
        pauseScreen.checkPause();
    }
}

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

class Projectiles {

    constructor(x,y,direction) {

        //Position
        this.xPos = x;
        this.yPos = y;

        this.direction = direction;

        //Movement
        this.xSpeed = 4;
        this.ySpeed = 4;

        //size
        this.size = 5;

        this.inDisplay = true;

    }

    move() {

        if(this.direction == 'N') { this.yPos -= this.ySpeed; this.xPos += random(-1,1); }
        if(this.direction == 'S') { this.yPos += this.ySpeed; this.xPos += random(-1,1); }
        if(this.direction == 'E') { this.xPos += this.xSpeed; this.yPos += random(-1,1); }
        if(this.direction == 'W') { this.xPos -= this.xSpeed; this.yPos += random(-1,1); }

    }

    checkPosition() {
        if(this.xPos < 0 || this.xPos > width || this.yPos < 0 || this.yPos > height) {
            this.inDisplay = false;
        }
    }

    display() {

        fill(random(0.5,1)*255,random(0.5,1)*255,0);
        ellipse(this.xPos,this.yPos,this.size,this.size);

        this.move();
        this.checkPosition();

    }

}

class Fire {

    constructor(x,y,direction) {

        //Position
        this.xPos = x;
        this.yPos = y;

        this.startX = x;
        this.startY = y;

        this.direction = direction;

        //Movement
        this.xSpeed = random(-1,1);
        this.ySpeed = random(-1,1);
        this.angleSpeed = 5;
        this.angle = random(0,2*PI);

        //size
        this.size = 10;

        this.surviveTime = 100;

        this.inDisplay = true;

    }

    move() {

        /*push();

    noStroke();

    translate(this.xPos, this.yPos);
    rotate(radians(this.angle));
    fill(255*random(0.5,1),0,0);
    ellipse(20,0,20,20);
    ellipse(-20,0,20,20);

    pop();*/

        fill(255*random(0.5,1),0,0);
        ellipse(this.xPos,this.yPos,this.size,this.size);
        //ellipse(-20,0,20,20);

        //this.angle += this.angleSpeed;
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;

        this.surviveTime -= 1;

        /*if(this.direction == 'N') { this.yPos -= this.ySpeed; this.xPos += random(-1,1); }
    if(this.direction == 'S') { this.yPos += this.ySpeed; this.xPos += random(-1,1); }
    if(this.direction == 'E') { this.xPos += this.xSpeed; this.yPos += random(-1,1); }
    if(this.direction == 'W') { this.xPos -= this.xSpeed; this.yPos += random(-1,1); }*/

    }

    checkPosition() {
        if(dist(this.xPos, this.yPos, this.startX, this.startY) > 50 || this.surviveTime == 0) {
            this.inDisplay = false;
        }
    }

    display() {

        this.move();
        this.checkPosition();

    }

}

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

    }


    //attacks

    fireProjectile() {

        if(this.version == 'Normal') {

            if( this.yPos < this.character.yPos + 20  && this.yPos > this.character.yPos - 20) {
                if( this.character.xPos < this.xPos && this.direction == 'W' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

                }
                if( this.character.xPos > this.xPos && this.direction == 'E' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

                }
            }

        }

        if(this.version == 'Strong') {

            if( this.yPos < this.character.yPos + 20  && this.yPos > this.character.yPos - 20) {
                if( this.character.xPos < this.xPos && this.direction == 'W' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

                }
                if( this.character.xPos > this.xPos && this.direction == 'E' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

                }
            }

        }

        if(this.version == 'Dark') {

            if( this.yPos < this.character.yPos + 20  && this.yPos > this.character.yPos - 20) {
                if( this.character.xPos < this.xPos && this.direction == 'W' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

                }
                if( this.character.xPos > this.xPos && this.direction == 'E' ) {

                    this.projectiles[0].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[1].setProjectile(this.xPos,this.yPos,this.direction);
                    this.projectiles[2].setProjectile(this.xPos,this.yPos,this.direction);
                    //this.projectiles[0].display();

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

            ellipse(this.xPos, this.yPos, this.sizeX, this.sizeY);

        }

    }
}

class MagicItems {

    constructor(x,y,character) {

        this.xPos = x;
        this.yPos = y;
        this.size = 10;

        this.character = character;

        this.identity = random(['Magic', 'Health']);

        this.magicRevive = 10;
        this.healthRevive = 10;

        this.exist = false;
    }

    reviveMagic() { this.character.magicMeter += this.magicRevive; }
    reviveHealth() { this.character.health += this.healthRevive; }

    useItem() {
        if(dist(this.character.xPos, this.character.yPos, this.xPos, this.yPos) < this.size ) {
            if(this.identity == 'Magic') { this.reviveMagic() }
            if(this.identity == 'Health') { this.reviveHealth() }
            this.exist = false;
            this.xPos = random(0,width);
            this.yPos = random(height/3,height);
        }
    }

    display() {
        if(this.exist) {
            if(this.identity == 'Magic') {
                fill('green');
                ellipse(this.xPos, this.yPos, this.size, this.size);
            }
            if(this.identity == 'Health') {
                fill('blue');
                ellipse(this.xPos, this.yPos, this.size, this.size);
            }
            this.useItem();
        }

    }


}

class DarkProjectile {

    constructor() {

        //Position
        this.xPos = 0;
        this.yPos = 0;

        this.startX = 0;
        this.startY = 0;

        this.direction = 'E';

        this.ySpeed = random(-1,1);
        this.angleSpeed = 5;
        this.angle = random(0,2*PI);

        //size
        this.size = 10;
        this.grow = false;

        this.surviveTime = 100;

        this.inDisplay = false;

        this.projectileTimeLimit = 50;
        this.projectileTime = 0;

    }

    setProjectile(x,y,direction) {

        if(this.inDisplay == false) {

            this.projectileTime = this.projectileTimeLimit;

            this.xPos = x;
            this.yPos = y;

            this.direction = direction;

            //Movement

            if(this.direction == 'W') { this.xSpeed = -3; }
            if(this.direction == 'E') { this.xSpeed = 3; }

            console.log(this.xSpeed);

            this.inDisplay = true;

        }

    }

    changeSize() {

        if(this.size < 50 && this.grow) { this.size++; }
        else if(this.size == 50) { this.grow = false; this.size--; }
        else if(this.size > 10 && this.grow == false ) { this.size--; }
        else if(this.size == 10) { this.grow = true; this.size++; }

    }

    move() {

        fill(0);

        this.changeSize();

        ellipse(this.xPos,this.yPos,this.size,this.size);

        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;

    }

    checkPosition() {
        if(this.xPos < 0 || this.xPos > width) {
            this.inDisplay = false;
        }
    }

    display() {

        if(this.inDisplay) {
            this.move();
            this.checkPosition();
        }
    }
}
