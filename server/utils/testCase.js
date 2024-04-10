const path = require('path')
const fs = require('fs')


const CorrectOutput = fs.readFileSync('../testcases/output.txt', { encoding: 'utf8', flag: 'r' });
const input = fs.readFileSync('../testcases/input.txt', { encoding: 'utf8', flag: 'r' });

console.log(CorrectOutput);
console.log(input);

