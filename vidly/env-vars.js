// Lection about the env vars
//
// None of them works because i'm in Win10 perhaps..
//
const config = require("config");

console.log("ENV: " + process.env.NODE_ENV);
console.log(`app: ${app.get("env")}`);
if (app.get("env") === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny")); // a logger of HTTP requests 'tiny' is the format
}

console.log("Application name: " + config.get("name"));
console.log("Mail name: " + config.get("email"));
console.log("Mail password: " + config.get("email.password"));
