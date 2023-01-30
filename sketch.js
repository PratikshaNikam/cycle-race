var game,player,form;
var track,trackImage;
var playerCount,allPlayers;
var database,gameState;
var grassImage;
var road1,road2;
var player1,player2;
var player1Img,player2Img;
var players=[];
var powerCoins;
var coinImage,car1Img,car2Img,heartImage,heart1,heart2,heart3;
var carsGroup,heartsGroup;
var bgSound, coinEarnSound,gameWon,enroll,gameLose;


function preload(){
trackImage=loadImage("./assets/track.jpg");
bg=loadImage("./assets/background.png")
grassImage=loadImage("./assets/grass.png")
player1Img=loadAnimation("./assets/cycle1.png","./assets/cycle2.png","./assets/cycle3.png")
player2Img=loadAnimation("./assets/cycleRed1.png","./assets/cycleRed2.png","./assets/cycleRed3.png")
coinImage=loadAnimation("./assets/coin1.png","./assets/coin2.png","./assets/coin3.png","./assets/coin4.png","./assets/coin5.png","./assets/coin6.png");
car1Img=loadImage("./assets/car1.png");
car2Img=loadImage("./assets/car2.png");
heartImage=loadImage("./assets/heart.png");
bgSound=loadSound("./assets/bgSound.mp3");
coinEarnSound=loadSound("./assets/coinEarn.wav")
enroll=loadSound("./assets/enroll.wav");
gameWon=loadSound("./assets/gameWon.wav");
gameLose=loadSound("./assets/gameLose.wav")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  game= new Game();
  game.getState();
  
  
  game.start();
 
  
  
  
}

function draw() {
 
  
  if (gameState===0){
    background(bg)
    image(bg,0,0,width,height);
  }
  
  if (playerCount ===2) {
    game.updateState(1);
  }

  if (gameState ===1) {
    background(grassImage); 
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    //game.end();
  }
  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}