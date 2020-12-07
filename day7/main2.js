const { count } = require('console');
var fs = require('fs');

/**
 *  light red bags contain 1 bright white bag, 2 muted yellow bags.
    dark orange bags contain 3 bright white bags, 4 muted yellow bags.
    bright white bags contain 1 shiny gold bag.
    muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
    shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
    dark olive bags contain 3 faded blue bags, 4 dotted black bags.
    vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
    faded blue bags contain no other bags.
    dotted black bags contain no other bags.
 */
const countBags = (allRules) => {
    let bagMap = new Map()
    let line
    let rules
    let color
    for (let i = 0; i < allRules.length; i++) {
        line = allRules[i].split('contain')
        color = line[0].trim().substring(0, line[0].length - 6)
        rules = line[1].split(',')
        if (line[1] != ' no other bags.') {
            bagMap.set(color, rules)
        }
        else {
            bagMap.set(color, [])
        }

    }
    //console.log('bagMap is:', bagMap)
    return countBagsCanCarryShinyGold(bagMap)
}

const countBagsCanCarryShinyGold = (bagMap) => {
    let counter = 0
    let shinyGoldBags = bagMap.get('shiny gold')


    counter = countInnerBags(bagMap, shinyGoldBags)

    return counter
}
// 2+ 2*2 + 4*2 + 8*2 + 16*2 + 32*2

const countInnerBags = (bagMap, arrayToSearch) => {
    if (arrayToSearch.length == 0) {
        return 0
    }
    let counter = 0;
    //console.log('bagMap -> ', bagMap)
    //console.log('Array to search ->', arrayToSearch)
    for (let i = 0; i < arrayToSearch.length; i++) {
        //counter = counter + countInnerBags();
        let multiple = parseInt(arrayToSearch[i].split(' ')[1])
        let color = arrayToSearch[i].split(' ')[2] + ' ' +arrayToSearch[i].split(' ')[3]
        counter = counter + multiple + multiple *  countInnerBags(bagMap,bagMap.get(color))
    }
    return counter
}

const data = fs.readFileSync('./day7/input2.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countBags(lines)

// correct value: 6532
console.log('Total:', result)