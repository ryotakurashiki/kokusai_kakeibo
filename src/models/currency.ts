import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import KakeiboCurrency from "./kakeibo_currency";
import Expense from "./expense";

export interface CurrencyAttributes {
  id: number;
  name: string;
  symbol: string;
  created_at: Date;
  updated_at: Date;
}

interface CurrencyCreationAttributes extends Optional<CurrencyAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes> implements CurrencyAttributes {
  public id!: number;
  public name!: string;
  public symbol!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // `initModel` メソッドを定義
  static initModel(sequelize: Sequelize): void {
    Currency.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        symbol: {
          type: DataTypes.STRING,
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
        modelName: "currency",
        tableName: "currencies",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
    Currency.hasMany(KakeiboCurrency);
    Currency.hasMany(Expense);
  }
}
