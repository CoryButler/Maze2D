function Game() {
    var maze = new Maze();
    var player = new Player(maze);

    player.setColor();
    maze.create(player.spriteColor());
}