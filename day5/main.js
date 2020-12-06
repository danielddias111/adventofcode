var fs = require('fs');


// seat ID example row * 8 + column
const discoverSeat = (tickets) => {
    let highestSeat = 0;
    let row = 0
    let column = 0
    let seatId = 0
    for (let i = 0; i < tickets.length; i++) {
        row = getRowNumber(tickets[i]);
        column = getColumnNumber(tickets[i]);
        seatId = row * 8 + column
        highestSeat = highestSeat > seatId ? highestSeat : seatId
    }
    return highestSeat
}

const getRowNumber = (ticket) => {
    let row = 0;
    let max = 128;
    let min = 0;
    let diff = 0
    for (let i = 0; i < 7; i++) {
        if(i == 6){
            return ticket[i] == 'F' ? min : max-1
        }
        diff = max - min
        if (ticket[i] == 'F') {
            max -= diff / 2
        }
        else if (ticket[i] == 'B') {
            min += diff / 2
        }
    }
}

const getColumnNumber = (ticket) => {
    let row = 0;
    let max = 8;
    let min = 0;
    let diff = 0
    for (let i = 0; i < 3; i++) {
        if(i == 2){
            return ticket[i+7] == 'R' ? max-1 : min
        }
        diff = max - min
        if (ticket[i+7] == 'L') {
            max -= diff / 2
        }
        else if (ticket[i+7] == 'R') {
            min += diff / 2
        }
    }
}

const data = fs.readFileSync('./day5/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = discoverSeat(lines)

// correct value: 208
console.log('Total:', result)