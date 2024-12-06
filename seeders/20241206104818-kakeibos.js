'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO kakeibos (id, created_at, updated_at) VALUES
(1,"2024/12/06 17:25:30","2024/12/06 17:25:30"),
(2,"2024/12/06 17:25:30","2024/12/06 17:25:30")
`);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
