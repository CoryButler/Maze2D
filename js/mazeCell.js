var cellStatus = { EAST: 0, NORTH: 1, WEST: 2, SOUTH: 3, VISITED: 4, START: 5, END: 6, STEPPED: 7 };
    
function MazeCell () {
    this.status = [];
    this.hasStatus = (s) => { return this.status.indexOf(s) >= 0; }
    this.removeStatus = s => { var i = this.status.indexOf(s); if (i >= 0) this.status.splice(i, 1); }
    this.x = 0;
    this.y = 0;
}