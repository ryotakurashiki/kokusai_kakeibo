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
import ExpenseList from '../../components/ExpenseList/ExpenseList';

function Summary() {
  const [largeCategories, setLargeCategories] = useState<(LargeCategoryAttributes & { middle_categories: MiddleCategoryAttributes[] })[]>([]);
  const [expenses, setExpenses] = useState<(ExpenseAttributes& { middle_category: MiddleCategoryAttributes, currency: CurrencyAttributes })[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(current_year());
  const [selectedMonth, setSelectedMonth] = useState<number>(current_month());

  function refresh_expenses(year: number, month: number) {
    // ToDo apiリクエストを切り出す
    axios.get(`http://localhost:3000/expenses?year=${year}&month=${month}`).then((response) => {
      setExpenses(response.data.expenses);
    }).catch(error => console.error("expenses fetch error:", error));
  }

  function back_month() {
    let year = selectedYear;
    let month = selectedMonth;
    if (selectedMonth == 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
    setSelectedYear(year);
    setSelectedMonth(month);
    refresh_expenses(year, month);
  }

  function forward_month() {
    let year = selectedYear;
    let month = selectedMonth;
    if (selectedMonth == 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }
    setSelectedYear(year);
    setSelectedMonth(month);
    refresh_expenses(year, month);
  }

  useEffect(() => {
    // ToDo apiリクエストを切り出す
    axios.get("http://localhost:3000/large_categories").then((response) => {
      setLargeCategories(response.data.large_categories);
    }).catch(error => console.error("Large categories fetch error:", error));
    // ToDo apiリクエストを切り出す
    refresh_expenses(selectedYear, selectedMonth);
  }, []);

 const CategorySummaries = largeCategories.map(largeCategory=>{
  return <CategorySummary large_category={largeCategory} expenses={expenses} />
 });

  return (
    <>
      <h1>Vite + React</h1>
      <Link to="/home">ホーム</Link>
      <Link to="/expense_registration">登録</Link>
      <h2>{selectedYear}年{selectedMonth}月</h2>
      <button type="button" onClick={back_month}> ← </button>
      <button type="button" onClick={forward_month}> → </button>
      {CategorySummaries}
    </>
  )
}

export default Summary
