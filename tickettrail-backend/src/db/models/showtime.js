const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ShowTime = sequelize.define(
  "ShowTime",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    showTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    showDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = ShowTime;
