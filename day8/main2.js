var fs = require('fs');

const bootCode = (instructions) => {
    let acc = 0;
    let jmp = 0;
    let alreadyRanInstructions = []
    let alreadyTested = []
    let alreadyChanged = false

    let lastValidi = 0;
    let lastValidAcc = 0

    for(let i=0; i<instructions.length; i++){
        if(alreadyRanInstructions.includes(i)){
            alreadyRanInstructions = []
            i = lastValidi;
            alreadyChanged = false
            acc = lastValidAcc
        }
        
        let instruction = instructions[i].split(' ')[0]
        let number = parseInt(instructions[i].split(' ')[1])
        if(instruction != 'acc' && !alreadyTested.includes(i) && !alreadyChanged){
            alreadyChanged = true
            instruction = instruction == 'jmp' ? instruction = 'nop' : instruction = 'jmp'
            lastValidAcc = acc
            lastValidi = i
            alreadyTested.push(i)
        }
        
        if(!alreadyRanInstructions.includes(i)){
            alreadyRanInstructions.push(i)
        }
        
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