const express = require('express');
const router = express.Router();

// Fake Data
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Action" }
];


// cRud: READ ALL
router.get('/', (req, res) => {
  return res.send(genres);
});

// Crud - CREATE
router.post('/:id', (req, res) => {
  const { err } = validateRes(req.name);
  if (err) return res.status(400).send(err.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// cRud: READ ONE
router.get('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The given genre ID was not found.');

  return res.send(genre);
});

// crUd - UPDATE
router.put('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The given genre ID was not found.');

  const { err } = validateRes(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  genre.name = req.body.name;
  return res.send(genre);
});

// cruD
router.delete('/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The given genre ID was not found.');

  genres.splice(genres.indexOf(genre), 1);
  return res.send(genre);
});

// Validation
function validateRes(arg) {
  // Res is the body in json
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(arg, schema);
}


module.exports = router;