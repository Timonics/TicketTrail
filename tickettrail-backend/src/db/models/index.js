const Genre = require("./genre");
const Reservation = require("./reservation");
const Movie = require("./movie");
const Seat = require("./seat");
const User = require("./user");
const ShowTime = require("./showtime");

Genre.hasMany(Movie, { foreignKey: "genreId", as: "movies" });
Movie.belongsTo(Genre, { foreignKey: "genreId", as: "genre" });

Movie.hasMany(Reservation, { foreignKey: "movieId", as: "reservations" });
Reservation.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });

Seat.hasOne(Reservation, { foreignKey: "seatId", as: "reservation" });
Reservation.belongsTo(Seat, { foreignKey: "seatId", as: "seat" });

User.hasMany(Reservation, { foreignKey: "ownerId", as: "userReservations" });
Reservation.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

ShowTime.hasOne(Movie, { foreignKey: "showtimeId", as: "showTime" });
Movie.belongsTo(ShowTime, { foreignKey: "showtimeId", as: "movie" });

module.exports = {
  Genre,
  Reservation,
  Movie,
  Seat,
  User,
  ShowTime,
};
