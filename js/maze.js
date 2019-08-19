function Maze() {
    const getUrlVars = function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    var mazeReady = new Event('mazeReady');
    var doNotRender = false;
    window.addEventListener('mazeReady', function() { 
        setEndCell();
        render();
        doNotRender = true;
      }
    );

    var cellWidth = 28;
    var wallWidth = 4;
    var columnCount = getUrlVars()['w'] !== undefined ? getUrlVars()['w'] : 10;
    var rowCount = getUrlVars()['h'] !== undefined ? getUrlVars()['h'] : 10;
    var width = columnCount * (cellWidth + wallWidth) + wallWidth;
    var height = rowCount * (cellWidth + wallWidth) + wallWidth;
    var cells = [];
    var cellStack = [];
    var visitedCellCount = 0;

    for (var i = 0; i < columnCount; i++) {
        cells.push([]);
        for (var j = 0; j < rowCount; j++) {
            cells[i].push(new MazeCell());
        }
    }

    var startCell = {x: Math.floor(Math.random() * columnCount), y: 0};
    var endCell = {x: 0, y: 0};
    cells[startCell.x][startCell.y].status.push(cellStatus.START);

    var initPos = { x: Math.floor(Math.random() * columnCount), y: Math.floor(Math.random() * rowCount) };
    cellStack.push(initPos);
    visitedCellCount++;

    cells[initPos.x][initPos.y].status.push(cellStatus.VISITED);

    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext("2d");

    this.width = () => { return width; }
    this.height = () => { return height; }
    this.cells = () => { return cells; }
    this.cellWidth = () => { return cellWidth; }
    this.wallWidth = () => { return wallWidth; }
    this.startCell = () => { return startCell; }
    this.columnCount = () => { return columnCount; }
    this.rowCount = () => { return rowCount; }

    var spriteColor;

    this.create = function(color, animate = true) {
        spriteColor = color;
        if (animate)
            createAnimate();
        else
            createInstant();
    }

    const createInstant = function() {
        while (visitedCellCount < columnCount * rowCount) {
            var neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                var nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
    
                switch (nextCell) {
                    case cellStatus.NORTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.NORTH);
                        cells[offsetX(0)][offsetY(-1)].status.push(cellStatus.SOUTH);
                        cellStack.push({x: offsetX(0), y: offsetY(-1)});
                        break;
                    case cellStatus.SOUTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.SOUTH);
                        cells[offsetX(0)][offsetY(1)].status.push(cellStatus.NORTH);
                        cellStack.push({x: offsetX(0), y: offsetY(1)});
                        break;
                    case cellStatus.WEST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.WEST);
                        cells[offsetX(-1)][offsetY(0)].status.push(cellStatus.EAST);
                        cellStack.push({x: offsetX(-1), y: offsetY(0)});
                        break;
                    case cellStatus.EAST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.EAST);
                        cells[offsetX(1)][offsetY(0)].status.push(cellStatus.WEST);
                        cellStack.push({x: offsetX(1), y: offsetY(0)});
                        break;
                }
    
                cells[offsetX(0)][offsetY(0)].status.push(cellStatus.VISITED);
                cells[offsetX(0)][offsetY(0)].x = offsetX(0);
                cells[offsetX(0)][offsetY(0)].y = offsetY(0);
                visitedCellCount++;
            }
            else {
                cellStack.pop();
            }
        }
        render();
        window.dispatchEvent(mazeReady);
    }

    const createAnimate = function() {
        if (visitedCellCount < columnCount * rowCount) {
            var neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                var nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
    
                switch (nextCell) {
                    case cellStatus.NORTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.NORTH);
                        cells[offsetX(0)][offsetY(-1)].status.push(cellStatus.SOUTH);
                        cellStack.push({x: offsetX(0), y: offsetY(-1)});
                        break;
                    case cellStatus.SOUTH:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.SOUTH);
                        cells[offsetX(0)][offsetY(1)].status.push(cellStatus.NORTH);
                        cellStack.push({x: offsetX(0), y: offsetY(1)});
                        break;
                    case cellStatus.WEST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.WEST);
                        cells[offsetX(-1)][offsetY(0)].status.push(cellStatus.EAST);
                        cellStack.push({x: offsetX(-1), y: offsetY(0)});
                        break;
                    case cellStatus.EAST:
                        cells[offsetX(0)][offsetY(0)].status.push(cellStatus.EAST);
                        cells[offsetX(1)][offsetY(0)].status.push(cellStatus.WEST);
                        cellStack.push({x: offsetX(1), y: offsetY(0)});
                        break;
                }
    
                cells[offsetX(0)][offsetY(0)].status.push(cellStatus.VISITED);
                visitedCellCount++;
            }
            else {
                cellStack.pop();
            }
            render();
            setTimeout(function() {createAnimate();}, 1);
        }
        else
        {
            window.dispatchEvent(mazeReady);
        }
    }

    const offsetX = function(x) {
        return cellStack[cellStack.length - 1].x + x;
    }
    
    const offsetY = function(y) {
        return cellStack[cellStack.length - 1].y + y;
    }

    const setEndCell = function () {
        var cellValues = [];
        var currentX = startCell.x;
        var currentY = startCell.y;

        for (var i = 0; i < columnCount; i++) {
            cellValues.push([]);
            for (var j = 0; j < rowCount; j++) {
                cellValues[i].push({ distanceFromStart: 0, decisionsFromStart: 0 });
            }
        }


        var frontier = [cells[currentX][currentY]];
        while (frontier.length > 0) {
            if (cells[frontier[0].x][frontier[0].y].hasStatus(86)) {
                frontier.shift();
                continue;
            }

            // TODO: distance and decision are always 0
            
            var distanceFromStart = cellValues[frontier[0].x][frontier[0].y].distanceFromStart + 1;
            var decisionsFromStart = cellValues[frontier[0].x][frontier[0].y].decisionsFromStart;
            if (getNeighbors(frontier[0]).length >= 3) decisionsFromStart++;
            
            var newFrontier = [];
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.EAST)  && !cells[frontier[0].x + 1][frontier[0].y].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x + 1][frontier[0].y]);
                cellValues[frontier[0].x + 1][frontier[0].y] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.NORTH) && !cells[frontier[0].x][frontier[0].y - 1].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y - 1]);
                cellValues[frontier[0].x][frontier[0].y - 1] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.WEST)  && !cells[frontier[0].x - 1][frontier[0].y].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x - 1][frontier[0].y]);
                cellValues[frontier[0].x - 1][frontier[0].y] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }
            if (cells[frontier[0].x][frontier[0].y].hasStatus(cellStatus.SOUTH) && !cells[frontier[0].x][frontier[0].y + 1].hasStatus(86)) {
                newFrontier.push(cells[frontier[0].x][frontier[0].y + 1]);
                cellValues[frontier[0].x][frontier[0].y + 1] = { distanceFromStart: distanceFromStart, decisionsFromStart: decisionsFromStart };
            }

            cells[frontier[0].x][frontier[0].y].status.push(86);

           frontier.shift();

            newFrontier.forEach(nf => frontier.unshift(nf));
        }

        var bestCell = { x: 0, y: rowCount - 1 };
        var currentDecisions = 0;
        var currentDistance = 0;

        for (var i = 0; i < rowCount; i++) {
            var temp = cellValues[i][rowCount - 1].decisionsFromStart;
            if (cellValues[i][rowCount - 1].decisionsFromStart > currentDecisions) {
                currentDecisions = cellValues[i][rowCount - 1].decisionsFromStart;
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
                console.log("blip");
            }
            else if (cellValues[i][rowCount - 1].decisionsFromStart === currentDecisions && cellValues[i][rowCount - 1].distanceFromStart > currentDistance) {
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
                console.log("bloop");
            }
        }

        endCell = bestCell;
        cells[endCell.x][endCell.y].status.push(cellStatus.END);

        /*
        cellValues[startCell.x][startCell.y] = { distanceFromStart: "#", decisionsFromStart: "#" };
        cellValues[bestCell.x][bestCell.y] = { distanceFromStart: "#", decisionsFromStart: "#" };

        for (var i = 0; i < rowCount; i++) {
            var toLog = "";
            for (var j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].distanceFromStart + " ";
            }
            console.log(toLog);
        }

        for (var i = 0; i < rowCount; i++) {
            var toLog = "";
            for (var j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].decisionsFromStart + " ";
            }
            console.log(toLog);
        }
        */
    }
    
    const getNeighbors = function (cell) {
        var neighbors = [];
        if (cell.hasStatus(cellStatus.EAST))  neighbors.push(cellStatus.EAST);
        if (cell.hasStatus(cellStatus.NORTH)) neighbors.push(cellStatus.NORTH);
        if (cell.hasStatus(cellStatus.WEST))  neighbors.push(cellStatus.WEST);
        if (cell.hasStatus(cellStatus.SOUTH)) neighbors.push(cellStatus.SOUTH);
        return neighbors;
    }

    this.render = function() { if (!doNotRender) render(); }
    const render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        for (var x = 0; x < columnCount; x++) {
            for (var y = 0; y < rowCount; y++) {
                if (x === cellStack[cellStack.length - 1].x && y === cellStack[cellStack.length - 1].y && visitedCellCount < columnCount * rowCount) {
                    context.fillStyle = spriteColor;
                }
                else if (cells[x][y].hasStatus(cellStatus.VISITED)) {
                    context.fillStyle = "#FFFFFF";
                }
                else {
                    context.fillStyle = spriteColor;
                }
                
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth, cellWidth, cellWidth);
    
                if (cells[x][y].hasStatus(cellStatus.SOUTH))
                    context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
                
                if (cells[x][y].hasStatus(cellStatus.EAST))
                    context.fillRect(x * (cellWidth + wallWidth) + wallWidth + cellWidth, y * (cellWidth + wallWidth) + wallWidth, wallWidth, cellWidth);

                if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.START))
                    context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth), cellWidth, wallWidth);

                if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.END))
                    context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);

                context.fillStyle = spriteColor;

                if (cells[x][y].hasStatus(cellStatus.STEPPED)) {
                    if ((cells[x][y].hasStatus(cellStatus.NORTH) &&
                        cells[x][y - 1].hasStatus(cellStatus.STEPPED)) ||
                        cells[x][y].hasStatus(cellStatus.START)) {
                        context.fillRect(x * (cellWidth + wallWidth) + ((cellWidth /2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, wallWidth, -cellWidth);
                    }
                    if ((cells[x][y].hasStatus(cellStatus.SOUTH) &&
                        cells[x][y + 1].hasStatus(cellStatus.STEPPED)) ||
                        cells[x][y].hasStatus(cellStatus.END)) {
                        context.fillRect(x * (cellWidth + wallWidth) + ((cellWidth /2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, wallWidth, cellWidth);
                    }
                    if (cells[x][y].hasStatus(cellStatus.WEST) &&
                        cells[x - 1][y].hasStatus(cellStatus.STEPPED)) {
                        context.fillRect(x * (cellWidth + wallWidth) + ((cellWidth /2) + (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, -cellWidth, wallWidth);
                    }
                    if (cells[x][y].hasStatus(cellStatus.EAST) &&
                        cells[x + 1][y].hasStatus(cellStatus.STEPPED)) {
                        context.fillRect(x * (cellWidth + wallWidth) + ((cellWidth /2) - (wallWidth / 2)) + wallWidth, y * (cellWidth + wallWidth) + ((cellWidth / 2) - (wallWidth / 2)) + wallWidth, cellWidth, wallWidth);
                    }
                }
            }
        }
    }
}