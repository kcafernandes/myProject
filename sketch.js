var bgImage;
var ghost1, ghost2, ghost3;
var ghost1Img, ghost2Img, ghost3Img;
var mc;
var mcImg;
var ghost1Group, ghost2Group, ghost3Group;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var border;
var gameOver;
var score = 0;


function preload(){
  bgImage = loadImage("background.PNG");
  ghost1Img = loadImage("ghost1.png");
  ghost2Img = loadImage("ghost2.png");
  ghost3Img = loadImage("ghost3.png");
  mcImg = loadAnimation("mc.PNG","mc2.PNG","mc3.PNG");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1050, 750);
  backgr=createSprite(0,0,1050,750);
  backgr.addImage(bgImage);
  backgr.scale= 2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  mc = createSprite(100,500, 10,10);
  mc.addAnimation("mc", mcImg);
  mc.scale = 0.28;
  
  ghost1Group = createGroup();
  ghost2Group = createGroup();
  ghost3Group = createGroup();
  
  border = createSprite(10,60, 1050,300);
  border.visible = false;
  
  gameOver = createSprite(530,340);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.4;
}


function draw() {
  background(255);
  edges = createEdgeSprites();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  
  
  if(gameState === PLAY){
    mc.y = mouseY;
    mc.collide(edges);
    createGhost3();
    createGhost2();
    createGhost1();
    gameOver.visible = false;
    
    if(ghost1Group.isTouching(mc)){
      mc.destroy();
      gameState = END;
    }
    if(ghost2Group.isTouching(mc)){
      mc.destroy();
      gameState = END;
    }
    if(ghost3Group.isTouching(mc)){
      mc.destroy();
      gameState = END;
    }
  }
  if(gameState === END){
    backgr.velocityX=0;
    mc.destroy();
    ghost1Group.setVelocityXEach(0);
    ghost2Group.setVelocityXEach(0);
    ghost3Group.setVelocityXEach(0);
    gameOver.visible = true;
  }
  mc.collide(border);
  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY)
}

function createGhost1(){
  if(frameCount % 200 == 0){
    ghost1 = createSprite(800,Math.round(random(300,600)),10,10);
    ghost1.addImage(ghost1Img);
    ghost1.velocityX = -4;
    ghost1.scale = 0.13;
    ghost1Group.add(ghost1);
  }
}

function createGhost2(){
  if(frameCount % 600 == 0){
    ghost2 = createSprite(800,Math.round(random(300,600)),10,10);
    ghost2.addImage(ghost2Img);
    ghost2.velocityX = -3;
    ghost2.scale = 0.07;
    ghost2Group.add(ghost2);
  }
}

function createGhost3(){
  if(frameCount % 800 == 0){
    ghost3 = createSprite(800,Math.round(random(300,600)),10,10);
    ghost3.addImage(ghost3Img);
    ghost3.velocityX = -2;
    ghost3.scale = 0.1;
    ghost3Group.add(ghost3);
  }
}
