var fs = require('fs');

/** 
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
*/
const countValidPassport = (passports) => {
    let counter = 0
    let passport = {byr:"", iyr:"", eyr:"" , hgt:"", hcl:"",ecl:"", pid:"", cid:""}; 

    for(let i = 0; i<passports.length; i++){
        if(passports[i].trim() == ''){
            if(isValidPassport(passport)){
                counter++
            }
            passport = {byr:"", iyr:"", eyr:"" , hgt:"", hcl:"", ecl:"" , pid:"", cid:""};
        }
        else {
            passport = fillInPassport(passport, passports[i])
        }
    }
    return counter
}


const fillInPassport = (passport, SomeFields) => {
    let fields = SomeFields.split(' ')
    for(let i=0; i<fields.length; i++){
        let keyValue = fields[i].split(':')
        passport[keyValue[0]]  = keyValue[1];

    }
    return passport
}

const isValidPassport = (passport) => {
    if(passport.byr != "" && passport.iyr != "" && passport.eyr != "" && passport.hgt != "" && passport.hcl != "" && passport.ecl != "" && passport.pid != "") {
        return true
    }
    return false
}

const data = fs.readFileSync('./day4/input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countValidPassport(lines)

// correct value: 208
console.log('Total:', result)