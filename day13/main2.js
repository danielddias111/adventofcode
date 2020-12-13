var fs = require('fs');

const getBus = (bus) => {
    let time = 100000000000000
    let allBus = bus[1].split(',')
    let validBus = []
    let nextBus
    let lastValid = 0
    for (let i = 0; i < allBus.length; i++) {
        if (allBus[i] != 'x') {
            validBus.push(parseInt(allBus[i]))
        }
    }
    nextBus = validBus[0]
    for(let i=0; i< allBus.length;i++){
        if(allBus[i] == 'x'){
            time++
            continue
        }
        else {
            if(time % allBus[i] == 0){
                if(i==0){
                    lastValid = time
                }
                time++
                continue
            }
            else {
                time = lastValid+validBus[0]
                i=-1
            }
        }
    }
    return time - allBus.length
}




const data = fs.readFileSync('./day13/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = getBus(lines)
console.log('Result:', result)