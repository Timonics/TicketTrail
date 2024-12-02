const { Genre, Movie } = require("../db/models/index");

const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    let newgenre = new Genre({
      name,
    });
    newgenre = await newgenre.save();
    if (!newgenre)
      return res
        .status(400)
        .json({ success: false, message: "Genre not created" });
    res
      .status(200)
      .json({ success: true, message: "Genre successfully created" });
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
};

const allGenres = async (req, res) => {
  try {
    const allGenres = await Genre.findAll({
      include: [{ model: Movie, as: "movies" }],
    });
    if (!allGenres || allGenres.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No genres found" });
    res.status(200).json({ success: true, genres: allGenres });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const singleGenre = async (req, res) => {
  try {
    const { genreID } = req.params;
    const singleGenre = await Genre.findByPk(genreID, {
      include: {
        model: Movie,
        as: "movies",
      },
    });
    if (!singleGenre)
      return res
        .status(400)
        .json({ success: false, message: "Genre not found" });
    res.status(200).json({ success: true, user: singleGenre });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { genreID } = req.params;
    const deleteGenre = await Genre.destroy(genreID);
    if (!deleteGenre)
      return res
        .status(400)
        .json({ success: false, message: "Genre not deleted" });
    res
      .status(200)
      .json({ success: true, message: `Genre ${genreID} has been deleted` });
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = { createGenre, singleGenre, deleteGenre, allGenres };
