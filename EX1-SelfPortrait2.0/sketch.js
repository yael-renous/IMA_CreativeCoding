const numOfCutouts = 15;
const neonColors = ['#FF00FF', '#39FF14', '#FFFF33', '#00FFFF', '#FF9933', '#FF1493', '#7FFF00', '#00FF00', '#00CED1', '#FF4500', '#DA70D6', '#40E0D0', '#EE82EE', '#FFD700'];

let windowPadding = 100;
let paddedCanvasWidth;
let paddedCanvasHeight;

let draggingCutout = null;
let tintColor;
let cutouts = [];
let images = [];
let capturingViewer = false;

//Body Segmentation Fields
let bodySegmentation;
let video;
let segmentation;
let finalImage = null;
let options = {
  maskType: "person",
};

function preload() {
  images.push(loadImage('me@0.33x.png'));
  images.push(loadImage('luli@0.33x.png'));
  images.push(loadImage('kai@0.33x.png'));

  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddedCanvasWidth = width - windowPadding;
  paddedCanvasHeight = height - windowPadding;

  tintColor = random(neonColors);
  background(random(neonColors));
  resizeImages();
  createCutouts(numOfCutouts);

  createSaveButton();
  createResetButton();
  createJoinButton();


  imageMode(CENTER);
  image(images[0], paddedCanvasWidth / 2, paddedCanvasHeight / 2);
}

function draw() {
  if (capturingViewer) {
    showCaptureState();
  }
  else {
    for (let cutout of cutouts) {
      if (draggingCutout == null) {
        let hover =
          mouseX >= cutout.x && mouseX <= cutout.x + cutout.w &&
          mouseY >= cutout.y && mouseY <= cutout.y + cutout.h
        if (hover) { tint(tintColor); }
      }

      imageMode(CORNER);
      image(cutout.img, cutout.x, cutout.y);
      noTint();
    }
  }
}

function showCaptureState() {
  image(video, 0, 0);
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}

function resizeImages() {
  for (let picture of images) {
    if (width < height) {
      picture.resize(paddedCanvasWidth, ((picture.height * (paddedCanvasWidth)) / picture.width));
    }
    else {
      picture.resize((picture.width * (paddedCanvasHeight)) / picture.height, paddedCanvasHeight);

    }
  }
}


function touchStarted() {
  for (let i = cutouts.length - 1; i >= 0; i--) {
    let cutout = cutouts[i];
    let hover =
      mouseX >= cutout.x && mouseX <= cutout.x + cutout.w &&
      mouseY >= cutout.y && mouseY <= cutout.y + cutout.h
    if (hover) {
      draggingCutout = cutout;
      image(cutout.img, cutout.x, cutout.y);
      cutouts.splice(i, 1);
      cutouts.push(draggingCutout);
      break;
    }
  }
}


function touchMoved() {
  if (draggingCutout != null) {
    draggingCutout.x = mouseX - draggingCutout.w / 2;
    draggingCutout.y = mouseY - draggingCutout.h / 2;
  }
}

function touchEnded() {
  draggingCutout = null;
}

function createCutouts(numOfCutouts) {
  let cutOutMinSize = images[0].width / 8;
  let cutOutMaxSize = images[0].width / 3;

  for (let i = 0; i < numOfCutouts; i++) {
    let w = random(cutOutMinSize, cutOutMaxSize);
    let h = random(cutOutMinSize, cutOutMaxSize);

    let randomSource = random(images);

    let x = random(randomSource.width - w);
    let y = random(randomSource.height - h);
    let cutout = createGraphics(w, h);
    cutout.rect(0, 0, w, h);
    cutout.drawingContext.globalCompositeOperation = 'source-in';
    cutout.image(randomSource, -x, -y);
    cutouts.push({ img: cutout, x: x + (paddedCanvasWidth / 2 - images[0].width / 2), y: y + (paddedCanvasHeight / 2 - images[0].height / 2), w: w, h: h });
  }
}





function createJoinButton() {
  const resetButton = createButton('Enter Composition!');
  resetButton.position(50, 50); // Position below the save button
  resetButton.mousePressed(joinComposition);
}

function joinComposition() {
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  bodySegmentation.detectStart(video, gotResults);
  createCaptureButton();
  capturingViewer = true;
}

function createCaptureButton() {
  const resetButton = createButton('Capture');
  resetButton.position(50, 50); // Position below the save button
  resetButton.mousePressed(capturedImage);
}

function gotResults(result) {
  segmentation = result;
}

function capturedImage() {
  segmentedImg = get(0, 0, width, height);

  if (segmentedImg) {
    // Iterate over pixels to set alpha of black pixels to 0
    segmentedImg.loadPixels();
    for (let i = 0; i < segmentedImg.pixels.length; i += 4) {
      // Check if pixel is black (R, G, B all 0)
      if (segmentedImg.pixels[i] === 0 && segmentedImg.pixels[i + 1] === 0 && segmentedImg.pixels[i + 2] === 0) {
        segmentedImg.pixels[i + 3] = 0; // Set alpha to 0
      }
    }
    segmentedImg.updatePixels();
    images.push(segmentedImg);
  }

  resizeImages();
  createCutouts(numOfCutouts);
  background(random(neonColors));
  imageMode(CENTER);
  image(images[0], paddedCanvasWidth / 2, paddedCanvasHeight / 2);
  capturingViewer=false;

}

