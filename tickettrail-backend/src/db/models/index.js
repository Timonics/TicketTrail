const Genre = require("./genre");
const Reservation = require("./reservation");
const Movie = require("./movie");
const Seat = require("./seat");
const User = require('./user');

Genre.hasMany(Movie, { foreignKey: "genreId", as: "movies" });
Movie.belongsTo(Genre, { foreignKey: "genreId", as: "genre" });

Movie.hasMany(Reservation, { foreignKey: "movieId", as: "reservations" });
Reservation.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });

Seat.hasOne(Reservation, { foreignKey: "seatId", as: "reservation" });
Reservation.belongsTo(Seat, { foreignKey: "seatId", as: "seat" });

Reservation.hasOne(User, {foreignKey: 'ownerId', as: 'user'});
User.hasMany(Reservation, { foreignKey: 'ownerId', as: 'userReservations'});

module.exports = {
  Genre,
  Reservation,
  Movie,
  Seat,
  User
};
