const mongoose = require("mongoose");
const winston = require("winston");

// Db configure
const isDbbLocal = true;
const dbString = isDbbLocal ? "mongodb://localhost/genres" : "";

module.exports = function () {
	// DB connection
	mongoose.connect(dbString).then(winston.info("Connected to MongoDB."));
};
module.exports.dbString = dbString;
