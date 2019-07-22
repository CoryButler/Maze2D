function Maze() {
    var mazeReady = new Event('mazeReady');
    var doNotRender = false;
    window.addEventListener('mazeReady', function() { 
        doNotRender = true;
      }
    );

    const getUrlVars = function() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }
    var cellWidth = 28;
    var wallWidth = 4;
    var columnCount = getUrlVars()['w'] !== undefined ? getUrlVars()['w'] : 20;
    var rowCount = getUrlVars()['h'] !== undefined ? getUrlVars()['h'] : 20;
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

    var startCell = {x: Math.floor(Math.random() * columnCount * 0.25), y: 0};
    var endCell = {x: Math.floor((Math.random() * 0.25 + 0.75) * columnCount), y: rowCount - 1};
    cells[startCell.x][startCell.y].status.push(cellStatus.START);
    cells[endCell.x][endCell.y].status.push(cellStatus.END);

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

    this.markCell = function(x, y, status) {
        if (!cells[x][y].hasStatus(status))
            cells[x][y].status.push(status);
    }
}