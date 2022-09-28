var Planet = function (x, y, r) {
    this.loc = new JSVector(x, y);
    this.r = r;
    this.speedfactor = 3;
    this.speed = randomNumber(-this.speedfactor, this.speedfactor);
    this.vel = new JSVector(this.speed, this.speed);
};

Planet.prototype.udpate = function (x, y, dx, dy) {
    this.loc.add(this.vel);
};

Planet.prototype.render = function() {
    context.beginPath(); 
    context.arc(this.loc.x, this.loc.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = "black";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
}

Planet.prototype.checkEdges = function() {
    if (this.loc.x > (canvas.width - this.r) || this.loc.x < this.r) {
        this.vel.x = -this.vel.x;
    }
    if (this.loc.y > (canvas.height - this.r) || this.loc.y < this.r) {
        this.vel.y = -this.vel.y;
    }
}

Planet.prototype.run = function() {
    this.udpate();
    this.checkEdges();
    this.render();
}
