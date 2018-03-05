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
