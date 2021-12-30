
const http = require('http');

const server = http.createServer( function( req, res)  {
    if (req.url === '/') {
        res.write('Hello World! ');
        res.end();
    }

    if ( req.url === '/api/courses') {
        res.write( JSON.stringify(
            [
            {
                id: 1,
                text: 'text1'
            }, {
                id: 2,
                text: 'text2'
            }
            ]
        ));
        res.end();
    }
});

// Very low level..
// server.on('connection', (arg) => {
//     console.log(' Someone connected.' )
// });
server.listen(3000);

console.log('Listening on port 3000');

