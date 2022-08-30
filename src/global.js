const aiTypes = ["Player One", "Player Two", "Random Steps", "Random Turns", "Unvisited Turns", "Right-Hand Turns", "Left-Hand Turns", "Dijkstra Algorithm"];
const aiSpeeds = [
    { name: "Very Slow", speed: 2000 },
    { name: "Slow", speed: 1000 },
    { name: "Normal", speed: 500 },
    { name: "Fast", speed: 250 },
    { name: "Very Fast", speed: 125 },
    { name: "Teleport", speed: 0 }];
const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
const cellStatus = { EAST: 0, NORTH: 1, WEST: 2, SOUTH: 3, VISITED: 4, START: 5, END: 6, STEPPED: 7 };
const maxSeed = 9999999999;
const maxCell = 100;
let _isPaused = false;
const isPaused = (value = null) => { if (value !== null) _isPaused = value; return _isPaused; }
    
const invertJson = (input) => {
    var one, output = {};
    for (one in input) {
        if (input.hasOwnProperty(one)) {
            output[input[one]] = one;
        }
    }
    return output;
}

const leadingZero = (num, length = 2) => {
    let n = "" + num;
    while (n.length < length) n = "0" + n;
    return n;
}

const trailingZero = (num, length = 3) => {
    let n = "" + num;
    if (n.length > length) return n.substr(0, length);
    while (n.length < length) n = n + "0";
    return n;
}

export { aiTypes, aiSpeeds, isPaused, playerColors, cellStatus, invertJson, leadingZero, maxCell, maxSeed, trailingZero };