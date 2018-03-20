//Variables
var enemies = [];
var numEnemies = 15;
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

var bananaImage;

//sounds
var changeTimelines;
var explodeFire;
var shootElectricity;
var stopTime;
var teleport;

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

<<<<<<< HEAD
    bananaImage = loadImage('images/food.png');
=======
    //bananas = loadImage();
>>>>>>> origin/master

    //load sounds
    changeTimelines = loadSound('sounds/ChangeTimelines.mp3');
    explodeFire = loadSound('sounds/ExplodeFire.mp3');
    shootElectricity = loadSound('sounds/ShootElectricity');
    stopTime = loadSound('sounds/StopTime');
    teleport = loadSound('sounds/Teleport');

}

function setup() {

    //create Canvas
    createCanvas(1000,500);

    noStroke();

    //Load Objects

    //environment object
    environment = new Environment();

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
        //image(bananaImage,width/2,height/2,100,100);
        pauseScreen.checkPause();
    }
}
