var Orbiter = function (x, y, r, i, orbiterAmount, context, perpendicularVel) {
    this.headloc = new JSVector(x, y);
    this.loc = this.headloc;
    this.r = r;
    this.orbitalDistance = 30;
    this.angleVelocity = 0.05;
    this.orbiterAmount = orbiterAmount;
    this.increment = i + 1;
    this.angle = this.increment * (Math.PI*2/this.orbiterAmount);
    this.context = context;
    this.perpendicularVel = perpendicularVel;
}

Orbiter.prototype.update = function (x, y) {
    this.headloc.x = x;
    this.headloc.y = y;
    this.angle += this.angleVelocity;
    this.loc.add(this.perpendicularVel);
};

Orbiter.prototype.render = function() {
    this.context.beginPath(); 
    this.context.arc(this.loc.x, this.loc.y, this.r, 0, 2 * Math.PI);
    this.context.strokeStyle = "black";
    this.context.fillStyle = "red";
    this.context.fill();
}

Orbiter.prototype.run = function(x, y) {
    this.update(x, y);
    this.render();
}