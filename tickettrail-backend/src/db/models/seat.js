const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Seat = sequelize.define(
  "Seat",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservations: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Seat;
