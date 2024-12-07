'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('budgets', {
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
      large_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      amount: {
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
    await queryInterface.addIndex("budgets", ["kakeibo_id"], {
      name: "kakeibo_id_idx",
      unique: false,
    });
    await queryInterface.addIndex("budgets", ["currency_id"], {
      name: "currency_id_idx",
      unique: false,
    });
    await queryInterface.addIndex("budgets", ["large_category_id"], {
      name: "large_category_id_idx",
      unique: false,
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('budgets');
  }
};