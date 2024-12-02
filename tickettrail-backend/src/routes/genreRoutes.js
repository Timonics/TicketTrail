const express = require("express");
const router = express.Router();

const { createGenre, singleGenre, deleteGenre, allGenres } = require("../api/genre");

router
    .post("/new-genre", createGenre)
    .get("/", allGenres)

router.route("/:genreID")
    .get(singleGenre)
    .delete(deleteGenre)

module.exports = router;
