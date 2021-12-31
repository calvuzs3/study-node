const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
	"Course",
	new mongoose.Schema({
		name: String,
		authors: [
			{
				type: authorSchema,
				// required: true,
			},
		],
	})
);

async function addAuthor(courseID, author) {
	const course = await Course.findById(courseID);
	if (!course) return;

	course.authors.push(author);
	course.save();
}

async function removeAuthor(courseID, authorID) {
	const course = await Course.findById(courseID);
	if (!course) return;

	const author = course.authors.id(authorID);
	if (!author) return;

	author.remove();
	course.save();
}

async function createCourse(name, authors) {
	const course = new Course({
		name,
		authors,
	});

	const result = await course.save();
	console.log(result);
}

async function listCourses() {
	const courses = await Course.find();
	console.log(courses);
}

async function updateAuthor(courseID) {
	// const course = await Course.findById(id);
	const course = await Course.findByIdAndUpdate(
		{ _id: courseID },
		{
			$unset: {
				"author": "",
			},
		}
	);
	if (!course) {
		console.log(course);
		return null;
	}
}

// createCourse("Node Course", new Author({ name: "Mosh" }));
// createCourse("Node Course", [
// 	new Author({ name: "Mosh" }),
// 	new Author({ name: "Luke" }),
// ]);
// const id = new mongoose.Types.ObjectId("61cf292548ac709837eee4c1");
// updateAuthor("61cf2bc9d9e5ab861b31c7ef");

// addAuthor("61cf3b6224ffcee5bd84bf92", new Author({ name: "John Doe" }));
removeAuthor("61cf3b6224ffcee5bd84bf92", "61cf3b6224ffcee5bd84bf90");
