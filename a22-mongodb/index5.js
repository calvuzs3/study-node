// Let's go on with the lections
// with the same db => Validations()
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
  // Now we implement the Validation 'required'
  name: { type: String, required: true },
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

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "luke",
        isPublished: true,
      },
    },
    { new: true }
  );

  console.log(result);
}

async function deleteCourse(id) {
  //   const result = await Course.deleteOne({ _id: id });
  const result = await Course.findByIdAndDelete(id);

  console.log(result);
}

async function createCourse() {
  const course = new Course({
    // here we miss a required field....
    // name: 'luke',
    author: "luke",
    tags: ["angular", "frontend"],
    price: 15,
  });
  try {
    // course.validate();
    const result = await course.save();
    console.log(result);
  } catch (exception) {
    console.log("Error: ", exception.message);
  }
}
createCourse();
