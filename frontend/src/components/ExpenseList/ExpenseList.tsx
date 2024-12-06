import React from "react";
import { ExpenseAttributes } from "../../../../src/models/expense";
import { CurrencyAttributes } from "../../../../src/models/currency";
import { MiddleCategoryAttributes } from "../../../../src/models/middle_category";
import './ExpenseList.css'

interface ExpenseListProps {
  expenses: (ExpenseAttributes & {
    currency: CurrencyAttributes,
    middle_category: MiddleCategoryAttributes
  })[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const ExpenseListItems = expenses.map(expense =>
    (
      <>
        <tr key={expense.id} className="expense-list-item" >
        <td>{expense.middle_category.name}</td>
        <td>{expense.name}</td>
        <td>{expense.currency.symbol}{expense.amount}</td>
      </tr>
      </>
    )
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