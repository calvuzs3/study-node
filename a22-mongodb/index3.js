// Let's go on with the lections
// with the same db
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

async function updateCourse(id) {
  // Approach QueryUpdate
  // updateOne || updateMany
  // modifi the properties
  // save()
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "luke",
        isPublished: true,
      },
    },
    // With this
    // we shall get back the new values as result
    // otherwise w shall get the previous data (before the changes)
    { new: true }
  );

  console.log(result);
}
updateCourse("5a68fdd7bee8ea64649c2777");
