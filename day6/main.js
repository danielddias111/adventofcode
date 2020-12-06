var fs = require('fs');

const countPositiveAnswers = (allAnswers) => {
    var answers = new Set();
    let counter = 0

    for(let i=0; i<=allAnswers.length; i++){
        if(i==allAnswers.length){
            counter += answers.size
            break;
        }
        if(allAnswers[i].trim() != ''){
            for(let x = 0; x < allAnswers[i].length; x++){
                answers.add(allAnswers[i][x])
            }
        }
        else {
            counter += answers.size
            answers = new Set();
        }
    }

    return counter;
}


const data = fs.readFileSync('./day6/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countPositiveAnswers(lines)

// correct value: 6532
console.log('Total:', result)