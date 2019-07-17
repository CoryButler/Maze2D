function Game() {
    var maze = new Maze();
    var player = new Ai(maze, aiTypes.UNVISITED_TURNS);

    player.setColor();
    maze.create(player.spriteColor());
}