import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import LargeCategory from "./large_category";

interface MiddleCategoryAttributes {
  id: number;
  large_category_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface MiddleCategoryCreationAttributes extends Optional<MiddleCategoryAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class MiddleCategory extends Model<MiddleCategoryAttributes, MiddleCategoryCreationAttributes> implements MiddleCategoryAttributes {
  public id!: number;
  public large_category_id!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // `initModel` メソッドを定義
  static initModel(sequelize: Sequelize): void {
    MiddleCategory.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        large_category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
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
        modelName: "MiddleCategory",
        tableName: "middle_categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
    MiddleCategory.belongsTo(LargeCategory);
  }
}
