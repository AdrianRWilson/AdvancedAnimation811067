function Player(x, y, ctx, playerAnims) {
    this.loc = new JSVector(x, y);
    this.vel = new JSVector(0, 0);
    this.acc = new JSVector(0, gravity / 100);
    this.mass = 0.5;
    this.terminalVelocity = this.mass * gravity;
    this.maxVel = new JSVector(2.3, this.terminalVelocity);
    this.ctx = ctx;
    this.moving = {
        right: false,
        left: false,
        up: false,
        down: false
    }
    this.friction = 0.02;
    this.charIdleAnim = [playerAnims[charIdleIndex][0], playerAnims[charIdleIndex][1], playerAnims[charIdleIndex][2]];
    this.charRunAnim = [playerAnims[charRunIndex][0], playerAnims[charRunIndex][1], playerAnims[charRunIndex][2], playerAnims[charRunIndex][3], playerAnims[charRunIndex][4], playerAnims[charRunIndex][5]];
    this.charSlideAnim = [playerAnims[charSlideIndex][0], playerAnims[charSlideIndex][1], playerAnims[charSlideIndex][2], playerAnims[charSlideIndex][3], playerAnims[charSlideIndex][4]];
    this.charJumpAnim = [playerAnims[charJumpIndex][0], playerAnims[charJumpIndex][1], playerAnims[charJumpIndex][2], playerAnims[charJumpIndex][3]];
    this.charAttack1Anim = [playerAnims[charAttack1Index][0], playerAnims[charAttack1Index][1], playerAnims[charAttack1Index][2], playerAnims[charAttack1Index][3], playerAnims[charAttack1Index][4]];
    this.charAttack2Anim = [playerAnims[charAttack2Index][0], playerAnims[charAttack2Index][1], playerAnims[charAttack2Index][2], playerAnims[charAttack2Index][3], playerAnims[charAttack2Index][4], playerAnims[charAttack2Index][5]];
    this.charAttack3Anim = [playerAnims[charAttack3Index][0], playerAnims[charAttack3Index][1], playerAnims[charAttack3Index][2], playerAnims[charAttack3Index][3], playerAnims[charAttack3Index][4], playerAnims[charAttack3Index][5]];
    this.charCurr = 0;
    this.charAnimCurr = this.charIdleAnim;
    this.currentImage = this.charAnimCurr[this.charCurr];
    this.sizeMultiplier = 2;
    this.isColliding = 0;
    this.jumpPower = -4;
    this.charDisplayDisplacement = 35;
    this.hitboxWidth = 30;
    this.hitboxheight = 63;
    this.jumpAnimTick = 0;
    this.jumpAimTickIntveral = 30;
    this.slideAnimTick = 0;
    this.slideAnimTickInterval = 30;
    this.AttackAnimTick = 0;
    this.AttackAnimTickInterval = 5;
    this.currAttackAnim = this.charAttack1Anim;
    this.health = 100;
    this.isAttacking = false;
    this.doubleJump = 0;
    this.maxJumps = 2;
}

Player.prototype.update = function () {
    if (this.loc.y > 0) {
        this.health = 0;
    }

    if (this.isAttacking) {
        this.maxVel.x = 0.5;
    } else {
        this.maxVel.x = 2.3;
    }
    if (this.moving.right) {
        this.vel.x = lerp(this.vel.x, this.maxVel.x, this.friction);
        this.charAnimCurr = this.charRunAnim;
    } else if (this.vel.x > 0) {
        this.vel.x = lerp(this.vel.x, 0, this.friction);
        this.charAnimCurr = this.charIdleAnim;
    }
    if (this.moving.left) {
        this.vel.x = lerp(this.vel.x, -this.maxVel.x, this.friction);
    } else {
        if (this.vel.x < 0) {
            this.vel.x = lerp(this.vel.x, 0, this.friction);
        }
    }
    if (!this.moving.right && !this.moving.left) {
        if (this.vel.x > -0.1 || this.vel.x < 0.1) {
            this.vel.x = 0;
        }
    }

    if (this.vel.y != 0 && this.vel.getDirection() > 0) {
        this.moving.down = true;
        this.moving.up = false;
        this.charAnimCurr = this.charJumpAnim;
    } else if (this.vel.y != 0 && this.vel.getDirection() < 0) {
        this.moving.down = false;
        this.moving.up = true;
        this.charAnimCurr = this.charJumpAnim;
    } else if (this.vel.y == 0 && this.vel.x == 0) {
        this.charAnimCurr = this.charIdleAnim;
        this.moving.up = false;
        this.moving.down = false;
    }

    if (this.vel.x <= 0.00000001 && this.vel.x >= 0.00000001) {
        this.charAnimCurr = this.charIdleAnim;
    }

    if (this.isAttacking) {
        if (this.charCurr == this.currAttackAnim.length - 1) {
            if (this.currAttackAnim == this.charAttack1Anim) {
                this.currAttackAnim = this.charAttack2Anim;
            } else if (this.currAttackAnim == this.charAttack2Anim) {
                this.currAttackAnim = this.charAttack3Anim;
            } else if (this.currAttackAnim == this.charAttack3Anim) {
                this.currAttackAnim = this.charAttack1Anim;
            }
        }
        this.charAnimCurr = this.currAttackAnim;
    }

    //limit on the x axis
    if (this.vel.x >= this.maxVel.x) {
        this.friction = 0.2;
    } else {
        this.friction = 0.02;
    }

    //apply gravity
    this.vel.add(this.acc);
    if (this.isColliding) {
        this.vel.y = 0;
    }

    //apply velocity
    this.loc.add(this.vel);
}

