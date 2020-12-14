var fs = require('fs');

let time = 100000000000000
let validBus = []
let nextBus
let maxValue = 0
let value = 0
let mapValue = new Map()
const getBus = (bus) => {
    let allBus = bus[1].split(',')
    for (let i = 0; i < allBus.length; i++) {
        if (allBus[i] != 'x') {
            validBus.push(parseInt(allBus[i]))
            if (parseInt(allBus[i]) > maxValue) {
                maxValue = parseInt(allBus[i])
            }
        }
    }
    while(true){
        if(time % maxValue == 0){
            value = time
            break
        }
        time++
    }
    nextBus = validBus[0]
    while (true) {
        if (time % maxValue == 0) {
            let allValid = validate(allBus, 0)
            if (allValid) {
                return time - allBus.indexOf(String(maxValue))
            }
        }
        
        if(time % value  == 0){
            console.log('One Lap')
        }
        time += maxValue
    }
}

const validate = (allBus, idx) => {
    let counter = 0
    if (mapValue.get(idx) == null) {
        for (let i = 0; i < allBus.length; i++) {
            if (i == idx) {
                break
            }
            counter++
            mapValue.set(idx, counter)
        }
    }
    else {
        counter = mapValue.get(idx)
    }


    let difference = allBus.indexOf(String(maxValue)) - allBus.indexOf(allBus[counter])

    if ((time - difference) % parseInt(allBus[counter]) == 0) {
        if (parseInt(allBus[counter]) == validBus[validBus.length - 1]) {
            return true
        }
        let value = parseInt(allBus[counter])
        let nextValue = allBus.indexOf(String(validBus[validBus.indexOf(value) + 1]))
        return validate(allBus, nextValue)
    }
    else {
        return false
    }
}



const data = fs.readFileSync('./day13/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = getBus(lines)
console.log('Result:', result)
