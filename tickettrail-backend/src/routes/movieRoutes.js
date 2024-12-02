const express = require("express");
const router = express.Router();

const { allMovies, createMovie, singleMovie, deleteMovie, updateMovie, getMoviesByGenre } = require("../api/movie");

router
    .post("/new-movie", createMovie)
    .get("/", allMovies)

router.route("/:movieID")
    .get(singleMovie)
    .put(updateMovie)
    .delete(deleteMovie)

router.get("/genre/:genreID", getMoviesByGenre)

module.exports = router;
