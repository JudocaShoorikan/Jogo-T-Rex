var trex, trex_running, edges, trex_collided;
var groundImage;
var chao;
var chao2;
var nuvem, nuvemImage;
var cacto;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6; 
var score = 0;
var cactoGroup, nuvemGroup;
var gameOver, restart, gameOverIMG, restartIMG;
const PLAY = 1, END = 0;
var gameState = PLAY;
var somGameOver, somJump, somCheckpoint;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  gameOverIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");
  somGameOver = loadSound("die.mp3")
  somJump = loadSound("jump.mp3")
  somCheckpoint = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  cactoGroup = new Group();
  nuvemGroup = new Group();

  gameOver = createSprite(width/2, height/2.3);
  gameOver.addImage(gameOverIMG)
  gameOver.scale = 0.7;
  gameOver.visible = 0;

  restart = createSprite(width/2, height/2);
  restart.addImage(restartIMG);
  restart.scale = 0.7;
  restart.visible = 0;
  
  chao2 = createSprite(200, height - 50, 400, 10);
  chao2.visible = 0; 
  trex = createSprite(width - 50, height - 50 , 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colisão", trex_collided)
  edges = createEdgeSprites();
  chao = createSprite(200, height - 60, 400, 20);
  
  trex.scale = 0.5;
  trex.x = 50
  chao.addImage("chao", groundImage);
  //trex.debug = 1;
  trex.setCollider("circle", 0, 0, 35);
  //trex.setCollider("rectangle", 0, 0, 400, trex.height);
}

function draw(){
  background("white");
  
  trex.collide(chao2);

  text("Pontuação:" + score, width - 100, 50)
  
  drawSprites();


  if(gameState == PLAY) {
    if((touches.length > 0 || keyDown("space")) && trex.y > height - 90){
      trex.velocityY = -9;
      somJump.play();
      touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.5;
    chao.velocityX = -3;

    if (chao.x <= 0){
      chao.x = chao.width/2;
    }
    
    score += Math.round(getFrameRate() /60.1)
    if (score %200 === 0 && score > 0) {
      somCheckpoint.play();
    }
    
    nuvens();
    cactos();

    if(trex.isTouching(cactoGroup)) {  
      gameState = END;
      somGameOver.play();
    }
  } 
  else {
    chao.velocityX = 0;
    nuvemGroup.setVelocityXEach(0);
    cactoGroup.setVelocityXEach(0);
    cactoGroup.setLifetimeEach(-1);
    nuvemGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    trex.changeAnimation("colisão", trex_collided);
    gameOver.visible = 1;
    restart.visible = 1;

    if(mousePressedOver(restart) || touches.length > 0) {
      reset();
      touches = [];
    }
  }
}

function nuvens() {
  if (frameCount %40 == 0){
    nuvem = createSprite(width, height + 100, 40, 10);
    nuvem.scale = 0.7;
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImage);
    nuvem.y = Math.round(random (height/2, height - 150));
    nuvem.depth = trex.depth
    trex.depth ++;
    nuvem.lifetime = width/3;
    nuvemGroup.add(nuvem);
  }
}

function cactos() {
  if (frameCount %50 == 0) {
    cacto = createSprite(width, height - 70, 10, 40);
    cacto.scale = 0.6;  
    cacto.velocityX = -(6 + score/100);

    var numero = Math.round(random (1, 6));
    cactoGroup.add(cacto);
    
    switch(numero) {
      case 1:
        cacto.addImage(cacto1);
        break;
      case 2:
        cacto.addImage(cacto2);
        break;
      case 3:
        cacto.addImage(cacto3);
        break;
      case 4:
        cacto.addImage(cacto4);
        break;
      case 5:
        cacto.addImage(cacto5);
        break;
      case 6:
        cacto.addImage(cacto6);
        break;      
    }
  
    cacto.lifetime = 240;
  }
}

function reset() {
  gameState = PLAY;
  score = 0;
  trex.changeAnimation("running", trex_running);
  gameOver.visible = 0;
  restart.visible = 0;
  nuvemGroup.destroyEach();
  cactoGroup.destroyEach();

}