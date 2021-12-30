require("dotenv").config();
console.log(process.env.DEBUG);
const startupDebugger = require("debug")("app:startup"); //('app:startup');
const dbDebugger = require("debug")("app:db"); //('app:db');
const gen = require('./routes/genres');
const home = require('./routes/home');

/* This exercize took me *1 hour */

const express = require("express");
const morgan = require("morgan");
const app = express();
const Joi = require("joi");

// A piece of middleware
app.use(express.json());
startupDebugger("Json in function..");
// app.use(express.static('default'));  // The name of the DIR of the files..
// app.use(express.urlencoded({ extended: true }));
// app.use( helmet); // another middleware
app.use(morgan("tiny")); // a logger of HTTP requests 'tiny' is the format
startupDebugger("Morgan (tiny) enabled..");

app.use("/", home);
app.use("/api/genres", gen);

dbDebugger("Connected to the DB..");

// Server in ascolto
app.listen(3000, function () {
  console.log("vidly server listening on port 3000");
});
