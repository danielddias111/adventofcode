var fs = require('fs');

const preamble = (input) => {
    let array25 = []
    let resultNumber = 0;

    for(let i=0; i<input.length; i++){
        if(array25.length == 25){
            if(!calculateSum(array25,input[i])){
                return input[i]
            }
            array25.splice(0,1)
            array25.push(input[i])
        }
        else{
            array25.push(input[i])
        }
    }
}

const calculateSum = (array , sum) => {
    for(let i=0; i<array.length; i++){
        for(let x=0; x<array.length; x++){
            if(parseInt(array[i]) + parseInt(array[x]) == parseInt(sum)){
                return true
            }
        }
    }
}

const data = fs.readFileSync('./day9/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = preamble(lines)

console.log('Result:', result)