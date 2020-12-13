var fs = require('fs');

let waypointX = 10
let waypointY = 1

let x = 0
let y = 0
let allDirections = ['S', 'W', 'N', 'E']
let currentDirection = 'E'

const ship = (directions) => {
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].trim() == '') {
            break
        }
        let direction = directions[i].charAt(0)
        let units = parseInt(directions[i].slice(1))
        if (direction == 'F') {
            move(units);
        }
        else if (direction == 'E' || direction == 'W' || direction == 'N' || direction == 'S') {
            moveWaypoint(direction, units);
        }
        else if (direction == 'R' || direction == 'L') {
            changeWaypointDir(direction, units)
        }
    }

    return Math.abs(x) + Math.abs(y)
}

const changeWaypointDir = (direction, units) => {
    let totalMove = units / 90
    let tempx = waypointX
    let tempY = waypointY

    if (totalMove == 2) {
        waypointX = waypointX * -1
        waypointY = waypointY * -1
    }
    else if (totalMove == 1) {
        if (direction == 'R') {
            waypointX = tempY
            waypointY = -1*tempx
        }
        else if (direction == 'L') {
            waypointX = -1*tempY
            waypointY = tempx
        }
    }
    else if (totalMove == 3) {
        if (direction == 'R') {
            waypointX = -1*tempY
            waypointY = tempx
        }
        else if (direction == 'L') {
            waypointX = tempY
            waypointY = -1*tempx
        }
    }

}

const move = (units) => {
    x = x + units * waypointX;
    y = y + units * waypointY;
}

const moveWaypoint = (dir, units) => {
    if (dir == 'E') {
        waypointX = waypointX + units;
    }
    else if (dir == 'W') {
        waypointX = waypointX - units;
    }
    else if (dir == 'N') {
        waypointY = waypointY + units;
    }
    else if (dir == 'S') {
        waypointY = waypointY - units;
    }
}


const data = fs.readFileSync('./day12/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = ship(lines)
//1252
console.log('Result:', result)