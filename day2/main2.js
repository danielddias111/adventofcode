var fs = require('fs');

const countValidPasswords = (list) => {
    let validPasswords = 0
    list.forEach(element => {
        if (isValidPassword(element)) {
            validPasswords++
        }
    });
    return validPasswords;
}

const isValidPassword = (input) => {
    let position1 = parseInt(input.split(' ')[0].split('-')[0]) - 1
    let position2 = parseInt(input.split(' ')[0].split('-')[1]) - 1
    let letter = input.split(' ')[1].split(':')[0]
    let password = input.split(' ')[2]
    let count = 0;

    if (password.charAt(position1) == letter && password.charAt(position2) == letter) {
        return false
    } else if (password.charAt(position1) == letter || password.charAt(position2) == letter) {
        return true
    }
    return false

}

const data = fs.readFileSync('./day2/input2.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countValidPasswords(lines);
console.log(result)