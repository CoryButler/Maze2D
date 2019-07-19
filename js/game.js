function Game() {
    var maze = new Maze();
    var players = [
        //new Player(maze, 1),
        //new Player(maze, 2)
        new Ai(maze, aiTypes.LEFT_HAND, aiSpeeds.FAST),
        new Ai(maze, aiTypes.RIGHT_HAND, aiSpeeds.FAST)
    ];

    //players.forEach(player => { player.setColor(); });
    maze.create(players[0].spriteColor(), false);

    const renderLoop = function() {
        maze.render();
        players.forEach(player => { player.render(); });
        setTimeout(() => { renderLoop(); }, 1);
    }

    renderLoop();
}