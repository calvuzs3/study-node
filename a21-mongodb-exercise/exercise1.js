// Exercise 1:
// Get all the published backend courses
// sort them by their name,
// pick only their name and AuthenticatorAssertionResponse,
// and display them.
//
const mongoose = require('mongoose');
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(console.log("Connected to the DB."))
  .catch((err) => { console.log("Connection error: ", err); });

const courseSchema = mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select("name author");
}

async function run() {
    const result = await getCourses();
    console.log('Courses: ', result);
}

run();