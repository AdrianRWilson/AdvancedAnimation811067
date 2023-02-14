window.addEventListener("load", init);

var canvas, context;
let grid;

function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    grid = new Grid(canvas.width, canvas.height);
    animate(); 
}


function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    grid.run();
    requestAnimationFrame(animate);
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}


//reference https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb