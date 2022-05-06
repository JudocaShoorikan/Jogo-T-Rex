var trex, trex_running, edges;
var groundImage;
var chao;
var chao2;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  chao2 = createSprite(200, 190, 400, 10);
  chao2.visible = 0; 
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  chao = createSprite(200, 180, 400, 20);
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao.addImage("chao", groundImage);
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space") && trex.y > 145){
    trex.velocityY = -8.5;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  chao.velocityX = -2
  
  if (chao.x <= 0){
    chao.x = chao.width/2;
  }

 //impedir que o trex caia
  trex.collide(chao2);
  drawSprites();
}