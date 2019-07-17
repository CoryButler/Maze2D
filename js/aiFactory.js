const aiTypes = { RANDOM: 0, RANDOM_TURNS: 1, UNVISITED_TURNS: 2, DIJKSTRA: 3, A_STAR: 4 };

function AiFactory (maze) {
    const _maze = maze;

    this.FromAiType = function (aiType) {
        switch (aiType) {
            case aiTypes.RANDOM_TURNS:
                return new Ai_RandomTurns(_maze);
        }
    }
}