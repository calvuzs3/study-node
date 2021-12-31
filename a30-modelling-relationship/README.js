d;
/* Wich us the best way to represent a relationship ?
 * for those who come from a relational db it is the first example
 * we're going to expose but
 * ther are other two
 * one is organic,
 * two is pointing at performance
 * three is a hybrid
 */

// Using references (normalization) -> CONSISTENCY
let author = {
  name: "Luke Calvuz",
};

let author = {
  author: "id",
};

// Two: Using embedded documents (denormalization) -> PERFORMANCE
let course = {
  author: {
    name: "Luke Calvuz",
  },
};

// HYBRID:
let author = {
  name: "Luke",
  // and 50other properties
};

let course = {
  author: {
    id: "ref",
    name: "Luke",
  },
};
