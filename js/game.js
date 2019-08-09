function Game() {
    var layerManager = new LayerManager();
    var maze = new Maze();
    var players = [
        new Player(maze, 1),
        new Player(maze, 2)
        // new Ai(maze, aiTypes.RANDOM_TURNS, aiSpeeds.FAST),
        // new Ai(maze, aiTypes.UNVISITED_TURNS, aiSpeeds.FAST),
        // new Ai(maze, aiTypes.UNVISITED_TURNS, aiSpeeds.FAST)
    ];

    players.forEach(player => {
        layerManager.addTrail(player.canvasTrail());
        layerManager.addSprite(player.canvasSprite());
    })

    //players.forEach(player => { player.setColor(); });
    maze.create(players[0].spriteColor(), true);

    const renderLoop = function() {
        maze.render();
        players.forEach(player => { player.render(); });
        setTimeout(() => { renderLoop(); }, 1);
    }

    renderLoop();
}