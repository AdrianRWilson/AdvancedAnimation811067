function World() {
    this.cnv = document.getElementById('cnv'); //canvas
    this.ctx = this.cnv.getContext('2d'); //context
    this.dims = { //dimensions
        top: -400,
        left: 0,
        bottom: 0,
        right: 6000,
        height: 400,
        width: 6000
    }
    //platforms and ground stuff
    this.groundThickness = 10;//groundthickness
    this.platforms = [];//starting platform array
    this.platformsCleared = 0; //starting platforms cleared
    this.platformAmount = 30; //amount of platforms
    this.loadPlatforms(this.platformAmount); //load the platforms
    this.traps = []; //empty traps array
    this.loadTraps(30); //load traps into empty array
    this.booms = []; //empty booms array
    this.cnvLoc = new JSVector(0, -400); //the canvas locatoin
    this.player = new Player(50, -300, this.ctx, playerAnims); //the player
    this.levelSpeed = 0.2; // unuses but if u need to use for sidescroller just use this as a constant
    this.playerDisplacement = 225; //how far away the player is centered forom the left of the screen
    this.lerpDestination = this.player.loc.x - this.playerDisplacement; //lerp destination for camera using player displacement
    this.cameraStiffness = 0.01; // camera chaseing stifness

    //preview animation stuff
    this.isPreviewing = false;
    this.previewForward = false;
    this.previewBackward = false;
    this.previewFinish = true;

    //parallax stuff
    this.bg1 = new JSVector(0, this.dims.top);
    this.bg2 = new JSVector(0, this.dims.top);
    this.bg3 = new JSVector(0, this.dims.top);

    //music
    this.backgroundMusic = new Audio("assets/scaryForest.mp3");

    //tick for world anims
    this.tickInterval = 30;
    this.tick = 0;

    // size of heart
    this.heartSizeMultiplier = 2;

    //dialgue stuff
    this.displayDialogue = true;
    this.currentDialogue = moveDialogue;
    this.frame = 0;
    this.dialogueSizeMultipler = 0.3;
    this.jumpDialogueAppear = false;
    this.slideDialogueAppear = false;
    this.killDialogueAppear = false;
}

