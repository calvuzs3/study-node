// Exercise 1:
// Get all the published courses
// that are 15$ or more,
// or having the word 'by' in their title
//
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(console.log("Connected to the DB."))
  .catch((err) => {
    console.log("Connection error: ", err);
  });

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
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .select("name author");
}

async function run() {
  const result = await getCourses();
  console.log("Courses: ", result);
}

run();
