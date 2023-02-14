function Grid(cnvHeight, cnvWidth) {
    this.cols = cnvWidth/10;
    this.rows = cnvHeight/10;
    this.grid = new Array(cols); //array lenght
    this.open = [];
    this.closed = [];
    this.start;
    this.end;
    this.path = [];
    this.init();
}

Grid.prototype.init = function () {
    for (let i = 0; i < this.cols; i++) {
        this.grid[i] = new Array(this.rows);
    }
    for (let i = 0; i < this.cols; i++) {
        for (let k = 0; k < this.cols; k++) {
            this.grid[i][k] = new Cell(i, k);
        }
    }
    for (let i = 0; i < this.cols; i++) {
        for (let k = 0; k < this.cols; k++) {
            this.grid[i][k].run(this.grid);
        }
    }

    this.start = this.grid[0][0];
    this.end = this.grid[this.cols - 1][this.rows - 1];
    this.open.push(this.start);
    console.log(this.grid);
}

Grid.prototype.update = function () {
    
}

Grid.prototype.render = function () {
    
}

Grid.prototype.run = function () {
    this.update();
    this.render();
}

//https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
    return d1 + d2;
}