function Cell(loc) {
    this.x = loc.x;
    this.y = loc.y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.around = [];
    this.parent;
}

Cell.prototype.run = function(grid) {
    if (this.x < cols - 1) {
      this.around.push(grid[i + 1][j]);
    }
    if (this.x > 0) {
      this.around.push(grid[i - 1][j]);
    }
    if (this.y < rows - 1) {
      this.around.push(grid[i][j + 1]);
    }
    if (this.y > 0) {
      this.around.push(grid[i][j - 1]);
    }
}