class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = randomNumber(-5, 5);
    this.dy =randomNumber(-5, 5);
  }


  // move the circle to a new location
  update() {
    this.x += this.dx;    // update x coordinate of location with x velocity
    this.y += this.dy;    // update y coordinate of location with y velocity
  }


  //draw circle
  render() {
    let radius = 15; // local variable radius of the circle
    // create the circle path
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = "black";  // color to fill
    context.fillStyle = "blue";     // color to stroke
    context.fill();     // render the fill
    context.stroke();   // render the stroke
  }

  //run all functions
  run() {
    this.update();
    this.render();
  }

  
}
