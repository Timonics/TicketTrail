const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Genre = require('./genre');
const ShowTime = require("./showtime");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id"
      }
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ShowTime,
        key: "id"
      }
    },
  },
  { freezeTableName: true }
);

module.exports = Movie;
