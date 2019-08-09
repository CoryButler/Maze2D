const aiTypes = { RANDOM: 0, RANDOM_TURNS: 1, UNVISITED_TURNS: 2, RIGHT_HAND: 3, LEFT_HAND: 4, DIJKSTRA: 5, A_STAR: 6 };
const aiSpeeds = { VERY_SLOW: 2000, SLOW: 1000, NORMAL: 500, FAST: 250, VERY_FAST: 125, SUPER_FAST: 1, TELEPORT: 0 };

function Ai (maze, aiType = aiTypes.UNVISITED_TURNS, aiSpeed = aiSpeeds.NORMAL) {
    var _aiType = aiType;
    var _maze = maze;
    var controlsEnabled = false;
    var prevDirection = cellStatus.SOUTH;
    var stepsTaken = 0;

    window.addEventListener('mazeReady', function() {
        toggleControls();
        render();
        logicLoop();  }
    );

    var _aiSpeed = aiSpeed;

    var canvasTrail = document.createElement("canvas");
    canvasTrail.width = _maze.width();
    canvasTrail.height = _maze.height();
    document.getElementsByTagName("body")[0].appendChild(canvasTrail);

    var canvas = document.createElement("canvas");
    canvas.width = _maze.width();
    canvas.height = _maze.height();
    document.getElementsByTagName("body")[0].appendChild(canvas);
    
    var context = canvas.getContext("2d");
    var contextTrail = canvasTrail.getContext("2d");

    var x = _maze.startCell().x;
    var y = _maze.startCell().y;
    
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'grey'];
    var spriteColor = colors[Math.floor(Math.random() * colors.length)];
    contextTrail.fillStyle = spriteColor;

    this.spriteColor = () => { return spriteColor; }
    this.canvasSprite = () => { return canvas; }
    this.canvasTrail = () => { return canvasTrail; }
    
    var logicLoop = function() {
        if (!controlsEnabled) return;

        if (reachedGoal())  {
            var aiNames = invertJson(aiTypes);
            alert("AI_" + aiNames[_aiType] + " reached the end in " + stepsTaken + " steps.");
            toggleControls();
            return;
        }

        var direction;

        switch(_aiType) {
            case aiTypes.RANDOM:
                direction = random();
                break;
            case aiTypes.RANDOM_TURNS:
                direction = randomTurns();
                break;
            case aiTypes.UNVISITED_TURNS:
                direction = unvisitedTurns();
                break;
            case aiTypes.RIGHT_HAND:
                direction = rightHand();
                break;
            case aiTypes.LEFT_HAND:
                direction = leftHand();
                break;
            case aiTypes.DIJKSTRA:
                direction = dijkstra();
                break;
            case aiTypes.A_STAR:
                direction = aStar();
                break;
        }

        if (direction === cellStatus.NORTH) y -= 1;
        if (direction === cellStatus.SOUTH) y += 1;
        if (direction === cellStatus.WEST) x -= 1;
        if (direction === cellStatus.EAST) x += 1;
    
        if (x < 0) x = 0;
        if (x > _maze.columnCount() - 1) x = _maze.columnCount() - 1;
    
        if (y < 0) y = 0;
        if (y > _maze.rowCount() - 1) y = _maze.rowCount() - 1;

        stepsTaken++;

        if (_aiSpeed === aiSpeeds.TELEPORT){
            try {
                logicLoop();
            }
            catch {
                setTimeout(function() { logicLoop(); }, _aiSpeed);
            }
        }
        else setTimeout(function() { logicLoop(); }, _aiSpeed);
    }

    const random = function () {
        var neighbors = getNeighbors();

        return neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    const randomTurns = function () {
        var neighbors = getNeighbors();

        var direction = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (neighbors.length === 1 && stepsTaken > 0) prevDirection = opposite(prevDirection);

        while (direction === opposite(prevDirection)) {
            direction = neighbors[Math.floor(Math.random() * neighbors.length)];
        }
        prevDirection = direction;
        
        return direction;
    }

    const unvisitedTurns = function () {
        var neighbors = getNeighbors();

        var direction = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (neighbors.length === 1) prevDirection = opposite(prevDirection);

        else {
            while (direction === opposite(prevDirection) || (cellWasStepped(direction) && neighbors.some(n => !cellWasStepped(n)))) {
                direction = neighbors[Math.floor(Math.random() * neighbors.length)];
            }
        }
        prevDirection = direction;
        
        return direction;
    }

    const rightHand = function () {
        var turnOrder = [ cellStatus.NORTH, cellStatus.EAST, cellStatus.SOUTH, cellStatus.WEST ];
        var neighbors = getNeighbors();
        var direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) + 1), turnOrder.length) ];
        var turnsAttempted = 0;

        while (!neighbors.some(n => n === direction)) {
            direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) - turnsAttempted), turnOrder.length) ];
            turnsAttempted++;
        }
        
        prevDirection = direction;        
        return direction;
    }

    const leftHand = function () {
        var turnOrder = [ cellStatus.NORTH, cellStatus.EAST, cellStatus.SOUTH, cellStatus.WEST ];
        var neighbors = getNeighbors();
        var direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) - 1), turnOrder.length) ];
        var turnsAttempted = 0;

        while (!neighbors.some(n => n === direction)) {
            direction = turnOrder[ modulo((turnOrder.indexOf(prevDirection) + turnsAttempted), turnOrder.length) ];
            turnsAttempted++;
        }
        
        prevDirection = direction;        
        return direction;
    }

    const getNeighbors = function () {
        var neighbors = [];
        if (playerCell().hasStatus(cellStatus.EAST)) neighbors.push(cellStatus.EAST);
        if (playerCell().hasStatus(cellStatus.NORTH)) neighbors.push(cellStatus.NORTH);
        if (playerCell().hasStatus(cellStatus.WEST)) neighbors.push(cellStatus.WEST);
        if (playerCell().hasStatus(cellStatus.SOUTH)) neighbors.push(cellStatus.SOUTH);
        return neighbors;
    }

    const cellWasStepped = function (direction) {
        switch (direction) {
            case cellStatus.NORTH:
                return _maze.cells()[x][y].hasStatus(cellStatus.STEPPED);
            case cellStatus.SOUTH:
                return _maze.cells()[x][y].hasStatus(cellStatus.STEPPED);
            case cellStatus.WEST:
                return _maze.cells()[x][y].hasStatus(cellStatus.STEPPED);
            case cellStatus.EAST:
                return _maze.cells()[x][y].hasStatus(cellStatus.STEPPED);
        }
    }

    const opposite = function (dir) {
        switch (dir) {
            case cellStatus.NORTH:
                return cellStatus.SOUTH;
            case cellStatus.SOUTH:
                return cellStatus.NORTH;
            case cellStatus.WEST:
                return cellStatus.EAST;
            case cellStatus.EAST:
                return cellStatus.WEST;
        }
    }

    this.setColor = function (pretext) {
        if (pretext === undefined) pretext = "";
        spriteColor = prompt(pretext + "What color do you want to be?", "pink").toLowerCase();
        if (!colors.some(c => c === spriteColor)) {
            this.setColor("Sorry, you cannot be " + spriteColor + ".\n");
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

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().hasStatus(cellStatus.END);
    }

    const playerCell = function() {
        return _maze.cells()[x][y];
    }

    this.render = () => { render(); }
    const render = function() {
        if (!controlsEnabled) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        var screenSpaceX = toScreenSpace(x);
        var screenSpaceY = toScreenSpace(y);

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() / 2, screenSpaceY + _maze.cellWidth() / 2, _maze.cellWidth() / 2, 0, Math.PI * 2);
        context.fillStyle = spriteColor;
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() / 2, screenSpaceY + _maze.cellWidth() / 2, _maze.cellWidth() / 3, 0, Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() * 0.35, screenSpaceY + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + _maze.cellWidth() * 0.65, screenSpaceY + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        contextTrail.fillRect(screenSpaceX + _maze.wallWidth() * 2, screenSpaceY + _maze.wallWidth() * 2, _maze.cellWidth() - _maze.wallWidth() * 4, _maze.cellWidth() - _maze.wallWidth() * 4);
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }
}