var fs = require('fs');


const countTrees = (treeMap) => {
    let totalCharsInRow = treeMap[0].length
    let indexRight = 0
    let counter = 0
    for(let i = 1; i<treeMap.length; i++){
        indexRight = indexRight + 3
        while(indexRight >= totalCharsInRow){
            indexRight = indexRight - totalCharsInRow 
        }
        let position = treeMap[i].charAt(indexRight)

        if(position == '#'){
            counter++
        }
        //break
    }
    return counter
}


const data = fs.readFileSync('./day3/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countTrees(lines);
console.log('Total:',result)