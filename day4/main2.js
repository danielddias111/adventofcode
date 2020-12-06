var fs = require('fs');

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
    let age = parseInt(passport.byr) >= 1920 && parseInt(passport.byr) <= 2002
    let iyr = parseInt(passport.iyr) >= 2010 && parseInt(passport.iyr) <= 2020
    let eyr = parseInt(passport.eyr) >= 2020 && parseInt(passport.eyr) <= 2030
    let hgt = height(passport.hgt)
    let hcl = hairColor(passport.hcl)
    let ecl = validateEcl(passport.ecl)
    let pid = passport.pid.length == 9
    if(age && iyr && eyr && hgt && hcl && ecl && pid) {
        return true
    }
    return false
}

const validateEcl = (ecl) => {
    if(ecl !='amb' && ecl !='blu' && ecl !='brn' && ecl !='gry' && ecl !='grn' && ecl !='hzl' && ecl !='oth'){
        return false
    }
    return true
}

const hairColor = (hair) => {
    var letterNumber = /^[0-9a-f]+$/;
    if(hair[0] != '#'){
        return false
    }
    hair = hair.substring(1,hair.length)
    if(hair.length != 6){
        return false
    }
    return letterNumber.test(hair)

} 

const height = (height) => {
    let hgt
    if(height.endsWith('cm')){
        hgt = parseInt(height.split('cm')[0]) >= 150 && parseInt(height.split('cm')[0]) <= 193
    }
    else {
        hgt = parseInt(height.split('in')[0]) >= 59 && parseInt(height.split('in')[0]) <= 76
    }
    return hgt
} 



const data = fs.readFileSync('./day4/input2.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let result = countValidPassport(lines)

// correct value: 208
console.log('Total:', result)