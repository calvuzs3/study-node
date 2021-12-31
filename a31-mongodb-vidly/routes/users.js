const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// // cRud: READ ALL
// router.get("/", async (req, res) => {
// 	const result = await Movie.find();

// 	res.send(result);
// });

// Crud - CREATE
router.post("/", async (req, res) => {
	const err = validate(req.body);
	if (err.error) return res.status(400).send(err.error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user)
		return res.status(400).send("User already registered with this email.");

	user = new User( _.pick(req.body, ['name', 'email', 'password']));
	await user.save();


	res.send(_.pick(user, ['name', 'email']);
});

// // cRud: READ ONE
// router.get("/:id", async (req, res) => {
// 	const movie = await Movie.findById(req.params.id);

// 	if (!movie)
// 		return res.status(404).send("The given Customer ID was not found.");

// 	res.send(movie);
// });

// // crUd - UPDATE
// router.put("/:id", async (req, res) => {
// 	const err = validate(req.body);
// 	if (err.error) return res.status(400).send(err.error.details[0].message);

// 	const movie = await Movie.findByIdAndUpdate(
// 		req.params.id,
// 		{
// 			title: req.body.title,
// 			genres: req.body.genres,
// 			numberInStock: req.body.numberInStock,
// 			dailyRentalRate: req.body.dailyRentalRate,
// 		},
// 		{ new: true }
// 	);

// 	if (!movie)
// 		return res.status(404).send("The given Customer ID was not found.");

// 	res.send(movie);
// });

// // cruD
// router.delete("/:id", async (req, res) => {
// 	const movie = await Movie.findByIdAndRemove(req.params.id);

// 	if (!movie)
// 		return res.status(404).send("The given Customer ID was not found.");

// 	res.send(movie);
// });

module.exports = router;
