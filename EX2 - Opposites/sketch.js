
let matrix = [];
let bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(RGB);
  let colorColor = color(random(255), random(255), random(255));
  stroke(colorColor);
  strokeWeight(0.8);
  noFill();
  bgColor='black';
  createMatrix();
  pixelDensity(1);
}

function draw() {
  clear();
  background(bgColor);
  for (let s of matrix) {
    s.update();
    s.display();
  }
}

function createMatrix() {
  var sphereRadius = width / 5;
  var padding = sphereRadius / 2;

  for (let x = 0; x < width; x = x + sphereRadius + padding) {
    for (let y = 0; y < height; y = y + sphereRadius + padding) {
      let s = new BumpySphere(
        x - width / 2 + sphereRadius,
        y - height / 2 + sphereRadius,
        0,
        sphereRadius
      );
      matrix.push(s);
    }
  }
}

function mousePressed() {
  for (let s of matrix) {
    s.toggleMelt();
  }
}