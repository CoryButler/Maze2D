import React from "react";
import { cellStatus } from "../global.js";
import MazeLogic from "./MazeLogic.js";
import Player from "./Player";

export default function Maze(props) {
    const canvasRef = React.createRef();
    let context;
    let mazeLogic;
    let cells;
    let cellStack;
    const columnCount = props.settings.width;
    const rowCount = props.settings.height;
    let cellWidth = 30;
    let wallWidth = 2;
    let width = columnCount * (cellWidth + wallWidth) + wallWidth;
    let height = rowCount * (cellWidth + wallWidth) + wallWidth;
    let spriteColor = "darkgrey";
    const [players, setPlayers] = React.useState([]);

    if (props.settings.players.some(p => p.isChecked)) {
        spriteColor = props.settings.players.filter(p => p.isChecked)[0].color;
    }

    while ((width > window.innerWidth || height > window.innerHeight) && cellWidth !== 1) {
        if (--cellWidth < wallWidth) wallWidth--;
        width = columnCount * (cellWidth + wallWidth) + wallWidth;
        height = rowCount * (cellWidth + wallWidth) + wallWidth;
    }

    function addPlayers() {
        setPlayers(props.settings.players.map((p, i) => {
            return (
                <Player key={i} maze={mazeLogic} mazeHeight={height} mazeWidth={width} player={p} shouldRender={props.shouldRender} />
            );
        }));
    }

    function cellInRange(x, y) {
        return (
            x >= cellStack[cellStack.length - 1].x - 1 &&
            x <= cellStack[cellStack.length - 1].x + 1 &&
            y >= cellStack[cellStack.length - 1].y - 1 &&
            y <= cellStack[cellStack.length - 1].y + 1
        );
    }

    function initRender() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);
        context.fillStyle = spriteColor;

        for (let x = 0; x < columnCount; x++) {
            for (let y = 0; y < rowCount; y++) {
                context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth, cellWidth, cellWidth);
            }
        }
    }

    function render(drawEndCell = false) {
        if (drawEndCell) {
            console.log("render", drawEndCell);
        }

        mazeLogic.cells().forEach(col => {
            col.forEach(row => {                
                if (row.hasStatus(cellStatus.VISITED) && (cellInRange(row.x, row.y) || drawEndCell)) {
                    let x = row.x;
                    let y = row.y;
                    context.fillStyle = "#FFFFFF";

                    context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth, cellWidth, cellWidth);

                    if (cells[x][y].hasStatus(cellStatus.SOUTH))
                        context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
                    
                    if (cells[x][y].hasStatus(cellStatus.EAST))
                        context.fillRect(x * (cellWidth + wallWidth) + wallWidth + cellWidth, y * (cellWidth + wallWidth) + wallWidth, wallWidth, cellWidth);

                    if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.START))
                        context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth), cellWidth, wallWidth);

                    if (cells[x][y].hasStatus(cellStatus.VISITED) && cells[x][y].hasStatus(cellStatus.END))
                        context.fillRect(x * (cellWidth + wallWidth) + wallWidth, y * (cellWidth + wallWidth) + wallWidth + cellWidth, cellWidth, wallWidth);
                }
            })
        });
    }

    React.useEffect(() => {
        if (!props.settings.isActiveGame) return;

        context = canvasRef.current.getContext("2d");
        mazeLogic = new MazeLogic(props, initRender, render, addPlayers);
        cells = mazeLogic.cells();
        cellStack = mazeLogic.cellStack();
        mazeLogic.create();
    }, [props.shouldRender]);

    return (
        <div className={"maze-container flex-center" + (props.settings.isPaused ? " maze-hide" : "")}>
            <div className="maze">
                <canvas height={height} width={width} ref={canvasRef} />
                {players}
            </div>
        </div>
    );
}