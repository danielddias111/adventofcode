var fs = require('fs');
let possibilities = []
let possibilities2 = []
let nearByTickets = []
let para = 0;
let tempTicket
let validTickets = []
let myMap = new Map()
let myFinalMap = new Map()
let myTicket = []
const getinvalidTicket = (input) => {
    init(input)
    initValid()
    loopValid()
    console.log(possibilities)
    console.log(possibilities2)
    //console.log('valid:',validTickets)
    console.log('Map:',myMap)
    return 0

}

const init = (input) => {
    for(let i=0; i< input.length; i++){
        if(input[i].trim() == ''){
            para++
            i++
            continue
        }
        if(para==0){
            possibilities2.push(input[i])
            possibilities.push(input[i].split(':')[1].split(' ')[1])
            possibilities.push(input[i].split(':')[1].split(' ')[3])
        }
        else if(para==1){
            tempTicket = input[i].split(',')
            for(let x=0;x<tempTicket.length;x++){
                myTicket.push(parseInt(tempTicket[x]))
            }
        }
        else if(para==2){
            tempTicket = input[i].split(',')
            for(let x=0;x<tempTicket.length;x++){
                nearByTickets.push(parseInt(tempTicket[x]))
            }
        }
    }
}

const initValid = () => {
    let min
    let max
    for(let i=0; i<nearByTickets.length; i++){
        for(let x=0; x<possibilities.length; x++){
            min = parseInt(possibilities[x].split('-')[0])
            max = parseInt(possibilities[x].split('-')[1])
            if(nearByTickets[i] <= max && nearByTickets[i]>= min){
                validTickets.push(nearByTickets[i])
                break
            }
        }
    }
}

const loopValid = () => {
    let count
    let min1 = 0
    let max1=0
    let min2=0
    let max2=0
    let current
    let name
    let alreadyJump = false
    let validList = []
    for(let x=0;x<possibilities2.length;x++){
        count = 0
        for(let i=0; i<validTickets.length;i++){
            name=possibilities2[x].split(':')[0]
            current=validTickets[(count)]
            min1 = parseInt(possibilities2[x].split(':')[1].split(' ')[1].split('-')[0])
            max1 = parseInt(possibilities2[x].split(':')[1].split(' ')[1].split('-')[1])
            min2 = parseInt(possibilities2[x].split(':')[1].split(' ')[3].split('-')[0])
            max2 = parseInt(possibilities2[x].split(':')[1].split(' ')[3].split('-')[1])
            if(( current<min1  || current >max1) && (current <min2  || current >max2)){
                if(alreadyJump){
                    alreadyJump = false
                }
                count++
                while(count>myTicket.length-1){
                    count=count-myTicket.length
                }
                validList = []
            }
            else if((( current>=min1  && current <=max1) || (current >=min2  && current <=max2)) && count>=(validTickets.length-possibilities2.length)){
                while(count>myTicket.length-1){
                    count=count-myTicket.length
                }
                if(myMap.get(name)==null){
                    validList.push(count)
                    myMap.set(name,validList)
                }
                else{
                    validList = myMap.get(name)
                    validList.push(count)
                    validList.sort((a,b) => a-b)
                    myMap.set(name,validList)
                }
                count++
                if(count== myTicket.length){
                    validList=[]
                    break
                }

            }
            else {
                alreadyJump = true
                count+=possibilities2.length
            }
        }
    }


    for (const [key, value] of myMap.entries()) {
        //let value2 = isUnique(key, value)
    }

    console.log(myMap)
}

const isUnique = (key, array) => {
    let unique = false
    for(let i=0;i<array.length;i++){
        for (const [key2, value] of myMap.entries()) {
            if(key==key2){
                continue
            }
            if(value.includes(array[i])){
                break
            }
            unique = true
        }
        if(unique){
            return array[i]
        }
    }
}

const data = fs.readFileSync('./day16/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = getinvalidTicket(lines)
console.log('Result:', result)
