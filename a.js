console.log(__filename);
console.log(__dirname);

const { EventEmitter } = require('./a4-logger');
const Log = require('./a4-logger');
const logger = new Log();

console.log(Log);
// Exports an Obj
// logger.log('message to be logged.  ');
// Export a function
logger.log ('message new');