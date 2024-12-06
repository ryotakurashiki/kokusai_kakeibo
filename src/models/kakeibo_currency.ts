import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import Kakeibo from "./kakeibo";
import Currency from "./currency";

export interface KakeiboCurrencyAttributes {
  id: number;
  kakeibo_id: number;
  currency_id: number;
  created_at: Date;
  updated_at: Date;
}

interface KakeiboCurrencyCreationAttributes extends Optional<KakeiboCurrencyAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class KakeiboCurrency extends Model<KakeiboCurrencyAttributes, KakeiboCurrencyCreationAttributes> implements KakeiboCurrencyAttributes {
  public id!: number;
  public kakeibo_id!: number;
  public currency_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // `initModel` メソッドを定義
  static initModel(sequelize: Sequelize): void {
    KakeiboCurrency.init(
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
        currency_id: {
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
        modelName: "KakeiboCurrency",
        tableName: "kakeibo_currencies",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
    KakeiboCurrency.belongsTo(Kakeibo);
    KakeiboCurrency.belongsTo(Currency);
  }
}
