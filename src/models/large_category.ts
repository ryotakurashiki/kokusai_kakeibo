import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface LargeCategoryAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface LargeCategoryCreationAttributes extends Optional<LargeCategoryAttributes, 'id' | 'created_at' | 'updated_at'> {}

export default class LargeCategory extends Model<LargeCategoryAttributes, LargeCategoryCreationAttributes> implements LargeCategoryAttributes {
  public id!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // `initModel` メソッドを定義
  static initModel(sequelize: Sequelize): void {
    LargeCategory.init(
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
        modelName: "LargeCategory",
        tableName: "large_categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }

  static associate() {
  }
}
