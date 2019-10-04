function Game() {
    var layerManager = new LayerManager();
    var maze = new Maze();
    var players = [
        //new Player(maze, 1),
        //new Player(maze, 2)
    ];

    players.forEach(player => {
        layerManager.addTrail(player.canvasTrail());
        layerManager.addSprite(player.canvasSprite());
    });

    for (var i = 0; i < players.length; i++) {
        var dropdown = document.getElementById("player" + (i + 1) + "_color");
        var selected = dropdown.options[dropdown.selectedIndex].value;
        players[i].forceColor(selected);
    }
    maze.create('green', false);//players[0].spriteColor(), true);

    const renderLoop = function() {
        maze.render();
        players.forEach(player => { player.render(); });
        setTimeout(() => { renderLoop(); }, 1);
    }

    renderLoop();

    this.start = () => {
        layerManager.clearLayers();
        maze = new Maze();
        players = [];
        players = [
            new Player(maze, 1),
            new Player(maze, 2)
        ];

        for (var i = 0; i < players.length; i++) {
            var dropdown = document.getElementById("player" + (i + 1) + "_color");
            var selected = dropdown.options[dropdown.selectedIndex].value;
            players[i].forceColor(selected);
        }

        players.forEach(player => {
            layerManager.addTrail(player.canvasTrail());
            layerManager.addSprite(player.canvasSprite());
        });

        maze.create(players[0].spriteColor(), true);
    }
}