let prisonerNumbers = [];
let grid;
let gridSpacing = 20;
let resetPn;
let currentPrisoner;
let loopPath = [];
let opacity = 255;
let start = false;
let runButton, incremementButton, slider;
let w;
let h;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight - 70);
  w = cnv.width;
  h = cnv.height;

  cnv.position(0, 70);
  background(20, 20, 20);
  loadPrisonerNumbers(100);
  let pn = floor(random(prisonerNumbers.length));
  currentPrisoner = pn;
  resetPn = pn;
  console.log("Random Prisoner Number:" + pn + " -> " + getLoopLength(pn));
  console.log("All loops:");
  console.log(findLoops());
  grid = createGrid(prisonerNumbers.length);
  drawGrid();

  runButton = createButton("Run");
  runButton.position(10, 10);
  runButton.size(80, 50);
  runButton.mousePressed(run);
  slider = createSlider(1, 100, 1);
  slider.position(90, 25);
  slider.style("width", "100px");
}

function run() {
  start = true;
  frameCount = 0;
}

function draw() {
  if (frameCount % slider.value() == 0) {
    updatePrisoner();
    drawGrid();
  }
}

function createGrid(numPrisoners) {
  let numColumns = ceil(sqrt(numPrisoners));
  let numRows = ceil(numPrisoners / numColumns);
  let grid = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numColumns).fill(-1);
  }
  return grid;
}

function drawGrid() {
  let canvasWidth = width;
  let canvasHeight = height - 70;
  let maxGridSize = max(grid.length, grid[0].length);
  let gridWidth = gridSpacing * grid[0].length;
  let gridHeight = gridSpacing * grid.length;

  if (canvasWidth / canvasHeight > gridWidth / gridHeight) {
    // Fit to height
    gridSpacing = canvasHeight / maxGridSize;
  } else {
    // Fit to width
    gridSpacing = canvasWidth / maxGridSize;
  }

  background(20, 20, 20);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let x = j * gridSpacing;
      let y = i * gridSpacing;
      fill(0);
      stroke(255);
      strokeWeight(1);
      rect(x, y, gridSpacing, gridSpacing);
    }
  }

  noStroke();
  opacity = 255;
  for (let i = 0; i < loopPath.length; i++) {
    let row = floor((loopPath[i] - 1) / grid[0].length);
    let col = (loopPath[i] - 1) % grid[0].length;
    let x = col * gridSpacing;
    let y = row * gridSpacing;
    opacity = (i / loopPath.length) * 255;
    fill(255, 0, 0, opacity);
    rect(x, y, gridSpacing, gridSpacing);
    fill(255, 255, 255);
    textSize(10);
    text(loopPath[i], x + gridSpacing / 2, y + gridSpacing / 2);
    textSize(gridSpacing / 3);
    fill(255, 255, 255, opacity);
    text(prisonerNumbers[loopPath[i]], x, y + gridSpacing);
  }

  stroke(0, 255, 0, 50);
  strokeWeight(3);
  for (let i = 0; i < loopPath.length - 1; i++) {
    let currRow = floor((loopPath[i] - 1) / grid[0].length);
    let currCol = (loopPath[i] - 1) % grid[0].length;
    let nextRow = floor((loopPath[i + 1] - 1) / grid[0].length);
    let nextCol = (loopPath[i + 1] - 1) % grid[0].length;
    let startX = currCol * gridSpacing + gridSpacing / 2;
    let startY = currRow * gridSpacing + gridSpacing / 2;
    let endX = nextCol * gridSpacing + gridSpacing / 2;
    let endY = nextRow * gridSpacing + gridSpacing / 2;
    line(startX, startY, endX, endY);
  }
}

// This function updates the current prisoner's position and sets the position of the next prisoner
function updatePrisoner() {
  if (resetPn != currentPrisoner || start) {
    start = false;
    // Push the current prisoner's position to the loopPath array
    loopPath.push(currentPrisoner);

    // Get the position of the next prisoner
    let nextPrisoner = prisonerNumbers[currentPrisoner];

    // Remove the current prisoner's position from the grid
    grid[currentPrisoner % grid.length][floor(currentPrisoner / grid.length)] =
      -1;

    // Set the position of the next prisoner on the grid
    grid[nextPrisoner % grid.length][floor(nextPrisoner / grid.length)] =
      currentPrisoner;

    // Set the current prisoner to be the next prisoner
    currentPrisoner = nextPrisoner;
  }
}

function loadPrisonerNumbers(n) {
  let temp = [];
  for (let i = 0; i < n; i++) {
    temp[i] = i;
  }
  for (let i = 0; i < n; i++) {
    let tempIndex = floor(random(temp.length));
    prisonerNumbers.push(temp.splice(tempIndex, 1)[0]);
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function getLoopLength(prisonerNumber) {
  let originalPrisonerNumber = prisonerNumber;
  for (let count = 1; ; count++) {
    prisonerNumber = prisonerNumbers[prisonerNumber];
    if (prisonerNumber == originalPrisonerNumber) return count;
  }
}

function findLoops() {
  let visited = new Array(prisonerNumbers.length).fill(false);
  let loops = [];
  for (let i = 0; i < prisonerNumbers.length; i++) {
    if (!visited[i]) {
      let loop = [];
      let currentNode = i;
      while (!visited[currentNode]) {
        visited[currentNode] = true;
        loop.push({ index: currentNode, value: prisonerNumbers[currentNode] });
        currentNode = prisonerNumbers[currentNode];
      }
      if (loop.length > 1) loops.push(loop);
    }
  }
  return loops;
}
