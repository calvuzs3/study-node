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
  // We add some more..
  name: {
    type: String,
    required: true,
    minlenght: 4,
    maxlenght: 255,
    // match: /pattern/
    // Also if it was somethinglike a category..
    // enum: ['web', 'mobile', 'network']
  },
  category: { type: String, enum: ["web", "mobile"] },
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  // An example of a required parameterized property
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
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
  const result = await Course.findByIdAndDelete(id);

  console.log(result);
}

async function createCourse() {
  const course = new Course({
    // here we miss a required field....
    _id: null,
    name: "luke",
    category: "w-eb",
    author: "luke",
    tags: ["angular", "frontend"],
    isPublished: true,
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
