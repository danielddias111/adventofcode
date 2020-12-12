var fs = require('fs');

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const countSeats = (seats) => {
    let countSeat=0
    let equal = false
    let newArray = JSON.parse(JSON.stringify(seats))
    let oldArray = JSON.parse(JSON.stringify(seats))
    while (!equal) {
        for (let y = 0; y < seats.length; y++) {
            for (let x = 0; x < seats[y].length; x++) {
                if (oldArray[y][x] == '.') {
                    continue
                }
                let isOccupied = oldArray[y][x] == 'L' ? false : true
                if (isOccupied) {
                    let totalAdjacentOcupied = countOccupied(oldArray, y, x)
                    totalAdjacentOcupied--
                    if (totalAdjacentOcupied >= 4) {
                        newArray[y] = newArray[y].replaceAt(x, 'L')
                    }
                }
                else {
                    let allFree = checkIfAdjacentsAreFree(oldArray, y, x)
                    if (allFree) {
                        newArray[y] = newArray[y].replaceAt(x, '#')
                    }
                }
            }
        }
        //console.log(newArray)
        if (compare(oldArray, newArray)) {
            equal = true
            countSeat = countEmptySeats(newArray)
        }
        oldArray = JSON.parse(JSON.stringify(newArray))

    }

    return countSeat
}

const countEmptySeats = (newArray) => {
    let count = 0
    for (let i = 0; i < newArray.length; i++) {
        for (let q = 0; q < newArray[i].length; q++) {
            if(newArray[i][q]=='#')
            count++
        }
    }
    return count
}
const compare = (oldArray, newArray) => {
    return JSON.stringify(oldArray) == JSON.stringify(newArray)
}


const countOccupied = (array, seatY, seatX) => {
    let count = 0
    for (let i = -1; i < 2; i++) {
        for (let q = -1; q < 2; q++) {
            let validatingSeatY = seatY + i
            let validatingSeatX = seatX + q
            if (validatingSeatY>=0 && validatingSeatX>=0 &&validatingSeatY < array.length && validatingSeatX < array[0].length) {
                if (array[validatingSeatY][validatingSeatX] == '#') {
                    count++
                }
            }

        }
    }
    return count
}


const checkIfAdjacentsAreFree = (array, seatY, seatX) => {
    for (let i = -1; i < 2; i++) {
        for (let q = -1; q < 2; q++) {
            let validatingSeatY = seatY + i
            let validatingSeatX = seatX + q
            if (validatingSeatY >= 0 && validatingSeatX >= 0 && validatingSeatY < array.length && validatingSeatX < array[0].length) {
                if (array[validatingSeatY][validatingSeatX] == '#') {
                    return false
                }
            }

        }
    }
    return true
}

const data = fs.readFileSync('./day11/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countSeats(lines)

console.log('Result:', result)