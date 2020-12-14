var fs = require('fs');

let mask
let myMap = new Map()
let memoryIdx
let mem
let value
let tempValue
let binary
const memorySum = (memory) => {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i].trim() == '') {
            break
        }
        mem = memory[i].split('=')[0].replace(' ', '')
        value = memory[i].split('=')[1].replace(' ', '')
        if (mem == 'mask') {
            mask = value
            //console.log(mask)
        }
        else {
            tempValue = ''
            memoryIdx = mem.split('[')[1].split(']')[0]
            binary = Number(value).toString(2)
            for (let x = 0; x < mask.length; x++) {
                if (binary.length > x && mask[mask.length - x - 1] == 'X') {
                    tempValue = binary[binary.length - x - 1] + tempValue
                }
                else {
                    if (mask[mask.length - x - 1] == 'X') {
                        tempValue = '0' + tempValue
                    }
                    else {
                        tempValue = mask[mask.length - x - 1] + tempValue
                    }
                }
            }
            myMap.set(memoryIdx, tempValue)
            console.log(myMap)
        }
    }

    let number = 0
    let count=0
    for (const [key, value] of myMap.entries()) {
        number = parseInt(value,2)
        count+=number
    }
    return count
}

const data = fs.readFileSync('./day14/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = memorySum(lines)
console.log('Result:', result)
