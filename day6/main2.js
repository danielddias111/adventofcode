var fs = require('fs');

const countPositiveAnswers = (allAnswers) => {
    var answers = new Map();
    let counter = 0
    let countPeople = 0

    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].trim() == '') {
            for (const [key, value] of answers.entries()) {
                if(value==countPeople){
                    counter++
                }
            }
            answers = new Map();
            countPeople = 0
        }
        else {
            countPeople++;
            let count
            for (let x = 0; x < allAnswers[i].length; x++) {
                count = answers.get(allAnswers[i][x])
                if (count) {
                    answers.set(allAnswers[i][x], ++count)
                }
                else {
                    answers.set(allAnswers[i][x], 1)
                }
            }
        }
    }

    return counter;
}


const data = fs.readFileSync('./day6/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countPositiveAnswers(lines)

// correct value: 6532
console.log('Total:', result)