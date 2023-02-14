function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
}

Cell.prototype.run = function(color) {
    context.beginPath();
    if (color != undefined) {
        context.fillRect(this.x * s, this.y * s, s - 1, s - 1);
    }
    context.strokeRect(this.x * s, this.y * s, s - 1, s - 1);
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = color;
    context.fill();
}
