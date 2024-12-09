import { useEffect, useState } from 'react';
import { ExpenseAttributes } from '../../../../src/models/expense';
import './Summary.module.css'
import { Link } from 'react-router-dom';
import { MiddleCategoryAttributes } from '../../../../src/models/middle_category';
import { CurrencyAttributes } from '../../../../src/models/currency';
import axios from 'axios';
import { current_month, current_year } from '../../functions/date';
import { LargeCategoryAttributes } from '../../../../src/models/large_category';
import CategorySummary from '../../components/CategorySummary/CategorySummary';

function Summary() {


  const [largeCategories, setLargeCategories] = useState<(LargeCategoryAttributes & { middle_categories: MiddleCategoryAttributes[] })[]>([]);
  const [expenses, setExpenses] = useState<(ExpenseAttributes& { middle_category: MiddleCategoryAttributes, currency: CurrencyAttributes })[]>([]);
  const [year, setYear] = useState<number>(current_year());
  const [month, setMonth] = useState<number>(current_month());

  useEffect(() => {
    // ToDo apiリクエストを切り出す
    axios.get("http://localhost:3000/large_categories").then((response) => {
      setLargeCategories(response.data.large_categories);
    }).catch(error => console.error("Large categories fetch error:", error));
    // ToDo apiリクエストを切り出す
    axios.get(`http://localhost:3000/expenses?year=${year}&month=${month}`).then((response) => {
      setExpenses(response.data.expenses);
      setYear(2024);
      setMonth(11);
    }).catch(error => console.error("expenses fetch error:", error));
  }, []);

 const CategorySummaries = largeCategories.map(largeCategory=>{
  return <CategorySummary large_category={largeCategory} expenses={expenses} />
 });

  return (
    <>
      <h1>Vite + React</h1>
      <Link to="/home">ホーム</Link>
      <Link to="/expense_registration">登録</Link>
      <h2>カテゴリ別支出</h2>
      {CategorySummaries}
    </>
  )
}

export default Summary
