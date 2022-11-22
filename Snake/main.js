


let world;   // a single global object
let snakes = [];  
let numSnakes = 10;  

window.onload = init;//  After the window has been loaded, go to init
function init(){
    world = new World();  // global world
    animate();          // kick off the animation
}

//  animation loop called 60 fps
function animate(){
    world.ctx.fillStyle = "white";
    world.ctx.globalAlpha = 1.0;
    world.ctx.fillRect(0,0,canvas.width,canvas.height);
    world.run();    // run the world
    requestAnimationFrame(animate);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function LightenDarkenColor(col, amt) {
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 