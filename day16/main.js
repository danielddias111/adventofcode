var fs = require('fs');

const getinvalidTicket = (input) => {
    let possibilities = []
    let nearByTickets = []
    let allTickets = 0
    let para = 0;
    let tempTicket
    let counter = 0
    for(let i=0; i< input.length; i++){
        if(input[i].trim() == ''){
            para++
            i++
            continue
        }
        if(para==0){
            possibilities.push(input[i].split(' ')[1])
            possibilities.push(input[i].split(' ')[3])
        }
        else if(para==2){
            tempTicket = input[i].split(',')
            for(let x=0;x<tempTicket.length;x++){
                nearByTickets.push(parseInt(tempTicket[x]))
                allTickets+=parseInt(tempTicket[x])
            }
        }
    }
    let min
    let max
    for(let i=0; i<nearByTickets.length; i++){
        for(let x=0; x<possibilities.length; x++){
            min = parseInt(possibilities[x].split('-')[0])
            max = parseInt(possibilities[x].split('-')[1])
            if(nearByTickets[i] <= max && nearByTickets[i]>= min){
                counter+=nearByTickets[i]
                break
            }
        }
    }

    console.log(possibilities)
    console.log(nearByTickets)
    return allTickets-counter

}

const data = fs.readFileSync('./day16/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = getinvalidTicket(lines)
console.log('Result:', result)
