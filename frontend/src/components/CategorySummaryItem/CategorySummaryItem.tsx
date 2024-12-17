import React from "react";
import './CategorySummaryItem.scss'
import { LargeCategoryAttributes } from "../../../../src/models/large_category";


interface CategorySummaryProps {
  name: string,
  amount_objs: { currency_symbol: string, amount: number }[],
  large_category: LargeCategoryAttributes,
  is_large_category: boolean
}

const CategorySummaryItem: React.FC<CategorySummaryProps> = ({ name, amount_objs, large_category, is_large_category }) => {

  const amount_cell_contents = amount_objs.map(obj=> <p>{obj.currency_symbol}{obj.amount.toLocaleString()}</p>);
  return (
    <>
      <tr>
        <td className="category">
          { is_large_category ? (
            <img src={"category_icons/"+large_category.icon} className="category_icon" alt="category_icon" />
          ) : (
            <div className="dot" style={{ backgroundColor: large_category.color }}></div>
          )
          }
        </td>
        <td className="category_name">{ name }</td>
        <td className="amount">{ amount_cell_contents }</td>
      </tr>
    </>
  );
};

export default CategorySummaryItem;