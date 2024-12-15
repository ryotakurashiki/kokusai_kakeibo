import React from "react";
import { ExpenseAttributes } from "../../../../src/models/expense";
import { CurrencyAttributes } from "../../../../src/models/currency";
import { MiddleCategoryAttributes } from "../../../../src/models/middle_category";
import './CategorySummary.scss'
import { LargeCategoryAttributes } from "../../../../src/models/large_category";
import CategorySummaryItem from "../CategorySummaryItem/CategorySummaryItem";

interface CategorySummaryProps {
  large_category: LargeCategoryAttributes & { middle_categories: MiddleCategoryAttributes[] },
  expenses: (ExpenseAttributes & {
    currency: CurrencyAttributes,
    middle_category: MiddleCategoryAttributes
  })[];
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ large_category, expenses }) => {
  const results = [];
  const large_category_amount_objs: { currency_symbol: string, amount: number, large_category: LargeCategoryAttributes, is_large_category: boolean }[] = [];
  results.push({ name: large_category.name, large_category: large_category, is_large_category: true, amount_objs: large_category_amount_objs });
  large_category.middle_categories.forEach(middle_category=>{
    let middle_category_amount_objs: { currency_symbol: string, amount: number, large_category: LargeCategoryAttributes, is_large_category: boolean }[] = [];
    results.push({ name: middle_category.name, large_category: large_category, is_large_category: false, amount_objs: middle_category_amount_objs });
    expenses
      .filter(expense=> expense.middle_category_id == middle_category.id)
      .forEach(expense=> {
        const m_obj = middle_category_amount_objs.find(middle_category_amount_obj=> middle_category_amount_obj.currency_symbol == expense.currency.symbol);
        if (m_obj) {
          m_obj.amount += expense.amount;
        } else {
          middle_category_amount_objs.push({ currency_symbol: expense.currency.symbol, large_category: large_category, is_large_category: false, amount: expense.amount });
        }

        const l_obj = large_category_amount_objs.find(obj => obj.currency_symbol == expense.currency.symbol);
        if (l_obj) {
          l_obj.amount += expense.amount;
        } else {
          large_category_amount_objs.push({ currency_symbol: expense.currency.symbol, large_category: large_category, is_large_category: true, amount: expense.amount });
        }
      });
  });

  const CategorySummaryItems = results.map(result=>
    <CategorySummaryItem name={result.name} amount_objs={result.amount_objs} large_category={result.large_category} is_large_category={result.is_large_category} />
  )
  return (
    <>
      <table className="category_summary_table">
        <tbody>{ CategorySummaryItems }</tbody>
      </table>
    </>
  );
};

export default CategorySummary;