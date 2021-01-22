var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerI,playerJumpI;
var ground, invisibleGround, groundImage;

var score = 0;

var fireBallsGroup, FireBall,fireBallI;
var enemiesGroup, enemy;

function preload(){
  playerI =   loadImage("sprites/player.png");
  
  groundImage = loadImage("sprites/ground.png");
  
  fireBallI = loadImage("sprites/fireBall.png");
  
  enemyI = loadImage("sprites/enemy.png");
  
  playerJumpI = loadImage("sprites/player_jump.png");
}

function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  
  player.addImage("normal", playerI);
  player.addImage("jump", playerJumpI);
  player.scale = 5;
  player.changeImage(playerI);

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -30;
  ground.scale = 2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  fireBallsGroup = new Group();
  enemiesGroup = new Group();

  player.setCollider("circle", 0,0,5);
}

function draw() {
  //player.debug = true;
  background(255,255,255);
  
  if (gameState===PLAY){
    ground.velocityX = -30;
  
    if(keyDown("space") && player.y >= 150) {
      player.velocityY = -15    ;
      player.changeImage(playerJumpI);
    }
    textSize(10);
    text("score = " + score, 50,10);

if(frameCount% 10 === 0){
  score = score+1;
}
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnFireBalls();
    spawnEnemies();
  
    if(enemiesGroup.isTouching(player) || fireBallsGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    player.visible = false;
    textSize(30);
    stroke("red");
    strokeWeight = 100;
    text("shoot you were killed", 200,150);
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    enemiesGroup.setVelocityXEach(0);
    fireBallsGroup.setVelocityXEach(0);
  
    

    //set lifetime of the game objects so that they are never destroyed
    enemiesGroup.setLifetimeEach(-1);
    fireBallsGroup.setLifetimeEach(-1);
  }
  ground.depth = player.depth-1
  drawSprites();
}

function spawnFireBalls() {
  //write code here to spawn the clouds
  if (frameCount % 170 === 0) {
    var fireball
    fireBall = createSprite(600,120,1,1);
    //fireBall.positionY = player.positionY;
    fireBall.y = Math.round(random(80,120));
    fireBall.addImage(fireBallI);
    fireBall.scale = 5;
    fireBall.velocityX = -15;
    
fireBall.setCollider("circle",0,0,2);

    //fireBall.debug = true;

     //assign lifetime to the variable
    fireBall.lifetime = 20000000;
    
    //adjust the depth
    fireBall.depth = player.depth;
    player.depth = player.depth + 1;
    ground.depth = player.depth - 1;

    //add each cloud to the group
    fireBallsGroup.add(fireBall);
  }
  
}

function spawnEnemies() {
  if(frameCount % 60 === 0) {
    var enemy = createSprite(600,150,5,5);
    //enemy.debug = true;
    enemy.velocityX = -10;

    enemy.setCollider("circle", 0,0,5);

    enemy.addImage(enemyI)

    //assign scale and lifetime to the obstacle           
    enemy.scale = 5;
    enemy.lifetime = 300;
    //add each obstacle to the group
    enemiesGroup.add(enemy);
  }
}