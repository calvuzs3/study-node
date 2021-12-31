const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlenght: 3,
		maxlenght: 50,
	},
});
// Istance ..
const Genre = new mongoose.model("Genre", genreSchema);

// Validation
function validateGenre(arg) {
	// // arg is the req.body in json
	const schema = Joi.object({ name: Joi.string().min(3).required() });
	const result = schema.validate({ name: arg.name });

	if (result.error) {
		console.log("*validateGenre: ", result.error.details[0].message);
	}
	return result;
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
