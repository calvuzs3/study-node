const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/* This exercize took me 1/2 hour -- and GONE perfectly OK at first try :)  */
const express = require("express");
const morgan = require("morgan");
const app = express();

// DB connection
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost/genres")
	.then(console.log("Connected to the DB."))
	.catch((err) => console.log("DB connection error: ", err));
// const Fawn = require("fawn");
// Fawn.init(mongoose);

const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");

// A piece of middleware
app.use(express.json());
app.use(morgan("tiny")); // a logger of HTTP requests 'tiny' is the format

app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

// Server in ascolto
app.listen(3000, function () {
	console.log("Vidly server listening on port: 3000");
});

// A utility library for javascript
// npm i lodash
//
// use in the users.js
