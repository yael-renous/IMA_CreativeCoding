const numOfCutouts=15;
const neonColors = ['#FF00FF','#39FF14','#FFFF33','#00FFFF','#FF9933','#FF1493','#7FFF00','#00FF00','#00CED1','#FF4500','#DA70D6','#40E0D0','#EE82EE','#FFD700'];
let cutouts = [];
let images=[];
let windowPadding=100;
let paddedCanvasWidth;
let paddedCanvasHeight;

let draggingCutout=null;
let tintColor;

function preload() {
  images.push(loadImage('me@0.33x.png'));
  images.push(loadImage('luli@0.33x.png'));
  images.push(loadImage('kai@0.33x.png'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddedCanvasWidth =  width-windowPadding;
  paddedCanvasHeight =  height-windowPadding;

  tintColor=random(neonColors);
  background(random(neonColors));
  resizeImages();
  createCutouts(numOfCutouts);

  createSaveButton(); // Create the save button
  createResetButton();


  imageMode(CENTER);
  image(images[0], paddedCanvasWidth / 2, paddedCanvasHeight / 2);
}


function resizeImages(){
  for(let picture of images){
    if(width<height){
      picture.resize(paddedCanvasWidth, ((picture.height*(paddedCanvasWidth))/picture.width));
    }
    else{
      picture.resize((picture.width*(paddedCanvasHeight))/picture.height, paddedCanvasHeight);

    }
  }
}

function draw() {
 for (let cutout of cutouts) {
   if( draggingCutout==null){
     let hover =
            mouseX >= cutout.x && mouseX <= cutout.x + cutout.w &&
            mouseY >= cutout.y && mouseY <= cutout.y + cutout.h
     if (hover) {tint(tintColor);}
   }

   imageMode(CORNER);
   image(cutout.img, cutout.x, cutout.y);
   noTint();
 }
}

function touchStarted(){
   for (let i = cutouts.length - 1; i >= 0; i--) {
    let cutout = cutouts[i];
      let hover =
            mouseX >= cutout.x && mouseX <= cutout.x + cutout.w &&
            mouseY >= cutout.y && mouseY <= cutout.y + cutout.h
      if (hover) {
        draggingCutout=cutout;
        image(cutout.img,cutout.x,cutout.y);
        cutouts.splice(i, 1);
        cutouts.push(draggingCutout);
        break; 
     }
  }
}


function touchMoved(){
  if (draggingCutout != null) {
    draggingCutout.x = mouseX - draggingCutout.w / 2;
    draggingCutout.y = mouseY - draggingCutout.h / 2;
  }
}

function touchEnded(){
  draggingCutout = null;
}

function createCutouts(numOfCutouts)
{
  let cutOutMinSize = images[0].width/8;
  let cutOutMaxSize = images[0].width/3;

  for (let i = 0; i < numOfCutouts; i++) {
    let w = random(cutOutMinSize, cutOutMaxSize);
    let h = random(cutOutMinSize , cutOutMaxSize);

    let randomSource= random(images);

    let x = random(randomSource.width - w);
    let y = random(randomSource.height - h);
    let cutout = createGraphics(w, h);
    cutout.rect(0, 0, w, h);
    cutout.drawingContext.globalCompositeOperation = 'source-in';
    cutout.image(randomSource, -x, -y);
    cutouts.push({ img: cutout, x: x+(paddedCanvasWidth/2 - images[0].width/2), y:y+(paddedCanvasHeight/2 - images[0].height/2), w:w, h:h});
  }
}

