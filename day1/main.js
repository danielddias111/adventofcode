
var fs = require('fs');


/**
 * 
 * @description receive 2 values and the result of the sum
 */
const getResult = (list) => {
    for (let x = 0; x < list.length; x++) {
        for (let y = 0; y < list.length; y++) {
            let sum = parseInt(list[x]) + parseInt(list[y])
            if (sum == 2020) {
                return parseInt(list[x]) * parseInt(list[y])
            }
        }
    }
}

const data = fs.readFileSync('./day1/input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);


let result = getResult(lines)
console.log(result)


