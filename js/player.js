import { aiTypes, cellStatus, isPaused, playerColors, aiSpeeds } from "./enums.js";

export default function Player(maze, id) {
    var _maze = maze;
    var _id = id;
    var controlsEnabled = false;
    var stepsTaken = 0;

    window.addEventListener('mazeReady', function() {
        toggleControls();
        render(); 
    });

    var cells = _maze.cells().slice();

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
    
    var spriteColor = playerColors[Math.floor(Math.random() * playerColors.length)];
    contextTrail.fillStyle = spriteColor;

    this.spriteColor = () => { return spriteColor; }
    this.canvasSprite = () => { return canvas; }
    this.canvasTrail = () => { return canvasTrail; }

    let path = [];
    let animatingSprite = false;

    var handler = function(key) {
        if (isPaused() || animatingSprite || !controlsEnabled) return;
        
        var prevX = x;
        var prevY = y;

        if (_id === aiTypes.PLAYER_1 || _id === undefined) {
            if (key.key === 'w' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            if (key.key === 'a' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            if (key.key === 's' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            if (key.key === 'd' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            if (key.key === 'q' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        if (_id === aiTypes.PLAYER_2 || _id === undefined) {
            if (key.key === 'ArrowUp' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            if (key.key === 'ArrowLeft' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            if (key.key === 'ArrowDown' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            if (key.key === 'ArrowRight' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            if (key.key === 'Enter' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        
        if (x !== prevX || y !== prevY) {
            stepsTaken++;
            path.push(playerCell(prevX, prevY));
        }

        if (path.length >= 2 && x === path[path.length - 2].x && y === path[path.length - 2].y) {
            path.pop();
            path.pop();
        }
        
        if (reachedGoal()) {
            render();
            toggleControls();
            alert("You did it!\n\nGood job.\n\nYou took " + stepsTaken + " steps.");
        }
    }

    const animateSprite = (initialCell) => {
        animatingSprite = true;
        stepsTaken++;

        let destinationCell = path.pop();
        x = destinationCell.x;
        y = destinationCell.y;

        if (destinationCell.decisionsFromStart === initialCell.decisionsFromStart) setTimeout(() => animateSprite(initialCell), aiSpeeds.VERY_FAST);
        else animatingSprite = false;
    }

    document.addEventListener("keyup", handler);

    this.forceColor = (color) => {
        spriteColor = color;
        switch (spriteColor) {
            case "pink":
                spriteColor = "#FF3399";
                break;
            case "green":
                spriteColor = "#00CC00";
                break;
        }
        contextTrail.fillStyle = spriteColor;
    }

    this.setColor = function (pretext) {
        if (pretext === undefined) pretext = "";
        spriteColor = prompt(pretext + "What color do you want to be?", "pink").toLowerCase();
        if (!playerColors.some(c => c === spriteColor)) {
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
			contextTrail.fillStyle = spriteColor;
        }
    }

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().hasStatus(cellStatus.END);
    }

    const playerCell = function(pX = x, pY = y) {
        return cells[pX][pY];
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

        contextTrail.fillRect(screenSpaceX + _maze.cellWidth() * 0.25, screenSpaceY + _maze.cellWidth() * 0.25, _maze.cellWidth() - _maze.cellWidth() * 0.5, _maze.cellWidth() - _maze.cellWidth() * 0.5);
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }
}