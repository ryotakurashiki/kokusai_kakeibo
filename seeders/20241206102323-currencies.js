'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO currencies (id, name, symbol, created_at, updated_at) VALUES
(1,"円","¥","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(2,"米ドル","$","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(3,"ベトナムドン","đ","2024/12/06 17:25:30","2024/12/06 17:25:30")
`);
  },

  async down (queryInterface, Sequelize) {
  }
};
