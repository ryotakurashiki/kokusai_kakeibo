import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import Kakeibo from "./kakeibo";

// Userモデルのインターフェースを定義
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  kakeibo_id: number;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  email!: string;
  password!: string;
  public kakeibo_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // `initModel` メソッドを定義
  static initModel(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        kakeibo_id: {
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
        sequelize, // Sequelizeインスタンスを渡す
        modelName: "user",
        tableName: "users",
        timestamps: true, // createdAt, updatedAtを有効にする
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
    User.belongsTo(Kakeibo);
  }
}