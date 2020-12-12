var fs = require('fs');


const data = fs.readFileSync('./day11/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countSeats(lines)

console.log('Result:', result)