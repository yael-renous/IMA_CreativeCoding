let matrix = [];
let cubeSize;
let cubeTest;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cubeSize=width;
  cubeTest = new Cube(0, 0, 0, cubeSize);
  createMatrix();
}

function draw() {
  background('red');

  //orbitControl();

  for (let cube of matrix) {
   // cube.rotate();
    cube.display();
  }
}

function createMatrix() {
  var padding =cubeSize/3;

  for (let x = 0; x < width; x = x + cubeSize+padding) {
    for (let y = 0; y < height; y = y + cubeSize+padding) {
      // Position cubes relative to top-left corner
      let cube = new Cube(
        x - width / 2 + cubeSize / 2,
        y - height / 2 + cubeSize / 2,
        0,
        cubeSize
      );
      matrix.push(cube);
    }
  }
}


