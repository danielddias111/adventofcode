var fs = require('fs');


const countTrees = (treeMap, moveRight, moveDown) => {
    let totalCharsInRow = treeMap[0].length
    let indexRight = 0
    let counter = 0
    for(let i = moveDown; i<treeMap.length; i=i+moveDown){
        indexRight = indexRight + moveRight
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


const data = fs.readFileSync('./day3/input2.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result1 = countTrees(lines,1,1);
console.log(result1)
let result2 = countTrees(lines,3,1);
console.log(result2)
let result3 = countTrees(lines,5,1);
console.log(result3)
let result4 = countTrees(lines,7,1);
console.log(result4)
let result5 = countTrees(lines,1,2);
console.log(result5)
console.log('Total:',result1*result2*result3*result4*result5)