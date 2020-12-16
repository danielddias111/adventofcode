var fs = require('fs');

const get2020 = (input) => {
    let values = input[0].split(',');
    let valuesInt = []
    for(let i=0;i<values.length; i++){
        valuesInt.push(parseInt(values[i]))
    }
    let currentNumber
    let diff
    while(true){
        currentNumber = valuesInt[valuesInt.length - 1]
        diff = howLongAgo(currentNumber, valuesInt)
        valuesInt.push(diff)
        if(valuesInt.length == 2020){
            break
        }
    }
    console.log(valuesInt[valuesInt.length-1])
}

const howLongAgo = (currentNumber, array) => {
    for(let i=array.length-2; i>=0; i--){
        if(array[i] == currentNumber){
            return array.length- i -1
        }
    }
    return 0
}

const data = fs.readFileSync('./day15/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = get2020(lines)
console.log('Result:', result)
