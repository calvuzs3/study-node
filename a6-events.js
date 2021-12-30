
// Events module
// Note: the convention for the class naming is the capital first letter
// yes, Events we import is a class.
const { on } = require('events');
const E =require('events');

// Istance
const e = new E();

// console.log( E);
// console.log( e);

// Register a subscriber of the event 
e.on('thisEmit', function() {
    console.log('Emitter says something' );
});

// Emit a message
e.emit('thisEmit');
// This must emit after the subscribers have done thei subscribing
// cause it will call the subscribers syncronously

// Register a subscriber of the event 
e.on('thisEmit', function( arg) { // event args
    console.log('Emitter says something', arg );
});

// Emit a message with parameters ( let's encapsulate them in an obj.)
//
// The feature '=>'
// the arguments above you can write it as 
e.on('thisEmit', (arg)=> {
    console.log('Emitter says something', arg, 'other' );
})
e.emit('thisEmit', {id: 1, url: 'http://'} );


// Let's move on 
console.log(' Now let\'s move on.. ');
const Logger = require('./a4-logger');
const l= new Logger();

l.log('message new era');