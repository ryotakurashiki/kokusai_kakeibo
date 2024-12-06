'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kakeibo_currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kakeibo_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex("kakeibo_currencies", ["kakeibo_id", "currency_id"], {
      name: "kakeibo_currency_unique_idx",
      unique: true,
    });
    await queryInterface.addIndex("kakeibo_currencies", ["kakeibo_id"], {
      name: "kakeibo_id_idx",
      unique: false,
    });
    await queryInterface.addIndex("kakeibo_currencies", ["currency_id"], {
      name: "currency_id_idx",
      unique: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kakeibo_currencies');
  }
};