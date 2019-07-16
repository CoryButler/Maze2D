function MazeCell () {
    this.status = [];
    this.hasStatus = (s) => { return this.status.indexOf(s) >= 0; }
}