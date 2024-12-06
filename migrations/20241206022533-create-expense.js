'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses', {
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
      middle_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payment_date: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.addIndex("expenses", ["kakeibo_id"], {
      name: "kakeibo_id_idx",
      unique: false,
    });
    await queryInterface.addIndex("expenses", ["middle_category_id"], {
      name: "middle_category_idx",
      unique: false,
    });
    await queryInterface.addIndex("expenses", ["currency_id"], {
      name: "currency_id_idx",
      unique: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses');
  }
};