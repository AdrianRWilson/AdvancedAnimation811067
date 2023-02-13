// Snake constructor

function Snake(location, numSegs, segLength) {
    //  number of segments, segment length
    this.loc = location;
    this.speed = 3;
    this.vel = new JSVector(getRandomArbitrary(-this.speed, this.speed), getRandomArbitrary(-this.speed, this.speed));
    this.perpendicularVel = this.vel.rotate(Math.PI/2);
    this.numSegs = numSegs;
    this.segLength = segLength;
    this.segments = [];
    this.loadSegments();
    this.context = context;
    this.canvas = canvas;

    this.orbiters = [];
    for (let i = 0; i < 1; i++) {
        this.rad = 5;
        this.amt = 1;
        this.orbiters[i] = new Orbiter(this.loc.x, this.loc.y, this.rad, i, this.amt, this.context, this.perpendicularVel);
    }
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

    for (let i = 0; i < this.orbiters.length; i++) {
        this.orbiters[i].run(this.loc.x, this.loc.y);
    }

    this.segments[0] = this.loc;
    for (let i = 1; i < this.segments.length; i ++) {
        let connectionVector = JSVector.subGetNew(this.segments[i]  , this.segments[i - 1]);
        connectionVector.setMagnitude(Math.abs(Math.sin(((((this.segments.length - i))/this.segments.length) * 3600) * (Math.PI/180)) * 5));
        connectionVector.add(this.segments[i - 1]);
        this.segments[i] = connectionVector;
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
