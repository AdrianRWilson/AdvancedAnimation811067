// Snake constructor

function Snake(location, numSegs, segLength, context, canvas) {
    //  number of segments, segment length
    this.loc = location;
    this.vel = new JSVector(getRandomInt(-2, 2), getRandomInt(-2, 2));
    this.numSegs = numSegs;
    this.segLength = segLength;
    this.segments = [];
    this.loadSegments();
    this.context = context;
    this.canvas = canvas;  
}

Snake.prototype.loadSegments = function () {
    for(let i = 0; i < 1; i++) {
        this.segments[i] = new JSVector((Math.cos(Math.PI/6)  * this.segLength) + this.loc.x, (Math.sin(Math.PI/6) * this.segLength) + this.loc.y);
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
        // let difference = JSVector.subGetNew(this.loc, this.segments[i]);
        // let angle = difference.getDirection();
        // this.segments[i].setDirection(angle);
        // this.segments[i].setMagnitude(60);
    }
}

Snake.prototype.render = function () {
    this.context.beginPath();
    this.context.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI);
    this.context.fillStyle = "black";
    this.context.fill();
    for(let i = 0; i < this.segments.length; i++) {
        this.context.beginPath();
        this.context.arc(this.segments[i].x, this.segments[i].y, 5, 0, 2 * Math.PI);
        this.context.fillStyle = "blue";
        this.context.fill();
    }
    // for (let i = 0; i < this.segments.length; i++) {
    //     this.context.beginPath();
    //     this.context.arc(this.segments[i].x, this.segments[i].y, 10, 0, 2 * Math.PI);
    //     this.context.fillStyle = "black";
    //     this.context.fill();
    // }
}

Snake.prototype.checkEdges = function () {
    if (this.loc.x > this.canvas.width || this.loc.x < 0) {
        this.vel.x = -this.vel.x;
    }
    if (this.loc.y > this.canvas.height || this.loc.y < 0) {
        this.vel.y = -this.vel.y;
    }
}