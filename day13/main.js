var fs = require('fs');

const getBus = (bus) => {
    let time = parseInt(bus[0])
    let time2 = time
    let validBus = []
    let allBus = bus[1].split(',')
    let result = null
    let idx = 0
    for (let i = 0; i < allBus.length; i++) {
        if (allBus[i] != 'x') {
            validBus.push(parseInt(allBus[i]))
        }
    }
    console.log(time, validBus)
    while (true) {
        for (let i = 0; i < validBus.length; i++) {
            if (time2 % validBus[i] == 0) {
                result = (time2 - time) * validBus[i]
                break
            }
        }
        if (result != null) {
            return result
        }
        time2++
    }
}



const data = fs.readFileSync('./day13/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = getBus(lines)
//1252
console.log('Result:', result)