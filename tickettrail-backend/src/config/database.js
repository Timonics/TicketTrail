const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV;
const config = require("./config")[env];

const sequelize = new Sequelize(config);

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database is successfully connected");
    await sequelize.sync();
    console.log("Database is successfully synced");
  } catch (error) {
    console.error("Error Connecting to the Database");
  }
};

init();

module.exports = sequelize;
