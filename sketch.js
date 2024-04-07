var nave, fondo1, fondo2, fondoV, kars, met, limiteIzq, limiteDer, energy, barra, reiniciar
var naveAMT, naveIMG, naveD, naveI, fondoIMG, fondo2IMG, fondo3IMG, karsIMG, met1IMG, met2IMG, met3IMG,mer4IMG, energyIMG
var puntuacion 
var energyCount = 1200
var end = 0
function preload(){
fondoIMG = loadImage("./imagenes/espacio.jpg")
fondo2IMG = loadImage("./imagenes/espacio2.jpg")
fondo3IMG = loadImage("./imagenes/espacio3.webp")
fondo3IMG = loadImage("./imagenes/espacio4.webp")
fondoVIMG = loadImage("./imagenes/fondoV.jpg")
karsIMG = loadImage("./imagenes/kars.png")
met1IMG = loadImage("./imagenes/met1.png")
met2IMG = loadImage("./imagenes/met2.png")
met3IMG = loadImage("./imagenes/met3.png")
met4IMG = loadImage("./imagenes/met4.png")
energyIMG = loadImage("./imagenes/energy.png")
naveIMG = loadImage("./imagenes/nave.png")
naveD = loadAnimation("./imagenes/naveD.png", "./imagenes/naveD.png", "./imagenes/naveD.png")
naveI = loadAnimation("./imagenes/naveI.png", "./imagenes/naveI.png", "./imagenes/naveI.png")
naveAMT = loadAnimation("./imagenes/nave.png","./imagenes/nave.png","./imagenes/nave.png",
 "./imagenes/nave2.png","./imagenes/nave2.png","./imagenes/nave2.png","./imagenes/nave3.png",
  "./imagenes/nave3.png", "./imagenes/nave3.png","./imagenes/nave2.png","./imagenes/nave2.png",
  "./imagenes/nave2.png")
naveAMT.playing = true;
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 fondo1 = createSprite(2450,500)
 fondo1.addImage(fondoIMG)
 fondo1.scale = 5.2
 
 fondo2 = createSprite(2450,2450)
 fondo2.addImage(fondoIMG)
 fondo2.scale = 5.2
 
 nave = createSprite(2400,2000)
 nave.addImage(naveIMG)
 nave.addAnimation('fuego', naveAMT)
 nave.addAnimation('Derecha', naveD)
 nave.addAnimation('Izquierda', naveI)
 nave.scale=0.4
 limiteIzq = createSprite(200,2000,10,3000)
 limiteIzq.visible = false;
 limiteDer = createSprite(5000,2000,10,3000)
 limiteDer.visible = false;
metGroup = new Group();
energyGroup = new Group();
}
function fondo(){
  if (end === 0){
    fondo1.velocityY = 5
  
    }
    else{
      fondo1.velocityY = 0
    }
    if (end === 0){
      fondo2.velocityY = 5
      fondo1.destroy();
      }
      else{
        fondo2.velocityY = 0
      }
  if (frameCount >= 1500){
   fondo1.addImage(fondo2IMG)
   fondo2.addImage(fondo2IMG)
   fondo1.scale = 10
   fondo2.scale = 10
  }
  if (frameCount >= 3000){
   fondo1.addImage(fondo3IMG)
   fondo2.addImage(fondo3IMG)
   fondo1.scale = 22
   fondo2.scale = 22
  }
  if (frameCount >= 4998){
  fondo1.addImage(fondo4IMG)
    fondo2.addImage(fondo4IMG)
    fondo1.scale = 10
    fondo2.scale = 10
  }
  if (end === 2){
 fondo1.addImage(fondoVIMG)
 fondo1.scale = 20;
 fondo2.addImage(fondoVIMG)
 fondo2.scale = 20;
  }
}

