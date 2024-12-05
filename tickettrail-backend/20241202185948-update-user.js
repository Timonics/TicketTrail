"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("User", "reservations");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("User", "reservations", {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
  },
};
