//  Vehicle constructor function +++++++++++++++++++++++++++++
function Vehicle(loc) {
  this.loc = new JSVector(loc.x, loc.y);
  let dx = Math.random() * 4 - 2;
  let dy = Math.random() * 4 - 2;
  this.vel = new JSVector(dx, dy);
  this.acc = new JSVector(0, 0);
 
  this.clr = "rgba(180,0,220,.8)";
  this.maxSpeed = document.getElementById("slider2").value;  // %%%%%%%%%%%%%%%%%
  this.maxForce = document.getElementById("slider1").value;  // %%%%%%%%%%%%%%%%%
  //############################################################################# not attached to slider
  this.desiredSep = 10;//  desired separation between vehicles

  this.scl = 3;
}

//  placing methods in the prototype 
Vehicle.prototype.run = function (vehicles) {
  this.flock(vehicles);
  this.update();
  this.checkEdges()
  this.render();
}

Vehicle.prototype.flock = function(vehicles) {
  //  flock force is the accumulation of all forces
  let flockForce = new JSVector(0,0);
  // set up force vectors to be added to acc
  let sep = this.separate(vehicles);
  let ali = this.align(vehicles);
  let coh = this.cohesion(vehicles);
  //  set multiples via sliders 
  let sepMult = document.getElementById("slider3").value; // %%%%%%%%%%%%%%%%%%
  let aliMult = document.getElementById("slider4").value;;  // %%%%%%%%%%%%%%%%%%
  let cohMult = document.getElementById("slider5").value;;    // %%%%%%%%%%%%%%%%%%
  //  calculate three forces
  // sep.multiply(sepMult);
  // ali.multiply(aliMult);
  // coh.multiply(cohMult);
  // //  add each of these to flockForce
  // flockForce.add(sep);
  // flockForce.add(ali);
  // flockForce.add(coh);
  this.acc.add(flockForce);
}
//+++++++++++++++++++++++++++++++++  Flocking functions
Vehicle.prototype.applyForce = function (force) {
  this.acc.add(force);
}

Vehicle.prototype.separate = function (v) {
  // A vector for average of separation forces
  // for (let currentVechicle = 0; currentVechicle < world.vehicles.length; currentVechicle++) {
  //   const element = array[currentVechicle];
    
  // }
  //return separationForce;
}

Vehicle.prototype.align = function (v) {
  // A vector for average of align forces
  //return steeringForce;
}

Vehicle.prototype.cohesion = function (v) {
   // A vector for average of cohesion forces
  //return cohesionForce;
}

Vehicle.prototype.seek = function(target) {
  // A vector pointing from the location to the target
  let desired = JSVector.subGetNew(target.loc, this.loc);
  desired.normalize();
  desired.multiply(this.maxSpeed);
  let steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce);
  this.applyForce(steer);
}
//+++++++++++++++++++++++++++++++++  Flocking functions

Vehicle.prototype.update = function () {
  this.vel.add(this.acc);
  this.vel.limit(1);
  this.loc.add(this.vel);
  this.seek(world.herder);
  this.separate(this.loc);
}

Vehicle.prototype.checkEdges = function () {
  if(this.loc.x > world.canvas.width) this.loc.x = 0;
  if(this.loc.x < 0) this.loc.x = world.canvas.width;
  if(this.loc.y > world.canvas.height) this.loc.y = 0;
  if(this.loc.y < 0) this.loc.y = world.canvas.height;
}

Vehicle.prototype.render = function () {
  let ctx = world.ctx;
  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
  ctx.beginPath();
  ctx.strokeStyle = this.clr;
  ctx.fillStyle = this.clr;
  ctx.moveTo(0, -this.scl);
  ctx.lineTo(-this.scl, this.scl);
  ctx.lineTo(0, 0);
  ctx.lineTo(this.scl, this.scl);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

