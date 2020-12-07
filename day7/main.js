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
        color = line[0].trim()
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
    let breakAboveLoop = false
    for (const [key, value] of bagMap.entries()) {
        breakAboveLoop = false
        for (let i = 0; i < value.length; i++) {
            if (value[i].includes('shiny gold')) {
                ++counter
                break
            }
            else {
                for (let x = 0; x < value.length; x++) {
                    if (recursiveCount(bagMap, value[x].substring(3).replace('.', ''))) {
                        ++counter
                        breakAboveLoop = true
                        break
                    }
                }
                if (breakAboveLoop) {
                    break
                }
            }
        }
    }
    return counter
}

const recursiveCount = (bagMap, colorToSearch) => {
    if (!colorToSearch.endsWith('s')) {
        colorToSearch = colorToSearch + 's'
    }
    let array = bagMap.get(colorToSearch)
    if (array) {
        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].includes('shiny gold')) {
                    return true
                }
            }
            for (let i = 0; i < array.length; i++) {
                let recursive = recursiveCount(bagMap, array[i].substring(3).replace('.', ''))
                if(recursive){
                    return true
                }
            }
        }
        else {
            return false;
        }
    }
}

const data = fs.readFileSync('./day7/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countBags(lines)

// correct value: 6532
console.log('Total:', result)