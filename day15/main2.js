var fs = require('fs');

// Check on a map the last position
let myMap = new Map()
let tempKey
let tempValueMap
const get2020 = (input) => {
    let values = input[0].split(',');
    let valuesInt = []
    for(let i=0;i<values.length; i++){
        valuesInt.push(parseInt(values[i]))
        if(values.length-1==i){
            tempKey=parseInt(values[i])
            tempValueMap=i
            break
        }
        myMap.set(parseInt(values[i]), i)

    }
    console.log(myMap)
    let currentNumber
    let diff
    while(true){
        currentNumber = valuesInt[valuesInt.length - 1]
        diff = howLongAgo(currentNumber, valuesInt)
        valuesInt.push(diff)
        if(valuesInt.length == 30000000){
            break
        }
    }
    return valuesInt[valuesInt.length-1];
}

const howLongAgo = (currentNumber, array) => {
    let tempValue = myMap.get(currentNumber)==null ? null : myMap.get(currentNumber);
    if(tempValue == null){
        myMap.set(tempKey, tempValueMap)
        tempKey = 0
        tempValueMap = array.length
        return 0
    }
    myMap.set(tempKey, tempValueMap)
    tempValueMap = array.length
    tempKey = array.length - tempValue - 1
    return array.length - tempValue - 1
}

const data = fs.readFileSync('./day15/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = get2020(lines)
console.log('Result:', result)
