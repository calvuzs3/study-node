// From scratch

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(console.log('Connected to localhost DB..'))
    .catch(err => { console.log('Errors..', err)});

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});
const Courses = mongoose.model('course', courseSchema);

//Function read
async function fetchCourses() {
    return await Courses
        .find({ isPublished: true }) 
        .or([ {price: { $gte:  15 }}, {name: /.*by.*/} ] )
        .select('name price');
        // .sort({ price: -1 });
}

async function run() {
    const courses = await fetchCourses();
    console.log(courses);
}

// run();
// failed - 1/2 hour
// ok in an hour

//Function read
async function fetchAll() {
    const courses=  await Courses.find();
    console.log(courses);
}
async function upCourse(id) {
  const course = await Courses.findByIdAndUpdate(id, {
    $set: {
      isPublished: false,
      author: "Luke",
    },
  });
  console.log(course);
}

async function removeCourse(id) {
  const res = await Courses.deleteOne( { _id: { id } });
  console.log(res);
}
fetchAll();
removeCourse("5a6900fff467be65019a9001");