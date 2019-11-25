function Settings () {
    return {
        width: 10,
        height: 10,
        animate: true,
        players: [
            { type: aiTypes.PLAYER_1, color: "green", speed: aiSpeeds.NORMAL, isChecked: true },
            { type: aiTypes.PLAYER_2, color: "pink", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.RANDOM, color: "red", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.RANDOM_TURNS, color: "orange", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.UNVISITED_TURNS, color: "blue", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.RIGHT_HAND, color: "purple", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.LEFT_HAND, color: "yellow", speed: aiSpeeds.NORMAL, isChecked: false }
        ]
    }
}