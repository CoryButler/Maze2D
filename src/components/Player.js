import React from "react";
import { isPaused } from "../global";
import PlayerLogic from "./PlayerLogic.js";

export default function Player(props) {
    const canvasTrailRef = React.createRef();
    const canvasSpriteRef = React.createRef();
    let contextTrail;
    let contextSprite;
    let playerLogic;
    const maze = props.maze;
    const cells = maze.cells().slice();
    const path = [];
    const spriteColor = props.player.color;

    /* move to some new hud component */
    /* move to some new hud component */
    /* move to some new hud component */
    const startTime = Date.now();
    function showStats() {
        const hud = document.getElementById("hud");

        const totalMinutes = (Date.now() - startTime) / 60000;
        const minutes = Math.floor(totalMinutes);
        const totalSeconds = (totalMinutes - minutes) * 60;
        const seconds = Math.floor(totalSeconds);
        const totalMilliseconds = (totalSeconds - seconds) * 1000;
        const milliseconds = Math.floor(totalMilliseconds);

        const aiTypeKey = invertJson(aiTypes)[_id];
        const message = `<span style="color: ${spriteColor}">●</span> ${aiTypeKey}: ${stepsTaken} steps — ${leadingZero(minutes)}:${leadingZero(seconds)}:${trailingZero(milliseconds)}`;
        const p = document.createElement("p");

        p.classList = "stat";
        p.style = "margin: 4px 0px";
        p.innerHTML = message;
        hud.appendChild(p);
    }
    /* move to some new hud component */
    /* move to some new hud component */
    /* move to some new hud component */

    function drawPath(prevX, prevY) {
        let tempStyle = contextTrail.strokeStyle;
        const tempWidth = contextTrail.lineWidth;
        const tempCap = contextTrail.lineCap;
        contextTrail.lineCap = "round";
        contextTrail.lineWidth = maze.cellWidth() * 0.2;
        if (contextTrail.lineWidth < 1) contextTrail.lineWidth = 1;
        contextTrail.strokeStyle = spriteColor;
        contextTrail.beginPath();
        contextTrail.moveTo(toScreenSpace(prevX) + maze.cellWidth() * 0.5, toScreenSpace(prevY) + maze.cellWidth() * 0.5);
        contextTrail.lineTo(toScreenSpace(x) + maze.cellWidth() * 0.5, toScreenSpace(y) + maze.cellWidth() * 0.5);
        contextTrail.stroke();
        contextTrail.beginPath();
        contextTrail.arc(toScreenSpace(x) + maze.cellWidth() * 0.5, toScreenSpace(y) + maze.cellWidth() * 0.5, contextTrail.lineWidth * 0.5, 0, 2 * Math.PI);
        contextTrail.fill();
        contextTrail.strokeStyle = tempStyle;
        contextTrail.lineWidth = tempWidth;
        contextTrail.lineCap = tempCap;
    }

    function render() {
        if (!controlsEnabled) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        var screenSpaceX = toScreenSpace(x);
        var screenSpaceY = toScreenSpace(y);

        context.beginPath();
        context.arc(screenSpaceX + maze.cellWidth() / 2, screenSpaceY + maze.cellWidth() / 2, maze.cellWidth() / 2, 0, Math.PI * 2);
        context.fillStyle = spriteColor;
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(screenSpaceX + maze.cellWidth() / 2, screenSpaceY + maze.cellWidth() / 2, maze.cellWidth() / 3, 0, Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + maze.cellWidth() * 0.35, screenSpaceY + maze.cellWidth() * 0.35, maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.arc(screenSpaceX + maze.cellWidth() * 0.65, screenSpaceY + maze.cellWidth() * 0.35, maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();
    }

    const toScreenSpace = function(n)  {
        return n * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    }








/*
    let x = maze.startCell().x;
    let y = maze.startCell().y;
    let isAnimatingSprite = false;

    function animateSprite(initialCell) {
        isAnimatingSprite = true;
        stepsTaken++;

        let destinationCell = path.pop();
        x = destinationCell.x;
        y = destinationCell.y;

        if (destinationCell.decisionsFromStart === initialCell.decisionsFromStart) setTimeout(() => animateSprite(initialCell), aiSpeeds.VERY_FAST);
        else isAnimatingSprite = false;
    }

    function drawPath(prevX, prevY) {
        let tempStyle = contextTrail.strokeStyle;
        const tempWidth = contextTrail.lineWidth;
        const tempCap = contextTrail.lineCap;
        contextTrail.lineCap = "round";
        contextTrail.lineWidth = maze.cellWidth() * 0.2;
        if (contextTrail.lineWidth < 1) contextTrail.lineWidth = 1;
        contextTrail.strokeStyle = spriteColor;
        contextTrail.beginPath();
        contextTrail.moveTo(toScreenSpace(prevX) + maze.cellWidth() * 0.5, toScreenSpace(prevY) + maze.cellWidth() * 0.5);
        contextTrail.lineTo(toScreenSpace(x) + maze.cellWidth() * 0.5, toScreenSpace(y) + maze.cellWidth() * 0.5);
        contextTrail.stroke();
        contextTrail.beginPath();
        contextTrail.arc(toScreenSpace(x) + maze.cellWidth() * 0.5, toScreenSpace(y) + maze.cellWidth() * 0.5, contextTrail.lineWidth * 0.5, 0, 2 * Math.PI);
        contextTrail.fill();
        contextTrail.strokeStyle = tempStyle;
        contextTrail.lineWidth = tempWidth;
        contextTrail.lineCap = tempCap;
    }

    function handleKeyup(key) {
        console.log(key);
        if (isPaused() || isAnimatingSprite) return;
        
        var prevX = x;
        var prevY = y;

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

    function playerCell(pX = x, pY = y) {
        return cells[pX][pY];
    }

    function reachedGoal() {
        return playerCell().hasStatus(cellStatus.END);
    }

    function render() {
        if (isPaused()) return;
        
        contextSprite.clearRect(0, 0, canvas.width, canvas.height);

        var screenSpaceX = toScreenSpace(x);
        var screenSpaceY = toScreenSpace(y);

        contextSprite.beginPath();
        contextSprite.arc(screenSpaceX + maze.cellWidth() / 2, screenSpaceY + maze.cellWidth() / 2, maze.cellWidth() / 2, 0, Math.PI * 2);
        contextSprite.fillStyle = spriteColor;
        contextSprite.stroke();
        contextSprite.fill();

        contextSprite.beginPath();
        contextSprite.arc(screenSpaceX + maze.cellWidth() / 2, screenSpaceY + maze.cellWidth() / 2, maze.cellWidth() / 3, 0, Math.PI);
        contextSprite.stroke();

        contextSprite.beginPath();
        contextSprite.arc(screenSpaceX + maze.cellWidth() * 0.35, screenSpaceY + maze.cellWidth() * 0.35, maze.cellWidth() / 12, 0, Math.PI * 2);
        contextSprite.stroke();

        contextSprite.beginPath();
        contextSprite.arc(screenSpaceX + maze.cellWidth() * 0.65, screenSpaceY + maze.cellWidth() * 0.35, maze.cellWidth() / 12, 0, Math.PI * 2);
        contextSprite.stroke();
    }

    function setColor(color) {
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

    function toScreenSpace(n)  {
        return n * (maze.cellWidth() + maze.wallWidth()) + maze.wallWidth();
    }

    document.addEventListener("keyup", handleKeyup);
*/
    React.useEffect(() => {
        contextTrail = canvasTrailRef.getContext("2d");
        contextSprite = canvasSpriteRef.getContext("2d");
        playerLogic = new PlayerLogic(props.maze, props.player.type, render, drawPath);
    }, [props.shouldRender]);

    return (
        <>
            <canvas ref={canvasTrailRef} height={props.mazeHeight} width={props.mazeWidth}></canvas>
            <canvas ref={canvasSpriteRef} height={props.mazeHeight} width={props.mazeWidth}></canvas>
        </>
    );
}