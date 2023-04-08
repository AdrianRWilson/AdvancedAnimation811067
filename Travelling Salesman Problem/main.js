const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

let numCities = Math.floor(Math.random() * 100) + 3;
var cities = generateRandomCities(numCities, canvas.width);
let intervalId = null;

function generateRandomCities(numCities, range) {
  const cities = [];
  for (let i = 0; i < numCities; i++) {
    const x = Math.floor(Math.random() * range);
    const y = Math.floor(Math.random() * range);
    cities.push({ x: x, y: y });
  }
  return cities;
}

// Draw the cities as circles on the canvas
function drawCities() {
  ctx.fillStyle = "black";
  for (const city of cities) {
    ctx.beginPath();
    ctx.arc(city.x, city.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  // Display city names or indices
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  for (let j = 0; j < tour.length; j++) {
    const city = tour[j];
    ctx.fillText(j, city.x + 10, city.y - 10);
  }
}

// Compute the Euclidean distance between two cities
function distance(city1, city2) {
  const dx = city1.x - city2.x;
  const dy = city1.y - city2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find the nearest unvisited city to a given city
function nearestNeighbor(city, visited) {
  let nearest = null;
  let minDist = Infinity;
  for (const neighbor of cities) {
    if (!visited.includes(neighbor)) {
      const dist = distance(city, neighbor);
      if (dist < minDist) {
        nearest = neighbor;
        minDist = dist;
      }
    }
  }
  return nearest;
}

// Compute the total distance of a given tour
function tourDistance(tour) {
  let dist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    const city1 = tour[i];
    const city2 = tour[i + 1];
    dist += distance(city1, city2);
  }
  return dist;
}

// Find the shortest tour using the nearest neighbor algorithm
function shortestTour() {
  const visited = [cities[0]];
  while (visited.length < cities.length) {
    const lastCity = visited[visited.length - 1];
    const nextCity = nearestNeighbor(lastCity, visited);
    visited.push(nextCity);
  }
  visited.push(cities[0]); // Return to the starting city
  return visited;
}

function animateTour(tour) {
  populateCityList();
  clearInterval(intervalId);
  let i = 0;
  let tourDistance = 0;
  intervalId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw black lines to every possible city it can go to next
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    for (let j = i; j < tour.length - 1; j++) {
      const city1 = tour[j];
      for (let k = j + 1; k < tour.length; k++) {
        const city2 = tour[k];
        ctx.beginPath();
        ctx.moveTo(city1.x, city1.y);
        ctx.lineTo(city2.x, city2.y);
        ctx.stroke();
      }
    }

    drawCities();
    ctx.lineWidth = 2;
    for (let j = 0; j <= i; j++) {
      const city = tour[j];
      if (j === 0) {
        ctx.beginPath();
        ctx.moveTo(city.x, city.y);
      } else {
        const prevCity = tour[j - 1];
        const distance = Math.sqrt(
          (city.x - prevCity.x) ** 2 + (city.y - prevCity.y) ** 2
        );
        tourDistance += distance;
        // set line color based on distance
        const green = Math.round((1 - distance / 100) * 255);
        const blue = Math.round((distance / 100) * 255);
        ctx.strokeStyle = `rgb(0, ${green}, ${blue})`;
        ctx.lineTo(city.x, city.y);
        ctx.stroke();
        ctx.beginPath(); // start a new path for the next segment
        ctx.moveTo(city.x, city.y); // move to the start of the next segment
      }
    }

    // Draw a circle around the current city being traversed
    const currentCity = tour[i];
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(currentCity.x, currentCity.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    // Display the current tour distance
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Tour distance: ${Math.round(tourDistance)}`, 10, 30);

    i++;
    if (i === tour.length - 1) {
      clearInterval(intervalId);
    }
  }, 1);
}

// Main function: find the shortest tour and animate it
const tour = shortestTour();
animateTour(tour);
