import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import User from "./user";

interface KakeiboAttributes {
  id: number;
  created_at: Date;
  updated_at: Date;
}

interface KakeiboCreationAttributes extends Optional<KakeiboAttributes, 'id'> {}

export default class Kakeibo extends Model<KakeiboAttributes, KakeiboCreationAttributes> implements KakeiboAttributes {
  public id!: number;
  public kakeibo_id!: number;
  public created_at!: Date;
  public updated_at!: Date;

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
  }
}