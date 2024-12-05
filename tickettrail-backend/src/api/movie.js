const { Movie, Genre, ShowTime } = require("../db/models/index");

const allMovies = async (req, res) => {
  try {
    const allMovies = await Movie.findAll({
      include: {
        model: Genre,
        as: "genre",
      },
    });
    if (!allMovies || allMovies.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No Movies found" });
    res.status(200).json({ success: true, movies: allMovies });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, description, posterImg, genreId, showtimeId } = req.body;
    const genre = await Genre.findByPk(genreId);
    if (!genre)
      return res
        .status(400)
        .json({ success: false, message: "This genre does not exist" });
    const showtime = await ShowTime.findByPk(showtimeId);
    if (!showtime)
      return res
        .status(400)
        .json({ success: false, message: "This showtime does not exist" });
    let newMovie = new Movie({
      title,
      description,
      posterImg,
      genreId,
      showtimeId,
    });
    newMovie = await newMovie.save();
    if (!newMovie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not created" });
    }
    res
      .status(200)
      .json({ success: true, message: "Movie successfully created" });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const singleMovie = async (req, res) => {
  try {
    const { movieID } = req.params;
    const singleMovie = await Movie.findByPk(movieID, {
      include: {
        model: Genre,
        as: "genre",
      },
    });
    if (!singleMovie)
      return res
        .status(400)
        .json({ success: false, message: "Movie not found" });
    res.status(200).json({ success: true, movie: singleMovie });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieID } = req.params;
    const { title, description, posterImg, genreId, showtimeId } = req.body;
    const genre = await Genre.findByPk(genreId);
    if (!genre)
      return res
        .status(400)
        .json({ success: false, message: "This genre does not exist" });
    const showtime = await ShowTime.findByPk(showtimeId);
    if (!showtime)
      return res
        .status(400)
        .json({ success: false, message: "This showtime does not exist" });
    const updateMovie = await Movie.update(
      {
        title,
        description,
        posterImg,
        genreId,
        showtimeId,
      },
      {
        where: {
          id: movieID,
        },
      }
    );
    if (!updateMovie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not updated" });
    }
    res.status(200).json({
      success: true,
      message: "Movie successfully updated",
      updatedMovie: updateMovie,
    });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieID } = req.params;
    const deleteMovie = await Movie.destroy({ where: { id: movieID } });
    if (!deleteMovie)
      return res
        .status(400)
        .json({ success: false, message: "Movie not deleted" });
    res
      .status(200)
      .json({ success: true, message: `Movie ${movieID} has been deleted` });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const { genreID } = req.params;
    const movies = await Movie.findAll({
      where: {
        genreId: genreID,
      },
    });
    if (!movies || movies.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Movies not found" });
    res.status(200).json({ success: true, movies: movies });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const getMoviesByDate = async (req, res) => {
  try {
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = {
  allMovies,
  createMovie,
  singleMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
};
