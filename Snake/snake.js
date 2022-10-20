// Snake constructor

function Snake(location, numSegs, segLength, context, canvas) {
    //  number of segments, segment length
    this.loc = location;
    this.vel = new JSVector(getRandomArbitrary(-2, 2), getRandomArbitrary(-2, 2));
    this.numSegs = numSegs;
    this.segLength = segLength;
    this.segments = [];
    this.loadSegments();
    this.context = context;
    this.canvas = canvas;  
}

Snake.prototype.loadSegments = function () {
    for(let i = 0; i < this.numSegs; i++) {
        let angle = this.vel.getDirection();
        this.segments[i] = new JSVector((Math.cos(angle + Math.PI)  * this.segLength * (i+1)) + this.loc.x, (Math.sin(angle + Math.PI) * this.segLength * (i+1)) + this.loc.y);
    }
}

Snake.prototype.run = function () {
    this.checkEdges();
    this.update();
    this.render();
}

Snake.prototype.update = function () {
    this.loc.add(this.vel);
    this.segments[0] = this.loc;
    for (let i = 1; i < this.segments.length; i ++) {
        let connectionVector = JSVector.subGetNew(this.segments[i], this.segments[i - 1]);
        connectionVector.setMagnitude(this.segLength);
        connectionVector.add(this.segments[i - 1]);
        this.segments[i] = connectionVector;
    }
}

Snake.prototype.render = function () {
    for(let i = 0; i < this.segments.length; i++) {
        this.context.beginPath();
        this.context.arc(this.segments[i].x, this.segments[i].y, (((this.segments.length - i))/this.segments.length) * 5, 0, 2 * Math.PI);
        this.context.fillStyle = "blue";
        this.context.fill();
    }
}

Snake.prototype.checkEdges = function () {
    if (this.loc.x > this.canvas.width || this.loc.x < 0) {
        this.vel.x = -this.vel.x;
    }
    if (this.loc.y > this.canvas.height || this.loc.y < 0) {
        this.vel.y = -this.vel.y;
    }
}