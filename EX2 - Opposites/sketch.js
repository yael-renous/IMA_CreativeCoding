
let matrix = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  stroke(199, 80, 88);
  strokeWeight(0.8);
  noFill();
  createMatrix();
  pixelDensity(1);
}

function draw() {
  clear();
 // orbitControl(4, 4);//Mouse control

  for (let s of matrix) {
    // cube.rotate();
    s.rotate();
    s.display();
  }
}

function createMatrix() {
  var sphereRadius = width/5;
  var padding = sphereRadius/2;

  for (let x = 0; x < width; x = x + sphereRadius + padding) {
    for (let y = 0; y < height; y = y +sphereRadius+ padding) {
      let s = new BumpySphere(
        x - width / 2 + sphereRadius ,
        y - height / 2 + sphereRadius ,
        0,
        sphereRadius
      );
      matrix.push(s);
    }
  }
}

function mousePressed(){
  for (let s of matrix) {
    s.toggleMelt();
  }
}