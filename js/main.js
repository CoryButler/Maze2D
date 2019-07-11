var cellWidth = 20;
var wallWidth = 4;

var spriteColor = "pink";

var mazeColumnCount = getUrlVars()['w'] !== undefined ? getUrlVars()['w'] : 20;
var mazeRowCount = getUrlVars()['h'] !== undefined ? getUrlVars()['h'] : 20;
var mazeWidth = mazeColumnCount * (cellWidth + wallWidth) + wallWidth;
var mazeHeight = mazeRowCount * (cellWidth + wallWidth) + wallWidth;
var mazeCells = [];
var cellStatus = { EAST: 0x01, NORTH: 0x02, WEST: 0x04, SOUTH: 0x08, VISITED: 0x10, NOT_ASSIGNED: 0x00 };
var cellStack = [];
var visitedCellCount = 0;

for (var i = 0; i < mazeColumnCount; i++) {
    mazeCells.push([]);
    for (var j = 0; j < mazeRowCount; j++) {
        mazeCells[i].push(cellStatus.NOT_ASSIGNED);
    }
}

var startCell = {x: Math.floor(Math.random() * mazeColumnCount * 0.25), y: 0};
var endCell = {x: Math.floor((Math.random() * 0.25 + 0.75) * mazeColumnCount), y: mazeRowCount - 1};

var initPos = { x: Math.floor(Math.random() * mazeColumnCount), y: Math.floor(Math.random() * mazeRowCount) };
cellStack.push(initPos);
visitedCellCount++;

mazeCells[initPos.x][initPos.y] = cellStatus.VISITED;

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = mazeWidth;
canvas.height = mazeHeight;

var context = canvas.getContext("2d");

var speed = cellWidth + wallWidth;

var x = startCell.x * (cellWidth + wallWidth) + wallWidth;
var y = startCell.y * (cellWidth + wallWidth) + wallWidth;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

setPlayerColor();
createMaze();
render();

document.onkeyup = function(key) {
    if (key.key === 'w' && playerCell() & cellStatus.NORTH) y -= speed;
    if (key.key === 'a' && playerCell() & cellStatus.WEST) x -= speed;
    if (key.key === 's' && playerCell() & cellStatus.SOUTH) y += speed;
    if (key.key === 'd' && playerCell() & cellStatus.EAST) x += speed;
    if (key.key === 'ArrowUp' && playerCell() & cellStatus.NORTH) y -= speed;
    if (key.key === 'ArrowLeft' && playerCell() & cellStatus.WEST) x -= speed;
    if (key.key === 'ArrowDown' && playerCell() & cellStatus.SOUTH) y += speed;
    if (key.key === 'ArrowRight' && playerCell() & cellStatus.EAST) x += speed;

    if (x < wallWidth) x = wallWidth;
    if (x > canvas.width - cellWidth - wallWidth) x = canvas.width - cellWidth - wallWidth;

    if (y < wallWidth) y = wallWidth;
    if (y > canvas.height - cellWidth - wallWidth) y = canvas.height - cellWidth - wallWidth;
    
    render();

    if (reachedGoal()) alert("You did it!\n\nGood job.");
}

function render() {
    drawBackground();
    drawPlayer();
}

function reachedGoal() {
    return x === endCell.x * (cellWidth + wallWidth) + wallWidth && y === endCell.y * (cellWidth + wallWidth) + wallWidth;
}

function playerCell() {
    return mazeCells[(x - wallWidth) / (cellWidth + wallWidth)][(y - wallWidth) / (cellWidth + wallWidth)];
}

function createMaze() {
    while (visitedCellCount < mazeColumnCount * mazeRowCount) {
        var neighbors = [];

        if (cellStack[cellStack.length - 1].y > 0 && mazeCells[offsetX(0)][offsetY(-1)] === cellStatus.NOT_ASSIGNED)
            neighbors.push(cellStatus.NORTH);

        if (cellStack[cellStack.length - 1].y < mazeRowCount - 1 && mazeCells[offsetX(0)][offsetY(1)] === cellStatus.NOT_ASSIGNED)
            neighbors.push(cellStatus.SOUTH);

        if (cellStack[cellStack.length - 1].x > 0 && mazeCells[offsetX(-1)][offsetY(0)] === cellStatus.NOT_ASSIGNED)
            neighbors.push(cellStatus.WEST);

        if (cellStack[cellStack.length - 1].x < mazeColumnCount - 1 && mazeCells[offsetX(1)][offsetY(0)] === cellStatus.NOT_ASSIGNED)
            neighbors.push(cellStatus.EAST);

        if (neighbors.length > 0) {
            var nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];

            switch (nextCell) {
                case cellStatus.NORTH:
                    mazeCells[offsetX(0)][offsetY(0)] |= cellStatus.NORTH;
                    mazeCells[offsetX(0)][offsetY(-1)] |= cellStatus.SOUTH;
                    cellStack.push({x: offsetX(0), y: offsetY(-1)});
                    break;
                case cellStatus.SOUTH:
                    mazeCells[offsetX(0)][offsetY(0)] |= cellStatus.SOUTH;
                    mazeCells[offsetX(0)][offsetY(1)] |= cellStatus.NORTH;
                    cellStack.push({x: offsetX(0), y: offsetY(1)});
                    break;
                case cellStatus.WEST:
                    mazeCells[offsetX(0)][offsetY(0)] |= cellStatus.WEST;
                    mazeCells[offsetX(-1)][offsetY(0)] |= cellStatus.EAST;
                    cellStack.push({x: offsetX(-1), y: offsetY(0)});
                    break;
                case cellStatus.EAST:
                    mazeCells[offsetX(0)][offsetY(0)] |= cellStatus.EAST;
                    mazeCells[offsetX(1)][offsetY(0)] |= cellStatus.WEST;
                    cellStack.push({x: offsetX(1), y: offsetY(0)});
                    break;
            }

            mazeCells[offsetX(0)][offsetY(0)] |= cellStatus.VISITED;
            visitedCellCount++;
        }
        else {
            cellStack.pop();
        }
    }
}

function offsetX(x) {
    return cellStack[cellStack.length - 1].x + x;
}

function offsetY(y) {
    return cellStack[cellStack.length - 1].y + y;
}

function setPlayerColor(pretext) {
    if (pretext === undefined) pretext = "";
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
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < mazeColumnCount; x++) {
        for (var y = 0; y < mazeRowCount; y++) {
            if (mazeCells[x][y] !== cellStatus.NOT_ASSIGNED)
                context.fillStyle = "#FFFFFF";
            else
                context.fillStyle = "#0000FF";
            
            context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth, cellWidth, cellWidth);

            if (mazeCells[x][y] & cellStatus.SOUTH)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
            
            if (mazeCells[x][y] & cellStatus.EAST)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth + cellWidth, y * (cellWidth + wallWidth) + wallWidth, wallWidth, cellWidth);
        
            if (x === startCell.x && y === startCell.y)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth), cellWidth, wallWidth);
    
            if (x === endCell.x && y === endCell.y)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
        }
    }
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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}