const boolean = require('joi/lib/boolean');
const date = require('joi/lib/date');
const mongoose = require('mongoose');
mongoose
// Playground is our new db, if it doesnt exists mongo will create it
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Couldn't connect to the MongoDB", err));

  // Lets create a schema for various type od data:
  // String, Number, Date, Buffer, Boolean, ObjectID, Array
const courseSchema = mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});
// Let's pass the schema to mongoose  and we shall have back a class
const Course = mongoose.model('course', courseSchema);

// lets say we create a function to insert a value
// this is:
async function createCourse() {
  const course = new Course( {
    name: 'Angular Course',
    author: 'Luke Calvuz',
    tags: ['angular', 'frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

// A function to retrieve data..filtered
async function getCourses() {
  //  Comparison Operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal)
  // lt
  // lte
  // in
  // nin (not in)
  
  // We should use thi for equals..
  // .find({price: 10})
  // .find({price: { $gte: 10, $lte: 20}})
  // .find({ price: { $in: [10,15,20] } })

  // Logical operators
  // OR AND
  // .find()
  // .or( [ {author: 'Luke Calvuz'}, {isPublished: true} ] )
  // .and( [ {}, {} ] )

  // Regular expressions
  // .find({ author: /pattern/ }).
  // so for example
  // .find({ author: /^Luke/ }) // starts with
  // .find({ author: /Calvuz$/i }) // ends with
  // .find({ author: /.*Luke.*/ }) //contains 'Luke' ( 0 or more chars)

  const courses = await Course
    // Some filters
    .find({ author: "Luke Calvuz", isPublished: true })
    //
    .limit(10)
    // Sort ASC (+1) or DESC (-1)
    .sort({ name: 1 })
    // The properties we want
    .select({ name: 1, tags: 1 })
    // We add .count() to count
    .count();
  console.log(courses);
}
// Run
// getCourses();

// Update first method
// Initially we retrive the course
// NOTE: in order for these to run properly, we must set an _id field in the Model,
// otherwise the db returns us something like a newObjectId{}
//
async function updateCourse (id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log('Error');
    return;
  }
  
  course.author = 'Author';
  course.isPublished = true;
  
  const r = await course.save();
  console.log(r);
}

async function upCourse(id) {
  const course = await Course.findByIdAndUpdate(id ,{
    $set: {
      isPublished: false,
      author: 'Luke'
    }
    });
    console.log(course);
}
async function findID(id){
  const query = Course.find({_id: id});
  query.exec( (err, course) => {
    if (err) return (err => console.log('Error: ', err));
    console.log(course);
  })
}
// updateCourse("5a68fdd7bee8ea64649c2777");
upCourse("5a68fdd7bee8ea64649c2777");
findID("5a68fdd7bee8ea64649c2777");