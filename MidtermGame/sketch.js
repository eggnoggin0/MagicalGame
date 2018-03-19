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

var bananas;

function preload() {

    //load images
    monkeyLeft = loadImage('images/monkeyLeft.png');
    monkeyRight = loadImage('images/monkeyRight.png');

    normalBatLeft = loadImage('images/normalBatLeft.png');
    normalBatRight = loadImage('images/normalBatRight.png');

    strongBatLeft = loadImage('images/strongBatLeft.png');
    strongBatRight = loadImage('images/strongBatRight.png');

    darkBatLeft = loadImage('images/darkBatLeft.png');
    darkBatRight = loadImage('images/darkBatRight.png');
    
    //bananas = loadImage();

}

function setup() {

    //create Canvas
    createCanvas(1000,500);

    noStroke();

    //Load Objects

    //character object
    character = new Character(width/2,height/2);

    //soldiers
    for(var i = 0; i < numEnemies; i++ ) {
        enemy = new Soldier(random(0,width),random(height/3 + 100,height - 100),'Normal',character);
        if(i > 1) { enemy.isAlive = false; }
        enemies[i] = enemy;
    }

    //environment object
    environment = new Environment(character,enemies);

    //pause screen object
    pauseScreen = new PauseScreen(environment);
}

function draw() {

    //check if paused
    if(pauseScreen.isPause) {
        pauseScreen.display();
        pauseScreen.checkPause();
    }
    else {
        environment.display();
        pauseScreen.checkPause();
    }
}
