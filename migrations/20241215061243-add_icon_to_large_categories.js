'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("large_categories", "icon", {
      allowNull: false,
      type: Sequelize.STRING,
      after: "name"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("large_categories", "icon");
  }
};
