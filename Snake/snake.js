// Snake constructor

function Snake(location, numSegs, segLength) {
    //  number of segments, segment length
    this.loc = location;
    this.vel = new JSVector(getRandomInt(-2, 2), getRandomInt(-2, 2));
    this.numSegs = numSegs;
    this.segLength = segLength;
    this.segments = [];
    this.loadSegments();
}

Snake.prototype.loadSegments = function () {
    for (let i = 0; i < this.numSegs; i++) {
      this.segments[i] = new JSVector(this.loc.x, this.loc.y);
      if(i == 0) {
        this.segments[i].sub(this.vel);
      } else {
        let currSeg = new JSVector(0, 0);
        currSeg = JSVector.subGetNew(this.segments[i-1], this.vel);
        this.segments[i].sub(currSeg);
      }
    }
}

Snake.prototype.run = function () {
    this.checkEdges();
    this.update();
    this.render();

}

Snake.prototype.update = function () {
    this.loc.add(this.vel);
    for (let i = 0; i < this.segments.length; i ++) {
      if(i == 0) {
        let acceleration = JSVector.subGetNew(this.loc, this.segments[i]);
        acceleration.normalize();
        acceleration.multiply(this.vel.getMagnitude());
        this.segments[i].add(acceleration);
      } else {
        let acceleration = JSVector.subGetNew(this.segments[i-1], this.segments[i]);
        acceleration.normalize();
        this.segments[i].add(acceleration);
      }
    }
}

Snake.prototype.render = function () {
    world.ctx.beginPath();
    world.ctx.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI);
    world.ctx.fillStyle = "black";
    world.ctx.fill();
    for(let i = 0; i < this.segments.length; i++) {
        world.ctx.beginPath();
        world.ctx.arc(this.segments[i].x, this.segments[i].y, 5, 0, 2 * Math.PI);
        world.ctx.fillStyle = "blue";
        world.ctx.fill();
    }
}

Snake.prototype.checkEdges = function () {
    if (this.loc.x > world.canvas.width || this.loc.x < 0) {
        this.vel.x = -this.vel.x;
    }
    if (this.loc.y > world.canvas.height || this.loc.y < 0) {
        this.vel.y = -this.vel.y;
    }
}
