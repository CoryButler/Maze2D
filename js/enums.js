const aiTypes = { PLAYER_1: 0, PLAYER_2: 1, RANDOM: 2, RANDOM_TURNS: 3, UNVISITED_TURNS: 4, RIGHT_HAND: 5, LEFT_HAND: 6, DIJKSTRA: 7 };
const aiSpeeds = { VERY_SLOW: 2000, SLOW: 1000, NORMAL: 500, FAST: 250, VERY_FAST: 125, SUPER_FAST: 1, TELEPORT: 0 };
const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
const cellStatus = { EAST: 0, NORTH: 1, WEST: 2, SOUTH: 3, VISITED: 4, START: 5, END: 6, STEPPED: 7 };
let _isPaused = false;
const isPaused = (value = null) => { if (value !== null) _isPaused = value; return _isPaused; }

export { aiTypes, aiSpeeds, isPaused, playerColors, cellStatus };