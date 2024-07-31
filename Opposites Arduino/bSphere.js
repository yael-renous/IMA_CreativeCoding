class BumpySphere {
    constructor(x, y, z, radius) {
        this.pos = createVector(x, y, z);
        this.bumpiness = 0;
        this.thetaValue = 0;
        this.phyValue = 0;
        this.r = radius;
        this.rotation = random(-0.1, 0.1);

        this.isMelting = false;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        if (!this.isMelting)
            rotateX(this.rotation);
        rotateY(this.rotation);

        /*
        Shape building taken from Kazuki Umeda 
        Video Tutorial: https://www.youtube.com/watch?v=SGHWZz5Mrsw
        Git: https://github.com/Creativeguru97/YouTube_tutorial/blob/master/Play_with_geometry/SphericalCoordinates/0_4_bumpySphere/sketch.js
        ----------------------------------------
        */
        beginShape(POINTS);
        for (let theta = 0; theta < 180; theta += 2) {
            for (let phy = 0; phy < 360; phy += 2) {
                let x = this.r * (1 + this.bumpiness * sin(this.thetaValue * theta) * sin(this.phyValue * phy)) * sin(1 * theta) * cos(phy);
                let y = this.r * (1 + this.bumpiness * sin(this.thetaValue * theta) * sin(this.phyValue * phy)) * sin(1 * theta) * sin(phy);
                let z = this.r * (1 + this.bumpiness * sin(this.thetaValue * theta) * sin(this.phyValue * phy)) * cos(1 * theta);
                vertex(x, y, z);
            }
        }
        endShape();
        pop();
    }

    setPosition(x, y, z) {
        this.pos.set(x, y, z);
    }

    setSize(size) {
        this.size = size;
    }

    update(b,t,p) {
            let destBump = map(b, 0, 1023, 0, 0.8);
            let destTheta = map(t, 0, 1023, 0, 8);
            let destPhy = map(p, 0, 1010, 0.2, 2);

            //lerp values
            this.bumpiness = lerp(Math.min(this.bumpiness, destBump), Math.max(this.bumpiness, destBump), 0.05);
            this.thetaValue = lerp(Math.min(this.thetaValue, destTheta), Math.max(this.thetaValue, destTheta), 0.8);
            this.phyValue = lerp(Math.min(this.phyValue, destPhy), Math.max(this.phyValue, destPhy), 0.1);

            this.rotation += 0.1;
      
    }



}