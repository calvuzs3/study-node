
const EventEmitter = require('events');
// After events in a6- ...
// const e = new EventEmitter();

var url='http://mylogger.io/log';

// function log(message) {
//     console.log(message);

//     // After a6-
//     // let's add an emitter
//     e.emit('msgLogged', {id: 1, url: 'http://'} );

// }

// After a6-events..
class Logger extends EventEmitter {
    log(message) {
        console.log(message);

        // After a6-
        // let's add an emitter
        this.emit('msgLogged', {id: 1, url: 'http://'} );

    }
}
// module.exports.log = log;
// module.exports = log;
module.exports = Logger;
