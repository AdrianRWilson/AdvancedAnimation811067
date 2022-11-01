// Snake constructor

function Snake(location, numSegs, segLength, context, canvas) {
    //  number of segments, segment length
    this.loc = location;
    this.speed = 10;
    this.vel = new JSVector(getRandomArbitrary(-this.speed, this.speed), getRandomArbitrary(-this.speed, this.speed));
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
        let connectionVector = JSVector.subGetNew(this.segments[i]  , this.segments[i - 1]);
        connectionVector.setMagnitude(Math.abs(Math.sin(((((this.segments.length - i))/this.segments.length) * 3600) * (Math.PI/180)) * 5));
        connectionVector.add(this.segments[i - 1]);
        this.segments[i] = connectionVector;
    }
}

Snake.prototype.render = function () {
    for(let i = 0; i < this.segments.length; i++) {
        this.context.beginPath();
        this.context.arc(this.segments[i].x, this.segments[i].y, Math.abs(Math.sin(((((this.segments.length - i))/this.segments.length) * 3600) * (Math.PI/180)) * 5 * (this.segments[i].x/this.segments[i].y)), 0, 2 * Math.PI);
        let alpha = (1 - ((this.segments[i].x/this.segments[i].y)/4));
        if (alpha <= 0.3) {
            alpha = 0;
        }
        console.log(alpha);
        this.context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
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