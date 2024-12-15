import { DataTypes, Model, Sequelize, Optional, Op } from "sequelize";
import Kakeibo from "./kakeibo";
import MiddleCategory from "./middle_category";
import Currency from "./currency";
import { start_of_last_month } from "../common/date";
import LargeCategory from "./large_category";

export interface ExpenseAttributes {
  id: number;
  kakeibo_id: number;
  middle_category_id: number;
  currency_id: number;
  name: string | null;
  amount: number;
  payment_date: Date;
  created_at: Date;
  updated_at: Date;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  public id!: number;
  public kakeibo_id!: number;
  public middle_category_id!: number;
  public currency_id!: number;
  public name!: string;
  public amount!: number;
  public payment_date!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): void {
    Expense.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        kakeibo_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        middle_category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        currency_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        payment_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "expense",
        tableName: "expenses",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        scopes: {
          with_currency() {
            return { include: [Currency] };
          },
          with_category() {
            return {
              include: [{
                model: MiddleCategory, include: [ LargeCategory ]
              }]
            };
          },
          order_newly_paid() {
            return {
              order: [
                ['payment_date', 'DESC'],
                ['id', 'DESC']
              ]
            };
          },
          order_early_paid() {
            return {
              order: [
                ['payment_date', 'ASC'],
                ['id', 'ASC']
              ]
            };
          },
          order_newly_created() {
            return {
              order: [
                ['id', 'DESC']
              ]
            };
          },
          recent() {
            return {
              where: {
                payment_date: { [Op.gte]: start_of_last_month() }
              }
            };
          }
        },
      },

    );
  }

  static associate() {
    Expense.belongsTo(Kakeibo);
    Expense.belongsTo(MiddleCategory);
    Expense.belongsTo(Currency);
  }
}