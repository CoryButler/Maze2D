function Player(maze) {
    var controlsEnabled = false;

    window.addEventListener('mazeReady', function() { 
        _maze.markCell(
            (x - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth()),
            (y - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth()),
            cellStatus.STEPPED);
        render();
        toggleControls(); }
    );

    var _maze = maze;

    var speed = _maze.cellWidth() + _maze.wallWidth();

    var canvas = document.getElementsByTagName("canvas")[0];

    var context = canvas.getContext("2d");

    var spriteColor = "pink";
    var x = _maze.startCell().x * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    var y = _maze.startCell().y * (_maze.cellWidth() + _maze.wallWidth()) + _maze.wallWidth();
    
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown'];

    this.spriteColor = () => { return spriteColor; }

    document.onkeyup = function(key) {
        if (!controlsEnabled) return;

        if (key.key === 'w' && playerCell().status.indexOf(cellStatus.NORTH) >= 0) y -= speed;
        if (key.key === 'a' && playerCell().status.indexOf(cellStatus.WEST) >= 0) x -= speed;
        if (key.key === 's' && playerCell().status.indexOf(cellStatus.SOUTH) >= 0) y += speed;
        if (key.key === 'd' && playerCell().status.indexOf(cellStatus.EAST) >= 0) x += speed;
        if (key.key === 'ArrowUp' && playerCell().status.indexOf(cellStatus.NORTH) >= 0) y -= speed;
        if (key.key === 'ArrowLeft' && playerCell().status.indexOf(cellStatus.WEST) >= 0) x -= speed;
        if (key.key === 'ArrowDown' && playerCell().status.indexOf(cellStatus.SOUTH) >= 0) y += speed;
        if (key.key === 'ArrowRight' && playerCell().status.indexOf(cellStatus.EAST) >= 0) x += speed;
    
        if (x < _maze.wallWidth()) x = _maze.wallWidth();
        if (x > _maze.width() - _maze.cellWidth() - _maze.wallWidth()) x = _maze.width() - _maze.cellWidth() - _maze.wallWidth();
    
        if (y < _maze.wallWidth()) y = _maze.wallWidth();
        if (y > _maze.height() - _maze.cellWidth() - _maze.wallWidth()) y = _maze.height() - _maze.cellWidth() - _maze.wallWidth();
        
        _maze.markCell(
            (x - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth()),
            (y - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth()),
             cellStatus.STEPPED);

        _maze.render();
        render();
    
        if (reachedGoal()) alert("You did it!\n\nGood job.");
    }

    this.setColor = function (pretext) {
        if (pretext === undefined) pretext = "";
        spriteColor = prompt(pretext + "What color do you want to be?", "pink").toLowerCase();
        if (!colors.some(c => c === spriteColor)) {
            setColor("Sorry, you cannot be " + spriteColor + ".\n");
        }
        else {
            switch (spriteColor) {
                case "pink":
                    spriteColor = "#FF3399";
                    break;
                case "green":
                    spriteColor = "#00CC00";
                    break;
            }
        }
    }

    const toggleControls = function() {
        controlsEnabled = !controlsEnabled;
    }

    const reachedGoal = function() {
        return playerCell().status.indexOf(cellStatus.END) >= 0;
    }

    const playerCell = function() {
        return _maze.cells()[(x - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth())][(y - _maze.wallWidth()) / (_maze.cellWidth() + _maze.wallWidth())];
    }

    const render = function() {
        context.beginPath();
        context.arc(x + _maze.cellWidth() / 2, y + _maze.cellWidth() / 2, _maze.cellWidth() / 2, 0, Math.PI * 2);
        context.fillStyle = spriteColor;
        context.stroke();
        context.fill();

        context.beginPath();
        context.arc(x + _maze.cellWidth() / 2, y + _maze.cellWidth() / 2, _maze.cellWidth() / 3, 0, Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(x + _maze.cellWidth() * 0.35, y + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.arc(x + _maze.cellWidth() * 0.65, y + _maze.cellWidth() * 0.35, _maze.cellWidth() / 12, 0, Math.PI * 2);
        context.stroke();
    }
}