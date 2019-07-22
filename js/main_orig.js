var cellWidth = 20;
var wallWidth = 4;

var spriteColor = "pink";

var mazeColumnCount = getUrlVars()['w'] !== undefined ? getUrlVars()['w'] : 20;
var mazeRowCount = getUrlVars()['h'] !== undefined ? getUrlVars()['h'] : 20;
var mazeWidth = mazeColumnCount * (cellWidth + wallWidth) + wallWidth;
var mazeHeight = mazeRowCount * (cellWidth + wallWidth) + wallWidth;
var mazeCells = [];
var cellStatus = { EAST: 0, NORTH: 1, WEST: 2, SOUTH: 3, VISITED: 4, START: 5, END: 6 };
var cellStack = [];
var visitedCellCount = 0;

for (var i = 0; i < mazeColumnCount; i++) {
    mazeCells.push([]);
    for (var j = 0; j < mazeRowCount; j++) {
        mazeCells[i].push(new MazeCell());
    }
}

var startCell = {x: Math.floor(Math.random() * mazeColumnCount * 0.25), y: 0};
var endCell = {x: Math.floor((Math.random() * 0.25 + 0.75) * mazeColumnCount), y: mazeRowCount - 1};

var initPos = { x: Math.floor(Math.random() * mazeColumnCount), y: Math.floor(Math.random() * mazeRowCount) };
cellStack.push(initPos);
visitedCellCount++;

mazeCells[initPos.x][initPos.y].status.push(cellStatus.VISITED);

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = mazeWidth;
canvas.height = mazeHeight;

var context = canvas.getContext("2d");

var speed = cellWidth + wallWidth;

var x = startCell.x * (cellWidth + wallWidth) + wallWidth;
var y = startCell.y * (cellWidth + wallWidth) + wallWidth;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown'];

setPlayerColor();
//createMaze();
//render();

document.onkeyup = function(key) {
    if (key.key === 'w' && playerCell().status.indexOf(cellStatus.NORTH) >= 0) y -= speed;
    if (key.key === 'a' && playerCell().status.indexOf(cellStatus.WEST) >= 0) x -= speed;
    if (key.key === 's' && playerCell().status.indexOf(cellStatus.SOUTH) >= 0) y += speed;
    if (key.key === 'd' && playerCell().status.indexOf(cellStatus.EAST) >= 0) x += speed;
    if (key.key === 'ArrowUp' && playerCell().status.indexOf(cellStatus.NORTH) >= 0) y -= speed;
    if (key.key === 'ArrowLeft' && playerCell().status.indexOf(cellStatus.WEST) >= 0) x -= speed;
    if (key.key === 'ArrowDown' && playerCell().status.indexOf(cellStatus.SOUTH) >= 0) y += speed;
    if (key.key === 'ArrowRight' && playerCell().status.indexOf(cellStatus.EAST) >= 0) x += speed;

    if (x < wallWidth) x = wallWidth;
    if (x > canvas.width - cellWidth - wallWidth) x = canvas.width - cellWidth - wallWidth;

    if (y < wallWidth) y = wallWidth;
    if (y > canvas.height - cellWidth - wallWidth) y = canvas.height - cellWidth - wallWidth;
    
    render();

    if (reachedGoal()) alert("You did it!\n\nGood job.");
}

function render(isDrawPlayer = true) {
    drawBackground();
    if (isDrawPlayer)
    drawPlayer();
}

function reachedGoal() {
    console.log(playerCell());
    return playerCell().status.indexOf(cellStatus.END) >= 0;
}

function playerCell() {
    return mazeCells[(x - wallWidth) / (cellWidth + wallWidth)][(y - wallWidth) / (cellWidth + wallWidth)];
}

function createMaze() {
    if (visitedCellCount < mazeColumnCount * mazeRowCount) {
        var neighbors = [];

        if (cellStack[cellStack.length - 1].y > 0 && mazeCells[offsetX(0)][offsetY(-1)].status.length === 0)
            neighbors.push(cellStatus.NORTH);

        if (cellStack[cellStack.length - 1].y < mazeRowCount - 1 && mazeCells[offsetX(0)][offsetY(1)].status.length === 0)
            neighbors.push(cellStatus.SOUTH);

        if (cellStack[cellStack.length - 1].x > 0 && mazeCells[offsetX(-1)][offsetY(0)].status.length === 0)
            neighbors.push(cellStatus.WEST);

        if (cellStack[cellStack.length - 1].x < mazeColumnCount - 1 && mazeCells[offsetX(1)][offsetY(0)].status.length === 0)
            neighbors.push(cellStatus.EAST);

        if (neighbors.length > 0) {
            var nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];

            switch (nextCell) {
                case cellStatus.NORTH:
                    mazeCells[offsetX(0)][offsetY(0)].status.push(cellStatus.NORTH);
                    mazeCells[offsetX(0)][offsetY(-1)].status.push(cellStatus.SOUTH);
                    cellStack.push({x: offsetX(0), y: offsetY(-1)});
                    break;
                case cellStatus.SOUTH:
                    mazeCells[offsetX(0)][offsetY(0)].status.push(cellStatus.SOUTH);
                    mazeCells[offsetX(0)][offsetY(1)].status.push(cellStatus.NORTH);
                    cellStack.push({x: offsetX(0), y: offsetY(1)});
                    break;
                case cellStatus.WEST:
                    mazeCells[offsetX(0)][offsetY(0)].status.push(cellStatus.WEST);
                    mazeCells[offsetX(-1)][offsetY(0)].status.push(cellStatus.EAST);
                    cellStack.push({x: offsetX(-1), y: offsetY(0)});
                    break;
                case cellStatus.EAST:
                    mazeCells[offsetX(0)][offsetY(0)].status.push(cellStatus.EAST);
                    mazeCells[offsetX(1)][offsetY(0)].status.push(cellStatus.WEST);
                    cellStack.push({x: offsetX(1), y: offsetY(0)});
                    break;
            }

            mazeCells[offsetX(0)][offsetY(0)].status.push(cellStatus.VISITED);
            visitedCellCount++;
        }
        else {
            cellStack.pop();
        }
        render(false);
        setTimeout(function() {createMaze();}, 1);
    }
    else
    {
        mazeCells[startCell.x][startCell.y].status.push(cellStatus.START);
        mazeCells[endCell.x][endCell.y].status.push(cellStatus.END);

        render();
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

        createMaze();
    }
}

function drawBackground() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < mazeColumnCount; x++) {
        for (var y = 0; y < mazeRowCount; y++) {
            if (x === cellStack[cellStack.length - 1].x && y === cellStack[cellStack.length - 1].y && visitedCellCount < mazeColumnCount * mazeRowCount)
                context.fillStyle = spriteColor;
            else if (mazeCells[x][y].status.length > 0)
                context.fillStyle = "#FFFFFF";
            else
                context.fillStyle = spriteColor;
            
            context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth, cellWidth, cellWidth);

            if (mazeCells[x][y].status.indexOf(cellStatus.SOUTH) >= 0)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
            
            if (mazeCells[x][y].status.indexOf(cellStatus.EAST) >= 0)
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth + cellWidth, y * (cellWidth + wallWidth) + wallWidth, wallWidth, cellWidth);
        }
    }

    context.fillRect(startCell.x * (cellWidth + wallWidth) + wallWidth, startCell.y * (cellWidth + wallWidth), cellWidth, wallWidth);
    context.fillRect(endCell.x * (cellWidth + wallWidth) + wallWidth, endCell.y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
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