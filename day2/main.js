var fs = require('fs');

const countValidPasswords = (list) => {
    let validPasswords = 0
    list.forEach(element => {
        if(isValidPassword(element)){
            validPasswords++
        }
    });
    return validPasswords;
}

const isValidPassword = (input) => {
    let min         = parseInt(input.split(' ')[0].split('-')[0])
    let max         = parseInt(input.split(' ')[0].split('-')[1])
    let letter      = input.split(' ')[1].split(':')[0]
    let password    =  input.split(' ')[2]
    let count       = 0;
    for (let i = 0; i < password.length; i++) {
        if(password.charAt(i) == letter){
            count++;
        }
      }
      if(count <= max && count>= min){
          return true
      }
      return false
}

const data = fs.readFileSync('./day2/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countValidPasswords(lines);
console.log(result)