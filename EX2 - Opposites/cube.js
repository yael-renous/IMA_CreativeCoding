class Cube {
  constructor(x, y, z, size) {
    this.pos = createVector(x, y, z);
    this.initialSize = size;
    this.size = size;
    this.rotation = 0;
    this.spheres = [];
    this.createSpheres();
  }

  display() {
    //push();
    // translate(this.pos.x, this.pos.y, this.pos.z);
    // rotateX(this.rotation);
    // rotateY(this.rotation);
    // box(this.size);
    // pop();

    for (let s in this.spheres) {
      push();
      translate(s.x, s.y, s.z);
     // sphere(s.size);
      pop();
    }

  }

  setPosition(x, y, z) {
    this.pos.set(x, y, z);
  }

  setSize(size) {
    this.size = size;
  }

  rotate() {
    this.rotation += 0.01; // Adjust the rotation speed as needed

  }

  createSpheres() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {

        this.spheres.push({
          x: this.x + i, y: this.y + i, z: 0, size: 1
        });

      }
    }

  }

  old() {
    let spacing = 10;
    let d = 10;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          // push();

          // let offset = -spacing * this.size / 2 + spacing / 2;
          // let x = i * spacing + offset;
          // let y = j * spacing + offset;
          // let z = k * spacing + offset;

          // let distance = sqrt(pow(x, 2) + pow(y, 2) + pow(z, 2));

          // translate(x, y, z);
          // normalMaterial();
          // let sphereSize = spacing - distance / d;
          // sphere(sphereSize);
          // this.spheres.push({ x: x, y: y, z: z, size: sphereSize });
          this.spheres.push({ x: this.x + i, y: this.y + i, z: this.z + i, size: 10 });

          // pop();
        }
      }
    }
  }
}


