
window.addEventListener("load", init);
var canvas, context;
var cols = 5;
var rows = 5;
var grid = new Array(cols);

var opened = [];
var closed = [];
var start, end;
var s;


function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    
    for (let col = 0; col < cols; col++) {
        grid[col] = new Array(rows);   
    }
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            grid[col][row] = new Cell(col, row);
        }
    }

    start = grid[0][0];
    end = grid[cols-1][rows-1];
    s = canvas.width/cols;

    opened.push(start);

    animate();
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);

    if (opened.length > 0) {
        var win = 0;
        for (let i = 0; i < opened.length; i++) {
            if(opened[i].f < opened[win].f) {
                win = i;
            }
        }
        var curr = opened[win];
        if (curr === end) {
            console.log("complete");
        }
        RemoveFromArray(opened, curr);
        closed.push(curr);
    } else {

    }

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            grid[col][row].run();
        }
    }

    for (let i = 0; i < closed.length; i++) {
        closed[i].run("red");
    }
    for (let i = 0; i < opened.length; i++) {
        opened[i].run("green");
    }
    requestAnimationFrame(animate); 
}

function RemoveFromArray(array, element){
    for (let i = 0; i < array.length; i++) {
        if (element == array[i]) {
            array.splice(i, 1);
        }
    }
}