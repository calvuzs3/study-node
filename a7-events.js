

const EventEmitter = require('events');

const Logger = require('./a4-logger');
const logger = new Logger();

// Register alistener
logger.on('msgLogged', (arg)=> {
    // Hey logger, when you raise this msg (msgLogged), do this..
    console.log('Emitter says something', arg );
});

logger.log('message new era');
