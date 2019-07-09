

var cellWidth = 24;
var spriteColor = "#FF0055";

var mazeColumnCount = 10;
var mazeRowCount = 10;
var mazeWidth = cellWidth * mazeColumnCount;
var mazeHeight = cellWidth * mazeRowCount;
var mazeCells = [];
var cellStatus = { EAST: 0, NORTH: 1, WEST: 2, SOUTH: 3, VISITED: 4, NOT_ASSIGNED: 5 };
var visitedCells = [];

for (var i = 0; i < mazeColumnCount; i++) {
    mazeCells.push([]);
    for (var j = 0; j < mazeRowCount; j++) {
        mazeCells[i].push(cellStatus.NOT_ASSIGNED);
    }
}

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = mazeWidth;
canvas.height = mazeHeight;

var context = canvas.getContext("2d");

var speed = cellWidth * 0.5;

var x = 0;
var y = 0;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

setPlayerColor();
drawBackground();
drawPlayer();

document.onkeydown = function(key) {
    if (key.key === 'w') y -= speed;
    if (key.key === 'a') x -= speed;
    if (key.key === 's') y += speed;
    if (key.key === 'd') x += speed;
    if (key.key === 'ArrowUp') y -= speed;
    if (key.key === 'ArrowLeft') x -= speed;
    if (key.key === 'ArrowDown') y += speed;
    if (key.key === 'ArrowRight') x += speed;

    if (x < 0) x = 0;
    if (x > canvas.width - cellWidth) x = canvas.width - cellWidth;

    if (y < 0) y = 0;
    if (y > canvas.height - cellWidth) y = canvas.height - cellWidth;

    drawBackground();
    drawPlayer();
}

function setPlayerColor(pretext) {
    spriteColor = prompt(pretext + "What color do you want to be?", "pink").toLowerCase();
    if (!colors.some(c => c === spriteColor)) {
        setPlayerColor("Sorry, you cannot be " + spriteColor + ".\n");
    }
    else {
        switch (spriteColor) {
            case "pink":
                spriteColor = "#FF3399";
                break;
            case "green":
                spriteColor = "#00CC00";
                break;
        }
    }
}

function drawBackground() {
    context.fillStyle = "#555555";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    context.beginPath();
    context.arc(x + cellWidth / 2, y + cellWidth / 2, cellWidth / 2, 0, Math.PI * 2);
    context.fillStyle = spriteColor;
    context.stroke();
    context.fill();

    context.beginPath();
    context.arc(x + cellWidth / 2, y + cellWidth / 2, cellWidth / 3, 0, Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(x + cellWidth * 0.35, y + cellWidth * 0.35, cellWidth / 12, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.arc(x + cellWidth * 0.65, y + cellWidth * 0.35, cellWidth / 12, 0, Math.PI * 2);
    context.stroke();
}