

/**
 * Yael Renous
 * Creative Coding 2024 - EX2 Opposites
 * Description: Solid vs liquid and the barrier with solids that we have when interacting with them
 * */

let matrix = [];
let bgColor;
let pot1,pot2,f;
const neonColors = ['#FF00FF','#39FF14','#FFFF33','#00FFFF','#FF9933','#FF1493','#7FFF00','#00FF00','#00CED1','#FF4500','#DA70D6','#40E0D0','#EE82EE','#FFD700'];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);//size(600, 400);
  angleMode(DEGREES);
  colorMode(RGB);
  let colorColor = random(neonColors); 
  stroke(colorColor);
  strokeWeight(0.9);
  noFill();
  bgColor=10;
  createMatrix();
  pixelDensity(1);
  setupSerial();

}

function draw() {
  clear();
  background(bgColor);
  for (let s of matrix) {
    s.update(pot1,pot2,f);
    s.display();
  }
}

//create a grid of spheres
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


function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil("\r\n");
  //check to see that there's actually a string there:
  if (inString) {
    let sensors = split(inString, ",");
    pot1 = int(sensors[0]);
    pot2 = int(sensors[1]);
    f=int(sensors[2]);
    serial.write("x");
    // console.log(f); 
  }
}