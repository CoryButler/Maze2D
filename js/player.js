function Player(maze) {
    var _maze = maze;
    var controlsEnabled = false;
    var stepsTaken = 0;

    window.addEventListener('mazeReady', function() { 
        _maze.markCell(x, y, cellStatus.STEPPED);
        render();
        toggleControls(); }
    );

    var canvas = document.getElementsByTagName("canvas")[0];

    var context = canvas.getContext("2d");

    var x = _maze.startCell().x;
    var y = _maze.startCell().y;
    
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'grey'];
    var spriteColor = "pink";

    this.spriteColor = () => { return spriteColor; }

    document.onkeyup = function(key) {
        if (!controlsEnabled) return;

        var prevX = x;
        var prevY = y;

        if (key.key === 'w' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
        if (key.key === 'a' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
        if (key.key === 's' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
        if (key.key === 'd' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
        if (key.key === 'ArrowUp' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
        if (key.key === 'ArrowLeft' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
        if (key.key === 'ArrowDown' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
        if (key.key === 'ArrowRight' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
        
        if (x !== prevX || y !== prevY) stepsTaken++;
        
        _maze.markCell(x, y, cellStatus.STEPPED);

        if (reachedGoal()) {
            alert("You did it!\n\nGood job.\n\nYou took " + stepsTaken + " steps.");
            toggleControls();
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
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }
}