Player.prototype.jump = function () {
    if (this.doubleJump != this.maxJumps) {
        this.loc.y = this.loc.y - 10;
        this.vel.y = this.jumpPower;
        this.jumpAnimTick = 0;
        this.charCurr = 1;
        this.doubleJump++;
    }
}

Player.prototype.slide = function () {
    if (world.player.moving.left) {
        world.player.vel.x = -5;
    } else {
        world.player.vel.x = 5;
    }
}

Player.prototype.render = function () {
    let ctx = this.ctx;

    if (this.vel.getDirection() < 0) {
        this.moving.down = true;
    } else {
        this.moving.down = false;
    }

    if (this.isAttacking) {
        if (this.AttackAnimTick % this.AttackAnimTickInterval == 0) {
            if (this.charCurr < this.charAnimCurr.length - 1) {
                this.charCurr++;
            } else {
                this.charCurr = 0;
                let type = Math.round(randomNumber(0, 2));
                if (type == 0) {
                    this.currAttackAnim = this.charAttack1Anim;
                } else if (type == 1) {
                    this.currAttackAnim = this.charAttack2Anim;
                } else {
                    this.currAttackAnim = this.charAttack3Anim;
                }
                this.charAnimCurr = this.currAttackAnim;
            }
        }
        this.AttackAnimTick++;
    } else {
        if (this.moving.up) {
            if (this.jumpAnimTick % this.jumpAimTickIntveral == 0) {
                if (this.charCurr < this.charAnimCurr.length - 1) {
                    this.charCurr++;
                } else {
                    this.charCurr = this.charAnimCurr.length - 1;
                }
            }
            this.jumpAnimTick++;
        } else if (this.moving.down) {
            this.jumpAnimTick = 0;
            this.charCurr = 3;
        } else {
            if (this.vel.x > this.maxVel.x + 0.2 || this.vel < -(this.maxVel.x + 0.2)) {
                this.charAnimCurr = this.charSlideAnim;
            } else if (this.vel.x > this.maxVel.x + 0.08 || this.vel < -(this.maxVel.x + 0.8)) {
                this.charAnimCurr = this.charSlideAnim;
            } else if (this.vel.x > this.maxVel.x + 0.005 || this.vel < -(this.maxVel.x + 0.005)) {
                this.charAnimCurr = this.charSlideAnim;
            } else {
                if (world.tick % world.tickInterval == 0) {
                    if (this.charCurr < this.charAnimCurr.length - 1) {
                        this.charCurr++;
                    } else {
                        this.charCurr = 0;
                    }
                }
            }
        }
    }

    this.currentImage = this.charAnimCurr[this.charCurr];

    if (this.currentImage == null) {
        this.currentImage = this.charAnimCurr[0];
    }
    ctx.translate(0, -this.hitboxheight);
    ctx.beginPath();
    ctx.rect(this.loc.x, this.loc.y, this.hitboxWidth, this.hitboxheight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.translate(-this.charDisplayDisplacement, this.hitboxheight);
}

Player.prototype.CheckCollisions = function () {
    for (let i = 0; i < world.platforms.length; i++) {
        if (this.loc.y >= world.platforms[i].loc.y && this.loc.y < world.platforms[i].loc.y + world.platforms[i].height && (this.loc.x > world.platforms[i].loc.x || this.loc.x + this.hitboxWidth > world.platforms[i].loc.x) && (this.loc.x < world.platforms[i].loc.x + world.platforms[i].width) && (this.moving.down || (!this.moving.down && !this.moving.up))) {
            this.loc.y = world.platforms[i].loc.y + 1;
            this.vel.y = 0;
            this.doubleJump = 0;
        }
    }
    for (let i = 0; i < world.traps.length; i++) {
        //if (this.loc.y >= world.traps[i].collisionLoc.y && this.loc.y < world.traps[i].loc.y + world.traps[i].height && (this.loc.x > world.traps[i].collisionLoc.x || this.loc.x + this.hitboxWidth > world.traps[i].collisionLoc.x) && (this.loc.x < world.traps[i].collisionLoc.x + world.traps[i].width/2)) {
        //    this.health = 0;
        //}
    }
    for (let i = 0; i < world.platforms.length; i++) {
        for (let j = 0; j < world.platforms[i].hostiles.length; j++) {
            this.playerLoc = new JSVector(this.loc.x + world.player.hitboxWidth * 0.5, world.player.loc.y - world.player.hitboxheight / 2);
            this.distance = JSVector.subGetNew(this.playerLoc, world.platforms[i].hostiles[j].loc);
            this.mag = this.distance.getMagnitude();
            if (this.mag < 50) {
                if (this.isAttacking) {
                    world.platforms[i].hostiles.splice(j, 1);
                } else {
                    this.health -= 0.7;
                }
            }
        }
    }
}

Player.prototype.run = function () {
    this.update();
    this.CheckCollisions();
    if (this.health >= 0) {
        this.render();
    }

}
