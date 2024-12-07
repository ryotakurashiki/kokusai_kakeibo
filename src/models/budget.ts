import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import Kakeibo from "./kakeibo";
import LargeCategory from "./large_category";
import Currency from "./currency";

export interface BudgetAttributes {
  id: number;
  kakeibo_id: number;
  large_category_id: number;
  currency_id: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

interface BudgetCreationAttributes extends Optional<BudgetAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> implements BudgetAttributes {
  public id!: number;
  public kakeibo_id!: number;
  public large_category_id!: number;
  public currency_id!: number;
  public amount!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): void {
    Budget.init(
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
        large_category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        currency_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
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
        modelName: "budget",
        tableName: "budgets",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      },

    );
  }

  static associate() {
    Budget.belongsTo(Kakeibo);
    Budget.belongsTo(LargeCategory);
    Budget.belongsTo(Currency);
  }
}