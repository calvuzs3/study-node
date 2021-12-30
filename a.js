console.log(require);

console.log(__filename);
console.log(__dirname);

const logger = require('./logger');


console.log(logger);
// Exports an Obj
// logger.log('message to be logged.  ');
// Export a function
logger('message new');