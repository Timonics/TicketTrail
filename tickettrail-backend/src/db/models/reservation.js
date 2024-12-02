const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Movie = require("../models/movie");
const Seat = require("../models/seat");
const User = require("../models/user");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Seat,
        key: "id",
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Reservation;
