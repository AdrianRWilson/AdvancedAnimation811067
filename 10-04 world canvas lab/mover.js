function Mover(x, y, r, ctx1, ctx2) {
  this.loc = new JSVector(x, y);
  this.r = r;
  this.speedfactor = 3;
  this.vel = new JSVector(randomNumber(-this.speedfactor, this.speedfactor), randomNumber(-this.speedfactor, this.speedfactor));
  this.ctx1 = ctx1;
  this.ctx2 = ctx2;
}//++++++++++++++++++++++++++++++++ end mover constructor

//++++++++++++++++++++++++++++++++ mover methods
Mover.prototype.run = function () {
  this.update();
  this.checkEdges();
  this.render();
}

Mover.prototype.update = function () {
  this.loc.add(this.vel);
}

Mover.prototype.checkEdges = function () {
  if (this.loc.x > (this.ctx1.width - this.r/2) || this.loc.x < this.r/2) {
    this.vel.x = -this.vel.x;
  }
  if (this.loc.y > (this.ctx1.height - this.r/2) || this.loc.y < this.r/2) {
    this.vel.y = -this.vel.y;
  }
}

Mover.prototype.render = function () {
  //  render balls in world
  
   
  //  render balls in mini map
  this.ctx1.save();
  this.ctx1.beginPath();
  this.ctx1.rect(this.loc.x - (this.r/2), this.loc.y - (this.r/2), this.r, this.r);
  this.ctx1.fillStyle = "blue";
  this.ctx1.fillStyle = "blue";
  this.ctx1.fill();
  this.ctx1.stroke();
  this.ctx1.restore();
    
}
