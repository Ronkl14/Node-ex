const movies = require("../movies.json");
const fs = require("fs");

const getMovies = (req, res) => {
  const movies = JSON.parse(fs.readFileSync("../movies.json").toString());
  res.status(200).json(movies);
};

const createMovie = (req, res) => {
  const movies = JSON.parse(fs.readFileSync("../movies.json").toString());
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
  };

  movies.push(newMovie);
  console.log(movies);

  try {
    fs.writeFileSync("../movies.json", JSON.stringify(movies));
    res.status(201).json(newMovie);
    console.log("yay");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const getMovie = (req, res) => {
  const movies = JSON.parse(fs.readFileSync("../movies.json").toString());

  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
};

const updateMovie = (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));

  const updatedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
  };

  fs.writeFile("../movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.status(201).json(updatedMovie);
    }
  });
};

const deleteMovie = (req, res) => {
  const moviesUpdated = movies.filter((movie) => movie.id !== req.params.id);
  res.status(200).json(moviesUpdated);
};

module.exports = { getMovies, createMovie, getMovie, updateMovie, deleteMovie };
