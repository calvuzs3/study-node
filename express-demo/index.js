/* We install nodemon 
npm i -g nodemon
it monitor a file for changes
like our index.js

*/
const express = require("express");
const app = express();

const Joi = require('joi');


// A piece of middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course wwith the given id was not found."); // 4040
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params.year + " " + req.params.month);
});

app.post("/api/courses", (req, res) => {
  // In order for this to work we need to add
  // at the top app.use(express.json);
  // Validation
  // If invalid 400 bad request
  const { error } = validateCourse(req.body);

  if (error) 
    return res.status(400).send(error.details[0].message);

  //   // Validation
  //   if (!req.body.name || req.body.name.length <3) {
  //       res
  //       .status(400)
  //       .send("Name required and lenght should be at least 3.");
  //       return;
  //       // To validate were using a package
  //       // joi
  //   }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  // Add && Respond with the obj added
  courses.push(course);
  res.send(course);
});


// Updating..
app.put('/api/courses/:id', (req, res) => {
  // If !exixsts 404 not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return
    res.status(404).send("The course wwith the given id was not found."); // 4040
  
    // If invalid 400 bad request
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message );
          return;
  }
  // if ok, update
  course.name = req.body.name;
  res.send(course);
});

// Deleting..
app.delete('/api/courses/:id', (req, res) => {
  // If !exixsts 404 not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return
    res.status(404).send("The course wwith the given id was not found."); // 4040
  
  // if ok, delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
     const schema = {
       name: Joi.string().min(3).required(),
     };
     
     return Joi.validate(course, schema); 
}
/* To have an environment var
in Win 'set ENV VALUE'
in UNIX 'export ENV=VALUE'
*/
//PORT
// const e = process.env;
// console.log(e);
// Well.. it doesn't work....
const port = process.env.OURPORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});