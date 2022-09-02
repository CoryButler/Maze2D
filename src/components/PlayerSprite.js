import React from "react";
import PlayerLogic from "./PlayerLogic.js";

export default function PlayerSprite(props) {
    const canvasSpriteRef = React.createRef();
    let contextSprite;
    let playerLogic;
    const spriteColor = props.player.color;
    const spriteWidth = (props.cellWidth) * 0.8;
    const spriteNegativeSpace = (props.cellWidth - props.wallWidth) - spriteWidth;

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
        contextSprite = canvasSpriteRef.current.getContext("2d");
        contextSprite.clearRect(0, 0, canvasSpriteRef.current.width, canvasSpriteRef.current.height);
        contextSprite.fillStyle = spriteColor;
        contextSprite.strokeStyle = "black";

        playerLogic = new PlayerLogic(props.maze, props.player.type, render, drawPath);
        playerLogic.init();

        return ()=> {playerLogic.destroy()};
    }, [props.shouldRender]);

    return (
        <canvas height={props.mazeHeight} width={props.mazeWidth} ref={canvasSpriteRef}></canvas>
    );
}