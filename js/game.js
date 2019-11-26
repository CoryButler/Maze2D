import Settings from "./settings.js";
import Menu from "./menu/menu.js";
import LayerManager from "./layerManager.js";
import Maze from "./maze.js";
import { aiTypes, isPaused } from "./enums.js";
import Player from "./player.js";
import Ai from "./ai.js";

export default function Game ()
{
    const layerManager = new LayerManager();
    let maze;
    let players = [];

    const start = () => {
        layerManager.clearLayers();
        maze = new Maze(settings.seed, settings.width, settings.height);
        
        while (players.length > 0) {
            let p = players.pop();
            p = null;
        }

        settings.players.forEach(p => {
            if (!p.isChecked) return;
        
            if (p.type === aiTypes.PLAYER_1 || p.type === aiTypes.PLAYER_2) 
                players.push(new Player(maze, p.type));
            else
                players.push(new Ai(maze, p.type, p.speed));

            players[players.length - 1].forceColor(p.color);
        });

        players.forEach(player => {
            layerManager.addTrail(player.canvasTrail());
            layerManager.addSprite(player.canvasSprite());
        });

        maze.create(players[0].spriteColor(), settings.animate);

        renderLoop();
    }
    
    const renderLoop = function() {
        if (!isPaused()) {
            maze.render();
            players.forEach(player => { player.render(); });
        }
        setTimeout(() => { renderLoop(); }, 1);
    }

    let settings = new Settings();
    new Menu(settings, start);
}