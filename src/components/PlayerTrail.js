import React from "react";
import PlayerLogic from "./PlayerLogic.js";

export default function PlayerTrail(props) {
    const canvasTrailRef = React.createRef();
    let contextTrail;
    let playerLogic;
    const spriteColor = props.player.color;
    const spriteWidth = (props.cellWidth) * 0.8;
    const spriteNegativeSpace = (props.cellWidth - props.wallWidth) - spriteWidth;

    function render(prevX, prevY) {
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

    const toScreenSpace = function(n)  {
        return n * (props.cellWidth + props.wallWidth);
    }
    
    React.useEffect(() => {
        contextTrail = canvasTrailRef.current.getContext("2d");
        contextTrail.clearRect(0, 0, canvasTrailRef.current.width, canvasTrailRef.current.height);
        contextTrail.fillStyle = spriteColor;
        contextTrail.strokeStyle = spriteColor;

        playerLogic = new PlayerLogic(props.maze, props.player.type, render, drawPath);
        playerLogic.init();

        return ()=> {playerLogic.destroy()};
    }, [props.shouldRender]);

    return (
        <canvas height={props.mazeHeight} width={props.mazeWidth} ref={canvasTrailRef}></canvas>
    );
}