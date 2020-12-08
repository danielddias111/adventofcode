var fs = require('fs');

const bootCode = (instructions) => {
    let acc = 0;
    let jmp = 0;
    let alreadyRanInstructions = []
    for(let i=0; i<instructions.length; i++){
        if(alreadyRanInstructions.includes(i)){
            return acc
        }
        alreadyRanInstructions.push(i)
        let instruction = instructions[i].split(' ')[0]
        let number = parseInt(instructions[i].split(' ')[1])
        if(instruction === 'acc'){
            acc+=number;
        }
        else if(instruction === 'jmp'){
            i+=number-1
        }
    }
    return acc
}



const data = fs.readFileSync('./day8/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = bootCode(lines)

// correct value: 6532
console.log('Total:', result)