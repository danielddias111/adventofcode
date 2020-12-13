var fs = require('fs');
let x = 0
let y = 0
let allDirections = ['S', 'W', 'N', 'E']
let currentDirection = 'E'

const ship = (directions) => {
    for (let i = 0; i < directions.length; i++) {
        if(directions[i].trim() == '' ){
            break
        }
        let direction = directions[i].charAt(0)
        let units = parseInt(directions[i].slice(1))
        if (direction == 'F') {
            move(currentDirection, units);
        }
        else if(direction == 'E' || direction == 'W' || direction == 'N' || direction == 'S'){
            move(direction, units);
        }
        else if(direction == 'R' || direction == 'L'){
            changeDir(direction, units)
        }
    }

    return Math.abs(x) + Math.abs(y)
}

const changeDir = (direction, units) => {
    let totalMove = units / 90
    let idx = allDirections.indexOf(currentDirection)
    if(direction == 'R'){
        idx+=totalMove
        if(idx>3){
            idx-=4
        }
    }
    else if(direction == 'L'){
        idx-=totalMove
        if(idx<0){
            idx+=4
        }
    }
    currentDirection = allDirections[idx];
}

const move = (dir, units) => {
    if(dir == 'E'){
        x=x+units;
    }
    else if(dir == 'W'){
        x=x-units;
    }
    else if(dir == 'N'){
        y=y+units;
    }
    else if(dir == 'S'){
        y=y-units;
    }
}


const data = fs.readFileSync('./day12/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = ship(lines)
//1252
console.log('Result:', result)