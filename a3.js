
const os = require('os');

var totalMem = os.totalmem();
var freeMem = os.freemem();


console.log(totalMem + '\n**\n' + freeMem);

// Template string
// in ES6 / ES2015: EcmaScript 6

console.log(`Total memory ${totalMem}`);
console.log(`Free memory ${totalMem}`);