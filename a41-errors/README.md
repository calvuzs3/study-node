# Handling errors

After all the middleware ( our routes ) we add the piece of code to
deal with all the excepions
// Catching exceptions
app.use(function (err, req, res, next) {
// Log the exception
res.status(500).send("Samething faild.");
});

# Step2

1. we insert it into a separate module
2. require
3. We use that handler as a middleware
4. remove try-catch

We should make a wrap function like thhi
function asyncMiddleware( handler) {
try {
handler( req, res) // The function of the routes
} catch (ex) {
next(ex);
}
}
Instead we use the package express-async-errors
It wraps the express function for us, and use the error.js we provided

# Logging infoerrors

The wellknown packae winston:
it accepts as first parameter the error-leve

1. error
2. warn
3. info
4. verbose
5. debug
6. silly

Transport: console, file, http. (where to log)
Other useful loggers: mongodb, couchdb, redis, loggly

we can add also metadata to the logs

# Logging on the DB

npm i winston-mongodb
add a transport 'MongoDB' with {db:'db', level:'level'}

# Catching uncought exceptions in Node.js

proces.on('uncaughtException')
process.on('unhandledRejection')

or we can use winston again for the exceptions
winston.exception(..)

# Refactoring code

to keep it clean and readable
