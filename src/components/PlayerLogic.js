import { aiTypes, cellStatus, isPaused, playerColors, aiSpeeds, invertJson, leadingZero, trailingZero } from "../global.js";

export default function PlayerLogic(maze, id, render, drawPath) {
    const _maze = maze;
    const _id = id;
    let controlsEnabled = false;
    let stepsTaken = 0;

    let cells = _maze.cells().slice();

    let canvasTrail = document.createElement("canvas");
    canvasTrail.width = _maze.width();
    canvasTrail.height = _maze.height();
    document.getElementById("game").appendChild(canvasTrail);

    let canvas = document.createElement("canvas");
    canvas.width = _maze.width();
    canvas.height = _maze.height();
    document.getElementById("game").appendChild(canvas);

    let x = _maze.startCell().x;
    let y = _maze.startCell().y;

    let path = [];
    let animatingSprite = false;

    let handleKeyup = function(key) {
        console.log(key);
        if (isPaused() || animatingSprite || !controlsEnabled) return;
        
        let prevX = x;
        let prevY = y;

        if (_id === aiTypes.PLAYER_1 || _id === undefined) {
            if (key.key === 'w' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            else if (key.key === 'a' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            else if (key.key === 's' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            else if (key.key === 'd' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            else if (key.key === 'q' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        if (_id === aiTypes.PLAYER_2 || _id === undefined) {
            if (key.key === 'ArrowUp' && playerCell().hasStatus(cellStatus.NORTH)) y -= 1;
            else if (key.key === 'ArrowLeft' && playerCell().hasStatus(cellStatus.WEST)) x -= 1;
            else if (key.key === 'ArrowDown' && playerCell().hasStatus(cellStatus.SOUTH)) y += 1;
            else if (key.key === 'ArrowRight' && playerCell().hasStatus(cellStatus.EAST)) x += 1;
            else if (key.key === 'Enter' && path.length > 0) {
                animateSprite(playerCell());
                return;
            }
        }
        
        if (x !== prevX || y !== prevY) {
            stepsTaken++;
            path.push(playerCell(prevX, prevY));
            drawPath(prevX, prevY);
        }

        if (path.length >= 2 && x === path[path.length - 2].x && y === path[path.length - 2].y) {
            path.pop();
            path.pop();
        }
        
        if (reachedGoal()) {
            render();
            toggleControls();
            showStats();
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

    document.addEventListener("keyup", handleKeyup);

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().hasStatus(cellStatus.END);
    }

    const playerCell = function(pX = x, pY = y) {
        return cells[pX][pY];
    }    
    
    toggleControls();
    render();
    drawPath(_maze.startCell().x, -1);
}