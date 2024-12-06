import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import User from "./user";
import KakeiboCurrency from "./kakeibo_currency";
import Expense from "./expense";

export interface KakeiboAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
}

interface KakeiboCreationAttributes extends Optional<KakeiboAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class Kakeibo extends Model<KakeiboAttributes, KakeiboCreationAttributes> implements KakeiboAttributes {
  public id!: number;
  public kakeibo_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static initModel(sequelize: Sequelize): void {
    Kakeibo.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
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
        modelName: "Kakeibo",
        tableName: "kakeibos",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
    Kakeibo.hasMany(User);
    Kakeibo.hasMany(KakeiboCurrency);
    Kakeibo.hasMany(Expense);
  }

  static async find_by_user_id(user_id: number): Promise<Kakeibo | null> {
    return await Kakeibo.findOne({
      include: [{
        model: User,
        where: { id: user_id },
        required: true
      }]
    });
  }
}