//run function
World.prototype.run = function () {
    this.tick++; // world tick
    this.backgroundMusic.play(); // play backgronud music
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height); //refresh screen
    this.ctx.save(); //save
    this.ctx.translate(-this.cnvLoc.x, -this.cnvLoc.y); //translate to loc pos
    let ctx = this.ctx; // easier ctx reference

    //parallax using looping since its better
    for (let index = -1; index < 5; index++) {
        //ctx.drawImage(background3, this.bg3.x + (this.cnv.width * index), this.bg3.y, this.cnv.width, this.cnv.height);
    }

    for (let index = -1; index < 5; index++) {
        //ctx.drawImage(background2, this.bg2.x + (this.cnv.width * index), this.bg2.y, this.cnv.width, this.cnv.height);
    }

    // ground if you want???
    // for (let index = -1; index < 5; index++) {
    //     ctx.drawImage(background1, this.bg1.x + (this.cnv.width * index), this.bg1.y, this.cnv.width, this.cnv.height);
    // }

    //previe animatoin
    if (this.isPreviewing) {
        if (this.previewForward) {
            this.lerpDestination = this.dims.width - this.cnv.width;
            if (this.cnvLoc.x >= this.lerpDestination - 5) {
                this.previewForward = false;
                this.previewBackward = true;
            }
        } else if (this.previewBackward) {
            this.lerpDestination = this.player.loc.x - this.playerDisplacement;
            if (this.cnvLoc.x <= this.lerpDestination + 5) {
                this.previewBackward = false;
                this.isPreviewing = false;
            }
        }
    } else {
        this.lerpDestination = this.player.loc.x - this.playerDisplacement;
    }
    this.cnvLoc.x = lerp(this.cnvLoc.x, this.lerpDestination, this.cameraStiffness); // chase player with camera
    this.player.run(); //run player
    for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].run(); // run al lthe platforms
    }
    for (let i = 0; i < this.traps.length; i++) {
        this.traps[i].run(); // run all the traps
        if (this.traps[i].isDead) { // make an explisoin if a trap is triggered
            this.booms.push(new Boom(this.traps[i].loc.x, this.traps[i].loc.y, this.ctx));
            this.traps.splice(i, 1);
        }
    }

    for (let i = 0; i < this.booms.length; i++) {
        this.booms[i].run(); // run all the booms
        if (this.booms[i].isDead) {
            this.booms.splice(i, 1); // delete boom after it fades away
        }
    }

    //the most efficient way to do parallax with perecentages
    this.bg2.x = lerp(this.bg2.x, (this.player.loc.x / 2) - this.playerDisplacement, this.cameraStiffness);
    this.bg3.x = lerp(this.bg3.x, (this.player.loc.x / 1.5) - this.playerDisplacement, this.cameraStiffness);

    //lighting
    //ctx.drawImage(darkness, (this.player.loc.x - darkness.width / 2) + 40, this.player.loc.y - darkness.height / 2);

    //KEEP THIS LINE AT THE BOTTOM
    ctx.restore();
    let healthBarLength = (this.player.health / 100); //health bar
    if (healthBarLength <= 0) {
        healthBarLength = 0;
    }
    ctx.drawImage(heartBack, 40, 30, heartBack.width * this.heartSizeMultiplier, heartBack.height * this.heartSizeMultiplier);
    ctx.translate(14 * this.heartSizeMultiplier, 0);
    ctx.drawImage(heartFore, 40, 30, heartFore.width * this.heartSizeMultiplier * healthBarLength, heartFore.height * this.heartSizeMultiplier);
    ctx.translate(-14 * this.heartSizeMultiplier, 0);

    if (this.player.health <= 0) {
        ctx.drawImage(gameOverScreen, 0, 0, this.cnv.width, this.cnv.height);
    }

    //platforms cleared logic
    if (this.platforms.length <= this.platformsCleared) {
        ctx.drawImage(youWinScreen, 0, 0, this.cnv.width, this.cnv.height);
    }


    //dialogue logic
    if (this.player.loc.x > 230 && this.player.loc.x < 550) {
        this.currentDialogue = jumpDialogue;
        if (!this.jumpDialogueAppear) {
            this.jumpDialogueAppear = true;
            this.frame = 1;
        }
    } else if (this.player.loc.x > 550 && this.player.loc.x < 785) {
        this.currentDialogue = slideDialogue;
        if (!this.slideDialogueAppear) {
            this.slideDialogueAppear = true;
            this.frame = 1;
        }
    } else if (this.player.loc.x > 785 && this.player.loc.x < 1000) {
        this.currentDialogue = killDialogue;
        if (!this.killDialogueAppear) {
            this.killDialogueAppear = true;
            this.frame = 1;
        }
    }
    else if (this.player.loc.x > 1000) {
        this.displayDialogue = false;
    }
    if (this.frame >= this.currentDialogue.length - 1) {
        this.frame = this.currentDialogue.length;
    } else {
        this.frame++;
    }
    if (this.displayDialogue) {
        //ctx.drawImage(this.currentDialogue[this.frame - 1], 30, this.dims.height - 70, this.currentDialogue[this.frame - 1].width * this.dialogueSizeMultipler, this.currentDialogue[this.frame - 1].height * this.dialogueSizeMultipler);
        //ctx.drawImage(blob, 40, this.dims.height - 30, 40, 40); //BLOB
    }

}


//load platforms using reference randomness for efficient and playable platforms
World.prototype.loadPlatforms = function (n) {
    for (let i = 0; i < n; i++) {
        if (i == 0) {
            this.platforms[i] = new Platform(1000, this.dims.top / 2, 100, this.groundThickness, this.ctx, false);
        } else {
            if (this.platforms[i - 1].length != 1) {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                let min = 120;
                let max = 200;
                let x = randomNumber(min, max);
                let y = randomNumber((max - x) / 2, -(max - x) / 2);
                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + x, this.platforms[i - 1].loc.y - y, 100, this.groundThickness, this.ctx, false, length);
            } else {
                let length = randomNumber(0, 1);
                length = Math.round(length);
                this.platforms[i] = new Platform(this.platforms[i - 1].loc.x + this.platforms[i - 1].width, this.platforms[i - 1].loc.y, 100, this.groundThickness, this.ctx, false, length);
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        if (i == 3) {
            this.platforms.push(new Platform(60 + (i * 100), this.dims.top / 1.35, 100, this.groundThickness, this.ctx, false, 0, true, i));
        } else if (i == 4) {
            this.platforms.push(new Platform(60 + (i * 100), -1000, 100, this.groundThickness, this.ctx, false, 0, true, i));
        } else {
            this.platforms.push(new Platform(60 + (i * 100), this.dims.top / 2, 100, this.groundThickness, this.ctx, false, 0, true, i));
        }
    }
    //ground if u need???
    //this.platforms.push(new Platform(0, -this.groundThickness, this.dims.width, 30, this.ctx, true));
}

// load all the traps
World.prototype.loadTraps = function (n) {
    for (let i = 0; i < n; i++) {
        this.traps[i] = new Trap(randomNumber(1300, this.dims.width), randomNumber(0, this.dims.top), this.ctx);
    }
}

//previedw level bool
World.prototype.previewLevel = function () {
    this.isPreviewing = true;
    this.previewForward = true;
}
