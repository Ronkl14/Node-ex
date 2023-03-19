const express = require("express");
const {
  getMovies,
  updateMovie,
  createMovie,
  getMovie,
  deleteMovie,
} = require("../controllers/movieController");

const movieRoutes = express.Router();

movieRoutes.route("/").get(getMovies).post(createMovie);
movieRoutes.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = movieRoutes;