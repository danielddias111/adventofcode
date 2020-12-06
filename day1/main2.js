
var fs = require('fs');


/**
 * 
 * @description receive 2 values and the result of the sum
 */
const getResult = (list) => {
    for (let x = 0; x < list.length; x++) {
        for (let y = 1; y < list.length; y++) {
            for (let q = 2; q< list.length; q++) {
                let sum = parseInt(list[x]) + parseInt(list[y]) + parseInt(list[q])
                if (sum == 2020) {
                    return parseInt(list[x]) * parseInt(list[y]) * parseInt(list[q])
                }
            }
        }
    }
}

const data = fs.readFileSync('./day1/input2.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

// 
let result = getResult(lines)
console.log(result)


