import { DataTypes, Model, Sequelize, Optional, Op } from "sequelize";
import Kakeibo from "./kakeibo";
import LargeCategory from "./large_category";
import Currency from "./currency";
import { sequelize } from ".";
import { now, get_string_from_date, start_of_this_month } from "../common/date";
import Expense from "./expense";
import MiddleCategory from "./middle_category";

export interface BudgetAttributes {
  id: number;
  kakeibo_id: number;
  large_category_id: number;
  currency_id: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface BudgetWithResult {
  budget_id: number;
  large_category_name: string;
  currency_id: number;
  currency_symbol: string;
  budget_amount: number;
  expense_total_amount: number;
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

  static async find_by_kakeibo_id_with_result(kakeibo_id: number): Promise<BudgetWithResult[] | null> {
    const start :string = get_string_from_date(start_of_this_month());
    const end :string = get_string_from_date(now());
    // ToDo: includeした場合の型定義
    const budgets :(Budget & { large_category: LargeCategory, currency: Currency })[] = await Budget.findAll({
      include: [
        { model: LargeCategory },
        { model: Currency }
      ],
      where: { kakeibo_id }
    }) as (Budget & { large_category: LargeCategory, currency: Currency })[];
    const large_category_ids : number[] = budgets.map(b=> b.large_category_id);
    // ToDo: includeした場合の型定義
    const total_expenses: {large_category_id: number, currency_id: number, total_expense_amount: number}[] = await Expense.findAll({
      attributes: [
        [sequelize.col('middle_category->large_category.id'), 'large_category_id'],
        ['currency_id', 'currency_id'],
        [sequelize.fn('sum', sequelize.col('amount')), 'total_expense_amount']
      ],
      where: {
        kakeibo_id,
        payment_date: {
          [Op.gte]: start,
          [Op.lte]: end
        }
      },
      include: [
        {
          model: MiddleCategory,
          attributes: [],
          required: true,
          include: [
            {
              model: LargeCategory,
              attributes: [],
              where: { id: large_category_ids },
              required: true
            }
          ],
        }
      ],
      raw: true,
      group: ['middle_category->large_category.id', 'currency_id']
    }) as unknown as {large_category_id: number, currency_id: number, total_expense_amount: number}[];
    return budgets.map(budget=> ({
      budget_id: budget.id,
      large_category_name: budget.large_category.name,
      currency_id: budget.currency.id,
      currency_symbol: budget.currency.symbol,
      budget_amount: budget.amount,
      expense_total_amount: total_expenses.find(total_expense=> total_expense.large_category_id == budget.large_category_id && total_expense.currency_id == budget.currency_id )?.total_expense_amount || 0
    }));
  }
}