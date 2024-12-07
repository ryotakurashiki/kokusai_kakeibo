'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO budgets (id, kakeibo_id, large_category_id, currency_id, amount, created_at, updated_at) VALUES
(1,1,1,1,100000,"2024/12/06 17:25:30","2024/12/06 17:25:30")
`);
  },

  async down (queryInterface, Sequelize) {
  }
};
