var fs = require('fs');

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const countSeats = (seats) => {
    let countSeat = 0
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
                    if (totalAdjacentOcupied >= 5) {
                        newArray[y] = newArray[y].replaceAt(x, 'L')
                    }
                }
                else {
                    let allFree = checkDirectionAreFree(oldArray, y, x)
                    if (allFree) {
                        newArray[y] = newArray[y].replaceAt(x, '#')
                    }
                }
            }
        }
        if (compare(oldArray, newArray)) {
            equal = true
            countSeat = countEmptySeats(newArray)
        }
        //console.log(newArray)
        
        oldArray = JSON.parse(JSON.stringify(newArray))
    }

    return countSeat
}

const countEmptySeats = (newArray) => {
    let count = 0
    for (let i = 0; i < newArray.length; i++) {
        for (let q = 0; q < newArray[i].length; q++) {
            if (newArray[i][q] == '#')
                count++
        }
    }
    return count
}
const compare = (oldArray, newArray) => {
    return JSON.stringify(oldArray) == JSON.stringify(newArray)
}


const countOccupied = (array, seatY, seatX) => {
    let count =1;
    let counter=0
    let right
    let left
    let up
    let down
    let upLeft
    let downLeft
    let upRight
    let downRight
    while(!(typeof right == 'boolean' && typeof left  == 'boolean' && typeof up  == 'boolean' && typeof down  == 'boolean' && typeof upLeft == 'boolean' && typeof upRight == 'boolean' && typeof downLeft == 'boolean' && typeof downRight == 'boolean')){
        if(seatX-count >=0 && typeof left != 'boolean'){
            if(array[seatY][seatX-count] == '#'){
                left = false
                counter++
            }
            else if(array[seatY][seatX-count] == 'L'){
                left = true
            }
        }
        else {
            left = true
        }
        if(seatX+count <array[0].length && typeof right != 'boolean'){
            if(array[seatY][seatX+count] == '#'){
                right = false
                counter++
            }else if(array[seatY][seatX+count] == 'L'){
                right = true
            }
        }
        else {
            right = true
        }
        if(seatY-count >=0 && typeof up != 'boolean'){
            if(array[seatY-count][seatX] == '#'){
                up = false
                counter++
            }else if(array[seatY-count][seatX] == 'L'){
                up = true
            }
        }
        else {
            up = true
        }
        if(seatY+count <array.length && typeof down != 'boolean'){
            if(array[seatY+count ][seatX] == '#'){
                down = false
                counter++
            }else if(array[seatY+count ][seatX] == 'L'){
                down = true
            }
        }
        else {
            down = true
        }
        if(seatX-count>=0 && seatY-count>=0 && typeof upLeft != 'boolean'){
            if(array[seatY-count][seatX-count] == '#'){
                upLeft = false
                counter++
            }else if(array[seatY-count][seatX-count] == 'L'){
                upLeft = true
            }
        }
        else {
            upLeft = true
        }
        if(seatX-count<array[0].length && seatY+count<array.length && typeof downLeft != 'boolean'){
            if(array[seatY+count][seatX-count] == '#'){
                downLeft = false
                counter++
            }else if(array[seatY+count][seatX-count] == 'L'){
                downLeft = true
            }
        }
        else {
            downLeft = true
        }
        if(seatX+count<array[0].length && seatY-count>=0 && typeof upRight != 'boolean'){
            if(array[seatY-count][seatX+count] == '#'){
                upRight = false
                counter++
            }else if(array[seatY-count][seatX+count] == 'L'){
                upRight = true
            }
        }
        else {
            upRight = true
        }
        if(seatX+count<array[0].length && seatY+count<array.length && typeof downRight != 'boolean'){
            if(array[seatY+count][seatX+count] == '#'){
                downRight = false
                counter++
            }else if(array[seatY+count][seatX+count] == 'L'){
                downRight = true
            }
        }
        else {
            downRight = true
        }

        count++;
        if(counter>=5){
            break;
        }
    }

    return counter
}


const checkDirectionAreFree = (array, seatY, seatX) => {
    let count =1;
    let right
    let left
    let up
    let down
    let upLeft
    let downLeft
    let upRight
    let downRight
    while(!(typeof right == 'boolean' && typeof left  == 'boolean' && typeof up  == 'boolean' && typeof down  == 'boolean' && typeof upLeft == 'boolean' && typeof upRight == 'boolean' && typeof downLeft == 'boolean' && typeof downRight == 'boolean')){
        if(seatX-count >=0 && typeof left != 'boolean'){
            if(array[seatY][seatX-count] == '#'){
                return false
            } else if(array[seatY][seatX-count] == 'L'){
                left = true
            }
        }
        else {
            left = true
        }
        if(seatX+count <array[0].length && typeof right != 'boolean'){
            if(array[seatY][seatX+count] == '#'){
                return false
            }else if(array[seatY][seatX+count] == 'L'){
                right = true
            }
        }
        else {
            right = true
        }
        if(seatY-count >=0 && typeof up != 'boolean'){
            if(array[seatY-count][seatX] == '#'){
                return false
            }else if(array[seatY-count][seatX] == 'L'){
                up = true
            }
        }
        else {
            up = true
        }
        if(seatY+count <array.length && typeof down != 'boolean'){
            if(array[seatY+count][seatX] == '#'){
                return false
            }else if(array[seatY+count][seatX] == 'L'){
                down = true
            }
        }
        else {
            down = true
        }
        if(seatX-count>=0 && seatY-count>=0 && typeof upLeft != 'boolean'){
            if(array[seatY-count][seatX-count] == '#'){
                return false
            }else if(array[seatY-count][seatX-count] == 'L'){
                upLeft = true
            }
        }
        else {
            upLeft = true
        }
        if(seatX-count>=0 && seatY+count<array.length && typeof downLeft != 'boolean'){
            if(array[seatY+count][seatX-count] == '#'){
                return false
            }else if(array[seatY+count][seatX-count] == 'L'){
                downLeft = true
            }
        }
        else {
            downLeft = true
        }
        if(seatX+count<array[0].length && seatY-count>=0 && typeof upRight != 'boolean'){
            if(array[seatY-count][seatX+count] == '#'){
                return false
            }else if(array[seatY-count][seatX+count] == 'L'){
                upRight = true
            }
        }
        else {
            upRight = true
        }
        if(seatX+count<array[0].length && seatY+count<array.length && typeof downRight != 'boolean'){
            if(array[seatY+count][seatX+count] == '#'){
                return false
            }else if(array[seatY+count][seatX+count] == 'L'){
                downRight = true
            }
        }
        else {
            downRight = true
        }

        count++;
    }

    return true
}

const data = fs.readFileSync('./day11/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countSeats(lines)

console.log('Result:', result)