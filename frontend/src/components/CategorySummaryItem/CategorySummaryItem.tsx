import React from "react";
import './CategorySummaryItem.css'


interface CategorySummaryProps {
  name: string,
  amount_objs: { currency_symbol: string, amount: number }[]
}

const CategorySummaryItem: React.FC<CategorySummaryProps> = ({ name, amount_objs }) => {

  const amount_cell_contents = amount_objs.map(obj=> <p>{obj.currency_symbol}{obj.amount}</p>);
  return (
    <>
      <tr>
        <td>{ name }</td>
        <td>{ amount_cell_contents }</td>
      </tr>
    </>
  );
};

export default CategorySummaryItem;