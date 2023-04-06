// Define the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the colors
const colors = {
    background: '#2c3e50',
    block: '#3498db',
    text: '#fff',
    highlight: '#f1c40f',
    shadow: '#000000'
};

// Define the block size and spacing
const blockSize = 80;
const blockSpacing = 30;

// Define the starting position
let x = canvas.width / 2 - (blockSize + blockSpacing) * 500;
let y = canvas.height / 2;

// Define the blockchain
const blockchain = [];
let previousHash = '0';
for (let i = 0; i < 10000; i++) {
    const block = {
        index: i,
        timestamp: new Date().getTime(),
        data: 'Transaction data',
        previousHash: previousHash,
        hash: 'hash' + i
    };
    blockchain.push(block);
    previousHash = block.hash;
}

// Define the animation speed
const animationSpeed = 10;

// Define the animation variables
let currentBlockIndex = 0;
let currentX = x;
let currentY = y;

// Define the draw function
function draw() {
    // Clear the canvas
    ctx.fillStyle = colors.background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through the blockchain and draw each block
    console.log(blockchain);
    for (let i = 0; i < blockchain.length; i++) {
        const block = blockchain[i];
        const isCurrentBlock = i === currentBlockIndex;

        // Draw the block background
        ctx.fillStyle = isCurrentBlock ? colors.highlight : colors.block;
        drawRoundedRect(currentX, currentY, blockSize, blockSize, 10);
        ctx.fill();

        // Draw the block text
        ctx.fillStyle = colors.text;
        ctx.font = '16px Arial';
        ctx.fillText('Block #' + block.index, currentX + 10, currentY + 20);
        ctx.fillText('Previous Hash:', currentX + 10, currentY + 40);
        ctx.fillText(block.previousHash, currentX + 10, currentY + 60);
        ctx.fillText('Hash:', currentX + 10, currentY + 80);
        ctx.fillText(block.hash, currentX + 10, currentY + 100);

        // Move to the next position
        currentX += blockSize + blockSpacing;
        if (currentX > canvas.width - blockSize - blockSpacing) {
            currentX = x;
            currentY += blockSize + blockSpacing;
        }
    }

    // Update the animation variables
    if (currentBlockIndex < blockchain.length - 1) {
        currentBlockIndex++;
        setTimeout(draw, animationSpeed);
    }
}

function drawRoundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Start the animation
draw();
