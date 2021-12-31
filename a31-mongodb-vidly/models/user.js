const mongoose = require("mongoose");
const Joi = require("joi");

// Istance ..
const User = new mongoose.model(
	"User",
	mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlenght: 3,
			maxlenght: 50,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			minlenght: 3,
			maxlenght: 255,
		},
		password: {
			type: String,
			required: true,
			min: 3,
			max: 1024,
		},
	})
);

// Validation
function validateUser(arg) {
	// // arg is the req.body in json
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(3).max(255).required(),
		password: Joi.string().min(3).max(1024).required(),
	});
	const result = schema.validate(arg);

	return result;
}

exports.User = User;
exports.validate = validateUser;
