var trex, trex_running, edges;
var groundImage;
var chao;
var chao2;
var nuvem, nuvemImage;
var cacto;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6; 
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600, 200);
  
  //criando o trex
  chao2 = createSprite(200, 190, 400, 10);
  chao2.visible = 0; 
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  chao = createSprite(200, 180, 400, 20);
  
  trex.scale = 0.5;
  trex.x = 50
  chao.addImage("chao", groundImage);
}

function draw(){
  background("white");
  
  if(keyDown("space") && trex.y > 145){
    trex.velocityY = -8.5;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  chao.velocityX = -3;
  
  if (chao.x <= 0){
    chao.x = chao.width/2;
  }

  trex.collide(chao2);

  text("Pontuação:" + score, 500, 50)
  score += Math.round(frameCount /60)
  drawSprites();
  nuvens();
  cactos();
}

function nuvens() {
  if (frameCount %40 == 0){
    nuvem = createSprite(600, 100, 40, 10);
    nuvem.scale = 0.7;
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImage);
    nuvem.y = Math.round(random (10, 100));
    nuvem.depth = trex.depth
    trex.depth ++;
    nuvem.lifetime = 240;
  }
}

function cactos() {
  if (frameCount %50 == 0) {
    cacto = createSprite(610, 165, 10, 40);
    cacto.scale = 0.6;  
    cacto.velocityX = -6;
    var numero = Math.round(random (1, 6));
    
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