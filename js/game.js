function Game() {
    var maze = new Maze();
    var players = [
        //new Player(maze),
        new Ai(maze, aiTypes.RIGHT_HAND, aiSpeeds.SUPER_FAST)
    ];

    //players.forEach(player => { player.setColor(); });
    maze.create(players[0].spriteColor());

    const renderLoop = function() {
        maze.render();
        players.forEach(player => { player.render(); });

        setTimeout(() => { renderLoop(); }, 1);
    }

    renderLoop();
}