var fs = require('fs');

const countAllArragementsJolts = (bag) => {
    let bagInt = []
    let counter = 0 
    for(let i=0; i<bag.length; i++){
        bagInt.push( parseInt(bag[i]) )
    }
    bagInt = bagInt.sort(function(a, b){return a-b})
    let max = bagInt[bagInt.length-1] + 3
    counter = getAllArragements(bagInt)

    

    return counter
}

const getAllArragements = (bagInt) => {
    let mandatoryNumbers = []
    let notMandatoryNumbers = []
    mandatoryNumbers.push(bagInt[0])
    let totalOptions
    let counter = 1
    for(let i=0; i<bagInt.length-1 ;i++){
        totalOptions = getHowManyOptions(bagInt[i], bagInt, i);
        if(totalOptions == 1){
            mandatoryNumbers.push(bagInt[i+1])
        }
        else{
            notMandatoryNumbers.push(bagInt[i+1])
        }
    }
    console.log(mandatoryNumbers)
    console.log(notMandatoryNumbers)
    //console.log(mandatoryNumbers.length - notMandatoryNumbers.length)

    for(let i=0; i<bagInt.length-1 ;i++){
        totalOptions = getHowManyOptions(bagInt[i], bagInt, i);
        if(totalOptions == 2){
            counter*=calculateValidFor(2, bagInt, mandatoryNumbers, i)
        }
        else if(totalOptions == 3){
            counter*=calculateValidFor(3, bagInt, mandatoryNumbers, i)
            i=i+2
        }
    }

    return counter
}

const calculateValidFor = (howMany, list, mandatory, index) => {
    if(howMany==2){
        if(!mandatory.includes(list[index+2])){
            return 3
        }
        else {
            return 2
        }
    }
    else if(howMany == 3){
        if(!mandatory.includes(list[index+1]) && !mandatory.includes(list[index+2])&& !mandatory.includes(list[index+3])){
            return 7
        }
        else if(mandatory.includes(list[index+3])){
            return 4
        }
        else {
            return 0
        }
    }
}

const getHowManyOptions = (value, bagInt, current) => {
    current++
    let counter = 0
    for(let i=current; i<bagInt.length; i++){
        if(bagInt[i]-value <=3){
            counter++
        }
        else{
            break
        }
    }
    return counter
}
 
const data = fs.readFileSync('./day10/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countAllArragementsJolts(lines)

//console.log('Result:', result)