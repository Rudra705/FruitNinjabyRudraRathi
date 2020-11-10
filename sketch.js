var sword,swordimage,score,fruitgroup,enemygroup,fruit, fruit
var t1,fruit2,fruit3,fruit4,monster,alien1,alien2,
gameover,gameoverimage,fruitsound;
//gamestates
var PLAY=1;
var END=0;
var gamestate=1;

function preload(){
//loading images
swordimage=loadImage("sword.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
alien1=loadImage("alien1.png");
gameoverimage=loadImage("gameover.png");
fruitsound=loadSound("zapsplat_multimedia_game_sound_wood_brick_stack_001_57889.mp3");
gameoversound=loadSound("171200__robinhood76__03823-game-over.wav");
}

function setup() {
createCanvas(600,600);
 //creating sword
sword=createSprite(40,200,20,20);
sword.addImage("sword",swordimage);
sword.scale=0.7;
  
//creating groups
fruitgroup=createGroup();
enemygroup=createGroup();
  
//setting score value
score=0;
  
//creating gameover
gameover=createSprite(300,100,20,100);
gameover.addImage("gameover",gameoverimage);
gameover.visible=false;
gameover.scale=0.5;
  
}
function draw(){
//setting background
  background("cyan");
  
//giving text size
  textSize(20);
//displaying score
  text("SCORE : "+score,50,30);
  
//call fruits and enemy fnction
fruits();
enemy();

  //move sword with mouse in gamestate play
  if(gamestate===PLAY){
    touches = [];
          }
//increase score and destroy fruitgroupif fruitgroup is touching sword 
if(fruitgroup.isTouching(sword)){
  fruitgroup.destroyEach();
  fruitsound.play();
  score=score+2;
          }
//change the image of sword to game over and reset its position 
if(gamestate===END){
  sword.addImage("gameover",gameoverimage);
  gameover.visible=true;
  gameover.scale=1;
  fruitgroup.destroyEach();
  enemygroup.destroyEach();
  sword.x=300;
  sword.y=300;
  fruitgroup.setVelocityEach(0);
  enemygroup.setVelocityEach(0);
}
if(enemygroup.isTouching(sword)){
  gamestate=END;
  gameoversound.play();
}
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
//fruit.debug=true;
    r=Math.round(random(1,4));
if(r==1){
    fruit.addImage("fruit",fruit1);
} else if(r==2){
    fruit.addImage("fruit",fruit2);
} else if(r==3){
    fruit.addImage("fruit",fruit3);
}else{
    fruit.addImage("fruit",fruit4);
}
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    position=Math.round(random(1,2));
if(position==1){
  fruit.x=400;
  fruit.velocityX=-(7+(score/4));
}
else
{
if(position==2){
fruit.x=0;
fruit.velocityX=(7+(score/4));
  }
              }
fruitgroup.add(fruit);

          }
}
function enemy(){
if(World.frameCount%200===0){
  monster=createSprite(400,200,20,20);
  monster.addAnimation("monster",alien1);
  monster.y=Math.round(random(100,300));
  monster.velocityX=-(8+(score/10));
  monster.setLifetime=50;
  enemygroup.add(monster);
}
}
