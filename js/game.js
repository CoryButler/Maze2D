function Game (settings) {
    var layerManager = new LayerManager();
    var maze = new Maze(settings.width, settings.height);
    var players = [
        //new Player(maze, 1),
        //new Player(maze, 2)
    ];

    settings.players.forEach(p => {
        let toAdd;
        switch (p.type) {
            case aiTypes.PLAYER_1:
                toAdd = new Player(maze, aiTypes.PLAYER_1);
                break;
        }
        players.push(toAdd);
    })

    players.forEach(player => {
        layerManager.addTrail(player.canvasTrail());
        layerManager.addSprite(player.canvasSprite());
    });

    for (var i = 0; i < players.length; i++) {
        //var dropdown = document.getElementById("player" + (i + 1) + "_color");
        //var selected = dropdown.options[dropdown.selectedIndex].value;
        players[i].forceColor(settings.players[i].color)//selected);
    }
    maze.create(players[0].spriteColor(), settings.animate);

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