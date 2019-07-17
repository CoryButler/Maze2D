function Game() {
    var maze = new Maze();
    var player = new Ai(maze, aiTypes.RIGHT_HAND);
    var ai = new Ai(maze, aiTypes.LEFT_HAND);

    player.setColor();
    ai.setColor();
    maze.create(player.spriteColor());
}