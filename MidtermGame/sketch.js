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

  normalBatLeft = loadImage('images/normalbatLeft.png');
  normalBatRight = loadImage('images/normalbatRight.png');

  strongBatLeft = loadImage('images/strongbatLeft.png');
  strongBatRight = loadImage('images/strongbatRight.png');

  darkBatLeft = loadImage('images/darkBatLeft.png');
  darkBatRight = loadImage('images/darkBatRight.png');

  bananaImage = loadImage('images/food.png');

  //load sounds
  changeTimelines = loadSound('sounds/ChangeTimelines.mp3');
  explodeFire = loadSound('sounds/ExplodeFire.mp3');
  shootElectricity = loadSound('sounds/ShootElectricity.mp3');
  stopTime = loadSound('sounds/StopTime.mp3');
  teleport = loadSound('sounds/Teleport.mp3');

}

function setup() {

  //create Canvas
  createCanvas(1000,500);

  noStroke();

  //Load Object

  //pause screen object
  pauseScreen = new PauseScreen();
  pauseScreen.createEnvironment();

}

function draw() {

  pauseScreen.display();

}
