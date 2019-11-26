import { cellStatus } from "./enums.js";

export default function MazeCell () {
    this.status = [];
    this.hasStatus = (s) => { return this.status.indexOf(s) >= 0; }
    this.removeStatus = s => { var i = this.status.indexOf(s); if (i >= 0) this.status.splice(i, 1); }
    this.x = 0;
    this.y = 0;
}