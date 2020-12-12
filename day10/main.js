var fs = require('fs');

const countJolts = (bag) => {
    let bagInt = []
    for(let i=0; i<bag.length; i++){
        bagInt.push( parseInt(bag[i]) )
    }
    bagInt = bagInt.sort(function(a, b){return a-b})

    let max = bagInt[bagInt.length-1] + 3
    let diff = 0
    let count1 = 0
    let count3 =1
    for(let i=0; i<bagInt.length; i++){
        diff = i==0 ? bagInt[i] : bagInt[i] - bagInt[i-1]
        if(diff == 1){
            count1++
        }
        else if(diff == 3){
            count3++;
        }
    }
    return count1*count3
} 

const data = fs.readFileSync('./day10/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countJolts(lines)

console.log('Result:', result)