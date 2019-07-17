function Game() {
    var maze = new Maze();
    var aiFactory = new AiFactory(maze);
    var player = aiFactory.FromAiType(aiTypes.RANDOM_TURNS);

    player.setColor();
    maze.create(player.spriteColor());
}