//global variable
var trex,ground,groundImage,invisibleGround,cloudImage,cloudsGroup,score=0;
var trexPic,c1,c2,c3,c4,c5,c6,cactusGroup;
var edges;
var gravity = 3;
var play=1;
var gameState = play;
var end = 0;
var trexCollided;
var gameOver,reset;
var gameisOver,restart;
var die;
function preload(){
  trexPic=loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  c1=loadImage("obstacle1.png");
  c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  trexCollided=loadAnimation("trex_collided.png")
  gameOver=loadImage("gameOver.png");
  reset=loadImage("restart.png");
  die=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,200);
  
  trex = createSprite(40,150,50,50);
  trex.addAnimation("abc",trexPic);
  trex.addAnimation("Dead Trex",trexCollided);
  trex.scale=0.5
  //edges = createEdgeSprites();
  ground = createSprite(300,190,600,20);
  ground.addImage("abcd",groundImage);
  ground.x=ground.width/2;
  invisibleGround = createSprite(300,200,600,20);
  invisibleGround.visible=false;
  cloudsGroup = new Group();
  cactusGroup = new Group();
  gameisOver = createSprite(300,100);
  gameisOver.addImage("Game Over Pic",gameOver);
  gameisOver.scale=0.5;
  gameisOver.visible=false;
  restart = createSprite(300,150);
  restart.addImage("Reset Pic",reset);
  restart.scale=0.5;
  restart.visible=false;
}

function draw(){
  background(180);
    if(gameState == play){
        if(keyDown("space") && trex.collide(invisibleGround)){
          trex.velocityY=-20;    
        }
        trex.velocityY=trex.velocityY+gravity;
        ground.velocityX=-2;
        if(ground.x<0){
          ground.x=ground.width/2; 
        }
        spawnClouds();
        spawnObstacles();
       score = Math.round(getFrameRate() / 60)+score;
        if(trex.isTouching(cactusGroup)){
          gameState=end;
          die.play();
        }
  }
  else if(gameState==end){
    ground.velocityX=0;
    trex.changeAnimation("Dead Trex",trexCollided);
    cloudsGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    cactusGroup.setLifetimeEach(-1);
    gameisOver.visible=true;
    restart.visible=true;
  }  
   if(mousePressedOver(restart)){
    resetGame();
  }
 // trex.collide(edges[3]);
  
 
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds(){
 
  
  var remainder = frameCount % 100 ;
  
  if(remainder == 0){
    var clouds = createSprite(600,100,20,20);
    clouds.addImage("abcde",cloudImage);
    clouds.velocityX=-2;
    clouds.y=Math.round(random(0,150));
    //console.log(clouds.depth);
    trex.depth=clouds.depth+1;
    clouds.lifetime=300;
    cloudsGroup.add(clouds);
  }
}

function spawnObstacles(){
  
  var remainder2 = frameCount % 80 ;
  
  if(remainder2 == 0){
  var obstacles = createSprite(600,170,20,20);
  var r = Math.round(random(1,6));
    switch(r){
     case 1:obstacles.addImage("abcdef",c1);
        break;
     case 2:obstacles.addImage("obstacle2",c2);
        break;
     case 3:obstacles.addImage("obstacle3",c3);
        break;
     case 4:obstacles.addImage("obstacle4",c4);
        break;
     case 5:obstacles.addImage("obstacle5",c5);
        break;
     case 6:obstacles.addImage("obstacle6",c6); 
        break;
     default:break;   
    }
  //obstacles.setAnimation("obstacle"+r);
  obstacles.scale=0.5;
  obstacles.velocityX=-(5+score/100);
  obstacles.lifetime=120;
  cactusGroup.add(obstacles);
    
  }
  }
function resetGame(){
    gameState=play;
   // score=0;
    gameisOver.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    
    cloudsGroup.destroyEach();
    trex.changeAnimation("abc",trexPic);
  }