//variables
var trex, trex_running;
var edges;
var suelo
var sueloimagen
var sueloinvisible
var nube, cargarnube
var cactus1
var cactus2
var cactus3, cactus4, cactus5, cactus6
var score = 0
var groupnubes
var groupobstaculos
var PLAY=1, OVER=0;
var gamestate = PLAY;
var trexover
var Gameoversprite
var Gameoverimage
var Restartsprite
var Restartimage
function preload(){ //cargan imagenes, sonidos y animaciones
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  sueloimagen = loadImage("ground2.png");
  cargarnube = loadImage("cloud.png")
  cactus1 = loadImage("obstacle1.png")
  cactus2 = loadImage("obstacle2.png")
  cactus3 = loadImage("obstacle3.png")
  cactus4 = loadImage("obstacle4.png")
  cactus5 = loadImage("obstacle5.png")
  cactus6 = loadImage("obstacle6.png")
  trexover = loadAnimation("trex_collided.png")
  Gameoverimage = loadImage("gameOver.png")
  Restartimage = loadImage("restart.png")
}

function setup(){ //creacion sprites y animaciones
  createCanvas(600,200)
sueloinvisible =createSprite(200, 190, 400, 10)
 sueloinvisible.visible =false
  //crear limites
  edges = createEdgeSprites();
  suelo = createSprite(150, 180, 400, 20);
  suelo.addImage("suelo",sueloimagen)
  //crear sprite del t-rex.
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("trex_corriendo", trex_running);
  trex.addAnimation("trexover", trexover)
  trex.scale = 0.5;
  trex.debug = false 
  trex.setCollider("circle",0,0,40)
  //crear grupos
  groupnubes = new Group ()
  groupobstaculos = new Group ()
  Gameoversprite = createSprite(300, 100)
  Gameoversprite.addImage(Gameoverimage)
  Restartsprite = createSprite(300, 150)
  Restartsprite.addImage(Restartimage)
  Restartsprite.scale = 0.6
}

function draw(){ //repite
  background("white");
  text("score" + score, 500, 40);

  if(gamestate === PLAY){
    score += Math.round(frameCount/60 )
  Gameoversprite.visible = false
  Restartsprite.visible = false
    if(keyDown("SPACE")&&trex.y>=150) {
      trex.velocityY = -12
    }

    trex.velocityY += 0.5;
    suelo.velocityX = -2

    if(suelo.x <= 0){
      suelo.x = 150;
    }

    dibujarnubes()
    dibujarobstaculos()   

    if(groupobstaculos.isTouching(trex)){
      gamestate = OVER
    }
  }
  if(gamestate === OVER) {
    suelo.velocityX = 0
    groupnubes.setVelocityXEach(0)
    groupobstaculos.setVelocityXEach(0)
    trex.changeAnimation("trexover", trexover)
    groupnubes.setLifetimeEach(-1)
    groupobstaculos.setLifetimeEach(-1)
    trex.velocityY = 0
    Gameoversprite.visible = true
    Restartsprite.visible = true
  }
  
     
     
  trex.collide(sueloinvisible);
  drawSprites();

}
function dibujarnubes(){
  if(frameCount%75 === 0){
    nube = createSprite (600, 100, 30, 10)
    nube.addImage("nube",cargarnube)
    nube.scale = Math.random()
    nube.y = Math.round(random(10, 100))
    nube.velocityX = -3
    nube.lifetime = 200
    nube.depth = trex.depth
    trex.depth += 1
    groupnubes.add(nube)
  }

}
function dibujarobstaculos(){
  if(frameCount%75 === 0){
    cactus = createSprite (600, 170, 10, 30)
    cactus.velocityX = -2
    numero = Math.round(random(1, 6))
    switch(numero){
      case 1:
        cactus.addImage(cactus1)
        cactus.scale = 0.35
        break;
      case 2:
        cactus.addImage(cactus2)
        cactus.scale = 0.35
        break;
      case 3:
        cactus.addImage(cactus3)
        cactus.scale = 0.35
        break;  
      case 4:
        cactus.addImage(cactus4)
        cactus.scale = 0.35
        break;
      case 5:
        cactus.addImage(cactus5)
        cactus.scale = 0.35
        break; 
      case 6:
        cactus.addImage(cactus6)
        cactus.scale = 0.30
        break;
      
    }
    cactus.lifetime = 300
    groupobstaculos.add(cactus)
  }
}