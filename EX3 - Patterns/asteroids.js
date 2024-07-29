class Asteroid{
  constructor(){
    
  }
}


async function fetchAsteroids(startDate, endDate, apiKey) {
  let asteroids = [];
    try {
        let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        
        for (let date in data.near_earth_objects) {
            asteroids = asteroids.concat(data.near_earth_objects[date]);
        }
    } catch (err) {
        console.error(err);
        console.log("fetching mockup");
        asteroids=fetchMockup();
    }
    return convertJSONtoAsteroid(asteroids);
}

async function fetchMockup(){
    const response = await fetch('mockupData.json');
    const data = await response.json();
    let asteroids = [];
    for (let date in data.near_earth_objects) {
        asteroids = asteroids.concat(data.near_earth_objects[date]);
    }
    return asteroids;
}

function convertJSONtoAsteroid(astroidsJSON) {
  let asteroids=[];
  for (let asteroidJSON of astroidsJSON) {
    let asteroid = {
      velocity: asteroidJSON.close_approach_data[0].relative_velocity.kilometers_per_second,
      missDistance: asteroidJSON.close_approach_data[0].miss_distance.kilometers,
      radius: asteroidJSON.absolute_magnitude_h*2,
      name:asteroidJSON.name,
      x: random(0, width),
      y: random(0, height)
    }
    asteroids.push(asteroid);
  }
  return asteroids;
}