function crearKars(){
  if (frameCount % 1000 === 0){
  kars = createSprite(Math.round(random(0,4800)),0);
  kars.addImage(karsIMG);
  kars.lifetime=100;
  kars.velocityY=30;
  kars.velocityX=15;
  if(kars.x > 2400){
    kars.velocityX = -15;
  }
  kars.scale=0.7;
  metGroup.add(kars);
}
}
function reduceEnergy(){
  if (frameCount % 1 === 0){
    energyCount = energyCount - 1;
  }
}
function crearEnergy(){
  if (frameCount % 300 === 0 && end === 0){
 energy = createSprite(Math.round(random(300,4800)),0)
 energy.setCollider('circle',0,0,300)
 energy.addImage(energyIMG)
 energy.lifetime = 150;
 energy.velocityY = 20;
 energy.scale = 0.7;
 //energy.debug = true;
 energyGroup.add(energy);
}
}
function crearMet() {
  if(frameCount % 30 === 0 && end === 0) {
   var met = createSprite(Math.round(random(0,4800)));
   met.setCollider('circle',0,0,300)
  // met.debug = true
  metGroup.add(met);
    met.velocityY = 50
    if (puntuacion > 1500 && puntuacion < 3000){
      met.velocityY = 75;
    }
    if (puntuacion > 3000 && puntuacion < 5000){
      met.velocityY = 100;
      met.velocityX = 40
      if(met.x > 1200){
        met.velocityX = -40;
      }
    }
    met.velocityX = 20
    if(met.x > 1200){
      met.velocityX = -20;
    }
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: met.addImage(met1IMG);
              break;
      case 2: met.addImage(met2IMG);
              break;
      case 3: met.addImage(met3IMG);
              break;
      case 4: met.addImage(met4IMG);
              break;
      default: break;
    }
  }

}

function moverNave(){
  nave.changeAnimation('fuego')
  if (keyDown(RIGHT_ARROW)&& energyCount > 0){
  nave.x=nave.x + 30
  nave.changeAnimation('Derecha')
  }
  if (keyDown(LEFT_ARROW) && energyCount > 0){
  nave.x=nave.x - 30
  nave.changeAnimation('Izquierda')
    }
}

function añadirPuntuacion(){
 if (end === 0){
    puntuacion = frameCount
   }
  }
function draw() {
 background(0);
 drawSprites();
 if (fondo1.y > 1100){
   fondo1.y = fondo1.width/2;
 }
 if (fondo2.y > 1100){
   fondo2.y = 0;
 }
 nave.setCollider('circle',0,0,300)
 nave.collide(limiteIzq)
 nave.collide(limiteDer)
// nave.debug=true;
 if (nave.isTouching(metGroup)){
  nave.destroy();
  end = 1;
 }
if (nave.isTouching(energyGroup)){
  energyCount = energyCount + 350;
  energy.destroy();
 }

 if (energyCount < 0){
end = 1;
 }
 if  (end === 1){
  fondo1.velocityY = 0;
  fondo2.velocityY = 0;
 }
 if(end === 1){
  textSize(150)
  fill("red")
  text("juego "+""+"terminado", 1800,1200)
  textSize(150)
  fill("red")
  text("puntaje "+""+"final: "+""+puntuacion, 1800,500)
 }
 if(puntuacion > 1000 && puntuacion < 1100){
  textSize(150)
  fill("green")
  text("1000"+""+"puntos", 1800,1200)
 }
 if(puntuacion > 2000 && puntuacion < 2100){
  textSize(150)
  fill("green")
  text("2000"+""+"puntos", 1800,1200)
 }
 if(puntuacion > 3000 && puntuacion < 3100){
  textSize(150)
  fill("green")
  text("3000"+""+"puntos", 1800,1200)
 }
 if(puntuacion > 4000 && puntuacion < 4100){
  textSize(150)
  fill("green")
  text("4000"+""+"puntos", 1800,1200)
 }
 if(puntuacion > 4999 && puntuacion < 5100){
  textSize(150)
  fill("blue")
  text("felicidades "+""+" ganaste!!!!!", 1800,1200)
  end = 2
 }
 if (end === 0){
 textSize(150)
 fill("purple")
 text("puntaje "+""+puntuacion,250,250)
 }
 if (end === 0){
  textSize(150)
  fill("purple")
  text("energia "+""+energyCount,250,500)

  }
 fondo();
 crearKars();
 crearMet();
 crearEnergy();
 moverNave();
 añadirPuntuacion();
 reduceEnergy();
}