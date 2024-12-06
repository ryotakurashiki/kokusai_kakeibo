'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO users (id, email, password, kakeibo_id, created_at, updated_at) VALUES
(1,"email@example.com","$2b$10$JI3D0f6EWEWB0qkPhwdNc.FS8RTFR2wvrBWaGdDl5umN7aABDpTXq",1,"2024/12/06 17:25:30","2024/12/06 17:25:30"),
(2,"email2@example.com","$2b$10$JI3D0f6EWEWB0qkPhwdNc.FS8RTFR2wvrBWaGdDl5umN7aABDpTXq",2,"2024/12/06 17:25:30","2024/12/06 17:25:30")
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
