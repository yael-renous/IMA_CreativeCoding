
const apiKey = 'YpWxFY4BAQgbMmazJUTOZObAE0lf1vRs2JQNfdJV';
let asteroids = [];
let todayDate;
let osc;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
   todayDate = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`;
  console.log(todayDate);
  let startDate = todayDate;
  let endDate = todayDate;
  asteroids = await fetchAsteroids(startDate, endDate, apiKey);

  osc = new p5.Oscillator();
  osc.freq(220);
  osc.setType('sine');
  osc.amp(0.1);
  osc.start();

}



function draw() {
  background(0.1);
  if (asteroids.length == 0) return;
  for (let asteroid of asteroids) {

    let growthSpeed = map(asteroid.velocity, 0, 30, 1, 3);
    let centerOffset = map(width / 2 - asteroid.missDistance, 0, -50000000, 0, width);
    asteroid.radius += 0.05 * growthSpeed;
    asteroid.x = lerp(asteroid.x, centerOffset, 0.0001);
    asteroid.y = lerp(asteroid.y, centerOffset, 0.0001);
  
    //rings
    drawRings(asteroid);
    //circle
    fill(0.1)
    noStroke()
    circle(asteroid.x,asteroid.y,asteroid.radius);
    //name
    push();
    textAlign(CENTER, CENTER);
    fill('white');
    text(asteroid.name, asteroid.x, asteroid.y);
    pop();
  }


  textSize(32);
  fill('red');
  text(todayDate,width/2,height/2);
  textSize(11);
}

function drawRings(asteroid) {
  textAlign(CENTER, CENTER);
  let velocityText = "VELOCITY " + asteroid.velocity.toString();
  let distanceText = "DISTANCE " + asteroid.missDistance.toString();
  let angleStep = 360 / max(velocityText.length, distanceText.length);
  let numRings = 10;

  push();
  translate(asteroid.x, asteroid.y); // Move to the asteroid's position

  for (let ring = 0; ring < numRings; ring++) {
    let isEven = ring % 2 === 0;
    let textContent = isEven ? velocityText : distanceText;
    let ringRadius = asteroid.radius + ring * 15;
    let alpha = 1 - (ring / numRings) * (ring / numRings);
    fill(0.9, alpha);
    for (let i = 0; i < 360; i += angleStep) {
      push();
      rotate(radians(i)); // Rotate to the current angle
      translate(ringRadius, 0); // Move out to the radius
      rotate(radians(-i)); // Rotate the text back upright

      text(textContent.charAt(i / angleStep), 0, 0); // Draw each character of the text
      pop();
    }
  }
  pop();
}

