
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
var canvas, context, x, y, dx, dy;
var balls=[];

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    let ballamount = 10;
    createballs(10);  //create balls
    animate();      // kick off the animation
}

//create all the balls
function createballs(ballamount) {
    for (let i = 0; i < ballamount; i++) {
        let cw = randomNumber(0, canvas.width);
        let ch = randomNumber(0, canvas.height);
        let r = randomNumber(20, 70);
        balls[i] = new Ball(cw, ch, r);
    }
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].run();
    }
    requestAnimationFrame(animate); // next cycle
}

function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 