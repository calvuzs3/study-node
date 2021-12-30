
const fs = require('fs');

const files = fs.readdirSync('./');

console.log(files);

// If I throw an error..
fs.readdir('.$', function(err, files ) {
    if (err) console.log('Error', err);
    else console.log('Files: ' + files);
}) ;