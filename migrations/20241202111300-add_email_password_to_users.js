'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "email", {
      allowNull: false,
      type: Sequelize.STRING,
      after: "id"
    });
    await queryInterface.addColumn("users", "password", {
      allowNull: false,
      type: Sequelize.STRING,
      after: "email"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "email");
    await queryInterface.removeColumn("users", "password");
  }
};
