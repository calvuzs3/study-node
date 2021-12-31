const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// cRud: READ ALL
router.get("/", async (req, res) => {
  const result = await Genre.find();

  res.send(result);
});

// Crud - CREATE
router.post("/", async (req, res) => {
  const err = validate(req.body);
  if (err.error) return res.status(400).send(err.error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save(genre);

  res.send(genre);
});

// cRud: READ ONE
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("The given genre ID was not found.");

  res.send(genre);
});

// crUd - UPDATE
router.put("/:id", async (req, res) => {
  const err = validate(req.body);
  if (err.error) return res.status(400).send(err.error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("The given genre ID was not found.");

  res.send(genre);
});

// cruD
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("The given genre ID was not found.");

  res.send(genre);
});

module.exports = router;
