/* This exercize took me 1/2 hour -- and GONE perfectly OK at first try :)  */
const mongoose = require("mongoose");

const gen = require("./routes/genres");
const home = require("./routes/home");
const cus = require("./routes/customers");

const express = require("express");
const morgan = require("morgan");
const app = express();

// DB connection
mongoose
  .connect("mongodb://localhost/genres")
  .then(console.log("Connected to the DB."))
  .catch((err) => console.log("DB connection error: ", err));

// A piece of middleware
app.use(express.json());
app.use(morgan("tiny")); // a logger of HTTP requests 'tiny' is the format

app.use("/", home);
app.use("/api/genres", gen);
app.use("/api/customers", cus);

// Server in ascolto
app.listen(3000, function () {
  console.log("Vidly server listening on port: 3000");
});
