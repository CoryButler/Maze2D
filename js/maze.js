function Maze(width = 32, height = 16, cellWidth = 14, wallWidth = 2) {
    let mazeReady = new Event('mazeReady');
    let doNotRender = false;
    window.addEventListener('mazeReady', function() { 
        setEndCell();
        render();
        doNotRender = true;
      }
    );

    let _cellWidth = cellWidth;
    let _wallWidth = wallWidth;
    let columnCount = width;
    let rowCount = height;
    let _width = columnCount * (_cellWidth + _wallWidth) + _wallWidth;
    let _height = rowCount * (_cellWidth + _wallWidth) + _wallWidth;
    let cells = [];
    let cellStack = [];
    let visitedCellCount = 0;

    for (let i = 0; i < columnCount; i++) {
        cells.push([]);
        for (let j = 0; j < rowCount; j++) {
            cells[i].push(new MazeCell());
        }
    }

    let startCell = {x: Math.floor(Math.random() * columnCount), y: 0};
    let endCell = {x: 0, y: 0};
    cells[startCell.x][startCell.y].status.push(cellStatus.START);

    let initPos = { x: Math.floor(Math.random() * columnCount), y: Math.floor(Math.random() * rowCount) };
    cellStack.push(initPos);
    visitedCellCount++;

    cells[initPos.x][initPos.y].status.push(cellStatus.VISITED);

    let canvas = document.createElement("canvas");
    document.getElementsByTagName("body")[0].appendChild(canvas);
    canvas.width = _width;
    canvas.height = _height;

    let context = canvas.getContext("2d");

    this.width = () => { return _width; }
    this.height = () => { return _height; }
    this.cells = () => { return cells; }
    this.cellWidth = () => { return _cellWidth; }
    this.wallWidth = () => { return _wallWidth; }
    this.startCell = () => { return startCell; }
    this.columnCount = () => { return columnCount; }
    this.rowCount = () => { return rowCount; }

    let spriteColor;

    this.create = function(color, animate = true) {
        spriteColor = color;
        if (animate)
            createAnimate();
        else
            createInstant();
    }

    const createInstant = function() {
        while (visitedCellCount < columnCount * rowCount) {
            let neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
    
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
            let neighbors = [];
    
            if (cellStack[cellStack.length - 1].y > 0 && !cells[offsetX(0)][offsetY(-1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.NORTH);
    
            if (cellStack[cellStack.length - 1].y < rowCount - 1 && !cells[offsetX(0)][offsetY(1)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.SOUTH);
    
            if (cellStack[cellStack.length - 1].x > 0 && !cells[offsetX(-1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.WEST);
    
            if (cellStack[cellStack.length - 1].x < columnCount - 1 && !cells[offsetX(1)][offsetY(0)].hasStatus(cellStatus.VISITED))
                neighbors.push(cellStatus.EAST);
    
            if (neighbors.length > 0) {
                let nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
    
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
        let cellValues = [];
        let currentX = startCell.x;
        let currentY = startCell.y;

        for (let i = 0; i < columnCount; i++) {
            cellValues.push([]);
            for (let j = 0; j < rowCount; j++) {
                cellValues[i].push({});
            }
        }

        cellValues[currentX][currentY].distanceFromStart = 0;
        cellValues[currentX][currentY].decisionsFromStart = 0;


        let frontier = [cells[currentX][currentY]];
        while (frontier.length > 0) {
            if (cells[frontier[0].x][frontier[0].y].hasStatus(86)) {
                frontier.shift();
                continue;
            }
            
            let distanceFromStart = cellValues[frontier[0].x][frontier[0].y].distanceFromStart + 1;
            let decisionsFromStart = cellValues[frontier[0].x][frontier[0].y].decisionsFromStart;
            if (getNeighbors(frontier[0]).length >= 3) decisionsFromStart++;
            
            let newFrontier = [];
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

            newFrontier.forEach(nf => {
                nf.distanceFromStart = distanceFromStart;
                nf.decisionsFromStart = decisionsFromStart;
                frontier.unshift(nf);
            });
        }

        let bestCell = { x: 0, y: rowCount - 1 };
        let currentDecisions = 0;
        let currentDistance = 0;

        for (let i = 0; i < columnCount; i++) {
            if (cellValues[i][rowCount - 1].decisionsFromStart > currentDecisions) {
                currentDecisions = cellValues[i][rowCount - 1].decisionsFromStart;
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
            }
            else if (cellValues[i][rowCount - 1].decisionsFromStart === currentDecisions && cellValues[i][rowCount - 1].distanceFromStart > currentDistance) {
                currentDistance = cellValues[i][rowCount - 1].distanceFromStart;
                bestCell.x = i;
            }
        }

        endCell = bestCell;
        cells[endCell.x][endCell.y].status.push(cellStatus.END);

        /*
        cellValues[startCell.x][startCell.y] = { distanceFromStart: "#", decisionsFromStart: "#" };
        cellValues[bestCell.x][bestCell.y] = { distanceFromStart: "#", decisionsFromStart: "#" };

        for (let i = 0; i < rowCount; i++) {
            let toLog = "";
            for (let j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].distanceFromStart + " ";
            }
            console.log(toLog);
        }

        for (let i = 0; i < rowCount; i++) {
            let toLog = "";
            for (let j = 0; j < columnCount; j++) {
                toLog += cellValues[j][i].decisionsFromStart + " ";
            }
            console.log(toLog);
        }
        */
    }
    
    const getNeighbors = function (cell) {
        let neighbors = [];
        if (cell.hasStatus(cellStatus.EAST))  neighbors.push(cellStatus.EAST);
        if (cell.hasStatus(cellStatus.NORTH)) neighbors.push(cellStatus.NORTH);
        if (cell.hasStatus(cellStatus.WEST))  neighbors.push(cellStatus.WEST);
        if (cell.hasStatus(cellStatus.SOUTH)) neighbors.push(cellStatus.SOUTH);
        return neighbors;
    }

    this.render = function() { if (!doNotRender) render(); }
    const render = function() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, _width, _height);
        for (let x = 0; x < columnCount; x++) {
            for (let y = 0; y < rowCount; y++) {
                if (x === cellStack[cellStack.length - 1].x && y === cellStack[cellStack.length - 1].y && visitedCellCount < columnCount * rowCount) {
                    context.fillStyle = spriteColor;
                }
                else if (cells[x][y].hasStatus(cellStatus.VISITED)) {
                    context.fillStyle = "#FFFFFF";
                }
                else {
                    context.fillStyle = spriteColor;
                }
                
                context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth, _cellWidth, _cellWidth);
    
                if (cells[x][y].hasStatus(cellStatus.SOUTH))
                    context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, _cellWidth, _wallWidth);
                
                if (cells[x][y].hasStatus(cellStatus.EAST))
                    context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, y * (_cellWidth + _wallWidth) + _wallWidth, _wallWidth, _cellWidth);

                if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.START))
                    context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth), _cellWidth, _wallWidth);

                if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.END))
                    context.fillRect(x * (_cellWidth + _wallWidth) + _wallWidth, y * (_cellWidth + _wallWidth) + _wallWidth + _cellWidth, _cellWidth, _wallWidth);

                context.fillStyle = spriteColor;

                if (cells[x][y].hasStatus(cellStatus.STEPPED)) {
                    if ((cells[x][y].hasStatus(cellStatus.NORTH) &&
                        cells[x][y - 1].hasStatus(cellStatus.STEPPED)) ||
                        cells[x][y].hasStatus(cellStatus.START)) {
                        context.fillRect(x * (_cellWidth + _wallWidth) + ((_cellWidth /2) - (_wallWidth / 2)) + _wallWidth, y * (_cellWidth + _wallWidth) + ((_cellWidth / 2) - (_wallWidth / 2)) + _wallWidth, _wallWidth, -_cellWidth);
                    }
                    if ((cells[x][y].hasStatus(cellStatus.SOUTH) &&
                        cells[x][y + 1].hasStatus(cellStatus.STEPPED)) ||
                        cells[x][y].hasStatus(cellStatus.END)) {
                        context.fillRect(x * (_cellWidth + _wallWidth) + ((_cellWidth /2) - (_wallWidth / 2)) + _wallWidth, y * (_cellWidth + _wallWidth) + ((_cellWidth / 2) - (_wallWidth / 2)) + _wallWidth, _wallWidth, _cellWidth);
                    }
                    if (cells[x][y].hasStatus(cellStatus.WEST) &&
                        cells[x - 1][y].hasStatus(cellStatus.STEPPED)) {
                        context.fillRect(x * (_cellWidth + _wallWidth) + ((_cellWidth /2) + (_wallWidth / 2)) + _wallWidth, y * (_cellWidth + _wallWidth) + ((_cellWidth / 2) - (_wallWidth / 2)) + _wallWidth, -_cellWidth, _wallWidth);
                    }
                    if (cells[x][y].hasStatus(cellStatus.EAST) &&
                        cells[x + 1][y].hasStatus(cellStatus.STEPPED)) {
                        context.fillRect(x * (_cellWidth + _wallWidth) + ((_cellWidth /2) - (_wallWidth / 2)) + _wallWidth, y * (_cellWidth + _wallWidth) + ((_cellWidth / 2) - (_wallWidth / 2)) + _wallWidth, _cellWidth, _wallWidth);
                    }
                }
            }
        }
    }
}