const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey not set.	");
	process.exit(1);
}

/* This exercize took me 1/2 hour -- and GONE perfectly OK at first try :)  */
const express = require("express");
const morgan = require("morgan");
const app = express();
const Fawn = require("fawn");

// DB connection
const mongoose = require("mongoose");
mongoose
	.connect("mongodb+srv://luca:lucadev@cluster0.5qt5l.mongodb.net/test")
	.then(console.log("Connected to the DB."))
	.catch((err) => console.log("DB connection error: ", err.message));
// Fawn.init("mongodb+srv://luca:lucadev@cluster0.5qt5l.mongodb.net/test");

const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// A piece of middleware
app.use(express.json());
app.use(morgan("tiny")); // a logger of HTTP requests 'tiny' is the format

app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Catching exceptions
app.use(function (err, req, res, next) {
	// Log the exception
	res.status(500).send("Samething faild.");
});

// Server in ascolto
const port = process.env.VIDLY_PORT || 3000;
app.listen(port, function () {
	console.log(`Vidly server listening on port: ${port}`);
});
