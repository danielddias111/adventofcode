var fs = require('fs');

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let mask
let resultMask
let tempMask
let address
let arrayMask = []
let myMap = new Map()
let memoryIdx
let mem
let value
let tempValue
let binaryAddress
let bin
let idx
let binaryvalue
let arrayValue = []
const memorySum = (memory) => {
    for (let i = 0; i < memory.length; i++) {
        if (memory[i].trim() == '') {
            break
        }
        mem = memory[i].split('=')[0].replace(' ', '')
        value = memory[i].split('=')[1].replace(' ', '')
        if (mem == 'mask') {
            mask = value
            address = value.toString(2)
            //console.log(mask)
        }
        else {
            resultMask = ''
            tempValue = ''
            memoryIdx = mem.split('[')[1].split(']')[0]
            binaryAddress = Number(memoryIdx).toString(2)
            binaryvalue = Number(value).toString(2)
            //Get all result for memory addresse
            for (let x = 0; x < mask.length; x++) {
                if (mask[mask.length - x - 1] == 'X') {
                    resultMask = 'X' + resultMask
                }
                else {
                    if (binaryAddress.length > x) {
                        if (mask[mask.length - x - 1] != '1') {
                            resultMask = binaryAddress[binaryAddress.length - x - 1] + resultMask
                            continue
                        }
                        else {
                            resultMask = '1' + resultMask
                            continue
                        }
                    }
                    else {
                        resultMask = mask[mask.length - x - 1] + resultMask
                    }

                }
            }
            // get value to write in memory addresses
            for (let x = 0; x < mask.length; x++) {
                if (binaryvalue.length > x && mask[mask.length - x - 1] == 'X') {
                    tempValue = binaryvalue[binaryvalue.length - x - 1] + tempValue
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
            let allX = resultMask.split('X').length - 1

            for (let i = 0; i < Math.pow(2, allX); i++) {
                bin = Number(i).toString(2)
                idx = 0;
                tempMask = resultMask
                for (let q = bin.length; q < allX; q++) {
                    bin = '0' + bin
                }
                for (let x = 0; x < resultMask.length; x++) {
                    if (resultMask[x] == 'X') {
                        tempMask = tempMask.replaceAt(x, bin.charAt(idx++))
                    }
                }
                arrayMask.push(tempMask)
            }

            //arrayValue.push(tempValue)
            for (let p = 0; p < arrayMask.length; p++) {
                myMap.set(parseInt(arrayMask[p],2), tempValue)
                arrayValue.push(tempValue)
            }
            arrayMask=[]

        }
    }

    let number = 0
    let count = 0
    /*for (const [key, value] of myMap.entries()) {
        number = parseInt(value, 2)
        count += number
    }*/
    for(let i=0;i<arrayValue.length;i++){
        count+=parseInt(arrayValue[i], 2)
    }
    return count
}

const data = fs.readFileSync('./day14/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = memorySum(lines)
console.log('Result:', result)
