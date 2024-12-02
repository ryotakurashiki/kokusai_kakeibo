'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "kakeibo_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      after: "id"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "kakeibo_id");
  }
};
