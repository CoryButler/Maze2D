import React from "react";
import PlayerLogic from "./PlayerLogic.js";

export default function Player(props) {
    const canvasTrailRef = React.createRef();
    const canvasSpriteRef = React.createRef();
    let contextTrail;
    let contextSprite;
    let playerLogic;
    const spriteColor = props.player.color;
    const spriteWidth = (props.cellWidth) * 0.8;
    const spriteNegativeSpace = (props.cellWidth - props.wallWidth) - spriteWidth;

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
        const screenSpacePrevX = toScreenSpace(prevX) + (props.cellWidth / 2) + (spriteNegativeSpace / 2);
        const screenSpacePrevY = toScreenSpace(prevY) + (props.cellWidth / 2) + (spriteNegativeSpace / 2);
        const screenSpaceX = toScreenSpace(playerLogic.x()) + (props.cellWidth / 2) + (spriteNegativeSpace / 2);
        const screenSpaceY = toScreenSpace(playerLogic.y()) + (props.cellWidth / 2) + (spriteNegativeSpace / 2);
        
        const tempWidth = contextTrail.lineWidth;
        const tempCap = contextTrail.lineCap;
        contextTrail.lineCap = "round";
        contextTrail.lineWidth = props.cellWidth * 0.2;
        if (contextTrail.lineWidth < 1) contextTrail.lineWidth = 1;
        contextTrail.beginPath();
        contextTrail.moveTo(screenSpacePrevX, screenSpacePrevY);
        contextTrail.lineTo(screenSpaceX, screenSpaceY);
        contextTrail.stroke();
        contextTrail.beginPath();
        contextTrail.arc(screenSpaceX, screenSpaceY, contextTrail.lineWidth * 0.5, 0, 2 * Math.PI);
        contextTrail.fill();
        contextTrail.lineWidth = tempWidth;
        contextTrail.lineCap = tempCap;
    }

    function render() {
        contextSprite.clearRect(0, 0, canvasSpriteRef.current.width, canvasSpriteRef.current.height);

        const screenSpaceX = toScreenSpace(playerLogic.x());
        const screenSpaceY = toScreenSpace(playerLogic.y());
        const x = screenSpaceX + (props.cellWidth / 2) + (spriteNegativeSpace / 2);
        const y = screenSpaceY + (props.cellWidth / 2) + (spriteNegativeSpace / 2);

        contextSprite.beginPath();
        contextSprite.arc(x, y, spriteWidth / 2, 0, Math.PI * 2);
        contextSprite.stroke();
        contextSprite.fill();

        contextSprite.beginPath();
        contextSprite.arc(x, y, spriteWidth / 3, 0, Math.PI);
        contextSprite.stroke();

        contextSprite.beginPath();
        contextSprite.arc(x - props.cellWidth * 0.125, y - props.cellWidth * 0.125, spriteWidth / 12, 0, Math.PI * 2);
        contextSprite.stroke();

        contextSprite.beginPath();
        contextSprite.arc(x + props.cellWidth * 0.125, y - props.cellWidth * 0.125, spriteWidth / 12, 0, Math.PI * 2);
        contextSprite.stroke();
    }

    const toScreenSpace = function(n)  {
        return n * (props.cellWidth + props.wallWidth);
    }
    
    React.useEffect(() => {
        contextTrail = canvasTrailRef.current.getContext("2d");
        contextTrail.clearRect(0, 0, canvasTrailRef.current.width, canvasTrailRef.current.height);
        contextTrail.fillStyle = spriteColor;
        contextTrail.strokeStyle = spriteColor;

        contextSprite = canvasSpriteRef.current.getContext("2d");
        contextSprite.clearRect(0, 0, canvasSpriteRef.current.width, canvasSpriteRef.current.height);
        contextSprite.fillStyle = spriteColor;
        contextSprite.strokeStyle = "black";

        playerLogic = new PlayerLogic(props.maze, props.player.type, render, drawPath);
        playerLogic.init();

        return ()=> {playerLogic.destroy()};
    }, [props.shouldRender]);

    return (
        <>
            <canvas height={props.mazeHeight} width={props.mazeWidth} ref={canvasTrailRef}></canvas>
            <canvas height={props.mazeHeight} width={props.mazeWidth} ref={canvasSpriteRef}></canvas>
        </>
    );
}