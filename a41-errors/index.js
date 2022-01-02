const express = require("express");
const winston = require("winston");
const app = express();

// Include the startup routes..
require("./startup/log")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

throw new Error("testerror");
// Server in ascolto
const port = process.env.VIDLY_PORT || 3000;
app.listen(port, function () {
	winston.info(`Vidly server listening on port: ${port}`);
});
