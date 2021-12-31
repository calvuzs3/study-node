// Let's go on ..
// Custom Validators
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

  name: {
    type: String,
    required: true,
    minlenght: 4,
    maxlenght: 255,
  },
  category: { type: String, enum: ["web", "mobile"] },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.lenght > 0;
          // Shouldn't call this.....
          if (!result) new Error("OOppppps. ");
        }, 2000);
        // message: "A course should have at least one tag.",
      },
    },
  },
  date: Date,
  isPublished: Boolean,
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
    _id: null,
    name: "luke",
    category: "web",
    author: "luke",
    // here we miss a required field.... but we can't pass a null !
    // but in the validator should implement a null confront
    // tags: ["angular", "frontend"],
    // tags: [null],
    isPublished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (exception) {
    console.log("Error: ", exception.message);
  }
}
createCourse();

// Can't get it to work.... fail!
