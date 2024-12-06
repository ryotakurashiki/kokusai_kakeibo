'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO kakeibo_currencies (id, kakeibo_id, currency_id, created_at, updated_at) VALUES
(1,1,1,"2024/12/06 17:25:30","2024/12/06 17:25:30"),
(2,1,2,"2024/12/06 17:25:30","2024/12/06 17:25:30"),
(3,2,1,"2024/12/06 17:25:30","2024/12/06 17:25:30"),
(4,2,3,"2024/12/06 17:25:30","2024/12/06 17:25:30")
`);
  },

  async down (queryInterface, Sequelize) {
  }
};
