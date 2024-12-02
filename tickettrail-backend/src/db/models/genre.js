const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Genre = sequelize.define(
  "Genre",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { freezeTableName: true }
);

module.exports = Genre;
