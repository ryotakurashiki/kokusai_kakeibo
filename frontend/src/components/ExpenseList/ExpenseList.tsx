import React from "react";
import { ExpenseAttributes } from "../../../../src/models/expense";
import { CurrencyAttributes } from "../../../../src/models/currency";
import { MiddleCategoryAttributes } from "../../../../src/models/middle_category";
import { get_string_from_date } from "../../functions/date";
import './ExpenseList.scss'
import { LargeCategoryAttributes } from "../../../../src/models/large_category";

interface ExpenseListProps {
  expenses: (ExpenseAttributes & {
    currency: CurrencyAttributes,
    middle_category: (MiddleCategoryAttributes & {
      large_category: LargeCategoryAttributes
    })
  })[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  let last_payment_date: Date | null = null;
  const ExpenseListItems = expenses.map(expense => {
    const is_payment_date_changed = expense.payment_date !== last_payment_date;
    last_payment_date = expense.payment_date;
    return (
      <>
        {is_payment_date_changed ? (<tr className="expense_list_date"><td colSpan={3}>{get_string_from_date(expense.payment_date, 'YYYY-MM-DD')}</td></tr>) : (<tr></tr>) }
        <tr key={expense.id} className="expense_list_item" >
          <td><img src={"category_icons/"+expense.middle_category.large_category.icon} className="category_icon" alt="category_icon" /></td>
          <td className="name">{expense.name}</td>
          <td className="amount">{expense.currency.symbol}{expense.amount.toLocaleString()}</td>
        </tr>
      </>
    )
  }
  );

  return (
    <>
      <table>
        <tbody>{ExpenseListItems}</tbody>
      </table>
    </>
  );
};

export default ExpenseList;